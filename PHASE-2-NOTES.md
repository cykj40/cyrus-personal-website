# Phase 2 Notes — Design Tokens + Topographic Signature Hero

Nothing is committed. All changes are in the working tree on `redesign-v2`.

---

## 1. Palette

Six named ramps replace the four v1 families. Each brief hex became one step of
a ramp so surfaces, borders, and hovers have somewhere to go without inventing
ad-hoc hexes later.

| Token | Step carrying the brief hex | Hex | Role |
|---|---|---|---|
| `pine` | `pine-900` | `#0E2A1F` | Primary dark surface / hero background |
| `ridge` | `ridge-600` | `#2C5F7C` | Secondary — links, section accents |
| `ocean` | `ocean-400` | `#5FA8A0` | Interactive accent, focus states |
| `granite` | `granite-700` | `#3D4849` | Body text on light surfaces |
| `birch` | `birch-100` | `#F2EFE6` | Light surfaces |
| `ember` | `ember-500` | `#C96E3B` | The one action colour |

`pine` also gets a `950` (`#081A13`) for the hero's bottom vignette and for
dark text on the ember button.

### Old → new mapping

The v1 family names are **kept in `tailwind.config.ts` as aliases into the new
ramps**, so there is exactly one set of hex values in the file. Every existing
`forest-*` / `mountain-*` / `sunrise-*` / `earth-*` class across the site
(~240 usages) keeps working and now resolves to v2 colour. No component file
outside the Hero was touched.

| v1 | → v2 | Note |
|---|---|---|
| `forest-50…900` | `pine-50…900` | Step-for-step |
| `mountain-50…300` | `ridge-50…300` | Step-for-step |
| `mountain-400`, `mountain-500` | `ridge-600` `#2C5F7C` | `mountain-400` was a white-text button surface; mapping it to the brief's ridge-blue keeps it a valid one |
| `mountain-600`, `mountain-700` | `ridge-700` | |
| `mountain-800`, `mountain-900` | `ridge-800`, `ridge-900` | |
| `sunrise-400/500/600` | `ember-400/500/600` | |
| `sunrise-700` | `ember-600` | v1 `sunrise-700` was an accent, not a deep shade |
| `earth-400` | `granite-400` | Borders and muted marks |
| `earth-500` | `granite-600` | Body copy — needed a darker step than a literal 500 |
| `earth-600` | `granite-700` | The brief's `granite`; this was already the body-text token |

Mapping is by **role, not by numeric step**, which is why `mountain-400` and
`earth-500` jump. Every remap either holds or improves contrast:

| Pair | v1 | v2 |
|---|---|---|
| `earth-500` on white | 4.80:1 | **6.99:1** |
| `earth-600` on white | 7.63:1 | **9.45:1** |
| white on `mountain-400` | 4.51:1 | **6.92:1** |
| white on `forest-600` | 6.35:1 | **8.25:1** |
| `forest-900` heading on white | 12.84:1 | **15.33:1** |

The three unused `--color-*-primary` CSS custom properties in `index.css` were
retargeted to the v2 palette. The `bg-topographic` data-URI tile (still used by
the ring and case-study page headers) had its `#2D5016` fill swapped for
`#0E2A1F`; at 5% opacity this is imperceptible, it just stops the file carrying
a v1 hex.

**Deprecation:** the v1 names are marked deprecated in the config. The
rest-of-site pass should rewrite the ~240 class usages to v2 names and delete
the alias block — a mechanical rename, since the colours are already correct.

---

## 2. Typography

All three faces are now **actually self-hosted and loading**. Previously they
were declared in `tailwind.config.ts` with no `<link>` and no `@font-face`
anywhere, so every visitor got a system fallback.

| Role | Face | Files | Weight |
|---|---|---|---|
| Display | **Fraunces** | `fraunces-latin.woff2` 66 KB, `-latin-ext` 58 KB | Variable, `opsz 9..144` + `wght 400..700` |
| Body | **Inter** | `inter-latin.woff2` 47 KB, `-latin-ext` 83 KB | Variable, `wght 400..700` |
| Mono | **JetBrains Mono** | `jetbrains-mono-latin.woff2` 31 KB, `-latin-ext` 11 KB | Variable, `wght 400..500` |

**Fraunces** over Bricolage Grotesque and Instrument Serif. Its optical-size
axis is the reason: the same file renders the 92px hero headline at high
contrast and razor-sharp terminals, and would still hold up at 20px for section
headings later — Instrument Serif is display-only and gets fragile small, and
Bricolage reads as current-startup rather than as something built to last.
Fraunces is also warm and slightly geological without being folksy, which is
the exact register the brief asks for.

**Inter** over Geist and Source Sans 3. It was already the declared intent, it
is the most neutral of the three next to a characterful display face, and it
carries the technical/UI register the site needs. Choosing it means the fix is
purely additive — no re-tuning of existing type.

**JetBrains Mono** kept, now loading.

Delivery: `latin` and `latin-ext` Google subsets served from `/public/fonts`,
all with `font-display: swap`. The `latin-ext` files are `unicode-range`-gated,
so in practice this site never fetches them. Above-the-fold `latin` files are
preloaded from `index.html`. Critical-path font weight is ~144 KB across three
files.

> **Side effect worth knowing:** because the fonts genuinely load now, *every*
> page changes appearance, not just the Hero — the whole site renders in Inter
> for the first time instead of a system fallback. Verified `/services`,
> `/work`, and the landing teasers; all read correctly.

---

## 3. The signature element — `<TopographicContours />`

`src/components/ui/TopographicContours.tsx` + `.css`, geometry in
`topography-data.ts`, generator in `scripts/generate-topography.mjs`. SVG + CSS,
no new dependencies.

### The geometry is real

It is a marching-squares trace of an analytic height field — a sum of rotated
Gaussians (ten peaks, three negative basins that read as water), an inverted
`|sin|` ridge spine, a regional tilt, and three octaves of ripple. That is why
it behaves like a map instead of like wavy lines: closed rings around summits,
contours crowding on steep ground and spreading on flats, genuine saddles
between peaks. The field is calm on the left, where the copy sits, and
dramatic upper-right.

Levels are traced, stitched into polylines, decimated, and smoothed
Catmull-Rom → cubic Bézier. 26 levels, 67 paths, grouped into 4 elevation bands.

**Precomputed at author time, not in the browser.** Tracing costs ~35 ms on an
M-series laptop and several hundred ms on a phone — not a bill the hero should
pay on first paint. `node scripts/generate-topography.mjs` regenerates
`topography-data.ts` after any edit to the field. Cost: +42 KB raw JS
(bundle 610 → 653 KB, gzip 212 KB).

### What moves

Contour paths cannot morph on the GPU, so nothing tries to. The four bands each
become their own compositor layer and move *against each other*:

| | Motion | Trigger | Detail |
|---|---|---|---|
| **Ambient drift** | `translate3d` | Looping, always | Per band: ±6/11/18/26 px x, ±3/5/8/12 px y, over 92/76/64/54 s, `alternate`, each with a different negative `animation-delay` so they never resynchronise. Higher ground moves further and faster. |
| **Scroll parallax** | `translate3d` Y | Scroll position | A rAF-throttled passive listener writes a 0..1 progress var; bands translate 8/18/34/56 px across the hero's exit. |
| **Entrance** | `opacity` | Mount, once | Bands fade up low-ground-first, 130 ms apart, 1200 ms each. |

Only `transform` and `opacity`. Verified in Chrome via `document.getAnimations()`:
four `topo-drift` (transform), four `topo-fade-in` (opacity) — nothing else.

An `IntersectionObserver` sets `data-idle` when the field scrolls out of view,
which pauses the drift and drops `will-change`, so an animation nobody can see
isn't holding four viewport-sized layers awake.

### Reduced motion

Every animation is removed — not slowed. Scroll parallax is not wired up at
all (the listener never attaches) and `--topo-y` stays 0.

The static state is deliberately **not** frame zero. Each band is parked at 45%
of its drift amplitude, which is roughly where the layers sit through the middle
of the loop, so the bands stay offset from one another and the field keeps its
depth instead of collapsing into a registered stack. Screenshot-verified under
`prefers-reduced-motion: reduce`; it reads as a well-composed static map, and
arguably a slightly cleaner composition than any given animated frame.

### Reuse

Props are `className`, `intensity` (opacity multiplier for lighter surfaces),
and `parallax`. It is absolutely positioned and drops into any
`position: relative` container. **Only wired into the Hero this session** — not
inserted anywhere else, per scope.

---

## 4. Hero

- Dark `pine-900` full-bleed section, `min-h-svh`, single left-aligned column.
- Availability eyebrow: mono, ocean pill with a live dot. Sized to stay on one
  line at 360px.
- Headline in Fraunces 600, `clamp(2.9rem, 8vw, 5.75rem)`, `leading-[0.94]`.
  The terminal period is `ocean-400` — a small precision mark, not ember,
  since ember is reserved for action.
- Proof strip set as a **map scale bar**: hairline rule per item, mono, tabular
  figures, values in `ocean-300` over labels in `pine-300`. 1 / 2 / 4 columns.
  Numbers are verbatim from the brief.
- CTAs: **Hire Me** → `/hire-me` (solid `ember-500`, dark `pine-950` label),
  **Freelance & Project Work** → `/services` (outline). Full-width below 480px.
  Analytics events `cta_hero_hire` and `cta_hero_freelance`.
- Scroll cue (md+ only) replaces the old one, scrolling to `#work`.

Contrast, all AA or better:

| | Ratio |
|---|---|
| Headline `birch-100` / `pine-900` | 13.34:1 |
| Subhead `pine-100` / `pine-900` | 12.17:1 |
| Badge `ocean-200` / `pine-900` | 10.42:1 |
| Proof value `ocean-300` / `pine-900` | 7.95:1 |
| Proof label `pine-300` / `pine-900` | 6.44:1 |
| **Hire Me** `pine-950` / `ember-500` | 4.95:1 |

Dark text on ember rather than white: white on `#C96E3B` is only 3.64:1, which
fails AA at button size. Dark-on-ember passes and looks sharper.

Keyboard focus verified by real `Tab` traversal: both CTAs and the scroll cue
show a 2px `ocean-300` ring with a 2px `pine-900` offset.

### Removed

The old right-hand **sanitized MCP tool-call panel** is gone. The brief
specifies the hero as badge / headline / subhead / proof / dual CTA, and the
terrain needs the room. The panel was real, well-sourced proof content and is
worth reusing on `/work` or `/services` — it is in git history at `bcefb96`.

---

## 5. Flagged for follow-up (not fixed here — out of scope)

1. **The Navbar is now visually wrong.** It is a light translucent bar sitting
   on top of a dark hero, and its "Hire Me" nav link has no visible focus ring.
   Highest-priority item for the component restyle pass.
2. **Rest-of-site token migration.** Rewrite ~240 `forest-*` / `mountain-*` /
   `sunrise-*` / `earth-*` usages to v2 names and delete the alias block. Purely
   mechanical; the colours already resolve correctly.
3. **Type hierarchy off the Hero.** Every other heading on the site is still
   Inter Bold. Fraunces is Hero-only right now; the display face needs a
   deliberate scale before it goes elsewhere.
4. **`Button.tsx` has a dead class.** `size="lg"` applies `h-13`, which is not
   in Tailwind's scale and resolves to nothing, so `lg` and `md` buttons are the
   same height today. Left alone deliberately — fixing it changes button sizes
   site-wide.
5. **The chat robot animations ignore `prefers-reduced-motion`.** `bob`,
   `blink`, `wave`, and `bubbleIn` in `index.css` keep running under
   `reduce`. Pre-existing.
6. **`bg-topographic` static tile** still backs the ring and case-study headers.
   Replace with `<TopographicContours intensity={...} />` when those pages are
   restyled.
7. **Fonts are served from `/public`,** so filenames are unhashed and get no
   content-hash cache busting. Consider long-lived cache headers in
   `vercel.json` if font churn is expected.

---

## 6. Verification

- `pnpm build` passes. Bundle 610.51 → 652.95 kB (gzip 211.93 kB); the increase
  is the precomputed contour data. The pre-existing >500 kB chunk advisory is
  unchanged.
- Rendered the built output and confirmed: Fraunces, Inter, and JetBrains Mono
  all report `document.fonts.check() === true` and are the computed families;
  4 contour layers / 67 paths in the DOM; drift animates `transform` only and
  fade `opacity` only; scroll parallax moves the top band 31 px over a 500 px
  scroll; under `prefers-reduced-motion` zero contour animations exist and
  parallax transform is `none`.
- Screenshot-checked at 1440px, 360px, and under reduced motion.
- The only console error is `_vercel/insights/script.js` 404, which is expected
  outside a Vercel deployment and pre-existing.
