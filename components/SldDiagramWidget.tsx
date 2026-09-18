"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WidgetCard } from "@/components/ui/WidgetCard";

const statusItems = [
  { label: "Main Feeder", status: "Active", color: "bg-green-500" },
  { label: "Transformer A", status: "Active", color: "bg-green-500" },
  { label: "Backup Line", status: "Standby", color: "bg-yellow-500" },
];

const nodeStyle = {
  background: "var(--card)",
  color: "var(--foreground)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  fontSize: "12px",
  padding: "8px 12px",
};

const initialNodes: Node[] = [
  {
    id: "transformer",
    position: { x: 0, y: 60 },
    data: { label: "Transformer" },
    style: nodeStyle,
  },
  {
    id: "breaker",
    position: { x: 180, y: 60 },
    data: { label: "Breaker" },
    style: nodeStyle,
  },
  {
    id: "meter",
    position: { x: 360, y: 60 },
    data: { label: "Meter" },
    style: nodeStyle,
  },
  {
    id: "load",
    position: { x: 540, y: 60 },
    data: { label: "Load" },
    style: { ...nodeStyle, border: "1px solid var(--primary)" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-transformer-breaker",
    source: "transformer",
    target: "breaker",
    style: { stroke: "var(--border)" },
  },
  {
    id: "e-breaker-meter",
    source: "breaker",
    target: "meter",
    style: { stroke: "var(--border)" },
  },
  {
    id: "e-meter-load",
    source: "meter",
    target: "load",
    style: { stroke: "var(--border)" },
  },
];

export function SldDiagramWidget() {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <WidgetCard title="SLD Diagram" dotColor="bg-primary" accentColor="border-l-emerald-500">
      <div className="h-72 w-full rounded-lg border border-border/60 overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnDrag
        >
          <Background gap={16} size={1} color="var(--border)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
        {statusItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-foreground font-medium">{item.status}</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}