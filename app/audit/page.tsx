import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { AuditStats } from "@/components/audit/audit-stats";
import { AuditFilters } from "@/components/audit/audit-filters";
import { AuditList } from "@/components/audit/audit-list";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Audit Log Viewed",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Accessed audit logs",
    status: "success",
    module: "Audit",
  },
];

export default function AuditPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Audit & Compliance"
          description="Track all changes, interventions, and system activities"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Audit & Compliance" />
            </div>

            <AuditStats />
            <AuditFilters />
            <AuditList />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
