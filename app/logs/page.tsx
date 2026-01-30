import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { LogStats } from "@/components/logs/log-stats";
import { LogFilters } from "@/components/logs/log-filters";
import { LogList } from "@/components/logs/log-list";

export default function LogsPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Action Execution & Logs"
          description="View execution history and trace remediation actions"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12">
            <LogStats />
            <LogFilters />
            <LogList />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
