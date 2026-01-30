// Nested Condition Types Support
export type LogicalOperator = "AND" | "OR";

export interface SimpleCondition {
  type: "condition";
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface ConditionGroup {
  type: "group";
  id: string;
  operator: LogicalOperator;
  conditions: (SimpleCondition | ConditionGroup)[];
}

export type Condition = SimpleCondition | ConditionGroup;

// Helper functions
export function isSimpleCondition(item: Condition): item is SimpleCondition {
  return item.type === "condition";
}

export function isConditionGroup(item: Condition): item is ConditionGroup {
  return item.type === "group";
}

export function createSimpleCondition(
  field: string = "severity",
  operator: string = "equals",
  value: string = ""
): SimpleCondition {
  return {
    type: "condition",
    id: Date.now().toString(),
    field,
    operator,
    value,
  };
}

export function createConditionGroup(
  operator: LogicalOperator = "AND"
): ConditionGroup {
  return {
    type: "group",
    id: Date.now().toString(),
    operator,
    conditions: [createSimpleCondition()],
  };
}

// Convert to RQL
export function conditionToRQL(condition: Condition): string {
  if (isSimpleCondition(condition)) {
    return `${condition.field} ${condition.operator} "${condition.value}"`;
  }

  const subRQL = condition.conditions
    .map((c) => conditionToRQL(c))
    .join(` ${condition.operator} `);

  return `(${subRQL})`;
}

// Convert from flat array to nested groups
export function flatConditionsToNested(
  flatConditions: Array<{
    field: string;
    operator: string;
    value: string;
    logic: LogicalOperator;
  }>
): Condition {
  if (flatConditions.length === 0) {
    return createConditionGroup();
  }

  if (flatConditions.length === 1) {
    return createSimpleCondition(
      flatConditions[0].field,
      flatConditions[0].operator,
      flatConditions[0].value
    );
  }

  const rootOperator = flatConditions[0].logic;
  const conditions: Condition[] = [];

  for (const flat of flatConditions) {
    conditions.push(
      createSimpleCondition(flat.field, flat.operator, flat.value)
    );
  }

  return {
    type: "group",
    id: Date.now().toString(),
    operator: rootOperator,
    conditions,
  };
}
