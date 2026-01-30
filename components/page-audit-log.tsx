"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  status: "success" | "failed" | "pending";
  module: string;
}

interface PageAuditLogProps {
  logs: AuditLog[];
  pageTitle: string;
}

const statusColors = {
  success: "bg-success/20 text-success border-success/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
  pending: "bg-warning/20 text-warning border-warning/30",
};

export function PageAuditLog({ logs, pageTitle }: PageAuditLogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
        >
          <Clock className="h-4 w-4" />
          Audit Log
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-foreground">{pageTitle} - Audit Log</DialogTitle>
          <DialogDescription>Complete activity history for this module</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-2 pr-4">
            {logs.map((log) => (
              <Card key={log.id} className="bg-muted/30 border-border">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          Module: {log.module}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("text-xs whitespace-nowrap", statusColors[log.status])}
                      >
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{log.details}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>By: {log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
