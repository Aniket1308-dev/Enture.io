"use client"

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

  const currentSwatch =
    accentColors.find((c) => c.id === accentId)?.swatch ?? "#a855f7"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="h-6 w-6 rounded-full border border-border transition-transform hover:scale-110"
          style={{ backgroundColor: currentSwatch }}
          aria-label="Theme and accent color settings"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className="space-y-4">
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
            <p className="mb-2 text-sm font-medium text-foreground">
              Accent color
            </p>
            <div className="grid grid-cols-4 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setAccentColor(color.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-transform hover:scale-110"
                  style={{ backgroundColor: color.swatch }}
                  aria-label={color.label}
                >
                  {accentId === color.id && (
                    <Check className="h-4 w-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
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