import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FileText, UserCheck, Settings, Zap, LogIn, Shield } from "lucide-react";

const auditLogs = [
  {
    id: "AUD-001",
    timestamp: "2024-01-15 14:45:23",
    action: "rule_modified",
    category: "Rule Change",
    description: "Modified rule 'Database Connection Recovery' - Updated timeout from 30s to 45s",
    user: "John Doe",
    ipAddress: "192.168.1.100",
    icon: Settings,
  },
  {
    id: "AUD-002",
    timestamp: "2024-01-15 14:42:15",
    action: "manual_intervention",
    category: "Manual Intervention",
    description: "Manually triggered remediation for event EVT-001",
    user: "Jane Smith",
    ipAddress: "192.168.1.105",
    icon: UserCheck,
  },
  {
    id: "AUD-003",
    timestamp: "2024-01-15 14:38:00",
    action: "execution",
    category: "Action Execution",
    description: "Rule 'Memory Threshold Alert' executed successfully",
    user: "System",
    ipAddress: "-",
    icon: Zap,
  },
  {
    id: "AUD-004",
    timestamp: "2024-01-15 14:35:22",
    action: "rule_created",
    category: "Rule Change",
    description: "Created new rule 'Network Latency Monitor'",
    user: "Admin",
    ipAddress: "192.168.1.1",
    icon: FileText,
  },
  {
    id: "AUD-005",
    timestamp: "2024-01-15 14:30:00",
    action: "login",
    category: "User Login",
    description: "User login successful",
    user: "John Doe",
    ipAddress: "192.168.1.100",
    icon: LogIn,
  },
  {
    id: "AUD-006",
    timestamp: "2024-01-15 14:25:45",
    action: "security",
    category: "Security Event",
    description: "Failed login attempt - Invalid credentials (3rd attempt)",
    user: "Unknown",
    ipAddress: "45.33.32.156",
    icon: Shield,
  },
  {
    id: "AUD-007",
    timestamp: "2024-01-15 14:20:12",
    action: "config_change",
    category: "Config Change",
    description: "Updated global retry policy - Max retries changed from 3 to 5",
    user: "Admin",
    ipAddress: "192.168.1.1",
    icon: Settings,
  },
  {
    id: "AUD-008",
    timestamp: "2024-01-15 14:15:00",
    action: "rule_disabled",
    category: "Rule Change",
    description: "Disabled rule 'SSL Certificate Renewal' for maintenance",
    user: "Jane Smith",
    ipAddress: "192.168.1.105",
    icon: Settings,
  },
];

const categoryColors: Record<string, string> = {
  "Rule Change": "bg-primary text-primary-foreground",
  "Manual Intervention": "bg-warning text-warning-foreground",
  "Action Execution": "bg-success text-success-foreground",
  "User Login": "bg-chart-5 text-primary-foreground",
  "Security Event": "bg-destructive text-destructive-foreground",
  "Config Change": "bg-chart-2 text-primary-foreground",
};

export function AuditList() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Audit Trail</CardTitle>
        <CardDescription>Complete history of all system activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground w-12"></TableHead>
              <TableHead className="text-muted-foreground">Timestamp</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Description</TableHead>
              <TableHead className="text-muted-foreground">User</TableHead>
              <TableHead className="text-muted-foreground">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} className="border-border">
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <log.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm font-mono">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn(categoryColors[log.category])}>
                    {log.category}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[400px]">
                  <span className="text-foreground text-sm">{log.description}</span>
                </TableCell>
                <TableCell className="text-foreground">{log.user}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {log.ipAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
