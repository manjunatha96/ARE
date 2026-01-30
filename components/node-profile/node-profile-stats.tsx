"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, CheckCircle, XCircle, Settings } from "lucide-react";

const stats = [
  {
    title: "Total Profiles",
    value: "12",
    icon: Server,
    description: "All node profiles",
  },
  {
    title: "Active Nodes",
    value: "9",
    icon: CheckCircle,
    description: "Currently enabled",
  },
  {
    title: "Inactive Nodes",
    value: "3",
    icon: XCircle,
    description: "Temporarily disabled",
  },
  {
    title: "Configured Policies",
    value: "28",
    icon: Settings,
    description: "Security rules",
  },
];

export function NodeProfileStats() {
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
