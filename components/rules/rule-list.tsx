"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Edit, Copy, Trash2, Power, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ApprovalStatusBadge } from "./approval-status-badge";
import { useState } from "react";

const rules = [
  {
    id: "1",
    name: "Database Connection Recovery",
    description: "Auto-restart database connections on timeout",
    status: "active",
    approvalStatus: "approved" as const,
    priority: "high",
    lastTriggered: "2 min ago",
    successCount: 145,
    failureCount: 3,
  },
  {
    id: "2",
    name: "Memory Threshold Alert",
    description: "Trigger cleanup when memory exceeds 85%",
    status: "active",
    approvalStatus: "approved" as const,
    priority: "critical",
    lastTriggered: "15 min ago",
    successCount: 89,
    failureCount: 1,
  },
  {
    id: "3",
    name: "API Rate Limiter",
    description: "Apply throttling on rate limit breach",
    status: "active",
    approvalStatus: "approved" as const,
    priority: "medium",
    lastTriggered: "1 hour ago",
    successCount: 234,
    failureCount: 12,
  },
  {
    id: "4",
    name: "SSL Certificate Renewal",
    description: "Auto-renew certificates 30 days before expiry",
    status: "inactive",
    approvalStatus: "approved" as const,
    priority: "high",
    lastTriggered: "2 days ago",
    successCount: 12,
    failureCount: 0,
  },
  {
    id: "5",
    name: "Disk Space Manager",
    description: "Cleanup temp files when disk usage exceeds 90%",
    status: "active",
    approvalStatus: "approved" as const,
    priority: "low",
    lastTriggered: "3 hours ago",
    successCount: 67,
    failureCount: 2,
  },
  {
    id: "6",
    name: "Service Health Check",
    description: "Restart unhealthy services automatically",
    status: "draft",
    approvalStatus: "pending_approval" as const,
    priority: "high",
    lastTriggered: "Never",
    successCount: 0,
    failureCount: 0,
  },
  {
    id: "7",
    name: "Auto Scaling Trigger",
    description: "Scale services based on load metrics",
    status: "draft",
    approvalStatus: "rejected" as const,
    priority: "high",
    lastTriggered: "Never",
    successCount: 0,
    failureCount: 0,
    rejectionReason: "Resource limits not properly defined. Please review the scaling thresholds and resubmit.",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-success text-success-foreground",
  inactive: "bg-muted text-muted-foreground",
  draft: "bg-warning text-warning-foreground",
};

const priorityColors: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-muted text-muted-foreground",
};

export function RuleList() {
  const [filterApprovalStatus, setFilterApprovalStatus] = useState<string>("all");

  const filteredRules = rules.filter((rule) => {
    if (filterApprovalStatus === "all") return true;
    return rule.approvalStatus === filterApprovalStatus;
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Rules</CardTitle>
            <CardDescription>Manage your remediation rules</CardDescription>
          </div>
          <Link href="/rules/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Rule
            </Button>
          </Link>
        </div>

        {/* Approval Status Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterApprovalStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterApprovalStatus("all")}
            className={filterApprovalStatus === "all" ? "" : "bg-transparent"}
          >
            All Rules
          </Button>
          <Button
            variant={filterApprovalStatus === "pending_approval" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterApprovalStatus("pending_approval")}
            className={filterApprovalStatus === "pending_approval" ? "" : "bg-transparent"}
          >
            Pending Approval
          </Button>
          <Button
            variant={filterApprovalStatus === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterApprovalStatus("approved")}
            className={filterApprovalStatus === "approved" ? "" : "bg-transparent"}
          >
            Approved
          </Button>
          <Button
            variant={filterApprovalStatus === "rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterApprovalStatus("rejected")}
            className={filterApprovalStatus === "rejected" ? "" : "bg-transparent"}
          >
            Rejected
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Rule Name</TableHead>
              <TableHead className="text-muted-foreground">Approval Status</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Priority</TableHead>
              <TableHead className="text-muted-foreground">Last Triggered</TableHead>
              <TableHead className="text-muted-foreground text-right">Success / Fail</TableHead>
              <TableHead className="text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.id} className="border-border">
                <TableCell>
                  <div>
                    <Link href={`/rules/${rule.id}`} className="font-medium text-foreground hover:text-primary">
                      {rule.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{rule.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <ApprovalStatusBadge 
                    status={rule.approvalStatus} 
                    rejectionReason={rule.rejectionReason}
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("capitalize", statusColors[rule.status])}>
                    {rule.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("capitalize", priorityColors[rule.priority])}>
                    {rule.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{rule.lastTriggered}</TableCell>
                <TableCell className="text-right">
                  <span className="text-success">{rule.successCount}</span>
                  {" / "}
                  <span className="text-destructive">{rule.failureCount}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-4 w-4" />
                        Clone
                      </DropdownMenuItem>
                      {rule.status === "draft" && rule.approvalStatus === "rejected" && (
                        <DropdownMenuItem className="gap-2 text-amber-600">
                          <AlertCircle className="h-4 w-4" />
                          Resubmit for Approval
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="gap-2">
                        <Power className="h-4 w-4" />
                        {rule.status === "active" ? "Disable" : "Enable"}
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
