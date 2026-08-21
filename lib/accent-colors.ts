export interface AccentColor {
  id: string
  label: string
  swatch: string
  cssVars: {
    "--primary": string
    "--primary-foreground": string
    "--ring": string
  }
}

const white = "oklch(0.985 0 0)"
const darkText = "oklch(0.145 0 0)"

export const accentColors: AccentColor[] = [
  {
    id: "orange",
    label: "Orange",
    swatch: "#f97316",
    cssVars: {
      "--primary": "oklch(0.705 0.19 41)",
      "--primary-foreground": white,
      "--ring": "oklch(0.705 0.19 41)",
    },
  },
  {
    id: "yellow",
    label: "Yellow",
    swatch: "#eab308",
    cssVars: {
      "--primary": "oklch(0.795 0.16 86)",
      "--primary-foreground": darkText,
      "--ring": "oklch(0.795 0.16 86)",
    },
  },
  {
    id: "green",
    label: "Green",
    swatch: "#22c55e",
    cssVars: {
      "--primary": "oklch(0.723 0.19 149)",
      "--primary-foreground": white,
      "--ring": "oklch(0.723 0.19 149)",
    },
  },
  {
    id: "teal",
    label: "Teal",
    swatch: "#14b8a6",
    cssVars: {
      "--primary": "oklch(0.704 0.14 182)",
      "--primary-foreground": white,
      "--ring": "oklch(0.704 0.14 182)",
    },
  },
  {
    id: "blue",
    label: "Blue",
    swatch: "#3b82f6",
    cssVars: {
      "--primary": "oklch(0.623 0.19 259)",
      "--primary-foreground": white,
      "--ring": "oklch(0.623 0.19 259)",
    },
  },
  {
    id: "purple",
    label: "Purple",
    swatch: "#a855f7",
    cssVars: {
      "--primary": "oklch(0.496 0.265 301.924)",
      "--primary-foreground": white,
      "--ring": "oklch(0.627 0.265 303.9)",
    },
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "#ec4899",
    cssVars: {
      "--primary": "oklch(0.656 0.24 354)",
      "--primary-foreground": white,
      "--ring": "oklch(0.656 0.24 354)",
    },
  },
  {
    id: "red",
    label: "Red",
    swatch: "#ef4444",
    cssVars: {
      "--primary": "oklch(0.637 0.24 29)",
      "--primary-foreground": white,
      "--ring": "oklch(0.637 0.24 29)",
    },
  },
]

export const defaultAccentColorId = "purple"