import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { EventTrendChart } from "@/components/dashboard/event-trend-chart";
import { SeverityDistribution } from "@/components/dashboard/severity-distribution";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { EventSummary } from "@/components/dashboard/event-summary";
import { MetadataFilter } from "@/components/dashboard/metadata-filter";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Dashboard"
          description="Real-time operational overview of the auto-remediation system"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12">
            {/* Metadata Filter */}
            
            <MetadataFilter />
            
            <StatsCards />
            
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <EventTrendChart />
              </div>
              <SeverityDistribution />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <EventSummary />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
