"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RetryPolicy {
  id: string;
  name: string;
  description: string;
  maxRetries: number;
  retryInterval: number;
  backoffStrategy: "linear" | "exponential" | "fixed";
  timeoutSeconds: number;
  isActive: boolean;
}

interface RetryPolicyFormProps {
  policy?: RetryPolicy;
  onSave: (policy: RetryPolicy) => void;
  onCancel: () => void;
}

export function RetryPolicyForm({ policy, onSave, onCancel }: RetryPolicyFormProps) {
  const [formData, setFormData] = useState<RetryPolicy>(
    policy || {
      id: Date.now().toString(),
      name: "",
      description: "",
      maxRetries: 3,
      retryInterval: 5,
      backoffStrategy: "exponential",
      timeoutSeconds: 30,
      isActive: true,
    }
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          {policy ? "Edit Retry Policy" : "Create Retry Policy"}
        </CardTitle>
        <CardDescription>
          Define how actions should retry on failure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="policy-name" className="text-foreground text-sm font-medium">
              Policy Name
            </Label>
            <Input
              id="policy-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Critical Path Retry"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-retries" className="text-foreground text-sm font-medium">
              Max Retries
            </Label>
            <Input
              id="max-retries"
              type="number"
              min="0"
              max="10"
              value={formData.maxRetries}
              onChange={(e) =>
                setFormData({ ...formData, maxRetries: parseInt(e.target.value) })
              }
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="retry-interval" className="text-foreground text-sm font-medium">
              Retry Interval (seconds)
            </Label>
            <Input
              id="retry-interval"
              type="number"
              min="1"
              max="300"
              value={formData.retryInterval}
              onChange={(e) =>
                setFormData({ ...formData, retryInterval: parseInt(e.target.value) })
              }
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeout" className="text-foreground text-sm font-medium">
              Timeout (seconds)
            </Label>
            <Input
              id="timeout"
              type="number"
              min="1"
              max="600"
              value={formData.timeoutSeconds}
              onChange={(e) =>
                setFormData({ ...formData, timeoutSeconds: parseInt(e.target.value) })
              }
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backoff-strategy" className="text-foreground text-sm font-medium">
            Backoff Strategy
          </Label>
          <Select
            value={formData.backoffStrategy}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                backoffStrategy: value as "linear" | "exponential" | "fixed",
              })
            }
          >
            <SelectTrigger id="backoff-strategy" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Interval</SelectItem>
              <SelectItem value="linear">Linear Backoff</SelectItem>
              <SelectItem value="exponential">Exponential Backoff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe when to use this retry policy..."
            className="bg-background min-h-20"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={() => onSave(formData)} className="flex-1">
            Save Policy
          </Button>
          <Button variant="outline" onClick={onCancel} className="bg-transparent">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
