"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Code, Network, Edit, Trash2, Play, Download } from "lucide-react";

interface Script {
  id: string;
  name: string;
  type: "bash" | "python" | "powershell";
  description: string;
  version: string;
  content: string;
  lastModified: string;
  recentlyUsed: boolean;
}

interface OutboundAPI {
  id: string;
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description: string;
  authType: "none" | "bearer" | "api_key" | "basic";
  lastModified: string;
  recentlyUsed: boolean;
}

const scripts: Script[] = [
  {
    id: "s1",
    name: "memory_cleanup.sh",
    type: "bash",
    description: "Clear memory cache and temporary buffers",
    version: "1.2.3",
    content: "#!/bin/bash\necho 3 > /proc/sys/vm/drop_caches",
    lastModified: "2025-01-18",
    recentlyUsed: true,
  },
  {
    id: "s2",
    name: "restart_service.py",
    type: "python",
    description: "Restart systemd service with health check",
    version: "2.0.1",
    content: "import subprocess\nsubprocess.run(['systemctl', 'restart', 'app'])",
    lastModified: "2025-01-15",
    recentlyUsed: false,
  },
];

const outboundAPIs: OutboundAPI[] = [
  {
    id: "api1",
    name: "Production API Gateway",
    endpoint: "https://api.prod.internal/v1/remediate",
    method: "POST",
    description: "Main production remediation endpoint",
    authType: "bearer",
    lastModified: "2025-01-20",
    recentlyUsed: true,
  },
  {
    id: "api2",
    name: "Incident Management System",
    endpoint: "https://incidents.company.com/api/events",
    method: "POST",
    description: "Create incident tickets for manual review",
    authType: "api_key",
    lastModified: "2025-01-19",
    recentlyUsed: true,
  },
];

interface RepositoryManagerProps {
  onAddScript?: () => void;
  onEditScript?: (script: Script) => void;
  onDeleteScript?: (id: string) => void;
  onTestScript?: (script: Script) => void;
  onAddAPI?: () => void;
  onEditAPI?: (api: OutboundAPI) => void;
  onDeleteAPI?: (id: string) => void;
}

export function RepositoryManager({
  onAddScript,
  onEditScript,
  onDeleteScript,
  onTestScript,
  onAddAPI,
  onEditAPI,
  onDeleteAPI,
}: RepositoryManagerProps) {
  const [activeTab, setActiveTab] = useState("scripts");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="scripts" className="gap-2">
            <Code className="h-4 w-4" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="apis" className="gap-2">
            <Network className="h-4 w-4" />
            Outbound APIs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-foreground">Script Repository</CardTitle>
                  <CardDescription>
                    Manage remediation scripts with versioning and testing
                  </CardDescription>
                </div>
                <Button onClick={onAddScript} className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Script
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Type</TableHead>
                      <TableHead className="text-muted-foreground">Version</TableHead>
                      <TableHead className="text-muted-foreground">Modified</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scripts.map((script) => (
                      <TableRow key={script.id} className="border-border">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{script.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {script.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {script.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-foreground">
                          {script.version}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {script.lastModified}
                        </TableCell>
                        <TableCell>
                          {script.recentlyUsed && (
                            <Badge variant="default" className="bg-blue-600">
                              Active
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onTestScript?.(script)}
                              title="Test script"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onEditScript?.(script)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => onDeleteScript?.(script.id)}
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
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-foreground">Outbound APIs</CardTitle>
                  <CardDescription>
                    Configure external API integrations for remediation
                  </CardDescription>
                </div>
                <Button onClick={onAddAPI} className="gap-2">
                  <Plus className="h-4 w-4" />
                  New API
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Endpoint</TableHead>
                      <TableHead className="text-muted-foreground">Method</TableHead>
                      <TableHead className="text-muted-foreground">Auth</TableHead>
                      <TableHead className="text-muted-foreground">Modified</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outboundAPIs.map((api) => (
                      <TableRow key={api.id} className="border-border">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{api.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {api.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-foreground truncate max-w-xs">
                          {api.endpoint}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {api.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {api.authType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {api.lastModified}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onEditAPI?.(api)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => onDeleteAPI?.(api.id)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
