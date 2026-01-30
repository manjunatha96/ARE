import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle, XCircle, Clock } from "lucide-react";

const stats = [
  {
    title: "Total APIs",
    value: "24",
    icon: Globe,
    description: "Configured endpoints",
  },
  {
    title: "Healthy",
    value: "21",
    icon: CheckCircle,
    description: "Responding normally",
  },
  {
    title: "Failing",
    value: "2",
    icon: XCircle,
    description: "Connection issues",
  },
  {
    title: "Avg Response",
    value: "245ms",
    icon: Clock,
    description: "Last 24 hours",
  },
];

export function ApiStats() {
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
