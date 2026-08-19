"use client"

import { useCallback, useEffect, useState } from "react"
import { accentColors, defaultAccentColorId, type AccentColor } from "@/lib/accent-colors"

const STORAGE_KEY = "enture-accent-color"

function getStoredAccentId(): string {
  if (typeof window === "undefined") return defaultAccentColorId
  return localStorage.getItem(STORAGE_KEY) ?? defaultAccentColorId
}

function getAccentColor(id: string): AccentColor {
  return (
    accentColors.find((c) => c.id === id) ??
    accentColors.find((c) => c.id === defaultAccentColorId)!
  )
}

function applyAccentColor(color: AccentColor) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(color.cssVars)) {
    root.style.setProperty(key, value)
  }
}

export function useAccentColor() {
  const [accentId, setAccentId] = useState<string>(() => getStoredAccentId())

  // Sync the DOM's CSS vars whenever the accent changes (including on first mount)
  useEffect(() => {
    applyAccentColor(getAccentColor(accentId))
  }, [accentId])

  const setAccentColor = useCallback((id: string) => {
    if (!accentColors.some((c) => c.id === id)) return
    localStorage.setItem(STORAGE_KEY, id)
    setAccentId(id)
  }, [])

  return {
    accentId,
    setAccentColor,
    accentColors,
  }
}