"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, RefreshCw, Pause, Settings2, Plus, Download } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface QuickActionsProps {
  pageType?: "dashboard" | "rules";
}

export function QuickActions({ pageType = "dashboard" }: QuickActionsProps) {
  const [autoRemediation, setAutoRemediation] = useState(true);

  // For rules page, show only Create Rule and Export Rule buttons
  if (pageType === "rules") {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>Rule management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/rules/new" className="block w-full">
            <Button className="w-full gap-2 justify-start">
              <Plus className="h-4 w-4" />
              Create Rule
            </Button>
          </Link>
          <Button variant="outline" className="w-full gap-2 justify-start bg-transparent">
            <Download className="h-4 w-4" />
            Export Rules
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default dashboard quick actions
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Quick Actions</CardTitle>
        <CardDescription>Common operations and controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="auto-remediation" className="text-sm font-medium text-foreground">
              Auto Remediation
            </Label>
            <p className="text-xs text-muted-foreground">
              Automatically execute remediation actions
            </p>
          </div>
          <Switch
            id="auto-remediation"
            checked={autoRemediation}
            onCheckedChange={setAutoRemediation}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <Play className="h-4 w-4" />
            Manual Trigger
          </Button>
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Sync Events
          </Button>
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <Pause className="h-4 w-4" />
            Pause Queue
          </Button>
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <Settings2 className="h-4 w-4" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
