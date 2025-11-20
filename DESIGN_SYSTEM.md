# Design System — Professional UI Guidelines

This document describes the visual system for the Real Estate frontend. It includes color tokens, typography, spacing, and component rules — a guide to make the UI consistent and professional.

## Colors
- --color-primary: #1E293B (Dark slate) — used for headings, primary text and backgrounds.
- --color-accent: #d92228 (Brand red) — used as the primary accent for CTA and highlights.
- --color-muted: #6B7280 — text secondary.
- --bg-soft: #F7F9FB — page background.

Use `theme.palette.primary` and `theme.palette.secondary` for MUI components and the CSS variables in static CSS.

## Typography
- Font: Inter or system fonts (applied in `src/theme.ts`).
- Scale: h1 40-48px, h2 32px, h3 24px, body 16px.
- Weight: headings 600–700, body 400.

## Spacing and Radius
- Global spacing unit = 8px; use theme spacing multiples.
- Border radius: 10px for cards/inputs, 4px for small elements.

## Buttons
- Primary: uses `secondary.main` as the accent background and `#fff` text. 
- Outline: border with `secondary.main` and transparent background.
- Consistent padding and shape.

## Accessibility
- Maintain minimum contrast for text and backgrounds.
- Use :focus visible outlines on interactive elements.

## Implementation tips
- Wrap the app in a MUI ThemeProvider (done in `src/index.tsx`).
- Prefer `sx` and `styled` with theme tokens, avoid hard-coded colors.
- Refactor existing hard-coded colors in pages to `theme.palette.secondary.main`.
