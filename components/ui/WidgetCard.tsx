import { ReactNode } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  title: string;
  dotColor?: string; // Tailwind bg class, e.g. "bg-primary", "bg-green-500"
  span?: 1 | 2; // grid-column span — 2 for "hero" widgets
  onMenuClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function WidgetCard({
  title,
  dotColor = "bg-primary",
  span = 1,
  onMenuClick,
  children,
  className,
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow",
        span === 2 && "col-span-2",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", dotColor)} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </span>
        </div>
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Widget options"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}