"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, XCircle, Zap } from "lucide-react";

const stats = [
  {
    title: "Total Rules",
    value: "48",
    icon: FileText,
    description: "All configured rules",
  },
  {
    title: "Active Rules",
    value: "42",
    icon: CheckCircle,
    description: "Currently enabled",
  },
  {
    title: "Disabled Rules",
    value: "6",
    icon: XCircle,
    description: "Temporarily inactive",
  },
  {
    title: "Recently Triggered",
    value: "156",
    icon: Zap,
    description: "Last 24 hours",
  },
];

export function RuleStats() {
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
