"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

const allowedIps = [
  { ip: "192.168.1.0/24", description: "Internal network", type: "allow" },
  { ip: "10.0.0.0/8", description: "VPN subnet", type: "allow" },
  { ip: "203.0.113.50", description: "Monitoring server", type: "allow" },
];

const blockedIps = [
  { ip: "45.33.32.0/24", description: "Known malicious range", type: "block" },
  { ip: "198.51.100.23", description: "Suspicious activity", type: "block" },
];

export function IpAllowlistSettings() {
  return (
    <Card id="security" className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">IP Allowlist / Blocklist</CardTitle>
        <CardDescription>Manage IP addresses that can interact with the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label className="text-foreground">Enable IP Filtering</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Restrict access based on IP addresses
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Allowed IPs</Label>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="h-3 w-3" />
              Add IP
            </Button>
          </div>
          <div className="space-y-2">
            {allowedIps.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border p-3 bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    Allow
                  </Badge>
                  <span className="font-mono text-sm text-foreground">{item.ip}</span>
                  <span className="text-sm text-muted-foreground">- {item.description}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Blocked IPs</Label>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="h-3 w-3" />
              Add IP
            </Button>
          </div>
          <div className="space-y-2">
            {blockedIps.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border p-3 bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                    Block
                  </Badge>
                  <span className="font-mono text-sm text-foreground">{item.ip}</span>
                  <span className="text-sm text-muted-foreground">- {item.description}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Label className="text-foreground">Add New Entry</Label>
          <div className="flex gap-2">
            <Input placeholder="IP address or CIDR (e.g., 192.168.1.0/24)" className="bg-background flex-1" />
            <Input placeholder="Description" className="bg-background w-48" />
            <Button>Add to Allowlist</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
