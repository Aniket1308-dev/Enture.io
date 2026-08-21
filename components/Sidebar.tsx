"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/digital-twin", label: "Digital Twin", icon: Zap },
  { href: "/dashboard", label: "Views", icon: LayoutDashboard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-14 flex-col items-center justify-between border-r border-sidebar-border bg-sidebar py-4">
      <div className="flex flex-col items-center gap-4">
        {/* Brand mark */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
        </div>

        {/* Nav icons */}
        <nav className="flex flex-col items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />

                {/* Tooltip on hover */}
                <span
                  className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50"
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Version tag */}
      <span className="text-[9px] font-medium text-sidebar-foreground/40">
        1.5.0
      </span>
    </aside>
  );
}