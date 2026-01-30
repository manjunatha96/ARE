"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GeneralSettings() {
  return (
    <Card id="general" className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">General Settings</CardTitle>
        <CardDescription>Configure global remediation behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label className="text-foreground">Global Auto-Remediation</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Enable or disable auto-remediation system-wide
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label className="text-foreground">Maintenance Mode</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Pause all remediation actions during maintenance
            </p>
          </div>
          <Switch />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="queue-size" className="text-foreground">Max Queue Size</Label>
            <Input id="queue-size" type="number" defaultValue="1000" className="bg-background" />
            <p className="text-xs text-muted-foreground">Maximum pending actions in queue</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="concurrency" className="text-foreground">Max Concurrency</Label>
            <Input id="concurrency" type="number" defaultValue="10" className="bg-background" />
            <p className="text-xs text-muted-foreground">Maximum parallel executions</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="default-timeout" className="text-foreground">Default Action Timeout</Label>
          <Select defaultValue="30">
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">60 seconds</SelectItem>
              <SelectItem value="120">120 seconds</SelectItem>
              <SelectItem value="300">300 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label className="text-foreground">Enable Notifications</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Send alerts for critical events and failures
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
