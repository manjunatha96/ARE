"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Eye, ChevronDown, ChevronRight, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const executions = [
  {
    id: "EXE-001",
    rule: "Database Connection Recovery",
    event: "EVT-001",
    status: "success",
    startTime: "2024-01-15 14:32:46",
    duration: "1.2s",
    retries: 0,
    steps: [
      { name: "Condition Check", status: "success", duration: "45ms", output: "All conditions met" },
      { name: "API Call: Database Restart", status: "success", duration: "890ms", output: "Connection reestablished" },
      { name: "Verification", status: "success", duration: "265ms", output: "Database responding normally" },
    ],
  },
  {
    id: "EXE-002",
    rule: "Memory Threshold Alert",
    event: "EVT-002",
    status: "running",
    startTime: "2024-01-15 14:30:13",
    duration: "2.1s",
    retries: 0,
    steps: [
      { name: "Condition Check", status: "success", duration: "32ms", output: "Memory threshold exceeded" },
      { name: "Script: Memory Cleanup", status: "running", duration: "-", output: "Executing cleanup routine..." },
      { name: "Verification", status: "pending", duration: "-", output: "" },
    ],
  },
  {
    id: "EXE-003",
    rule: "API Rate Limiter",
    event: "EVT-003",
    status: "success",
    startTime: "2024-01-15 14:28:34",
    duration: "0.8s",
    retries: 0,
    steps: [
      { name: "Condition Check", status: "success", duration: "28ms", output: "Rate limit breached" },
      { name: "Apply Throttling", status: "success", duration: "450ms", output: "Throttle policy applied" },
      { name: "Send Notification", status: "success", duration: "322ms", output: "Alert sent to Slack" },
    ],
  },
  {
    id: "EXE-004",
    rule: "SSL Certificate Renewal",
    event: "EVT-004",
    status: "failed",
    startTime: "2024-01-15 14:25:01",
    duration: "5.2s",
    retries: 3,
    steps: [
      { name: "Condition Check", status: "success", duration: "35ms", output: "Certificate expiring soon" },
      { name: "API Call: Certificate Authority", status: "failed", duration: "4800ms", output: "Error: Connection timeout" },
      { name: "Retry 1", status: "failed", duration: "150ms", output: "Connection refused" },
      { name: "Retry 2", status: "failed", duration: "150ms", output: "Connection refused" },
      { name: "Retry 3", status: "failed", duration: "65ms", output: "Max retries exceeded" },
    ],
  },
  {
    id: "EXE-005",
    rule: "Disk Space Manager",
    event: "EVT-005",
    status: "success",
    startTime: "2024-01-15 14:20:19",
    duration: "3.5s",
    retries: 0,
    steps: [
      { name: "Condition Check", status: "success", duration: "42ms", output: "Disk usage above threshold" },
      { name: "Script: Cleanup Temp Files", status: "success", duration: "2100ms", output: "Removed 2.3GB temp files" },
      { name: "Script: Clear Logs", status: "success", duration: "890ms", output: "Archived and cleared old logs" },
      { name: "Verification", status: "success", duration: "468ms", output: "Disk usage now at 72%" },
    ],
  },
];

const statusIcons: Record<string, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-success" />,
  failed: <XCircle className="h-4 w-4 text-destructive" />,
  running: <Loader2 className="h-4 w-4 text-warning animate-spin" />,
  pending: <Clock className="h-4 w-4 text-muted-foreground" />,
};

const statusColors: Record<string, string> = {
  success: "bg-success text-success-foreground",
  failed: "bg-destructive text-destructive-foreground",
  running: "bg-warning text-warning-foreground",
  pending: "bg-muted text-muted-foreground",
};

interface ExecutionDetailProps {
  execution: typeof executions[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ExecutionDetailDialog({ execution, open, onOpenChange }: ExecutionDetailProps) {
  if (!execution) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-background max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Execution Details</DialogTitle>
          <DialogDescription>Execution ID: {execution.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Rule</span>
              <p className="text-sm font-medium text-foreground">{execution.rule}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Event</span>
              <p className="text-sm font-medium text-foreground font-mono">{execution.event}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Status</span>
              <Badge variant="secondary" className={cn("capitalize", statusColors[execution.status])}>
                {execution.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Start Time</span>
              <p className="text-sm font-medium text-foreground">{execution.startTime}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Duration</span>
              <p className="text-sm font-medium text-foreground">{execution.duration}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Retries</span>
              <p className="text-sm font-medium text-foreground">{execution.retries}</p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">Execution Steps</span>
            <div className="space-y-2">
              {execution.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/30"
                >
                  <div className="mt-0.5">{statusIcons[step.status]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{step.name}</span>
                      <span className="text-xs text-muted-foreground">{step.duration}</span>
                    </div>
                    {step.output && (
                      <p className="text-xs text-muted-foreground mt-1 font-mono">{step.output}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LogList() {
  const [selectedExecution, setSelectedExecution] = useState<typeof executions[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleViewDetails = (execution: typeof executions[0]) => {
    setSelectedExecution(execution);
    setDetailOpen(true);
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Execution History</CardTitle>
          <CardDescription>Step-by-step action trace and execution logs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground w-8"></TableHead>
                <TableHead className="text-muted-foreground">Execution ID</TableHead>
                <TableHead className="text-muted-foreground">Rule</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Duration</TableHead>
                <TableHead className="text-muted-foreground">Retries</TableHead>
                <TableHead className="text-muted-foreground w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executions.map((execution) => (
                <React.Fragment key={execution.id}>
                  <TableRow className="border-border">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleRow(execution.id)}
                      >
                        {expandedRows.has(execution.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-foreground">{execution.id}</TableCell>
                    <TableCell className="font-medium text-foreground">{execution.rule}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{execution.event}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("capitalize", statusColors[execution.status])}>
                        {execution.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{execution.duration}</TableCell>
                    <TableCell className="text-muted-foreground">{execution.retries}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewDetails(execution)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(execution.id) && (
                    <TableRow className="border-border bg-muted/20">
                      <TableCell colSpan={8} className="p-4">
                        <div className="space-y-2">
                          {execution.steps.map((step, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 text-sm"
                            >
                              {statusIcons[step.status]}
                              <span className="font-medium text-foreground">{step.name}</span>
                              <span className="text-muted-foreground">-</span>
                              <span className="text-muted-foreground text-xs">{step.duration}</span>
                              {step.output && (
                                <>
                                  <span className="text-muted-foreground">|</span>
                                  <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                                    {step.output}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ExecutionDetailDialog execution={selectedExecution} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
