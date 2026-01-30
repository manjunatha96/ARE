"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Policies",
    value: "8",
    icon: RefreshCw,
    description: "All retry policies",
  },
  {
    title: "Active Policies",
    value: "7",
    icon: CheckCircle,
    description: "Currently enabled",
  },
  {
    title: "Inactive Policies",
    value: "1",
    icon: XCircle,
    description: "Disabled policies",
  },
  {
    title: "Avg Retry Time",
    value: "2.5h",
    icon: Clock,
    description: "Last 7 days",
  },
];

export function RetryPolicyStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
