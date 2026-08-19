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
 <aside className="flex h-screen w-16 flex-col items-center justify-between border-r border-sidebar-border bg-sidebar py-4">
      {/* Top: nav icons */}
      <nav className="flex flex-col items-center gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "group relative flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-lg text-sidebar-foreground/70 transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-sidebar-foreground" />
              )}
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              <span className="text-[9px] leading-none">{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: version tag */}
        <span className="text-[10px] font-medium text-sidebar-foreground/60">1.5.0</span>
    </aside>
  );
}