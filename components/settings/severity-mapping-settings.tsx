"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityLevels = [
  {
    level: "Critical",
    color: "bg-destructive text-destructive-foreground",
    priority: 1,
    autoRemediate: true,
    responseTime: "Immediate",
  },
  {
    level: "High",
    color: "bg-warning text-warning-foreground",
    priority: 2,
    autoRemediate: true,
    responseTime: "< 5 min",
  },
  {
    level: "Medium",
    color: "bg-primary text-primary-foreground",
    priority: 3,
    autoRemediate: true,
    responseTime: "< 15 min",
  },
  {
    level: "Low",
    color: "bg-success text-success-foreground",
    priority: 4,
    autoRemediate: false,
    responseTime: "< 1 hour",
  },
];

export function SeverityMappingSettings() {
  return (
    <Card id="severity" className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Severity Mapping</CardTitle>
        <CardDescription>Configure severity levels and their behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {severityLevels.map((severity) => (
          <div
            key={severity.level}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className={cn("w-20 justify-center", severity.color)}>
                {severity.level}
              </Badge>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <Label className="text-xs text-muted-foreground">Priority</Label>
                  <p className="text-sm font-medium text-foreground">{severity.priority}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Auto-Remediate</Label>
                  <p className="text-sm font-medium text-foreground">
                    {severity.autoRemediate ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Target Response</Label>
                  <p className="text-sm font-medium text-foreground">{severity.responseTime}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        ))}

        <div className="pt-4">
          <Label className="text-foreground">Custom Severity Keywords</Label>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            Map keywords from event sources to severity levels
          </p>
          <div className="grid gap-3">
            <div className="flex gap-2">
              <Input placeholder="Keyword (e.g., FATAL, ERROR)" className="bg-background" />
              <Input placeholder="Maps to severity" className="bg-background w-40" />
              <Button variant="outline">Add</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
