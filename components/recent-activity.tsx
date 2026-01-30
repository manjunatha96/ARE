"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Activity {
  id: string;
  action: string;
  target: string;
  user: string;
  timestamp: string;
  status?: "success" | "pending" | "failed";
}

interface RecentActivityProps {
  activities: Activity[];
}

const statusColors = {
  success: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Latest changes in this module</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between border-b border-border pb-3 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  {activity.status && (
                    <Badge
                      variant="outline"
                      className={cn("text-xs", statusColors[activity.status])}
                    >
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.target} by {activity.user}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
