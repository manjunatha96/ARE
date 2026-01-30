"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    policy: "Standard Retry",
    action: "Created",
    status: "success",
    time: "3 hours ago",
    user: "Admin",
  },
  {
    id: 2,
    policy: "Exponential Backoff",
    action: "Updated",
    status: "success",
    time: "6 hours ago",
    user: "John Doe",
  },
  {
    id: 3,
    policy: "Aggressive Retry",
    action: "Modified",
    status: "info",
    time: "1 day ago",
    user: "Jane Smith",
  },
  {
    id: 4,
    policy: "Legacy Policy",
    action: "Disabled",
    status: "warning",
    time: "2 days ago",
    user: "Admin",
  },
  {
    id: 5,
    policy: "Fast Track",
    action: "Created",
    status: "success",
    time: "5 days ago",
    user: "System",
  },
];

const statusColors: Record<string, string> = {
  success: "bg-success text-success-foreground",
  failed: "bg-destructive text-destructive-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-primary text-primary-foreground",
};

export function RetryPolicyActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Policy changes and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 bg-muted/30"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{activity.policy}</p>
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
