"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Download, MoreVertical, Clock } from "lucide-react";

interface PageStat {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down";
}

interface AuditLog {
  timestamp: string;
  action: string;
  user: string;
}

interface PageHeaderProps {
  title: string;
  stats: PageStat[];
  onCreateNew?: () => void;
  onExport?: () => void;
  recentActivity: Array<{
    timestamp: string;
    action: string;
    user: string;
  }>;
  pageAuditLogs: AuditLog[];
}

export function PageHeader({
  title,
  stats,
  onCreateNew,
  onExport,
  recentActivity,
  pageAuditLogs,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  {stat.subValue && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                  )}
                </div>
                {stat.trend && (
                  <Badge
                    variant="secondary"
                    className={
                      stat.trend === "up"
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }
                  >
                    {stat.trend === "up" ? "↑" : "↓"}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Quick Actions */}
        <div className="md:col-span-1">
          <Card className="bg-card border-border h-full">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground text-sm mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {onCreateNew && (
                  <Button
                    onClick={onCreateNew}
                    className="w-full gap-2 justify-start"
                  >
                    <Plus className="h-4 w-4" />
                    Create New
                  </Button>
                )}
                {onExport && (
                  <Button
                    variant="outline"
                    onClick={onExport}
                    className="w-full gap-2 justify-start bg-transparent"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-2">
          <Card className="bg-card border-border h-full">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground text-sm mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-foreground font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audit Log - Top Right */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Clock className="h-4 w-4" />
              Audit Log
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-2">
              <h4 className="font-semibold text-sm text-foreground">Page Audit Log</h4>
              <p className="text-xs text-muted-foreground">Recent changes on this page</p>
            </div>
            <div className="max-h-64 overflow-y-auto border-t border-border">
              {pageAuditLogs.length > 0 ? (
                pageAuditLogs.map((log, idx) => (
                  <DropdownMenuItem key={idx} disabled className="flex flex-col items-start py-2">
                    <p className="text-xs font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  No audit logs
                </DropdownMenuItem>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
