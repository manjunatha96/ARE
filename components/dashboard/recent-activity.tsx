"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    event: "Database connection timeout",
    source: "MySQL Primary",
    action: "Auto-restart initiated",
    status: "success",
    time: "2 min ago",
    severity: "critical",
  },
  {
    id: 2,
    event: "High memory usage detected",
    source: "App Server 01",
    action: "Memory cleanup executed",
    status: "success",
    time: "5 min ago",
    severity: "high",
  },
  {
    id: 3,
    event: "API rate limit exceeded",
    source: "Payment Gateway",
    action: "Throttling applied",
    status: "pending",
    time: "8 min ago",
    severity: "medium",
  },
  {
    id: 4,
    event: "SSL certificate expiring",
    source: "Load Balancer",
    action: "Renewal triggered",
    status: "failed",
    time: "12 min ago",
    severity: "high",
  },
  {
    id: 5,
    event: "Disk space warning",
    source: "Storage Node 03",
    action: "Cleanup scheduled",
    status: "success",
    time: "15 min ago",
    severity: "low",
  },
];

const severityColors: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-success text-success-foreground",
};

const statusColors: Record<string, string> = {
  success: "text-success",
  pending: "text-warning",
  failed: "text-destructive",
};

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Latest remediation actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-border p-3 bg-muted/30"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">{activity.event}</span>
                  <Badge variant="secondary" className={cn("text-xs", severityColors[activity.severity])}>
                    {activity.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Source: {activity.source} | Action: {activity.action}
                </p>
              </div>
              <div className="text-right">
                <span className={cn("text-xs font-medium capitalize", statusColors[activity.status])}>
                  {activity.status}
                </span>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
