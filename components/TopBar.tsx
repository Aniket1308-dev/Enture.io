"use client";

import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeAccentPopover } from "@/components/ThemeAccentPopover";

export default function TopBar() {
  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left: search */}
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 h-9 bg-gray-50 border-gray-200 focus-visible:ring-purple-500"
          />
        </div>
      </div>

      {/* Right: icons + avatar */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600" />
        </button>

        <ThemeAccentPopover />

        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-gray-600" />
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