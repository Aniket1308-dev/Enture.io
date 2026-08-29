"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Settings, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeAccentPopover } from "@/components/ThemeAccentPopover";
import { useSocketData } from "@/context/SocketProvider";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isConnected } = useSocketData();

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="h-16 w-full bg-background border-b border-border flex items-center justify-between px-6">
      {/* Left: page title */}
      <div>
        <p className="text-sm font-medium text-foreground">Dashboard</p>
        <p className="text-xs text-muted-foreground">Overview of your system</p>
      </div>

      {/* Right: live status + search + icons + avatar */}
      <div className="flex items-center gap-3">
        {isConnected ? (
          <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 rounded-md px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Live
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-md px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
            Offline
          </div>
        )}

        {searchOpen ? (
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search"
              className="pl-9 pr-8 h-9 bg-muted border-border focus-visible:ring-ring"
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchOpen(false);
              }}
              onBlur={(e) => {
                if (e.target.value === "") setSearchOpen(false);
              }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-background"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <button
            className="p-2 rounded-full border border-border bg-muted hover:bg-accent transition-colors"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        <button
          className="relative p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <ThemeAccentPopover />

        <button
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>

        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            N
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}