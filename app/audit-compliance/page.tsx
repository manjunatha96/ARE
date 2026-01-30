import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter } from "lucide-react";

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Rule Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new rule: Database Recovery Rule",
    status: "success",
    module: "Rules",
  },
  {
    id: "2",
    action: "Profile Updated",
    user: "John Doe",
    timestamp: "2024-01-15 12:15:00",
    details: "Updated IP whitelist for Staging profile",
    status: "success",
    module: "Node Profiles",
  },
  {
    id: "3",
    action: "Policy Deleted",
    user: "Admin",
    timestamp: "2024-01-14 16:45:00",
    details: "Deleted Legacy retry policy",
    status: "success",
    module: "Retry Policies",
  },
  {
    id: "4",
    action: "Script Executed",
    user: "System",
    timestamp: "2024-01-14 14:20:00",
    details: "Executed Database Restart script successfully",
    status: "success",
    module: "Scripts",
  },
  {
    id: "5",
    action: "Configuration Changed",
    user: "Admin",
    timestamp: "2024-01-13 10:00:00",
    details: "Modified system settings for production environment",
    status: "success",
    module: "Settings",
  },
];

export default function AuditCompliancePage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Audit & Compliance"
          description="Monitor system activities, track changes, and ensure compliance with audit trails"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">1,234</div>
                    <Badge variant="outline">All Time</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Today Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">45</div>
                    <Badge variant="outline">24h</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Failed Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">3</div>
                    <Badge variant="destructive">Failed</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <Badge variant="outline">Users</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audit Log Button */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Audit & Compliance" />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <Filter className="h-4 w-4" />
                      Filter Logs
                    </Button>
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <Download className="h-4 w-4" />
                      Export Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Compliance Summary */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Compliance Status</CardTitle>
                    <CardDescription>System compliance and audit summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <span className="text-sm text-foreground">Data Access Logs</span>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <span className="text-sm text-foreground">Change Tracking</span>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <span className="text-sm text-foreground">User Activity Monitoring</span>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <span className="text-sm text-foreground">Retention Policy</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <Input
                placeholder="Search audit logs by user, action, or module..."
                className="bg-background"
              />
            </div>

            {/* Audit Logs Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Audit Logs</CardTitle>
                <CardDescription>Complete system audit trail and activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">Timestamp</TableHead>
                        <TableHead className="text-muted-foreground">User</TableHead>
                        <TableHead className="text-muted-foreground">Module</TableHead>
                        <TableHead className="text-muted-foreground">Action</TableHead>
                        <TableHead className="text-muted-foreground">Details</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id} className="border-border">
                          <TableCell className="text-muted-foreground text-sm">{log.timestamp}</TableCell>
                          <TableCell className="text-foreground font-medium text-sm">{log.user}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.module}</Badge>
                          </TableCell>
                          <TableCell className="text-foreground text-sm">{log.action}</TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                            {log.details}
                          </TableCell>
                          <TableCell>
                            <Badge variant={log.status === "success" ? "default" : "destructive"}>
                              {log.status}
                            </Badge>
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
    </AppShell>
  );
}
