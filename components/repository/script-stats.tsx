import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ScriptStats() {
  const stats = [
    {
      label: "Total Scripts",
      value: "12",
      color: "default",
    },
    {
      label: "Active Scripts",
      value: "10",
      color: "success",
    },
    {
      label: "Inactive Scripts",
      value: "2",
      color: "warning",
    },
    {
      label: "Executions (30d)",
      value: "142",
      color: "info",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <Badge variant="outline" className="capitalize">
                {stat.color}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
