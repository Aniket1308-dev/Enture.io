// components/ConsumptionWidget.tsx
import { WidgetCard } from "@/components/ui/WidgetCard";

export function ConsumptionWidget() {
  return (
    <WidgetCard title="Consumption" dotColor="bg-primary" span={2}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold">4,281</span>
        <span className="text-sm text-muted-foreground">kWh</span>
      </div>
      <div className="h-px bg-primary/30 w-8" />
    </WidgetCard>
  );
}