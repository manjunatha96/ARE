"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "12,456",
    icon: Inbox,
    description: "Last 24 hours",
  },
  {
    title: "Processed",
    value: "11,892",
    icon: CheckCircle,
    description: "Successfully handled",
  },
  {
    title: "Pending",
    value: "342",
    icon: Clock,
    description: "Awaiting processing",
  },
  {
    title: "Errors",
    value: "222",
    icon: AlertTriangle,
    description: "Require attention",
  },
];

export function EventStats() {
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
