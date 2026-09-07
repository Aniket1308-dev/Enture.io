"use client";

import { WidgetCard } from "@/components/ui/WidgetCard";
import { useSocketData } from "@/context/SocketProvider";

type Metric = {
  label: string;
  value: string;
  unit: string;
  type: "progress" | "badge";
};

const mockMetrics: Metric[] = [
  { label: "Efficiency", value: "92", unit: "%", type: "progress" },
  { label: "Uptime", value: "99.4", unit: "%", type: "progress" },
  { label: "Active Alerts", value: "2", unit: "", type: "badge" },
];

function alertBadgeClasses(count: number) {
  if (count <= 0) return "bg-muted text-muted-foreground";
  if (count <= 2) return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
  return "bg-destructive/15 text-destructive";
}

export function EmsSummaryWidget() {
  const { emsSummary } = useSocketData();

  const metrics: Metric[] = emsSummary
    ? [
        {
          label: "Efficiency",
          value: emsSummary.efficiency.toString(),
          unit: "%",
          type: "progress",
        },
        {
          label: "Uptime",
          value: emsSummary.uptime.toString(),
          unit: "%",
          type: "progress",
        },
        {
          label: "Active Alerts",
          value: emsSummary.activeAlerts.toString(),
          unit: "",
          type: "badge",
        },
      ]
    : mockMetrics;

  return (
    <WidgetCard title="EMS Summary" dotColor="bg-primary" accentColor="border-l-primary">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const numericValue = parseFloat(metric.value) || 0;
          const displayValue = metric.unit
            ? `${metric.value} ${metric.unit}`
            : metric.value;

          return (
            <div key={metric.label} className="flex flex-col">
              {metric.type === "badge" ? (
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-2xl font-bold ${alertBadgeClasses(
                    numericValue
                  )}`}
                >
                  {displayValue}
                </span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-foreground">
                    {displayValue}
                  </span>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.min(Math.max(numericValue, 0), 100)}%` }}
                    />
                  </div>
                </>
              )}
              <span className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                {metric.label}
              </span>
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}