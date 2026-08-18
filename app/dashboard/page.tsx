// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { ConsumptionWidget } from "@/components/ConsumptionWidget";
import { cn } from "@/lib/utils";

const mockViews = [
  { id: 1, name: "EMS View", type: "table" },
  { id: 2, name: "Table view", type: "table" },
  { id: 3, name: "Test Table view", type: "table" },
  { id: 4, name: "Kannadhasan Test Widget", type: "grid" },
  { id: 5, name: "Diagram View", type: "diagram" },
  { id: 6, name: "SLD Diagram view", type: "diagram" },
];

export default function DashboardPage() {
  const [activeId, setActiveId] = useState(mockViews[0].id);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Views</h1>
      <div className="flex gap-2 border-b pb-2 mb-4">
        {mockViews.map((v) => {
          const isActive = v.id === activeId;
          return (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {v.name}
            </button>
          );
        })}
      </div>
        <div className="mt-6">
           <ConsumptionWidget />
        </div>      
      {/* selected view content goes here later */}
    </div>
  );
}