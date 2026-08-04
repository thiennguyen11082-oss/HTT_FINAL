# HTT Marketing Agency

Obsidian black, soft white, controlled cobalt. Cinematic dark agency site.

```bash
npm run dev
```

## Homepage order

```
Hero → Introduction → Pricing → Process → Projects → Services → FAQ → Contact → Footer
```

## How the device mockups work

There is **no 3D engine**. The phone and laptop are photoreal Higgsfield renders
with a live DOM screen composited into them.

A real product render has lens perspective, so a `rotateX`/`rotateY` guess never
lines up. Instead:

1. The render is generated with a **chroma-key green screen**.
2. `scripts/solve-screen.mjs` keys the green out, finds the quad's four extreme
   corners, and solves the homography mapping a flat rectangle onto it.
3. The output is a `matrix3d` pasted into `src/components/DeviceMock.tsx`.

The screen layer is a normal DOM element at the device's real logical size
(440×956 for the iPhone 16 Pro Max), so screenshots drop in at 1:1 with no
rescaling and text stays sharp at any DPR.

```bash
node scripts/solve-screen.mjs <in.png> <name> <screenW> <screenH>
node scripts/capture-mobile.mjs      # project sites at 440x956
node scripts/matte-black.mjs <in> <out> [lo] [hi]
node scripts/matte-white.mjs <in> <out>
```

**Both matte scripts exist for a reason.** A render on black composites as a
visible rectangle over a `#08080B` page, so alpha is driven from luminance —
which also keeps soft shadows and floor reflections as partial alpha. A render
on white needs the opposite: a flood fill inward from the corners, because a
brightness threshold alone eats the specular highlights on polished metal.

## Traps

- **Reload must return to the top.** `history.scrollRestoration = 'manual'` in
  `main.tsx`. `node scripts/check-reload.mjs` asserts it.
- **Never add `scroll-mt-*` to a section.** `scrollToId` computes the landing
  offset from the measured nav height and the section's padding; Lenis honours
  scroll-margin *on top of that* and the two stack into a dead band.
  `node scripts/check-nav.mjs` asserts the 28px landing.
- **No StrictMode "already ran" guards around rAF loops.** The effect runs, is
  cleaned up, then runs again — a guard lets the cleanup cancel the first loop
  while blocking the second, freezing the preloader at zero.
- **`fetchPriority` must be lowercase** as a spread prop; React 18 does not map
  the camelCase form to the DOM.
- **Gradient-clipped text cannot overflow its box.** `.ink-gradient` uses
  `background-clip: text`, so any character past the element edge loses its
  background and vanishes. Size display type to fit.

## Motion

One shared rAF loop in `src/lib/scroll.ts` drives every scroll-linked effect —
subscribers read one frame rather than each attaching a listener. `src/lib/motion.ts`
has the primitives: `useReveal` (masked reveal), `useParallax`, `useScrollProgress`,
`usePointerTilt`. All respect `prefers-reduced-motion`.

The Introduction pins on desktop and cross-dissolves four renders in one box, so
the object transforms rather than swapping. Mobile drops the pin entirely.

## Screenshots

```bash
node scripts/shoot-page.mjs [w] [h] [tag]   # home at every section
node scripts/shoot-routes.mjs               # the six detail routes
node scripts/check-health.mjs               # console/network, incl. reduced-motion
```

All write to `.shots/`. They drive the locally installed Chrome via
`puppeteer-core`, so nothing extra is downloaded.

## Content

All copy is in `src/content/` — `site.ts` (home), `pages.ts` (detail pages),
`intro.ts` (the four introduction stages). Nothing is hardcoded in components.
