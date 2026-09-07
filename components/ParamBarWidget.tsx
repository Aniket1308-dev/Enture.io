"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WidgetCard } from "@/components/ui/WidgetCard";

// Mock data — same generic "parameter" shape as ParamTestWidget,
// but bucketed for a bar chart (e.g. hourly averages)
const mockBarData = [
  { time: "00:00", value: 32 },
  { time: "04:00", value: 28 },
  { time: "08:00", value: 45 },
  { time: "12:00", value: 61 },
  { time: "16:00", value: 58 },
  { time: "20:00", value: 39 },
];

export function ParamBarWidget() {
  return (
    <WidgetCard title="Parameter (Bar)" dotColor="bg-primary" accentColor="border-l-indigo-500">
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockBarData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="time"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                fontSize: 12,
                borderRadius: 8,
              }}
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            />
            <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}