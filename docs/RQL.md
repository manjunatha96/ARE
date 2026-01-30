# RQL (Remediation Query Language)

RQL is a simple query language designed for defining rule conditions in the Auto Remediation Engine. It provides an alternative to the visual condition builder for advanced users who prefer writing queries directly.

## Overview

- **Single Condition Group**: RQL queries support one logical group of conditions connected by AND/OR operators
- **Multiple Conditions**: You can combine multiple conditions using logical operators
- **Field-Operator-Value Format**: Each condition follows the pattern `field operator value`

## Syntax

### Basic Structure

```
field operator "value"
field operator value
```

### Operators

| Operator | Symbol | Description |
|----------|--------|-------------|
| equals | == | Exact match |
| not_equals | != | Not equal |
| contains | ~ | String contains substring |
| starts_with | ^ | String starts with |
| ends_with | $ | String ends with |
| greater_than | > | Numeric greater than |
| less_than | < | Numeric less than |
| in | in | Value is in list |
| not_in | not_in | Value is not in list |

### Logical Operators

- `&&` : AND - Both conditions must match
- `||` : OR - Either condition can match

## Valid Fields

- `event_name` - Name of the event
- `event_status` - Status of the event
- `severity` - Severity level
- `source_ip` - Source IP address
- `group_key` - Group identifier
- `event_source` - Source of the event
- `timestamp` - Event timestamp
- `duration` - Duration value
- `count` - Count value

## Examples

### Simple Condition
```
severity equals "critical"
```

### Multiple Conditions (AND)
```
severity equals "critical" && event_status equals "active"
```

### Multiple Conditions (OR)
```
source_ip == "192.168.1.1" || source_ip == "10.0.0.1"
```

### Complex Query
```
severity equals "critical" && event_name contains "database" && event_status equals "active"
```

### Using Symbols
```
severity == "high" && count > 5 || duration < 60
```

## Type Conversions

### String Values
String values should be quoted when they contain spaces:
```
event_name contains "database error"
```

Unquoted values are treated as-is:
```
severity equals critical
```

### Numeric Values
Numeric comparisons work with `>`, `<`, `>=`, `<=`:
```
count greater_than 10
duration less_than 300
```

## Error Handling

RQL validation will catch:
- Invalid field names
- Unknown operators
- Malformed syntax
- Empty values
- Incorrect quote usage

The system provides detailed error messages to help you fix issues.

## Conversion Between RQL and Visual Builder

You can switch between:
1. **RQL Mode**: Write queries directly
2. **Visual Builder Mode**: Use dropdown selectors

Conversion preserves your conditions:
- Visual Builder → RQL: Click "Switch to RQL"
- RQL → Visual Builder: Click "Convert to Visual Builder"

## Best Practices

1. **Readability**: Format complex queries on multiple lines conceptually
2. **Quoting**: Always quote string values with spaces
3. **Operators**: Use symbolic operators (`==`, `!=`, etc.) for brevity or full names for clarity
4. **Logic**: Start simple and build up complexity gradually
5. **Testing**: Use the "Test Rule" feature to validate your conditions work as expected
