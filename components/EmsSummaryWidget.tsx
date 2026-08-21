import { WidgetCard } from "@/components/ui/WidgetCard";

const metrics = [
  { label: "Efficiency", value: "92", unit: "%" },
  { label: "Uptime", value: "99.4", unit: "%" },
  { label: "Active Alerts", value: "2", unit: "" },
];

export function EmsSummaryWidget() {
  return (
    <WidgetCard title="EMS Summary" dotColor="bg-primary">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const displayValue = metric.unit
            ? `${metric.value} ${metric.unit}`
            : metric.value;

          return (
            <div key={metric.label} className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {displayValue}
              </span>
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