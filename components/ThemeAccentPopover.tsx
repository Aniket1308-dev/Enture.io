"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Check, Monitor, Moon, Sun } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAccentColor } from "@/hooks/useAccentColor"
import { cn } from "@/lib/utils"

const themeOptions = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const

export function ThemeAccentPopover() {
  const { theme, setTheme } = useTheme()
  const { accentId, setAccentColor, accentColors } = useAccentColor()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const currentSwatch = mounted
    ? accentColors.find((c) => c.id === accentId)?.swatch ?? "#a855f7"
    : "#a855f7"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="h-6 w-6 rounded-lg border border-border shadow-sm transition-transform hover:scale-110"
          style={{ backgroundColor: currentSwatch }}
          aria-label="Theme and accent color settings"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-xs transition-colors",
                    theme === id
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">
              Accent color
            </p>
            <div className="grid grid-cols-4 gap-4">
              {accentColors.map((color) => {
                const isSelected = accentId === color.id
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setAccentColor(color.id)}
                    title={color.label}
                    aria-label={color.label}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-border/50 shadow-sm transition-all duration-150 hover:scale-110 hover:shadow-md",
                      isSelected &&
                        "ring-2 ring-offset-2 ring-offset-popover scale-105"
                    )}
                    style={{
                      backgroundColor: color.swatch,
                      ...(isSelected
                        ? ({ "--tw-ring-color": color.swatch } as React.CSSProperties)
                        : {}),
                    }}
                  >
                    {isSelected && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/20">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Applies instantly, no save needed
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}