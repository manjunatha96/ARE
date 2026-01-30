// RQL (Remediation Query Language) Validator
// Supports simple condition queries with AND/OR operators

export interface RQLParseResult {
  valid: boolean;
  errors: string[];
  conditions?: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  logic?: ("AND" | "OR")[];
}

const VALID_FIELDS = [
  "event_name",
  "event_status",
  "severity",
  "source_ip",
  "group_key",
  "event_source",
  "timestamp",
  "duration",
  "count",
];

const VALID_OPERATORS = [
  "equals",
  "not_equals",
  "contains",
  "starts_with",
  "ends_with",
  "greater_than",
  "less_than",
  "in",
  "not_in",
];

const OPERATOR_SYMBOLS: Record<string, string> = {
  "==": "equals",
  "!=": "not_equals",
  "~": "contains",
  "^": "starts_with",
  $: "ends_with",
  ">": "greater_than",
  "<": "less_than",
};

export function validateRQL(rql: string): RQLParseResult {
  const errors: string[] = [];

  if (!rql.trim()) {
    return {
      valid: false,
      errors: ["Query cannot be empty"],
    };
  }

  try {
    // Split by AND/OR while preserving the operators
    const tokens = rql.match(/([^&|]+)(?:&&|\|\||$)/g) || [];
    const logicOperators = rql.match(/&&|\|\|/g) || [];

    if (tokens.length === 0) {
      errors.push("No valid conditions found in query");
      return { valid: false, errors };
    }

    const conditions = [];
    const logic: ("AND" | "OR")[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim().replace(/&&|\|\|$/, "").trim();

      if (!token) continue;

      // Parse individual condition: field operator "value"
      const conditionMatch = token.match(
        /^(\w+)\s+(==|!=|~|\^|\$|>|<|in|not_in|equals|not_equals|contains|starts_with|ends_with|greater_than|less_than)\s+(.+)$/
      );

      if (!conditionMatch) {
        errors.push(`Invalid condition syntax: "${token}"`);
        continue;
      }

      const [, field, op, valueStr] = conditionMatch;
      const operator = OPERATOR_SYMBOLS[op] || op;

      // Validate field
      if (!VALID_FIELDS.includes(field)) {
        errors.push(`Unknown field: "${field}". Valid fields: ${VALID_FIELDS.join(", ")}`);
        continue;
      }

      // Validate operator
      if (!VALID_OPERATORS.includes(operator)) {
        errors.push(
          `Unknown operator: "${operator}". Valid operators: ${VALID_OPERATORS.join(", ")}`
        );
        continue;
      }

      // Parse value (remove quotes if present)
      let value = valueStr.trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (!value) {
        errors.push(`Empty value in condition: "${token}"`);
        continue;
      }

      conditions.push({ field, operator, value });

      // Track logic operator
      if (i < logicOperators.length) {
        logic.push(logicOperators[i] === "&&" ? "AND" : "OR");
      }
    }

    if (conditions.length === 0) {
      errors.push("No valid conditions could be parsed");
      return { valid: false, errors };
    }

    return {
      valid: errors.length === 0,
      errors,
      conditions,
      logic: logic.length > 0 ? logic : undefined,
    };
  } catch (error) {
    errors.push(`Parse error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return { valid: false, errors };
  }
}

export function conditionsToRQL(
  conditions: Array<{ field: string; operator: string; value: string }>,
  logic?: ("AND" | "OR")[]
): string {
  if (conditions.length === 0) return "";

  return conditions
    .map((cond) => {
      const value = cond.value.includes(" ") ? `"${cond.value}"` : cond.value;
      return `${cond.field} ${cond.operator} ${value}`;
    })
    .join((logic && logic[0] === "OR") ? " || " : " && ");
}

export const RQL_SYNTAX_HELP = `RQL Syntax Guide:
  
Basic Syntax:
  field operator "value"
  
Examples:
  severity equals "critical"
  event_name contains "error"
  source_ip == "192.168.1.1"
  
Operators:
  equals (==)          : Exact match
  not_equals (!=)      : Not equal
  contains (~)         : String contains
  starts_with (^)      : String starts with
  ends_with ($)        : String ends with
  greater_than (>)     : Numeric comparison
  less_than (<)        : Numeric comparison
  in                   : In list
  not_in               : Not in list
  
Logical Operators:
  &&  : AND (both conditions must match)
  ||  : OR (either condition can match)
  
Examples:
  severity equals "critical" && event_status equals "active"
  source_ip == "192.168.1.1" || source_ip == "10.0.0.1"
  event_name contains "database" && severity greater_than 5`;
