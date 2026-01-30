"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, CheckCircle, XCircle, Timer } from "lucide-react";

const stats = [
  {
    title: "Total Executions",
    value: "8,234",
    icon: Play,
    description: "Last 24 hours",
  },
  {
    title: "Successful",
    value: "7,892",
    icon: CheckCircle,
    description: "95.8% success rate",
  },
  {
    title: "Failed",
    value: "342",
    icon: XCircle,
    description: "4.2% failure rate",
  },
  {
    title: "Avg Duration",
    value: "2.4s",
    icon: Timer,
    description: "Per execution",
  },
];

export function LogStats() {
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
