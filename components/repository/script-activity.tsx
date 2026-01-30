import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  action: string;
  script: string;
  user: string;
  timestamp: string;
  status: "success" | "failure";
}

const activities: Activity[] = [
  {
    id: "1",
    action: "Created",
    script: "Database Restart",
    user: "Admin",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    id: "2",
    action: "Executed",
    script: "Memory Cleanup",
    user: "System",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "3",
    action: "Updated",
    script: "Service Monitor",
    user: "John Doe",
    timestamp: "30 minutes ago",
    status: "success",
  },
];

export function ScriptActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-sm">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {activity.action}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {activity.script}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.user} • {activity.timestamp}
                </p>
              </div>
              <Badge
                variant={activity.status === "success" ? "default" : "destructive"}
                className="text-xs whitespace-nowrap ml-2"
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
