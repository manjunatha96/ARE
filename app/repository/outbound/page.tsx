"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";

interface OutboundAPI {
  id: string;
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description: string;
  authType: "none" | "basic" | "bearer" | "api_key";
  lastModified: string;
  status: "active" | "inactive";
}

const mockAPIs: OutboundAPI[] = [
  {
    id: "api1",
    name: "Production API Gateway",
    endpoint: "https://api.example.com/v1",
    method: "POST",
    description: "Main production API for remediation actions",
    authType: "bearer",
    lastModified: "2025-01-20",
    status: "active",
  },
  {
    id: "api2",
    name: "Backup API Server",
    endpoint: "https://backup-api.example.com/v1",
    method: "POST",
    description: "Fallback API server for failover",
    authType: "api_key",
    lastModified: "2025-01-19",
    status: "active",
  },
];

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "API Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new outbound API: Production API Gateway",
    status: "success",
    module: "Outbound APIs",
  },
  {
    id: "2",
    action: "API Updated",
    user: "John Doe",
    timestamp: "2024-01-15 12:15:00",
    details: "Updated authentication for Backup API Server",
    status: "success",
    module: "Outbound APIs",
  },
  {
    id: "3",
    action: "API Tested",
    user: "Admin",
    timestamp: "2024-01-14 16:45:00",
    details: "Tested connection to Production API Gateway",
    status: "success",
    module: "Outbound APIs",
  },
];

export default function OutboundPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    endpoint: "",
    method: "POST" as "GET" | "POST" | "PUT" | "DELETE",
    description: "",
    authType: "bearer" as "none" | "basic" | "bearer" | "api_key",
  });

  const handleOpen = (api?: OutboundAPI) => {
    if (api) {
      setEditingId(api.id);
      setFormData({
        name: api.name,
        endpoint: api.endpoint,
        method: api.method,
        description: api.description,
        authType: api.authType,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        endpoint: "",
        method: "POST",
        description: "",
        authType: "bearer",
      });
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      endpoint: "",
      method: "POST",
      description: "",
      authType: "bearer",
    });
  };

  const handleSave = () => {
    console.log("[v0] Saving outbound API:", { ...formData, id: editingId || "new" });
    handleClose();
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Outbound API Integrations"
          description="Configure external API endpoints for remediation actions"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - Inside Page */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Outbound APIs" />
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <Input
                placeholder="Search APIs by name or endpoint..."
                className="bg-background"
              />
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-foreground">Outbound API Integrations</CardTitle>
                    <CardDescription>Configure external API endpoints for remediation actions</CardDescription>
                  </div>
                  <Button onClick={() => handleOpen()} className="gap-2 w-full sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Add API
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">API Name</TableHead>
                        <TableHead className="text-muted-foreground hidden md:table-cell">Endpoint</TableHead>
                        <TableHead className="text-muted-foreground">Method</TableHead>
                        <TableHead className="text-muted-foreground hidden md:table-cell">Auth Type</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAPIs.map((api) => (
                        <TableRow key={api.id} className="border-border">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">{api.name}</span>
                              <span className="text-xs text-muted-foreground md:hidden">{api.description}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm truncate hidden md:table-cell">
                            {api.endpoint}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{api.method}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden md:table-cell">
                            {api.authType}
                          </TableCell>
                          <TableCell>
                            <Badge variant={api.status === "active" ? "default" : "outline"}>
                              {api.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleOpen(api)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => console.log("[v0] Delete API:", api.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingId ? "Edit Outbound API" : "Add New Outbound API"}
            </DialogTitle>
            <DialogDescription>
              {editingId ? "Update the API configuration below." : "Configure a new outbound API endpoint."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-name" className="text-foreground text-sm font-medium">
                API Name
              </Label>
              <Input
                id="api-name"
                placeholder="e.g., Production API Gateway"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-endpoint" className="text-foreground text-sm font-medium">
                Endpoint URL
              </Label>
              <Input
                id="api-endpoint"
                placeholder="https://api.example.com/v1"
                value={formData.endpoint}
                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="api-method" className="text-foreground text-sm font-medium">
                  HTTP Method
                </Label>
                <Select value={formData.method} onValueChange={(value: any) => setFormData({ ...formData, method: value })}>
                  <SelectTrigger id="api-method" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-auth" className="text-foreground text-sm font-medium">
                  Auth Type
                </Label>
                <Select value={formData.authType} onValueChange={(value: any) => setFormData({ ...formData, authType: value })}>
                  <SelectTrigger id="api-auth" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="api_key">API Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-description" className="text-foreground text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="api-description"
                placeholder="Describe this API endpoint and its purpose..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background min-h-20"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Update API" : "Create API"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
