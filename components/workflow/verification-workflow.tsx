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

interface VerificationStep {
  id: string;
  stepNumber: number;
  actionType: string;
  config: {
    actionName: string;
    expectedResult: string;
    timeoutSeconds: string;
  };
  isExpanded?: boolean;
}

const verificationActionTypes = [
  { id: "api_check", name: "API Health Check" },
  { id: "metric_check", name: "Metric Check" },
  { id: "log_check", name: "Log Verification" },
  { id: "service_status", name: "Service Status" },
  { id: "database_check", name: "Database Connectivity" },
];

interface VerificationWorkflowProps {
  steps: VerificationStep[];
  onStepsChange: (steps: VerificationStep[]) => void;
}

export function VerificationWorkflow({ steps, onStepsChange }: VerificationWorkflowProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(steps[0]?.id || null);

  const addStep = () => {
    const newStep: VerificationStep = {
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      actionType: "api_check",
      config: {
        actionName: "",
        expectedResult: "",
        timeoutSeconds: "30",
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

  const updateStep = (id: string, updates: Partial<VerificationStep>) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, ...updates } : step
    );
    onStepsChange(updatedSteps);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Verification Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Configure step-by-step verification checks after remediation
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
                  {verificationActionTypes.find(t => t.id === step.actionType)?.name || step.actionType.replace("_", " ")}
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
                      Verification Type
                    </Label>
                    <Select
                      value={step.actionType}
                      onValueChange={(value) => updateStep(step.id, { actionType: value })}
                    >
                      <SelectTrigger id={`action-type-${step.id}`} className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {verificationActionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`action-name-${step.id}`} className="text-foreground text-sm font-medium">
                      {step.actionType === "api_check" && "API Endpoint"}
                      {step.actionType === "metric_check" && "Metric Name"}
                      {step.actionType === "log_check" && "Log Source"}
                      {step.actionType === "service_status" && "Service Name"}
                      {step.actionType === "database_check" && "Database"}
                    </Label>
                    <Input
                      id={`action-name-${step.id}`}
                      placeholder="Enter target"
                      value={step.config.actionName}
                      onChange={(e) =>
                        updateStep(step.id, {
                          config: { ...step.config, actionName: e.target.value },
                        })
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`expected-result-${step.id}`} className="text-foreground text-sm font-medium">
                    Expected Result
                  </Label>
                  <Input
                    id={`expected-result-${step.id}`}
                    placeholder="e.g., Status 200, CPU usage < 70%, Service running"
                    value={step.config.expectedResult}
                    onChange={(e) =>
                      updateStep(step.id, {
                        config: { ...step.config, expectedResult: e.target.value },
                      })
                    }
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`timeout-${step.id}`} className="text-foreground text-sm font-medium">
                    Timeout (seconds)
                  </Label>
                  <Input
                    id={`timeout-${step.id}`}
                    type="number"
                    min="5"
                    max="300"
                    value={step.config.timeoutSeconds}
                    onChange={(e) =>
                      updateStep(step.id, {
                        config: { ...step.config, timeoutSeconds: e.target.value },
                      })
                    }
                    className="bg-background"
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {steps.length === 0 && (
        <Card className="bg-muted/30 border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
            <p className="text-muted-foreground text-sm">No verification steps added yet</p>
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
