// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  SlidersHorizontal,
  MoreVertical,
  ChevronDown,
  LayoutGrid,
  Table as TableIcon,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { ConsumptionWidget } from "@/components/ConsumptionWidget";
import { cn } from "@/lib/utils";
import { ParamTestWidget } from "@/components/ParamTestWidget";
import { ParamBarWidget } from "@/components/ParamBarWidget";
import { EmsSummaryWidget } from "@/components/EmsSummaryWidget";
import { TableViewWidget } from "@/components/TableViewWidget";
import { SldDiagramWidget } from "@/components/SldDiagramWidget";

const mockViews = [
  { id: 1, name: "EMS View", type: "grid" },
  { id: 2, name: "Table view", type: "table" },
  { id: 3, name: "Test Table view", type: "table" },
  { id: 4, name: "Kannadhasan Test Widget", type: "grid" },
  { id: 5, name: "Diagram View", type: "diagram" },
  { id: 6, name: "SLD Diagram view", type: "diagram" },
];

// Maps each view's "type" to the icon shown in its tab, matching the original Enture app
const viewTypeIcons: Record<string, LucideIcon> = {
  grid: LayoutGrid,
  table: TableIcon,
  diagram: Waypoints,
};

// How many tabs show directly in the row before the rest collapse into "More"
const VISIBLE_TAB_COUNT = 4;

export default function DashboardPage() {
  const [activeId, setActiveId] = useState(mockViews[0].id);
  const [moreOpen, setMoreOpen] = useState(false);

  const visibleTabs = mockViews.slice(0, VISIBLE_TAB_COUNT);
  const overflowTabs = mockViews.slice(VISIBLE_TAB_COUNT);
  const activeInOverflow = overflowTabs.some((v) => v.id === activeId);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold mb-4">Views</h1>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Filter"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            title="More options"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add View
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b pb-2 mb-4">
        {visibleTabs.map((v) => {
          const isActive = v.id === activeId;
          const Icon = viewTypeIcons[v.type];
          return (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {v.name}
            </button>
          );
        })}

        {overflowTabs.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              className={cn(
                "relative flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors",
                activeInOverflow
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              More
              <ChevronDown className="h-3.5 w-3.5" />
              {activeInOverflow && !moreOpen && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              )}
            </button>

            {moreOpen && (
              <>
                {/* Click-away catcher */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMoreOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1 z-20 min-w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md py-1">
                  {overflowTabs.map((v) => {
                    const isActive = v.id === activeId;
                    const Icon = viewTypeIcons[v.type];
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setActiveId(v.id);
                          setMoreOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-1.5 text-left px-3 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

  <div className="mt-6 grid grid-cols-3 gap-4">
    <ConsumptionWidget />
    <ParamTestWidget />
    <ParamBarWidget />
    <EmsSummaryWidget />
    <TableViewWidget />
    <div className="col-span-2">
      <SldDiagramWidget />
    </div>
    {/* remaining 5 widgets will go here in later steps */}
  </div>
      {/* selected view content goes here later */}
    </div>
  );
}