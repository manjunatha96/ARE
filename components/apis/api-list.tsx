"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Edit, Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const apis = [
  {
    id: "1",
    name: "Database Restart Service",
    endpoint: "https://api.internal.com/db/restart",
    method: "POST",
    auth: "API Key",
    status: "healthy",
    lastUsed: "2 min ago",
    successRate: "98.5%",
    avgResponse: "156ms",
  },
  {
    id: "2",
    name: "Memory Cleanup Script",
    endpoint: "https://api.internal.com/system/cleanup",
    method: "POST",
    auth: "OAuth 2.0",
    status: "healthy",
    lastUsed: "15 min ago",
    successRate: "99.2%",
    avgResponse: "89ms",
  },
  {
    id: "3",
    name: "Slack Notification",
    endpoint: "https://hooks.slack.com/services/xxx",
    method: "POST",
    auth: "Bearer Token",
    status: "healthy",
    lastUsed: "1 hour ago",
    successRate: "99.9%",
    avgResponse: "234ms",
  },
  {
    id: "4",
    name: "PagerDuty Alert",
    endpoint: "https://events.pagerduty.com/v2/enqueue",
    method: "POST",
    auth: "API Key",
    status: "degraded",
    lastUsed: "3 hours ago",
    successRate: "95.1%",
    avgResponse: "567ms",
  },
  {
    id: "5",
    name: "AWS Lambda Trigger",
    endpoint: "https://lambda.us-east-1.amazonaws.com/invoke",
    method: "POST",
    auth: "IAM",
    status: "healthy",
    lastUsed: "30 min ago",
    successRate: "99.5%",
    avgResponse: "312ms",
  },
  {
    id: "6",
    name: "Kubernetes Scaler",
    endpoint: "https://k8s.internal.com/scale",
    method: "PATCH",
    auth: "Service Account",
    status: "unhealthy",
    lastUsed: "1 day ago",
    successRate: "78.3%",
    avgResponse: "1250ms",
  },
];

const statusColors: Record<string, string> = {
  healthy: "bg-success text-success-foreground",
  degraded: "bg-warning text-warning-foreground",
  unhealthy: "bg-destructive text-destructive-foreground",
};

const methodColors: Record<string, string> = {
  GET: "bg-primary text-primary-foreground",
  POST: "bg-success text-success-foreground",
  PUT: "bg-warning text-warning-foreground",
  PATCH: "bg-chart-5 text-primary-foreground",
  DELETE: "bg-destructive text-destructive-foreground",
};

export function ApiList() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">API Endpoints</CardTitle>
          <CardDescription>Configure and manage outbound API integrations</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add API
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-background">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New API Endpoint</DialogTitle>
              <DialogDescription>
                Configure a new outbound API integration for remediation actions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api-name" className="text-foreground">API Name</Label>
                <Input id="api-name" placeholder="Enter API name" className="bg-background" />
              </div>
              <div className="grid gap-4 grid-cols-4">
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="method" className="text-foreground">Method</Label>
                  <Select defaultValue="POST">
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="endpoint" className="text-foreground">Endpoint URL</Label>
                  <Input id="endpoint" placeholder="https://api.example.com/endpoint" className="bg-background" />
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="auth-type" className="text-foreground">Authentication</Label>
                  <Select defaultValue="api_key">
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-foreground">API Key / Token</Label>
                  <Input id="api-key" type="password" placeholder="Enter credentials" className="bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headers" className="text-foreground">Custom Headers (JSON)</Label>
                <Textarea
                  id="headers"
                  placeholder='{"Content-Type": "application/json"}'
                  className="bg-background font-mono text-sm"
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timeout" className="text-foreground">Timeout (ms)</Label>
                  <Input id="timeout" type="number" defaultValue="30000" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retries" className="text-foreground">Max Retries</Label>
                  <Input id="retries" type="number" defaultValue="3" className="bg-background" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save API</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">API Name</TableHead>
              <TableHead className="text-muted-foreground">Method</TableHead>
              <TableHead className="text-muted-foreground">Auth</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Success Rate</TableHead>
              <TableHead className="text-muted-foreground">Avg Response</TableHead>
              <TableHead className="text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apis.map((api) => (
              <TableRow key={api.id} className="border-border">
                <TableCell>
                  <div>
                    <span className="font-medium text-foreground">{api.name}</span>
                    <p className="text-xs text-muted-foreground truncate max-w-[250px]">{api.endpoint}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn(methodColors[api.method])}>
                    {api.method}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{api.auth}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("capitalize", statusColors[api.status])}>
                    {api.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{api.successRate}</TableCell>
                <TableCell className="text-muted-foreground">{api.avgResponse}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Test Connection
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
