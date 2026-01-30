"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, Save, ArrowLeft, Play, AlertTriangle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { validateRQL, conditionsToRQL, RQL_SYNTAX_HELP } from "@/lib/rql-validator";
import { Condition, ConditionGroup, createConditionGroup, createSimpleCondition, conditionToRQL } from "@/lib/condition-types";
import { NestedConditionRenderer } from "./nested-condition-renderer";
import { RemediationWorkflow } from "@/components/workflow/remediation-workflow";
import { VerificationWorkflow } from "@/components/workflow/verification-workflow";
import { ActionExecutionControl } from "@/lib/action-control";
import { scriptOptions, apiOptions } from "@/lib/config-options";

interface Action {
  id: string;
  type: string;
  config: string;
}

const EXECUTION_TRIGGER_OPTIONS = [
  { value: "on_success", label: "On Success" },
  { value: "on_failure", label: "On Failure" },
]; // Declare EXECUTION_TRIGGER_OPTIONS

export function RuleBuilder() {
  const router = useRouter();
  const [conditionGroup, setConditionGroup] = useState<Condition | ConditionGroup>(
    createConditionGroup()
  );
  const [workflowSteps, setWorkflowSteps] = useState<any[]>([
    {
      id: "1",
      stepNumber: 1,
      actionType: "api_call",
      config: {
        actionName: "",
        retryPolicyId: "2",
        onSuccessAction: "next_step",
        onFailureAction: "end_workflow",
      },
    },
  ]);
  const [useRQL, setUseRQL] = useState(false);
  const [rqlQuery, setRqlQuery] = useState("");
  const [rqlErrors, setRqlErrors] = useState<string[]>([]);
  const [showRQLHelp, setShowRQLHelp] = useState(false);
  const [actions, setActions] = useState<Action[]>([
    { id: "1", type: "api_call", config: "" },
  ]);
  const [actionTypes, setActionTypes] = useState<{ [key: string]: string }>({});
  const [actionConfig, setActionConfig] = useState<{ [key: string]: string }>({});
  const [executionControls, setExecutionControls] = useState<{ [key: string]: ActionExecutionControl }>({});
  // Rule Silence Configuration (Mandatory)
  const [silenceEnabled, setSilenceEnabled] = useState(true);
  const [silenceDuration, setSilenceDuration] = useState("30");
  const [silenceUnit, setSilenceUnit] = useState<"minutes" | "hours" | "days">("minutes");
  // Unified Notification Configuration
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState("");
  const [notificationTrigger, setNotificationTrigger] = useState<{ remediation: "final_step_fail" | "any_fail" | "all_fail", verification: "final_step_fail" | "any_fail" | "all_fail" }>({ remediation: "all_fail", verification: "all_fail" });
  const [showNewNotificationForm, setShowNewNotificationForm] = useState(false);
  // Verification Workflow
  const [verificationEnabled, setVerificationEnabled] = useState(false);
  const [verificationSteps, setVerificationSteps] = useState<any[]>([
    {
      id: "v1",
      stepNumber: 1,
      actionType: "api_check",
      config: {
        actionName: "",
        expectedResult: "",
        timeoutSeconds: "30",
      },
    },
  ]);

  const handleRQLChange = (query: string) => {
    setRqlQuery(query);
    if (query.trim()) {
      const result = validateRQL(query);
      setRqlErrors(result.errors);
    } else {
      setRqlErrors([]);
    }
  };

  const convertRQLToUI = () => {
    const result = validateRQL(rqlQuery);
    if (result.valid) {
      // For now, we'll just reset to default group
      // TODO: Implement RQL to nested condition parsing
      setConditionGroup(createConditionGroup());
      setUseRQL(false);
      setRqlQuery("");
      setRqlErrors([]);
    }
  };

  const getConfigOptions = (actionType: string) => {
    switch (actionType) {
      case "api_call":
        return apiOptions;
      case "script":
        return scriptOptions;
      default:
        return [];
    }
  };

  const removeAction = (actionId: string) => {
    setActions(actions.filter(action => action.id !== actionId));
    delete actionTypes[actionId];
    delete actionConfig[actionId];
    delete executionControls[actionId];
  };

  const addAction = () => {
    const newAction = { id: `${actions.length + 1}`, type: "api_call", config: "" };
    setActions([...actions, newAction]);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Link href="/rules">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1" />
        <Button variant="outline" className="gap-2 bg-transparent">
          <Play className="h-4 w-4" />
          Test Rule
        </Button>
        <Button className="gap-2" onClick={() => router.push("/rules/confirm")}>
          <Save className="h-4 w-4" />
          Save Rule
        </Button>
      </div>

      {/* Basic Details */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Basic Details</CardTitle>
          <CardDescription>Configure the basic rule information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground text-sm font-medium">Rule Name</Label>
              <Input id="name" placeholder="Enter rule name" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-foreground text-sm font-medium">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this rule does"
              className="bg-background min-h-24"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-foreground">Start Date</Label>
              <Input id="start-date" type="date" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-foreground">End Date</Label>
              <Input id="end-date" type="date" className="bg-background" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condition Builder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-foreground">Conditions Group</CardTitle>
              <CardDescription>Define when this rule should trigger</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">RQL Mode</Label>
              <Switch
                checked={useRQL}
                onCheckedChange={setUseRQL}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {useRQL ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-foreground text-sm font-medium">RQL Query</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => setShowRQLHelp(!showRQLHelp)}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={rqlQuery}
                onChange={(e) => handleRQLChange(e.target.value)}
                placeholder='Example: (severity equals "critical" && event_status equals "active") || severity equals "high"'
                className="bg-background font-mono text-sm min-h-24"
              />
              
              {showRQLHelp && (
                <Alert className="bg-muted border-border">
                  <HelpCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
                    {RQL_SYNTAX_HELP}
                  </AlertDescription>
                </Alert>
              )}

              {rqlErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-inside space-y-1">
                      {rqlErrors.map((error, idx) => (
                        <li key={idx} className="text-sm">{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={convertRQLToUI}
                  disabled={rqlErrors.length > 0 || !rqlQuery.trim()}
                  className="flex-1"
                >
                  Convert to Visual Builder
                </Button>
                <Button variant="outline" onClick={() => setUseRQL(false)} className="bg-transparent">
                  Back to Builder
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <NestedConditionRenderer
                condition={conditionGroup}
                onUpdate={setConditionGroup}
                onDelete={() => setConditionGroup(createConditionGroup())}
                canDelete={false}
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const rql = conditionToRQL(conditionGroup);
                    setRqlQuery(rql);
                    setUseRQL(true);
                  }}
                  className="gap-2 bg-transparent flex-1"
                >
                  View RQL
                </Button>
                <Button variant="outline" onClick={() => setShowRQLHelp(!showRQLHelp)} className="gap-2 bg-transparent">
                  <HelpCircle className="h-4 w-4" />
                  Syntax Help
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Remediation Workflow */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Remediation Workflow</CardTitle>
          <CardDescription>Define the remediation steps to execute when rule triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RemediationWorkflow 
            steps={workflowSteps} 
            onStepsChange={setWorkflowSteps}
          />
          
          {/* Remediation Workflow Notifications */}
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Notifications</h4>
              <Switch
                checked={notificationEnabled}
                onCheckedChange={setNotificationEnabled}
              />
            </div>
            {notificationEnabled && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">Notification Trigger</Label>
                  <Select value={notificationTrigger.remediation} onValueChange={(value: any) => setNotificationTrigger({ ...notificationTrigger, remediation: value })}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="final_step_fail">Final Step Fails</SelectItem>
                      <SelectItem value="any_fail">Any Step Fails</SelectItem>
                      <SelectItem value="all_fail">All Steps Fail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">Notification Destination</Label>
                  <div className="flex gap-2">
                    <Select value={selectedNotification} onValueChange={setSelectedNotification}>
                      <SelectTrigger className="bg-background flex-1">
                        <SelectValue placeholder="Choose existing notification..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email_default">Email - Admin Team</SelectItem>
                        <SelectItem value="email_oncall">Email - On-Call Engineer</SelectItem>
                        <SelectItem value="webhook_slack">Webhook - Slack</SelectItem>
                        <SelectItem value="webhook_pagerduty">Webhook - PagerDuty</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => setShowNewNotificationForm(!showNewNotificationForm)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {showNewNotificationForm && (
                  <div className="space-y-3 rounded-lg border border-dashed border-border p-4 bg-muted/30">
                    <h4 className="text-sm font-medium text-foreground">Create New Notification</h4>
                    <div className="grid gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Notification Name</Label>
                        <Input placeholder="e.g., Critical Alert Email" className="bg-background text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Type</Label>
                        <Select defaultValue="email">
                          <SelectTrigger className="bg-background text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Email / Webhook URL</Label>
                        <Input placeholder="Enter email or webhook URL" className="bg-background text-sm" />
                      </div>
                      <Button size="sm" className="gap-2">
                        <Save className="h-3 w-3" />
                        Save Notification
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verification Workflow */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Verification Workflow</CardTitle>
              <CardDescription>Verify that remediation was successful</CardDescription>
            </div>
            <Switch
              checked={verificationEnabled}
              onCheckedChange={setVerificationEnabled}
            />
          </div>
        </CardHeader>
        {verificationEnabled && (
          <CardContent className="space-y-6 border-t border-border pt-6">
            <VerificationWorkflow 
              steps={verificationSteps} 
              onStepsChange={setVerificationSteps}
            />
            
            {/* Verification Workflow Notifications */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Notifications</h4>
                <Switch
                  checked={notificationEnabled}
                  onCheckedChange={setNotificationEnabled}
                />
              </div>
              {notificationEnabled && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">Notification Trigger</Label>
                    <Select value={notificationTrigger.verification} onValueChange={(value: any) => setNotificationTrigger({ ...notificationTrigger, verification: value })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="final_step_fail">Final Step Fails</SelectItem>
                        <SelectItem value="any_fail">Any Step Fails</SelectItem>
                        <SelectItem value="all_fail">All Steps Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">Notification Destination</Label>
                    <div className="flex gap-2">
                      <Select value={selectedNotification} onValueChange={setSelectedNotification}>
                        <SelectTrigger className="bg-background flex-1">
                          <SelectValue placeholder="Choose existing notification..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email_default">Email - Admin Team</SelectItem>
                          <SelectItem value="email_oncall">Email - On-Call Engineer</SelectItem>
                          <SelectItem value="webhook_slack">Webhook - Slack</SelectItem>
                          <SelectItem value="webhook_pagerduty">Webhook - PagerDuty</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => setShowNewNotificationForm(!showNewNotificationForm)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {showNewNotificationForm && (
                    <div className="space-y-3 rounded-lg border border-dashed border-border p-4 bg-muted/30">
                      <h4 className="text-sm font-medium text-foreground">Create New Notification</h4>
                      <div className="grid gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Notification Name</Label>
                          <Input placeholder="e.g., Critical Alert Email" className="bg-background text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Type</Label>
                          <Select defaultValue="email">
                            <SelectTrigger className="bg-background text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="webhook">Webhook</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Email / Webhook URL</Label>
                          <Input placeholder="Enter email or webhook URL" className="bg-background text-sm" />
                        </div>
                        <Button size="sm" className="gap-2">
                          <Save className="h-3 w-3" />
                          Save Notification
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Rule Silence Configuration - MANDATORY */}
      <Card className="bg-card border-border border-orange-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Rule Silence Configuration</CardTitle>
              <CardDescription>Prevent rule from triggering too frequently (Mandatory)</CardDescription>
            </div>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-600">Required</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">Silence Duration</Label>
              <Input
                type="number"
                min="1"
                value={silenceDuration}
                onChange={(e) => setSilenceDuration(e.target.value)}
                placeholder="Enter duration"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">Time Unit</Label>
              <Select value={silenceUnit} onValueChange={(value: any) => setSilenceUnit(value)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">Status</Label>
              <div className="flex items-center pt-2">
                <Badge className="bg-green-500/20 text-green-700">Active</Badge>
                <p className="text-xs text-muted-foreground ml-2">Auto-enabled</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Rule will be temporarily silenced for {silenceDuration} {silenceUnit} after each successful execution to prevent noise from duplicate triggers.</p>
        </CardContent>
      </Card>


    </div>
  );
}
