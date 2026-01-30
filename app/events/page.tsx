import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { EventStats } from "@/components/events/event-stats";
import { EventList } from "@/components/events/event-list";
import { EventFilters } from "@/components/events/event-filters";
import { MetadataFilter } from "@/components/dashboard/metadata-filter";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { Input } from "@/components/ui/input";

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Events Processed",
    user: "System",
    timestamp: "2024-01-15 14:45:00",
    details: "Processed 156 events in last 24 hours",
    status: "success",
    module: "Events",
  },
  {
    id: "2",
    action: "Event Reprocessed",
    user: "Admin",
    timestamp: "2024-01-15 12:30:00",
    details: "Reprocessed failed event EVT-003",
    status: "success",
    module: "Events",
  },
  {
    id: "3",
    action: "Events Archived",
    user: "System",
    timestamp: "2024-01-14 00:00:00",
    details: "Archived 1250 old events",
    status: "success",
    module: "Events",
  },
];

export default function EventsPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Event Management"
          description="View incoming events, track execution steps, and manage remediation workflows"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - Inside Page */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Events" />
            </div>
            <MetadataFilter />
  
            <EventStats />
            {/* <EventFilters /> */}
            <div className="flex gap-2">
              <Input
                placeholder="Search events by name, source, or status..."
                className="bg-background"
              />
            </div>
            <EventList />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
