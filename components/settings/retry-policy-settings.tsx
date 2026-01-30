"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RetryPolicySettings() {
  return (
    <Card id="retry" className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Default Retry Policies</CardTitle>
        <CardDescription>Configure default retry behavior for remediation actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="max-retries" className="text-foreground">Max Retries</Label>
            <Input id="max-retries" type="number" defaultValue="3" min="0" max="10" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initial-delay" className="text-foreground">Initial Delay (ms)</Label>
            <Input id="initial-delay" type="number" defaultValue="1000" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-delay" className="text-foreground">Max Delay (ms)</Label>
            <Input id="max-delay" type="number" defaultValue="30000" className="bg-background" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="backoff" className="text-foreground">Backoff Strategy</Label>
            <Select defaultValue="exponential">
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="exponential">Exponential</SelectItem>
                <SelectItem value="fixed">Fixed Interval</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="multiplier" className="text-foreground">Backoff Multiplier</Label>
            <Input id="multiplier" type="number" defaultValue="2" step="0.5" min="1" className="bg-background" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="failure-behavior" className="text-foreground">On Max Retries Exceeded</Label>
          <Select defaultValue="alert">
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">Silent Failure</SelectItem>
              <SelectItem value="log">Log Only</SelectItem>
              <SelectItem value="alert">Alert Team</SelectItem>
              <SelectItem value="escalate">Escalate to On-Call</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button>Save Retry Policy</Button>
        </div>
      </CardContent>
    </Card>
  );
}
