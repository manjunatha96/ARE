import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RuleStats } from "@/components/rules/rule-stats";
import { RuleList } from "@/components/rules/rule-list";
import { RuleActivity } from "@/components/rules/rule-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { Input } from "@/components/ui/input";

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Rule Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new rule: Database Recovery Rule",
    status: "success",
    module: "Rules",
  },
  {
    id: "2",
    action: "Rule Updated",
    user: "John Doe",
    timestamp: "2024-01-15 12:15:00",
    details: "Updated conditions for API Rate Limit Rule",
    status: "success",
    module: "Rules",
  },
  {
    id: "3",
    action: "Rule Disabled",
    user: "Admin",
    timestamp: "2024-01-14 16:45:00",
    details: "Disabled Legacy Rule - no longer in use",
    status: "success",
    module: "Rules",
  },
];

export default function RulesPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Rule Engine"
          description="Define rules that determine when and how remediation actions are triggered"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Rules" />
            </div>

            {/* Stats Cards */}
            <RuleStats />

            {/* Quick Actions and Recent Activity Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <QuickActions pageType="rules" />
              </div>
              <div className="lg:col-span-2">
                <RuleActivity />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <Input
                placeholder="Search rules by name, description, or status..."
                className="bg-background"
              />
            </div>

            {/* Rules List */}
            <RuleList />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
