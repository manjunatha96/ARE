'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApprovalDetails } from "@/components/rules/approval-details";
import Link from "next/link";
import { useState } from "react";

// Mock rule data - replace with real data from database
const mockRule = {
  id: "6",
  name: "Service Health Check",
  description: "Restart unhealthy services automatically",
  priority: "high",
  status: "draft",
  approvalStatus: "pending_approval" as const,
  createdBy: "alice.johnson@company.com",
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  conditions: {
    type: "AND",
    conditions: [
      { field: "service_status", operator: "equals", value: "unhealthy" },
      { field: "retry_count", operator: "less_than", value: "3" },
    ],
  },
  remediationSteps: 3,
  verificationEnabled: true,
  verificationSteps: 2,
  notificationsEnabled: true,
};

export default function RuleDetailsPage({ params }: { params: { id: string } }) {
  const [approvalStatus, setApprovalStatus] = useState(mockRule.approvalStatus);
  
  // TODO: Replace with actual permission check from user session/auth
  const isSuperAdmin = true; // For demo, set to true. In real app, check user role
  
  const rule = { ...mockRule, approvalStatus };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Link href="/rules">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{rule.name}</h1>
          <p className="text-muted-foreground mt-1">{rule.description}</p>
        </div>
      </div>

      {/* Approval Status Card */}
      <ApprovalDetails
        ruleId={rule.id}
        status={rule.approvalStatus}
        createdBy={rule.createdBy}
        createdAt={rule.createdAt}
        approvedBy={rule.approvalStatus === "approved" ? "admin@company.com" : undefined}
        approvedAt={rule.approvalStatus === "approved" ? new Date() : undefined}
        rejectionReason={
          rule.approvalStatus === "rejected"
            ? "Resource limits not properly defined. Please review the scaling thresholds and resubmit."
            : undefined
        }
        rejectedAt={rule.approvalStatus === "rejected" ? new Date() : undefined}
        isSuperAdmin={isSuperAdmin}
        onApprovalStatusChange={setApprovalStatus}
      />

      {/* Rule Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Rule Configuration</CardTitle>
          <CardDescription>Current rule settings and workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Priority</p>
              <Badge variant="secondary" className="capitalize w-fit">
                {rule.priority}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Status</p>
              <Badge variant="secondary" className="capitalize w-fit">
                {rule.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Remediation Steps</p>
              <p className="text-lg font-semibold text-foreground">{rule.remediationSteps}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Verification</p>
              <p className="text-lg font-semibold text-foreground">
                {rule.verificationEnabled ? `${rule.verificationSteps} steps` : "Disabled"}
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div className="border-t border-border pt-4 space-y-3">
            <h4 className="font-medium text-foreground">Trigger Conditions</h4>
            <div className="bg-muted/30 rounded-lg p-4 text-sm font-mono">
              <p className="text-muted-foreground">
                {rule.conditions.type} (
                {rule.conditions.conditions.map((c, i) => (
                  <span key={i}>
                    {c.field} {c.operator} {c.value}
                    {i < rule.conditions.conditions.length - 1 ? " AND " : ""}
                  </span>
                ))}
                )
              </p>
            </div>
          </div>

          {/* Actions Enabled */}
          <div className="border-t border-border pt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Remediation</p>
              <p className="text-sm text-foreground">Enabled • {rule.remediationSteps} steps</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Verification</p>
              <p className="text-sm text-foreground">
                {rule.verificationEnabled ? `Enabled • ${rule.verificationSteps} steps` : "Disabled"}
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Notifications</p>
            <Badge variant="secondary" className="capitalize">
              {rule.notificationsEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approval Notice */}
      {rule.approvalStatus === "pending_approval" && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800">
            This rule is currently awaiting approval from a Super Admin. Once approved, it will be available for execution.
          </AlertDescription>
        </Alert>
      )}

      {/* Not Approved Warning */}
      {rule.status === "active" && rule.approvalStatus !== "approved" && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            This rule cannot execute because it has not been approved. Please submit for approval or wait for admin review.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
