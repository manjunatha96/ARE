"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Events",
    value: "24,568",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    description: "Last 24 hours",
  },
  {
    title: "Successfully Processed",
    value: "23,421",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle,
    description: "95.3% success rate",
  },
  {
    title: "Failed Events",
    value: "847",
    change: "-3.1%",
    trend: "down",
    icon: AlertTriangle,
    description: "4.7% failure rate",
  },
  {
    title: "Pending Actions",
    value: "300",
    change: "+5.4%",
    trend: "up",
    icon: Clock,
    description: "In queue",
  },
];

export function StatsCards() {
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
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === "up" ? (
                <ArrowUpRight className={cn("h-3 w-3", stat.title === "Failed Events" ? "text-destructive" : "text-success")} />
              ) : (
                <ArrowDownRight className={cn("h-3 w-3", stat.title === "Failed Events" ? "text-success" : "text-destructive")} />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  stat.title === "Failed Events"
                    ? stat.trend === "down"
                      ? "text-success"
                      : "text-destructive"
                    : stat.trend === "up"
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
