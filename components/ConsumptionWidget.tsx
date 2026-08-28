// components/ConsumptionWidget.tsx
"use client";

import { WidgetCard } from "@/components/ui/WidgetCard";
import { useSocketData } from "@/context/SocketProvider";

export function ConsumptionWidget() {
  const { consumption } = useSocketData();

  const displayValue = consumption
    ? consumption.value.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })
    : "4,281";

  return (
    <WidgetCard title="Consumption" dotColor="bg-primary" span={2}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold">{displayValue}</span>
        <span className="text-sm text-muted-foreground">
          {consumption?.unit ?? "kWh"}
        </span>
      </div>
      <div className="h-px bg-primary/30 w-8" />
    </WidgetCard>
  );
}