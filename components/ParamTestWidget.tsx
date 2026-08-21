"use client";

import { WidgetCard } from "@/components/ui/WidgetCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { time: "00:00", value: 32 },
  { time: "04:00", value: 28 },
  { time: "08:00", value: 45 },
  { time: "12:00", value: 60 },
  { time: "16:00", value: 52 },
  { time: "20:00", value: 38 },
  { time: "24:00", value: 41 },
];

export function ParamTestWidget() {
  return (
    <WidgetCard title="Parameter trend" dotColor="bg-primary">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-semibold">41.0</span>
        <span className="text-sm text-muted-foreground">units</span>
      </div>
      <div className="h-40 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="paramFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#paramFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}