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
import { Plus, MoreHorizontal, Edit, Copy, Trash2, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const rules = [
  {
    id: "1",
    name: "Database Connection Recovery",
    description: "Auto-restart database connections on timeout",
    status: "active",
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
    priority: "high",
    lastTriggered: "Never",
    successCount: 0,
    failureCount: 0,
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
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Rule Name</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Priority</TableHead>
              <TableHead className="text-muted-foreground">Last Triggered</TableHead>
              <TableHead className="text-muted-foreground text-right">Success / Fail</TableHead>
              <TableHead className="text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
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
