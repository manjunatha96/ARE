import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserCheck, Settings, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Total Audit Logs",
    value: "45,678",
    icon: FileText,
    description: "Last 30 days",
  },
  {
    title: "User Actions",
    value: "1,234",
    icon: UserCheck,
    description: "Manual interventions",
  },
  {
    title: "Config Changes",
    value: "567",
    icon: Settings,
    description: "Rule & system updates",
  },
  {
    title: "Security Events",
    value: "23",
    icon: AlertCircle,
    description: "Requires review",
  },
];

export function AuditStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
