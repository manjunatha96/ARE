"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNumber: number;
  actionType: string;
  config: {
    actionName: string;
    retryPolicyId: string;
    onSuccessAction: "next_step" | "end_workflow" | string;
    onFailureAction: "next_step" | "end_workflow" | string | "recovery_step";
  };
  isExpanded?: boolean;
}

const retryPolicies = [
  { id: "1", name: "Critical Path Retry" },
  { id: "2", name: "Standard Retry" },
  { id: "3", name: "Conservative Retry" },
];

const apiEndpoints = [
  { id: "api1", name: "Production API Gateway" },
  { id: "api2", name: "Incident Management System" },
];

const scripts = [
  { id: "script1", name: "memory_cleanup.sh" },
  { id: "script2", name: "restart_service.py" },
];

interface RemediationWorkflowProps {
  steps: WorkflowStep[];
  onStepsChange: (steps: WorkflowStep[]) => void;
}

export function RemediationWorkflow({ steps, onStepsChange }: RemediationWorkflowProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(steps[0]?.id || null);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      actionType: "api_call",
      config: {
        actionName: "",
        retryPolicyId: "2",
        onSuccessAction: "next_step",
        onFailureAction: "end_workflow",
      },
      isExpanded: true,
    };
    onStepsChange([...steps, newStep]);
    setExpandedStep(newStep.id);
  };

  const deleteStep = (id: string) => {
    const updatedSteps = steps
      .filter((step) => step.id !== id)
      .map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    onStepsChange(updatedSteps);
  };

  const updateStep = (id: string, updates: Partial<WorkflowStep>) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, ...updates } : step
    );
    onStepsChange(updatedSteps);
  };

  const getActionOptions = (actionType: string) => {
    switch (actionType) {
      case "api_call":
        return apiEndpoints;
      case "script":
        return scripts;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Remediation Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Configure step-by-step remediation actions with success/failure handling
          </p>
        </div>
        <Button onClick={addStep} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <Card
            key={step.id}
            className="bg-card border-border overflow-hidden"
          >
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() =>
                setExpandedStep(expandedStep === step.id ? null : step.id)
              }
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedStep(expandedStep === step.id ? null : step.id);
                }}
              >
                {expandedStep === step.id ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              <div className="flex items-center gap-3 flex-1">
                <Badge variant="secondary" className="font-mono">
                  Step {step.stepNumber}
                </Badge>
                <span className="font-medium text-foreground capitalize">
                  {step.actionType.replace("_", " ")}
                </span>
                <span className="text-sm text-muted-foreground flex-1 truncate">
                  {step.config.actionName || "No action selected"}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteStep(step.id);
                }}
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {expandedStep === step.id && (
              <div className="border-t border-border p-6 space-y-6 bg-muted/20">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`action-type-${step.id}`} className="text-foreground text-sm font-medium">
                      Action Type
                    </Label>
                    <Select
                      value={step.actionType}
                      onValueChange={(value) => updateStep(step.id, { actionType: value })}
                    >
                      <SelectTrigger id={`action-type-${step.id}`} className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api_call">Call Outbound API</SelectItem>
                        <SelectItem value="script">Invoke Script/Command</SelectItem>
                        <SelectItem value="restart_service">Restart Service</SelectItem>
                        <SelectItem value="scale_resource">Scale Resource</SelectItem>
                        <SelectItem value="notify">Send Notification</SelectItem>
                        <SelectItem value="no_action">No Action (Monitor Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {step.actionType !== "no_action" && (
                    <div className="space-y-2">
                      <Label htmlFor={`action-config-${step.id}`} className="text-foreground text-sm font-medium">
                        {step.actionType === "api_call" && "API Endpoint"}
                        {step.actionType === "script" && "Script"}
                        {step.actionType === "restart_service" && "Service"}
                        {step.actionType === "scale_resource" && "Resource"}
                        {step.actionType === "notify" && "Channel"}
                      </Label>
                      <Select
                        value={step.config.actionName}
                        onValueChange={(value) =>
                          updateStep(step.id, {
                            config: { ...step.config, actionName: value },
                          })
                        }
                      >
                        <SelectTrigger id={`action-config-${step.id}`} className="bg-background">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {getActionOptions(step.actionType).map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`retry-policy-${step.id}`} className="text-foreground text-sm font-medium">
                      Retry Policy
                    </Label>
                    <Select
                      value={step.config.retryPolicyId}
                      onValueChange={(value) =>
                        updateStep(step.id, {
                          config: { ...step.config, retryPolicyId: value },
                        })
                      }
                    >
                      <SelectTrigger id={`retry-policy-${step.id}`} className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {retryPolicies.map((policy) => (
                          <SelectItem key={policy.id} value={policy.id}>
                            {policy.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`on-success-${step.id}`} className="text-foreground text-sm font-medium">
                      On Success
                    </Label>
                    <Select
                      value={step.config.onSuccessAction}
                      onValueChange={(value) =>
                        updateStep(step.id, {
                          config: { ...step.config, onSuccessAction: value },
                        })
                      }
                    >
                      <SelectTrigger id={`on-success-${step.id}`} className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="next_step">Go to Next Step</SelectItem>
                        <SelectItem value="end_workflow">End Workflow</SelectItem>
                        {steps.length > 1 && (
                          <>
                            {steps
                              .filter((s) => s.stepNumber > step.stepNumber)
                              .map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  Jump to Step {s.stepNumber}
                                </SelectItem>
                              ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`on-failure-${step.id}`} className="text-foreground text-sm font-medium">
                      On Failure
                    </Label>
                    <Select
                      value={step.config.onFailureAction}
                      onValueChange={(value) =>
                        updateStep(step.id, {
                          config: { ...step.config, onFailureAction: value },
                        })
                      }
                    >
                      <SelectTrigger id={`on-failure-${step.id}`} className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="end_workflow">End Workflow</SelectItem>
                        <SelectItem value="next_step">Skip to Next Step</SelectItem>
                        <SelectItem value="recovery_step">Run Recovery Action</SelectItem>
                        {steps.length > 1 && (
                          <>
                            {steps
                              .filter((s) => s.stepNumber > step.stepNumber)
                              .map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  Jump to Step {s.stepNumber}
                                </SelectItem>
                              ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {steps.length === 0 && (
        <Card className="bg-muted/30 border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
            <p className="text-muted-foreground text-sm">No steps added yet</p>
            <Button onClick={addStep} variant="outline" className="bg-transparent gap-2">
              <Plus className="h-4 w-4" />
              Add First Step
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
