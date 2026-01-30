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
import { Plus, Edit, Trash2, RotateCcw } from "lucide-react";

interface RetryPolicy {
  id: string;
  name: string;
  description: string;
  maxRetries: number;
  retryInterval: number;
  backoffStrategy: "linear" | "exponential" | "fixed";
  timeoutSeconds: number;
  isActive: boolean;
  recentActivity: string;
  usedBy: number;
}

const policies: RetryPolicy[] = [
  {
    id: "1",
    name: "Critical Path Retry",
    description: "Aggressive retry for critical remediation actions",
    maxRetries: 5,
    retryInterval: 2,
    backoffStrategy: "exponential",
    timeoutSeconds: 60,
    isActive: true,
    recentActivity: "2025-01-20 14:32",
    usedBy: 12,
  },
  {
    id: "2",
    name: "Standard Retry",
    description: "Default retry policy for standard operations",
    maxRetries: 3,
    retryInterval: 5,
    backoffStrategy: "linear",
    timeoutSeconds: 30,
    isActive: true,
    recentActivity: "2025-01-20 10:15",
    usedBy: 8,
  },
  {
    id: "3",
    name: "Conservative Retry",
    description: "Minimal retries for stable systems",
    maxRetries: 1,
    retryInterval: 10,
    backoffStrategy: "fixed",
    timeoutSeconds: 20,
    isActive: true,
    recentActivity: "2025-01-19 16:45",
    usedBy: 3,
  },
];

interface RetryPolicyListProps {
  onAdd: () => void;
  onEdit: (policy: RetryPolicy) => void;
  onDelete: (id: string) => void;
}

export function RetryPolicyList({ onAdd, onEdit, onDelete }: RetryPolicyListProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-foreground">Retry Policies</CardTitle>
            <CardDescription>
              Manage centralized retry policies for reuse across rules and workflows
            </CardDescription>
          </div>
          <Button onClick={onAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            New Policy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Max Retries</TableHead>
                <TableHead className="text-muted-foreground">Strategy</TableHead>
                <TableHead className="text-muted-foreground">Timeout</TableHead>
                <TableHead className="text-muted-foreground">Used By</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id} className="border-border">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{policy.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {policy.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground font-mono">
                      {policy.maxRetries}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {policy.backoffStrategy}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{policy.timeoutSeconds}s</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground font-medium">
                      {policy.usedBy} rules
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(policy)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(policy.id)}
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
  );
}
