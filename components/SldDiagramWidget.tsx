import { WidgetCard } from "@/components/ui/WidgetCard";
import { Zap } from "lucide-react";

const statusItems = [
  { label: "Main Feeder", status: "Active", color: "bg-green-500" },
  { label: "Transformer A", status: "Active", color: "bg-green-500" },
  { label: "Backup Line", status: "Standby", color: "bg-yellow-500" },
];

export function SldDiagramWidget() {
  return (
    <WidgetCard title="SLD Diagram" dotColor="bg-primary">
      <div className="flex flex-col items-center justify-center py-6 gap-3">
        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <Zap className="h-7 w-7 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">
          Single Line Diagram
        </span>
        <span className="text-xs text-muted-foreground">
          Full diagram view coming soon
        </span>
      </div>

      <div className="mt-2 space-y-2 border-t border-border/60 pt-3">
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