export type ExecutionTrigger = 
  | "always" 
  | "on_success" 
  | "on_failure" 
  | "on_condition";

export type DependencyOperator = "AND" | "OR";

export interface ActionDependency {
  stepNumber: number;
  trigger: ExecutionTrigger;
}

export interface ActionExecutionControl {
  actionId: string;
  dependencies: ActionDependency[];
  dependencyOperator: DependencyOperator;
}

export const EXECUTION_TRIGGER_OPTIONS = [
  { value: "always", label: "Always Execute", description: "Execute regardless of previous steps" },
  { value: "on_success", label: "On Previous Success", description: "Execute only if previous step succeeded" },
  { value: "on_failure", label: "On Previous Failure", description: "Execute only if previous step failed" },
  { value: "on_condition", label: "On Specific Steps", description: "Execute based on specific step conditions" },
];

export const getTriggerDescription = (trigger: ExecutionTrigger): string => {
  return EXECUTION_TRIGGER_OPTIONS.find(o => o.value === trigger)?.description || "";
};

export const generateExecutionRQL = (
  control: ActionExecutionControl,
  stepNames: Record<number, string>
): string => {
  if (control.dependencies.length === 0) {
    return "Always execute";
  }

  const conditions = control.dependencies.map(dep => {
    const stepName = stepNames[dep.stepNumber] || `Step ${dep.stepNumber}`;
    if (dep.trigger === "on_success") {
      return `${stepName} == success`;
    } else if (dep.trigger === "on_failure") {
      return `${stepName} == failure`;
    }
    return `${stepName} == executed`;
  });

  return conditions.join(` ${control.dependencyOperator} `);
};
