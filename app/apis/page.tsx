'use client';

import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { ApiStats } from "@/components/apis/api-stats";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import dynamic from "next/dynamic";

const ApiList = dynamic(() => import("@/components/apis/api-list").then(mod => ({ default: mod.ApiList })), {
  ssr: false,
});

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "API Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new API integration",
    status: "success",
    module: "APIs",
  },
];

export default function ApisPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Outbound API Management"
          description="Manage integrations used by remediation actions"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Outbound APIs" />
            </div>

            <ApiStats />
            <ApiList />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
