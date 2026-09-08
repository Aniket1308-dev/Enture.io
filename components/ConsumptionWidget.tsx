// components/ConsumptionWidget.tsx
"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { WidgetCard } from "@/components/ui/WidgetCard";
import { useSocketData } from "@/context/SocketProvider";

const BUFFER_SIZE = 20;

type Trend = "up" | "down" | "flat";

export function ConsumptionWidget() {
  const { consumption } = useSocketData();
  const [history, setHistory] = useState<number[]>([]);
  const [lastSeenValue, setLastSeenValue] = useState<number | undefined>(undefined);

  // Adjust state during render instead of in an effect (React's recommended
  // pattern for deriving buffered/history state from an incoming value —
  // avoids the extra render pass useEffect + setState would cause).
  if (consumption?.value !== undefined && consumption.value !== lastSeenValue) {
    setLastSeenValue(consumption.value);
    setHistory((prev) => {
      const next = [...prev, consumption.value];
      return next.length > BUFFER_SIZE ? next.slice(next.length - BUFFER_SIZE) : next;
    });
  }

  const displayValue = consumption
    ? consumption.value.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })
    : "4,281";

  const trend: Trend = (() => {
    if (history.length < 2) return "flat";
    const latest = history[history.length - 1];
    const prev = history[history.length - 2];
    if (latest > prev) return "up";
    if (latest < prev) return "down";
    return "flat";
  })();

  const trendColor =
    trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400";

  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  const sparklinePoints = (() => {
    if (history.length < 2) return "";
    const width = 80;
    const height = 24;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;

    return history
      .map((v, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  })();

  const sparklineStroke =
    trend === "up" ? "stroke-green-500" : trend === "down" ? "stroke-red-500" : "stroke-gray-400";

  return (
    <WidgetCard title="Consumption" dotColor="bg-primary" accentColor="border-l-blue-500" span={2}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold">{displayValue}</span>
        <span className="text-sm text-muted-foreground">
          {consumption?.unit ?? "kWh"}
        </span>
        <span className={`flex items-center ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
        </span>
      </div>

      {sparklinePoints && (
        <svg
          viewBox="0 0 80 24"
          className="w-20 h-6 mb-1"
          preserveAspectRatio="none"
        >
          <polyline
            points={sparklinePoints}
            fill="none"
            className={sparklineStroke}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <div className="h-px bg-primary/30 w-8" />
    </WidgetCard>
  );
}