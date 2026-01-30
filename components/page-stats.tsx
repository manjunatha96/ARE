"use client";

import React from "react"

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCard {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "default" | "success" | "warning" | "destructive" | "info";
}

interface PageStatsProps {
  stats: StatCard[];
}

const colorClasses = {
  default: "bg-chart-1/10 border-chart-1/30",
  success: "bg-success/10 border-success/30",
  warning: "bg-warning/10 border-warning/30",
  destructive: "bg-destructive/10 border-destructive/30",
  info: "bg-chart-5/10 border-chart-5/30",
};

const textColorClasses = {
  default: "text-chart-1",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  info: "text-chart-5",
};

export function PageStats({ stats }: PageStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "border transition-colors",
            colorClasses[stat.color || "default"]
          )}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              {stat.icon && (
                <div
                  className={cn(
                    "rounded-lg p-2",
                    textColorClasses[stat.color || "default"]
                  )}
                >
                  {stat.icon}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
