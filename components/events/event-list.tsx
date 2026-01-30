"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, RefreshCw, Link2, XCircle, ChevronDown, ChevronRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventFeedback } from "./event-feedback";

interface ExecutionStep {
  id: string;
  name: string;
  status: "completed" | "running" | "failed" | "pending";
  startTime: string;
  endTime: string;
  duration: number;
  details: string;
}

const events = [
  {
    id: "EVT-001",
    name: "Database Connection Timeout",
    source: "MySQL Primary",
    sourceType: "database",
    severity: "critical",
    status: "processed",
    groupKey: "db-mysql-01",
    timestamp: "2024-01-15 14:32:45",
    raw: '{"error": "Connection timeout after 30s", "host": "mysql-primary.internal", "port": 3306}',
    executionSteps: [
      {
        id: "step-1",
        name: "Event Received",
        status: "completed",
        startTime: "14:32:45",
        endTime: "14:32:45",
        duration: 0,
        details: "Event received from MySQL Primary",
      },
      {
        id: "step-2",
        name: "Rule Evaluation",
        status: "completed",
        startTime: "14:32:46",
        endTime: "14:32:47",
        duration: 1,
        details: "Evaluated 3 matching rules",
      },
      {
        id: "step-3",
        name: "Execute Remediation Actions",
        status: "completed",
        startTime: "14:32:48",
        endTime: "14:33:02",
        duration: 14,
        details: "Executed 2 actions: Restart service, Notify admin",
      },
      {
        id: "step-4",
        name: "Recovery Verification",
        status: "completed",
        startTime: "14:33:03",
        endTime: "14:33:05",
        duration: 2,
        details: "Database connection restored successfully",
      },
    ],
  },
  {
    id: "EVT-002",
    name: "High Memory Usage Alert",
    source: "App Server 01",
    sourceType: "system",
    severity: "high",
    status: "processing",
    groupKey: "sys-mem-alert",
    timestamp: "2024-01-15 14:30:12",
    raw: '{"memory_usage": 92.5, "threshold": 85, "process": "node"}',
    executionSteps: [
      {
        id: "step-1",
        name: "Event Received",
        status: "completed",
        startTime: "14:30:12",
        endTime: "14:30:12",
        duration: 0,
        details: "Alert received for high memory usage",
      },
      {
        id: "step-2",
        name: "Rule Evaluation",
        status: "completed",
        startTime: "14:30:13",
        endTime: "14:30:14",
        duration: 1,
        details: "Evaluated 2 matching rules",
      },
      {
        id: "step-3",
        name: "Execute Remediation Actions",
        status: "running",
        startTime: "14:30:15",
        endTime: "",
        duration: 45,
        details: "Executing memory cleanup and service restart",
      },
    ],
  },
  {
    id: "EVT-003",
    name: "API Rate Limit Exceeded",
    source: "Payment Gateway",
    sourceType: "application",
    severity: "medium",
    status: "new",
    groupKey: "api-rate-limit",
    timestamp: "2024-01-15 14:28:33",
    raw: '{"requests": 1050, "limit": 1000, "window": "1m"}',
    executionSteps: [
      {
        id: "step-1",
        name: "Event Received",
        status: "completed",
        startTime: "14:28:33",
        endTime: "14:28:33",
        duration: 0,
        details: "Rate limit alert received",
      },
      {
        id: "step-2",
        name: "Rule Evaluation",
        status: "failed",
        startTime: "14:28:34",
        endTime: "14:28:35",
        duration: 1,
        details: "No matching rules found for rate limiting",
      },
    ],
  },
  {
    id: "EVT-004",
    name: "Disk Space Warning",
    source: "Storage Server",
    sourceType: "system",
    severity: "low",
    status: "processed",
    groupKey: "disk-space-warn",
    timestamp: "2024-01-15 14:20:18",
    raw: '{"disk_usage": 87.3, "threshold": 85, "mount": "/data"}',
    executionSteps: [
      {
        id: "step-1",
        name: "Event Received",
        status: "completed",
        startTime: "14:20:18",
        endTime: "14:20:18",
        duration: 0,
        details: "Storage alert received",
      },
      {
        id: "step-2",
        name: "Rule Evaluation",
        status: "completed",
        startTime: "14:20:19",
        endTime: "14:20:20",
        duration: 1,
        details: "1 matching rule found",
      },
      {
        id: "step-3",
        name: "Cleanup Initiated",
        status: "completed",
        startTime: "14:20:21",
        endTime: "14:20:45",
        duration: 24,
        details: "Archived old logs and temporary files",
      },
    ],
  },
  {
    id: "EVT-005",
    name: "Network Latency Spike",
    source: "Edge Router",
    sourceType: "network",
    severity: "medium",
    status: "processed",
    groupKey: "net-latency",
    timestamp: "2024-01-15 14:15:42",
    raw: '{"latency_ms": 250, "baseline_ms": 45, "destination": "us-west-2"}',
    executionSteps: [
      {
        id: "step-1",
        name: "Event Received",
        status: "completed",
        startTime: "14:15:42",
        endTime: "14:15:42",
        duration: 0,
        details: "Latency alert detected",
      },
      {
        id: "step-2",
        name: "Performance Analysis",
        status: "completed",
        startTime: "14:15:43",
        endTime: "14:15:44",
        duration: 1,
        details: "Analyzed network metrics",
      },
      {
        id: "step-3",
        name: "Traffic Optimization",
        status: "completed",
        startTime: "14:15:45",
        endTime: "14:15:52",
        duration: 7,
        details: "Rerouted traffic to optimal paths",
      },
    ],
  },
];

const severityColors: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-success text-success-foreground",
};

const statusColors: Record<string, string> = {
  new: "bg-chart-5 text-primary-foreground",
  processing: "bg-warning text-warning-foreground",
  processed: "bg-success text-success-foreground",
  failed: "bg-destructive text-destructive-foreground",
};

const sourceTypeColors: Record<string, string> = {
  application: "bg-primary/10 text-primary",
  database: "bg-chart-3/10 text-chart-3",
  system: "bg-warning/10 text-warning",
  network: "bg-success/10 text-success",
};

const getStepStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "running":
      return <Clock className="h-4 w-4 text-warning" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    case "pending":
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

interface EventDetailProps {
  event: typeof events[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function EventDetailDialog({ event, open, onOpenChange }: EventDetailProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-foreground">{event.name}</DialogTitle>
          <DialogDescription>Event ID: {event.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Source</span>
              <p className="text-sm font-medium text-foreground">{event.source}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Source Type</span>
              <p className="text-sm font-medium text-foreground capitalize">{event.sourceType}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Severity</span>
              <Badge variant="secondary" className={cn("capitalize", severityColors[event.severity])}>
                {event.severity}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Status</span>
              <Badge variant="secondary" className={cn("capitalize", statusColors[event.status])}>
                {event.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Group Key</span>
              <p className="text-sm font-medium text-foreground font-mono">{event.groupKey}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Timestamp</span>
              <p className="text-sm font-medium text-foreground">{event.timestamp}</p>
            </div>
          </div>

          {event.executionSteps && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground">Execution Details</span>
              <div className="space-y-2">
                {event.executionSteps.map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border">
                    <div className="flex items-center gap-2">
                      <div>{getStepStatusIcon(step.status)}</div>
                      <span className="text-sm font-medium text-foreground">{step.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {step.duration}ms | {step.details}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Raw Event Data</span>
            <pre className="rounded-lg bg-muted p-3 text-xs font-mono text-foreground overflow-auto">
              {JSON.stringify(JSON.parse(event.raw), null, 2)}
            </pre>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Reprocess
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Link2 className="h-4 w-4" />
              View Correlated
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleViewDetails = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setDetailOpen(true);
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Events</CardTitle>
          <CardDescription>Incoming events with execution details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.map((event) => {
              const isExpanded = expandedEventId === event.id;
              return (
                <div key={event.id} className="border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <button
                    onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                    className="w-full flex items-center gap-3 p-4 text-left"
                  >
                    <div>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-muted-foreground">{event.id}</span>
                        <span className="font-medium text-foreground">{event.name}</span>
                        <Badge variant="secondary" className={cn("text-xs", severityColors[event.severity])}>
                          {event.severity}
                        </Badge>
                        <Badge variant="secondary" className={cn("capitalize text-xs", statusColors[event.status])}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge variant="secondary" className={cn("text-xs mr-2", sourceTypeColors[event.sourceType])}>
                          {event.sourceType}
                        </Badge>
                        {event.source} • {event.timestamp}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => handleViewDetails(event)}>
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Reprocess
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Link2 className="h-4 w-4" />
                          View Correlated
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <XCircle className="h-4 w-4" />
                          Dismiss
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <EventFeedback 
                      eventId={event.id} 
                      onFeedbackSubmit={(eventId, rating, comment) => {
                        console.log("[v0] Event feedback:", { eventId, rating, comment });
                      }}
                    />
                  </button>

                  {isExpanded && event.executionSteps && (
                    <div className="border-t border-border p-4 bg-background/50 space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Execution Details</h4>
                      <div className="space-y-2">
                        {event.executionSteps.map((step) => (
                          <div key={step.id} className="flex items-center justify-between p-2 rounded bg-muted/30">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div>{getStepStatusIcon(step.status)}</div>
                              <span className="font-medium text-foreground text-sm">{step.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                              {step.duration}ms | {step.details}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <EventDetailDialog event={selectedEvent} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
