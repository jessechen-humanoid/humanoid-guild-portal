---
name: zyyr-design-system
description: "Apply the MUJI-inspired design system for all 只要有人社群顧問 web projects. Use when building or styling any web page for this company."
license: MIT
metadata:
  author: "只要有人社群顧問"
  version: "1.0"
---

# 只要有人社群顧問 — Design System

This skill defines the unified visual design system for all web projects built for **只要有人社群顧問**. Every page, component, and interaction MUST follow these conventions to ensure brand consistency.

## Design Philosophy

**MUJI-inspired minimalism** — clean, warm, functional, restrained.

Principles:
- **Simplicity**: No unnecessary decoration. Every element serves a purpose.
- **Warmth**: Use warm whites and muted earth tones — never pure white backgrounds or cool grays.
- **Restraint**: Limited color palette, low saturation. Avoid bright/saturated colors.
- **Quality**: Precise spacing, careful typography, generous whitespace.
- **Timelessness**: No trendy effects. Focus on classic, lasting design.

---

## Tech Stack Defaults

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + inline `style` props for precise color values
- **Font**: Geist (via `next/font/google`)
- **Language**: `lang="zh-TW"`

```tsx
// layout.tsx pattern
import { Geist } from "next/font/google";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

<html lang="zh-TW">
  <body className={`${geist.variable} antialiased min-h-screen`} style={{ backgroundColor: '#fafaf8' }}>
```

---

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| page-bg | `#fafaf8` | Page background (warm white) |
| card-bg | `#ffffff` | Cards, inputs, header |
| secondary-bg | `#f5f5f3` | Hover states, badges, inactive tabs |
| active-bg | `rgba(0,0,0,0.04)` | Active navigation items |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| text-primary | `#1a1a1a` | Headings, primary text |
| text-emphasis | `#2d2d2d` | Numbers, key values, focus rings |
| text-secondary | `#6b6b6b` | Labels, descriptions, muted text |
| text-disabled | `#c0c0c0` | Disabled states |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| border-primary | `#e8e8e5` | Cards, inputs, header border |
| border-light | `#f0eeeb` | Table cells, dividers |

### Status — Success
| Token | Hex | Usage |
|-------|-----|-------|
| success-bg | `#e8f0e8` | Success background |
| success-text | `#2d5a2d` | Success text |
| success-border | `#c8dcc8` | Success border |

### Status — Warning
| Token | Hex | Usage |
|-------|-----|-------|
| warning-bg | `#fef9ef` | Warning/edit background |
| warning-text | `#8a6d3b` | Warning text |
| warning-border | `#e8dcc8` | Warning border |

### Status — Error
| Token | Hex | Usage |
|-------|-----|-------|
| error-bg | `#fef0f0` | Error background |
| error-text | `#c75c5c` | Error text |
| error-border | `#f5d6d6` | Error border |
| error-highlight | `#f87171` | Validation ring (input borders) |

### Charts (low saturation)
| Token | Hex | Usage |
|-------|-----|-------|
| chart-red | `#c75c5c` | Accent line, alerts |
| chart-dark | `#2d2d2d` | Primary/personal data |
| chart-gold | `#c9a96e` | Average, secondary data |
| chart-green | `#7a9e7e` | Positive, tertiary data |
| chart-bar | `#a8a29e` | Bar chart fill |
| chart-grid | `#f0f0ed` | Grid lines, axis |

---

## Typography

### Font
- Primary: **Geist** (`var(--font-geist-sans)`)
- Monospace: **Geist Mono** (`var(--font-geist-mono)`)
- Fallback: `Arial, Helvetica, sans-serif`

### Scale
| Level | Tailwind | Weight | Color | Usage |
|-------|----------|--------|-------|-------|
| H1 | `text-2xl` | `font-bold` | `#1a1a1a` | Page title, site name |
| H2 | `text-base` | `font-semibold` | `#1a1a1a` | Section headings |
| H3 | `text-sm` | `font-medium` | `#1a1a1a` | Subsection headings |
| Body | `text-sm` | default | `#1a1a1a` | Body text |
| Label | `text-sm` | `font-medium` | `#6b6b6b` | Form labels, descriptions |
| Caption | `text-xs` | default | `#6b6b6b` | Small annotations |

### Title convention
- Site/app title: `text-xl font-bold tracking-tight` in navbar
- Title color: `#1a1a1a`

---

## Layout

### Page container
```
max-w-5xl mx-auto px-4 py-8
```

### Narrower sections (forms, centered content)
```
max-w-2xl mx-auto
```

### Grid patterns
- Two-column: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Calendar grid: `grid grid-cols-7 gap-1`
- Card list: `grid grid-cols-1 md:grid-cols-2 gap-6`

### Spacing
- Between sections: `mb-8` or `mt-12`
- Card internal padding: `p-5`
- Form field spacing: `space-y-5`
- Button group gap: `gap-2` or `gap-3`

---

## Components

### Card
```tsx
<div className="rounded-xl p-5" style={{
  backgroundColor: '#ffffff',
  border: '1px solid #e8e8e5'
}}>
```
- Border radius: `rounded-xl` (12px)
- No heavy shadows — at most `shadow-sm`
- White background with warm gray border

### Header / NavBar
```tsx
<header className="border-b sticky top-0 z-10" style={{
  backgroundColor: '#ffffff',
  borderColor: '#e8e8e5'
}}>
  <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
```
- Sticky top
- White background, `#e8e8e5` bottom border
- Height: `h-14`
- Logo: `text-xl font-bold tracking-tight` color `#1a1a1a`

### Navigation Links
```tsx
<Link
  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
    isActive ? "text-[#1a1a1a]" : "text-[#6b6b6b] hover:text-[#1a1a1a]"
  }`}
  style={isActive ? { backgroundColor: 'rgba(0,0,0,0.04)' } : undefined}
>
```

### Buttons
| Type | Background | Text | Classes |
|------|-----------|------|---------|
| Primary | `#1a1a1a` | `#ffffff` | `rounded-lg font-medium px-4 py-2` |
| Secondary | `#f5f5f3` | `#1a1a1a` | `rounded-lg font-medium px-4 py-2` |
| Danger | `#c75c5c` | `#ffffff` | `rounded-lg font-medium px-4 py-2` |
| Small | same as above | same | `px-3 py-1.5 text-sm` |
| Full-width | same as above | same | `w-full py-3` |

### Input Fields
```tsx
<input
  className="w-full rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d2d2d] focus:outline-none"
  style={{
    border: '1px solid #e8e8e5',
    backgroundColor: '#ffffff',
    color: '#1a1a1a'
  }}
/>
```
- Error state border: `#f87171`
- Placeholder color: `#6b6b6b`

### Dropdown / Combobox
```tsx
<div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-52 overflow-y-auto"
  style={{ backgroundColor: '#ffffff', border: '1px solid #e8e8e5' }}
>
  <div className="px-3 py-2 text-sm cursor-pointer"
    style={{ ':hover': { backgroundColor: '#fafaf8' } }}
  >
```

### Checkbox
```tsx
<input type="checkbox" className="w-4 h-4 accent-[#2d2d2d]" />
```

### Tooltip (for charts)
```tsx
style={{
  backgroundColor: '#fff',
  border: '1px solid #e8e8e5',
  borderRadius: 8
}}
```

---

## Interactive States

| State | Treatment |
|-------|-----------|
| Hover (links) | `color: #6b6b6b -> #1a1a1a` with `transition` |
| Hover (buttons) | Slight opacity change or background shift |
| Hover (list items) | `backgroundColor: #fafaf8` |
| Focus (inputs) | `ring-2 ring-[#2d2d2d] outline-none` |
| Active (nav) | `backgroundColor: rgba(0,0,0,0.04)`, `color: #1a1a1a` |
| Disabled | `color: #c0c0c0`, reduced opacity |

### Animation
- Fade-in: `animation: fadeIn 0.3s ease-out`
- Transitions: `transition` class on all interactive elements

---

## Responsive Design

### Breakpoints (Tailwind defaults)
- Mobile-first: base styles for < 640px
- `md:` (768px) — two-column layouts activate
- `lg:` (1024px) — optional wider adjustments

### Mobile rules
- Min usable width: **375px**
- Touch targets: **minimum 44px x 44px**
- No hamburger menu — keep nav links visible
- Stack to single column on mobile: `grid-cols-1 md:grid-cols-2`
- Hide secondary text on mobile: `hidden md:block`

---

## Chart Conventions (Recharts)

- Bar radius: `radius={[0, 4, 4, 0]}` (horizontal) or `radius={[4, 4, 0, 0]}` (vertical)
- Container: `<ResponsiveContainer width="100%" height={280}>`
- Grid stroke: `#f0f0ed`
- Axis tick: `fontSize: 12, fill: '#6b6b6b'`
- Use the chart color palette above — never use saturated colors

---

## Icons & Decorative Elements

- Prefer Unicode characters for simple icons: `‹` `›` `×`
- Status indicators: colored squares `w-3 h-3 rounded inline-block`
- No icon library dependency unless project-specific need
- If icons are needed, keep them monochrome and minimal

---

## CSS Variables Template

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

---

## Checklist for New Pages

When building a new page, verify:
- [ ] Page background is `#fafaf8`
- [ ] Cards use `#ffffff` bg + `#e8e8e5` border + `rounded-xl`
- [ ] Text follows the typography hierarchy (H1/H2/H3/Body/Label/Caption)
- [ ] Colors are from the approved palette — no random hex values
- [ ] Inputs have focus ring `ring-2 ring-[#2d2d2d]`
- [ ] Buttons follow the primary/secondary/danger pattern
- [ ] Layout uses `max-w-5xl mx-auto px-4`
- [ ] Responsive: works at 375px, uses `md:` breakpoint for columns
- [ ] No heavy shadows — `shadow-sm` max, prefer borders
- [ ] Interactive elements have `transition` class
- [ ] Font is Geist (via `next/font/google`)
- [ ] `lang="zh-TW"` on `<html>`
