"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle, ArrowLeft, Send } from "lucide-react";
import { Suspense } from "react";

function RuleConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // In a real app, this would come from state or query params
  const ruleData = {
    name: "Database Connection Recovery",
    description: "Automatically recover from database connection timeout errors",
    priority: "critical",
    status: "enabled",
    ruleType: "event-based",
    conditions: {
      type: "AND",
      rules: [
        { field: "event_source", operator: "equals", value: "database" },
        { field: "error_type", operator: "contains", value: "timeout" },
        { field: "severity", operator: "equals", value: "critical" },
      ],
    },
    workflow: {
      steps: [
        {
          stepNumber: 1,
          name: "Log Event",
          type: "log",
          config: {
            logLevel: "ERROR",
            includePayload: true,
          },
        },
        {
          stepNumber: 2,
          name: "Execute Recovery Script",
          type: "script",
          config: {
            scriptName: "database_restart.sh",
            timeout: 300,
            retryPolicy: "standard-retry",
          },
        },
        {
          stepNumber: 3,
          name: "Verify Connection",
          type: "api_call",
          config: {
            apiEndpoint: "health-check",
            retryPolicy: "aggressive-retry",
            onSuccess: "notify_success",
            onFailure: "escalate_alert",
          },
        },
        {
          stepNumber: 4,
          name: "Send Notification",
          type: "notification",
          config: {
            channel: "slack",
            template: "recovery_complete",
          },
        },
      ],
    },
    validation: {
      requireEventSource: true,
      requireEventName: false,
      maxPayloadSize: 10240,
    },
  };

  const handleApprove = () => {
    router.push("/rules");
  };

  const handleEdit = () => {
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Approval Status */}
      <Card className="bg-success/10 border-success">
        <CardContent className="pt-6 flex items-center gap-4">
          <Check className="h-6 w-6 text-success" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Configuration Review Complete</h3>
            <p className="text-sm text-muted-foreground">All settings are valid and ready to deploy</p>
          </div>
        </CardContent>
      </Card>

      {/* Rule Details Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Rule Details</CardTitle>
          <CardDescription>Basic rule configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rule Name</p>
              <p className="text-foreground font-semibold mt-1">{ruleData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rule Type</p>
              <p className="text-foreground font-semibold mt-1 capitalize">{ruleData.ruleType.replace("-", " ")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Priority</p>
              <Badge className="mt-1 capitalize bg-destructive text-destructive-foreground">
                {ruleData.priority}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className="mt-1 capitalize bg-success text-success-foreground">
                {ruleData.status}
              </Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-foreground mt-2">{ruleData.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Trigger Conditions Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Trigger Conditions</CardTitle>
          <CardDescription>Rule will execute when these conditions are met</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-mono text-foreground">
              <span className="text-chart-2">event_source</span>
              {" "}equals{" "}
              <span className="text-warning">"database"</span>
              {" "}AND{" "}
            </p>
            <p className="text-sm font-mono text-foreground mt-1">
              <span className="text-chart-2">error_type</span>
              {" "}contains{" "}
              <span className="text-warning">"timeout"</span>
              {" "}AND{" "}
            </p>
            <p className="text-sm font-mono text-foreground mt-1">
              <span className="text-chart-2">severity</span>
              {" "}equals{" "}
              <span className="text-warning">"critical"</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Rule will only trigger when ALL conditions are satisfied
          </p>
        </CardContent>
      </Card>

      {/* Remediation Workflow Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Remediation Workflow</CardTitle>
          <CardDescription>{ruleData.workflow.steps.length} steps configured</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ruleData.workflow.steps.map((step, idx) => (
            <div key={step.stepNumber} className="relative">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {step.stepNumber}
                  </div>
                  {idx < ruleData.workflow.steps.length - 1 && (
                    <div className="h-12 w-0.5 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{step.name}</p>
                    <Badge variant="outline" className="capitalize">
                      {step.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 space-y-1">
                    {Object.entries(step.config).map(([key, value]) => (
                      <p key={key}>
                        {key.replace("_", " ")}: <span className="text-foreground font-mono">{String(value)}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Validation Rules Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Validation Rules</CardTitle>
          <CardDescription>Event payload validation requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Event Source Required</p>
                <p className="text-sm text-muted-foreground">Event must have a source field</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Event Name Optional</p>
                <p className="text-sm text-muted-foreground">Event name field is not required</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Max Payload Size: 10 KB</p>
                <p className="text-sm text-muted-foreground">Event payload cannot exceed 10,240 bytes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 sticky bottom-0 bg-background/95 backdrop-blur p-4 rounded-lg border border-border">
        <Button
          variant="outline"
          onClick={handleEdit}
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
        <div className="flex-1" />
        <Button
          onClick={handleApprove}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Deploy Rule
        </Button>
      </div>
    </div>
  );
}

export function RuleConfirmation() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading confirmation...</div>}>
      <RuleConfirmationContent />
    </Suspense>
  );
}
