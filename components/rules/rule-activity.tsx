"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    rule: "Database Connection Recovery",
    action: "Executed",
    status: "success",
    time: "2 min ago",
    user: "System",
  },
  {
    id: 2,
    rule: "Memory Threshold Alert",
    action: "Executed",
    status: "success",
    time: "15 min ago",
    user: "System",
  },
  {
    id: 3,
    rule: "API Rate Limiter",
    action: "Modified",
    status: "info",
    time: "1 hour ago",
    user: "John Doe",
  },
  {
    id: 4,
    rule: "SSL Certificate Renewal",
    action: "Disabled",
    status: "warning",
    time: "2 hours ago",
    user: "Jane Smith",
  },
  {
    id: 5,
    rule: "Disk Space Manager",
    action: "Executed",
    status: "failed",
    time: "3 hours ago",
    user: "System",
  },
];

const statusColors: Record<string, string> = {
  success: "bg-success text-success-foreground",
  failed: "bg-destructive text-destructive-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-primary text-primary-foreground",
};

export function RuleActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Rule executions and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 bg-muted/30"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{activity.rule}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className={cn("text-xs", statusColors[activity.status])}>
                    {activity.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground">by {activity.user}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
