'use client';

import { useState } from "react"

import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { ScriptStats } from "@/components/repository/script-stats";
import { ScriptActivity } from "@/components/repository/script-activity";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, Play, Copy, RotateCcw, Code, AlertCircle, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScriptVersion {
  version: string;
  createdAt: string;
  createdBy: string;
  content: string;
  changes: string;
}

interface Script {
  id: string;
  name: string;
  type: "Bash" | "Python" | "PowerShell";
  description: string;
  currentVersion: string;
  lastModified: string;
  status: "active" | "inactive";
  content: string;
  versions: ScriptVersion[];
}

const mockScripts: Script[] = [
  {
    id: "s1",
    name: "Database Restart",
    type: "Bash",
    description: "Restart database service safely",
    currentVersion: "1.2.0",
    lastModified: "2025-01-20",
    status: "active",
    content: "#!/bin/bash\necho 'Restarting database...'\nsudo systemctl restart postgresql\necho 'Done'",
    versions: [
      {
        version: "1.0.0",
        createdAt: "2025-01-15",
        createdBy: "admin",
        content: "#!/bin/bash\necho 'Restarting database...'\nsudo service postgresql restart",
        changes: "Initial version",
      },
      {
        version: "1.2.0",
        createdAt: "2025-01-20",
        createdBy: "admin",
        content: "#!/bin/bash\necho 'Restarting database...'\nsudo systemctl restart postgresql\necho 'Done'",
        changes: "Updated to use systemctl",
      },
    ],
  },
  {
    id: "s2",
    name: "Memory Cleanup",
    type: "Python",
    description: "Clear memory caches and release unused memory",
    currentVersion: "1.0.5",
    lastModified: "2025-01-18",
    status: "active",
    content: 'import psutil\nprint("Cleaning memory...")\npsutil.virtual_memory().available',
    versions: [
      {
        version: "1.0.5",
        createdAt: "2025-01-18",
        createdBy: "admin",
        content: 'import psutil\nprint("Cleaning memory...")\npsutil.virtual_memory().available',
        changes: "Fix syntax error in print statement",
      },
    ],
  },
];

const auditLogs: AuditLog[] = []; // Placeholder for audit logs

export default function ScriptsPage() {
  const [scripts, setScripts] = useState(mockScripts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<ScriptVersion | null>(null);
  const [testOutput, setTestOutput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "Bash" as "Bash" | "Python" | "PowerShell",
    description: "",
    content: "",
    changes: "",
  });

  const handleOpen = (script?: Script) => {
    if (script) {
      setEditingScript(script);
      setEditingId(script.id);
      setFormData({
        name: script.name,
        type: script.type,
        description: script.description,
        content: script.content,
        changes: "",
      });
    } else {
      setEditingScript(null);
      setEditingId(null);
      setFormData({ name: "", type: "Bash", description: "", content: "", changes: "" });
    }
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setIsOpen(false);
    setEditingScript(null);
    setEditingId(null);
    setFormData({ name: "", type: "Bash", description: "", content: "", changes: "" });
  };

  const handleSave = () => {
    console.log("[v0] Saving script:", { ...formData, id: editingId || "new" });
    handleClose();
  };

  const handleTest = (script: Script) => {
    setEditingScript(script);
    setTestOutput("Executing script...\n\n$ bash database_restart.sh\nRestarting database...\nDone\n\nExecution completed successfully");
    setIsTestOpen(true);
  };

  const handleRollback = (script: Script, version: ScriptVersion) => {
    console.log("[v0] Rolling back script to version:", version.version);
    setScripts(
      scripts.map((s) =>
        s.id === script.id
          ? {
              ...s,
              content: version.content,
              currentVersion: version.version,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : s
      )
    );
  };

  const handleDeactivate = (scriptId: string) => {
    setScripts(
      scripts.map((s) =>
        s.id === scriptId ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
      )
    );
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Scripts Repository"
          description="Manage, version, and execute remediation scripts with full lifecycle management"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Scripts" />
            </div>

            {/* Stats Cards */}
            <ScriptStats />

            {/* Quick Actions and Recent Activity Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => handleOpen()} 
                      className="w-full gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Create Script
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                      Export Scripts
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <ScriptActivity />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <Input
                placeholder="Search scripts by name or description..."
                className="bg-background"
              />
            </div>

            {/* Scripts List Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-foreground">Script Repository</CardTitle>
                    <CardDescription>Manage scripts with versioning and lifecycle control</CardDescription>
                  </div>
                  <Button onClick={() => handleOpen()} className="gap-2 w-full sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Create Script
                  </Button>
                </div>
              </CardHeader>

              {isFormOpen ? (
                <CardContent className="space-y-6">
                  {/* Script Editor */}
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="script-name" className="text-foreground text-sm font-medium">
                          Script Name
                        </Label>
                        <Input
                          id="script-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., memory_cleanup.sh"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="script-type" className="text-foreground text-sm font-medium">
                          Script Type
                        </Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                        >
                          <SelectTrigger id="script-type" className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bash">Bash</SelectItem>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="PowerShell">PowerShell</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="script-description" className="text-foreground text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="script-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the script's purpose and functionality"
                        className="bg-background min-h-16"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground text-sm font-medium flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Script Content
                      </Label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder={`#!/bin/bash\n# Enter your ${formData.type} script here`}
                        className="bg-background font-mono min-h-48 text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Syntax highlighting and validation available for {formData.type}
                      </p>
                    </div>

                    {editingScript && (
                      <div className="space-y-2">
                        <Label htmlFor="changes" className="text-foreground text-sm font-medium">
                          Version Notes
                        </Label>
                        <Textarea
                          id="changes"
                          value={formData.changes}
                          onChange={(e) => setFormData({ ...formData, changes: e.target.value })}
                          placeholder="Describe what changed in this version"
                          className="bg-background min-h-20"
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1">
                      {editingScript ? "Update Script" : "Create Script"}
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-muted-foreground">Name</TableHead>
                          <TableHead className="text-muted-foreground">Type</TableHead>
                          <TableHead className="text-muted-foreground hidden md:table-cell">Description</TableHead>
                          <TableHead className="text-muted-foreground hidden md:table-cell">Version</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scripts.map((script) => (
                          <TableRow key={script.id} className="border-border">
                            <TableCell>
                              <span className="font-medium text-foreground">{script.name}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{script.type}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate hidden md:table-cell">
                              {script.description}
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden md:table-cell">{script.currentVersion}</TableCell>
                            <TableCell>
                              <Badge variant={script.status === "active" ? "default" : "outline"}>
                                {script.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center gap-1 justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleTest(script)}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleOpen(script)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => console.log("[v0] Delete script:", script.id)}
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
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Test Execution Window */}
      <Dialog open={isTestOpen} onOpenChange={setIsTestOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Test Script Execution</DialogTitle>
            <DialogDescription>{editingScript?.name}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="output" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="output">Output</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>

            <TabsContent value="output" className="space-y-4">
              <Alert className="bg-muted border-border">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Script executed in isolated test environment. Changes will not affect production.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-foreground text-sm font-medium">Execution Output</Label>
                <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm min-h-48 max-h-64 overflow-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap break-words">{testOutput}</pre>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setTestOutput("")} variant="outline" className="bg-transparent">
                  Clear Output
                </Button>
                <Button onClick={() => handleTest(editingScript!)} className="gap-2">
                  <Play className="h-4 w-4" />
                  Run Again
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {editingScript?.versions && editingScript.versions.length > 0 ? (
                <div className="space-y-3">
                  {editingScript.versions.map((version) => (
                    <div
                      key={version.version}
                      className="border border-border rounded-lg p-4 space-y-2 bg-muted/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline">v{version.version}</Badge>
                          <span className="text-xs text-muted-foreground ml-2">
                            {version.createdAt} by {version.createdBy}
                          </span>
                        </div>
                        {version.version !== editingScript.currentVersion && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRollback(editingScript, version)}
                            className="gap-1 bg-transparent"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Rollback
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{version.changes}</p>
                      <details className="text-xs">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                          View Code
                        </summary>
                        <pre className="mt-2 bg-background rounded p-2 overflow-auto max-h-40 border border-border text-xs">
                          {version.content}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No version history available</p>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestOpen(false)} className="bg-transparent">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Script Window */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingId ? "Edit Script" : "Add New Script"}
            </DialogTitle>
            <DialogDescription>
              {editingId ? "Update the script details below." : "Create a new remediation script."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="script-name" className="text-foreground text-sm font-medium">
                Script Name
              </Label>
              <Input
                id="script-name"
                placeholder="e.g., database_restart.sh"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="script-type" className="text-foreground text-sm font-medium">
                Script Type
              </Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="script-type" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bash">Bash</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="PowerShell">PowerShell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="script-description" className="text-foreground text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="script-description"
                placeholder="Describe what this script does..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background min-h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Update Script" : "Create Script"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
