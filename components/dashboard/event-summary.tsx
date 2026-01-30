"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const summaryData = [
  { label: "Application Events", count: 8456, percentage: 35 },
  { label: "Database Events", count: 6234, percentage: 25 },
  { label: "System Events", count: 5678, percentage: 23 },
  { label: "Network Events", count: 4200, percentage: 17 },
];

export function EventSummary() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Event Summary</CardTitle>
        <CardDescription>Events by source type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {summaryData.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="text-muted-foreground">{item.count.toLocaleString()}</span>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
