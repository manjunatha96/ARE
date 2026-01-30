"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "00:00", events: 1200, success: 1150, failed: 50 },
  { time: "04:00", events: 800, success: 780, failed: 20 },
  { time: "08:00", events: 1800, success: 1720, failed: 80 },
  { time: "12:00", events: 2400, success: 2280, failed: 120 },
  { time: "16:00", events: 2100, success: 2000, failed: 100 },
  { time: "20:00", events: 1600, success: 1520, failed: 80 },
  { time: "Now", events: 1900, success: 1800, failed: 100 },
];

export function EventTrendChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Event Trends</CardTitle>
        <CardDescription>Event volume over the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.55 0.2 260)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.55 0.2 260)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.55 0.18 145)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.55 0.18 145)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
            <XAxis 
              dataKey="time" 
              stroke="oklch(0.45 0 0)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="oklch(0.45 0 0)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(1 0 0)",
                border: "1px solid oklch(0.92 0 0)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "oklch(0.15 0 0)" }}
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="oklch(0.55 0.2 260)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEvents)"
              name="Total Events"
            />
            <Area
              type="monotone"
              dataKey="success"
              stroke="oklch(0.55 0.18 145)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSuccess)"
              name="Successful"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
