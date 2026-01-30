"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RetryPolicyList } from "@/components/retry-policy/retry-policy-list";
import { RetryPolicyForm } from "@/components/retry-policy/retry-policy-form";
import { RetryPolicyStats } from "@/components/retry-policy/retry-policy-stats";
import { RetryPolicyActivity } from "@/components/retry-policy/retry-policy-activity";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download } from "lucide-react";

interface RetryPolicy {
  id: string;
  name: string;
  description: string;
  maxRetries: number;
  retryInterval: number;
  backoffStrategy: "linear" | "exponential" | "fixed";
  timeoutSeconds: number;
  isActive: boolean;
  recentActivity: string;
  usedBy: number;
}

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Policy Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new retry policy: Standard Retry",
    status: "success",
    module: "Retry Policies",
  },
  {
    id: "2",
    action: "Policy Updated",
    user: "John Doe",
    timestamp: "2024-01-15 12:15:00",
    details: "Updated backoff strategy for Aggressive Retry policy",
    status: "success",
    module: "Retry Policies",
  },
  {
    id: "3",
    action: "Policy Deleted",
    user: "Admin",
    timestamp: "2024-01-14 16:45:00",
    details: "Deleted Legacy retry policy",
    status: "success",
    module: "Retry Policies",
  },
];

export default function RetryPoliciesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<RetryPolicy | null>(null);

  const handleAddPolicy = () => {
    console.log("[v0] Add new retry policy");
    setEditingPolicy(null);
    setIsFormOpen(true);
  };

  const handleEditPolicy = (policy: RetryPolicy) => {
    console.log("[v0] Edit policy:", policy.id);
    setEditingPolicy(policy);
    setIsFormOpen(true);
  };

  const handleDeletePolicy = (id: string) => {
    console.log("[v0] Delete policy:", id);
  };

  const handleSave = (policy: Partial<RetryPolicy>) => {
    console.log("[v0] Saving policy:", policy);
    setIsFormOpen(false);
    setEditingPolicy(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingPolicy(null);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Retry Policies"
          description="Manage centralized retry configurations for use across rules and workflows"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Retry Policies" />
            </div>

            {/* Stats Cards */}
            <RetryPolicyStats />

            {/* Quick Actions and Recent Activity Row */}
            {!isFormOpen && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground text-sm">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={handleAddPolicy} 
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Create Policy
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                        Export Policies
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <RetryPolicyActivity />
                </div>
              </div>
            )}

            {/* Search Bar */}
            {!isFormOpen && (
              <div className="flex gap-2">
                <Input
                  placeholder="Search retry policies by name or description..."
                  className="bg-background"
                />
              </div>
            )}

            {isFormOpen ? (
              <RetryPolicyForm
                policy={editingPolicy}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <RetryPolicyList
                onAdd={handleAddPolicy}
                onEdit={handleEditPolicy}
                onDelete={handleDeletePolicy}
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
