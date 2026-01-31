'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";

interface PendingRule {
  id: string;
  name: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  createdBy: string;
  createdAt: Date;
}

interface ApprovalDashboardProps {
  pendingRules: PendingRule[];
  onApprove: (ruleId: string) => void;
  onReject: (ruleId: string, reason: string) => void;
}

export function ApprovalDashboard({ pendingRules, onApprove, onReject }: ApprovalDashboardProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

  const priorityColors = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-green-100 text-green-800 border-green-300",
  };

  const handleReject = (ruleId: string) => {
    if (rejectionReason.trim()) {
      onReject(ruleId, rejectionReason);
      setRejectionReason("");
      setSelectedRuleId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingRules.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {pendingRules.filter((r) => r.priority === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need immediate review</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oldest Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-foreground">
              {pendingRules.length > 0
                ? Math.ceil(
                    (Date.now() - pendingRules[0].createdAt.getTime()) / (1000 * 60 * 60 * 24)
                  ) + " days"
                : "—"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Since submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pending Rules for Approval</CardTitle>
          <CardDescription>Review and approve or reject rules submitted by team members</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRules.length === 0 ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                No pending approvals. All rules have been reviewed!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {pendingRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-start justify-between rounded-lg border border-border p-4 bg-muted/30"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{rule.name}</h3>
                      <Badge className={priorityColors[rule.priority]}>
                        {rule.priority.charAt(0).toUpperCase() + rule.priority.slice(1)} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Created by: {rule.createdBy}</span>
                      <span>{format(new Date(rule.createdAt), "PPp")}</span>
                    </div>
                  </div>

                  <div className="ml-4 flex gap-2">
                    {/* View Details */}
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>

                    {/* Approve Button */}
                    <Button
                      size="sm"
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => onApprove(rule.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </Button>

                    {/* Reject Dialog */}
                    <Dialog
                      open={selectedRuleId === rule.id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setSelectedRuleId(null);
                          setRejectionReason("");
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                          onClick={() => setSelectedRuleId(rule.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Reject Rule</DialogTitle>
                          <DialogDescription>
                            Provide a reason for rejecting this rule. The creator will receive this feedback.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">Rule: {rule.name}</Label>
                            <p className="text-xs text-muted-foreground">{rule.description}</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rejection-reason" className="text-sm font-medium text-foreground">
                              Rejection Reason
                            </Label>
                            <Textarea
                              id="rejection-reason"
                              placeholder="Explain why this rule is being rejected..."
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              className="bg-background min-h-24"
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => {
                                setSelectedRuleId(null);
                                setRejectionReason("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleReject(rule.id)}
                              disabled={!rejectionReason.trim()}
                            >
                              Confirm Rejection
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
