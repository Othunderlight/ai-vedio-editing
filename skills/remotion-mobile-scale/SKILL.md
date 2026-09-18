---
name: remotion-mobile-scale
description: >
  Scale Remotion video components designed for desktop/large screens to work on
  mobile devices. Use this whenever a Remotion reel or video looks good on
  desktop but elements appear too small when viewed on mobile (especially in
  Chrome's "Desktop site" mode). Covers 1.5x uniform scaling of all visual
  elements (fonts, borders, shadows, padding, gaps, margins, container
  dimensions, SVG sizes, absolute positions) while keeping caption/subtitle
  bars at their original size and position. Also handles caption overlap
  detection — hiding captions when they would collide with scaled-up scene
  content. Applies to all Remotion React components using AbsoluteFill,
  spring(), interpolate(), and scene-based frame ranges.
---

# Remotion Mobile Scaling

Scale a Remotion video component from desktop-optimized to mobile-friendly.
The core principle: multiply every visual element by 1.5x except
captions/subtitles, which stay at their original size and position.

## Prerequisites

- Remotion project with React components using `AbsoluteFill`, `spring()`,
  `interpolate()`, `useCurrentFrame()`, `useVideoConfig()`
- A component that looks correct on desktop (1080x1920 canvas) but elements
  appear too small on mobile
- Scene-based structure with frame ranges (conditional renders per scene)

## Step 1: Read the Component

Before making changes, read the full component to understand:

1. **Scene structure**: Frame ranges in the parent component's conditional
   renders (`{frame >= X && frame < Y && <SceneComponent />}`)
2. **Element types**: Font sizes, border widths, box shadows, padding, gaps,
   margins, container dimensions, SVG widths/heights
3. **Caption/subtitle system**: Position, size, and rendering logic for any
   caption bars (these stay unchanged)
4. **Absolute positioned elements**: Progress bars, overlay elements, mouse
   cursors — these need position values scaled too

## Step 2: Apply 1.5x Scaling

Multiply every visual dimension by 1.5. Work scene by scene to avoid missing
anything. Here is the exact mapping:

### Font sizes

| Original | Scaled (×1.5) |
|----------|---------------|
| 13px     | 19.5px        |
| 15px     | 22.5px        |
| 18px     | 27px          |
| 20px     | 30px          |
| 22px     | 33px          |
| 24px     | 36px          |
| 26px     | 39px          |
| 28px     | 42px          |
| 32px     | 48px          |
| 34px     | 51px          |
| 36px     | 54px          |
| 40px     | 60px          |
| 64px     | 96px          |
| 82px     | 123px         |

### Borders

| Original | Scaled (×1.5) |
|----------|---------------|
| 2px      | 3px           |
| 3px      | 4.5px         |
| 4px      | 6px           |
| 5px      | 7.5px         |
| 6px      | 9px           |

### Box shadows

Scale each shadow offset by 1.5:

| Original         | Scaled               |
|------------------|----------------------|
| `4px 4px 0px`   | `6px 6px 0px`        |
| `5px 5px 0px`   | `7.5px 7.5px 0px`    |
| `6px 6px 0px`   | `9px 9px 0px`        |
| `7px 7px 0px`   | `10.5px 10.5px 0px`  |
| `8px 8px 0px`   | `12px 12px 0px`      |
| `10px 10px 0px` | `15px 15px 0px`      |
| `14px 14px 0px` | `21px 21px 0px`      |

### Padding, gaps, margins

Multiply all padding, gap, margin, and inset values by 1.5.

| Original | Scaled |
|----------|--------|
| 4px      | 6px    |
| 6px      | 9px    |
| 8px      | 12px   |
| 10px     | 15px   |
| 12px     | 18px   |
| 14px     | 21px   |
| 16px     | 24px   |
| 18px     | 27px   |
| 20px     | 30px   |
| 24px     | 36px   |
| 28px     | 42px   |
| 30px     | 45px   |
| 32px     | 48px   |
| 36px     | 54px   |
| 40px     | 60px   |
| 50px     | 75px   |
| 60px     | 90px   |

### Container dimensions (width, height, maxWidth)

| Original | Scaled  |
|----------|---------|
| 84px     | 126px   |
| 90px     | 135px   |
| 160px    | 240px   |
| 190px    | 285px   |
| 190px    | 285px   |
| 210px    | 315px   |
| 920px    | 1380px  |
| 960px    | 1440px  |

### SVG dimensions

Scale `width` and `height` attributes on `<svg>` elements by 1.5. Keep
`viewBox` unchanged — the SVG content scales automatically.

| Original     | Scaled       |
|--------------|--------------|
| width="48"   | width="72"   |
| width="120"  | width="180"  |
| width="180"  | width="270"  |
| height="48"  | height="72"  |
| height="70"  | height="105" |
| height="290" | height="435  |

### Absolute positions

Scale `top`, `left`, `right`, `bottom` values on absolutely positioned
elements by 1.5. Also scale `translate()` offsets.

| Original         | Scaled               |
|------------------|----------------------|
| top: "10px"     | top: "15px"          |
| left: "320px"   | left: "480px"        |
| top: "24px"     | top: "36px"          |
| left: "362px"   | left: "543px"        |
| top: "66px"     | top: "99px"          |
| left: "435px"   | left: "652px"        |
| top: "26px"     | top: "39px"          |

### interpolate() and spring() values

Scale output ranges in `interpolate()` by 1.5 when they control visual
positioning. Example:

```
// Before
interpolate(tagsEnter, [0, 1], [15, 0])
// After
interpolate(tagsEnter, [0, 1], [22.5, 0])
```

### Cursor/pointer animations

When animating mouse cursors or similar elements with `interpolate()`, scale
both the start and end positions by 1.5:

```
// Before
const cursorX = interpolate(frame, [0, 60], [100, 360], { ... });
const cursorY = interpolate(frame, [0, 60], [30, 95], { ... });

// After
const cursorX = interpolate(frame, [0, 60], [150, 540], { ... });
const cursorY = interpolate(frame, [0, 60], [45, 142.5], { ... });
```

And update any absolute-positioned elements that reference these values:

```
// Before
left: `${cursorX}px`,
top: `${cursorY}px`,

// After — scale the rendered position too
left: `${cursorX * 1.5}px`,
top: `${cursorY * 1.5}px`,
```

## Step 3: Do NOT Scale Captions

Caption/subtitle bars must stay at their **exact original** size, position,
and styling. This includes:

- `fontSize` (keep as-is, e.g. 32px)
- `border` (keep as-is, e.g. 4px)
- `boxShadow` (keep as-is, e.g. 8px 8px 0px)
- `padding` (keep as-is, e.g. 18px 28px)
- `bottom` position (keep as-is, e.g. 400px)
- `left`/`right` margins (keep as-is, e.g. 40px)

The reason: captions are designed to sit in a specific zone of the canvas.
Scaling them would push them off-screen or overlap with the scaled content.

## Step 4: Add Caption Overlap Detection

After scaling, scene content may grow into the caption zone (bottom ~400px
area of a 1920-tall canvas). Add logic to hide the caption during frame
ranges where overlap occurs.

### 4a. Define the overlap ranges

Add a constant array near the top of the file (after VOICEOVER_CAPTIONS):

```typescript
// Frame ranges where caption overlaps with scene visuals (bottom ~400px area)
// Each entry: [startFrame, endFrame] — caption is hidden during these ranges
const CAPTION_OVERLAP_RANGES: [number, number][] = [
  // Scene N: reason for overlap
  [startFrame, endFrame],
  // ...
];
```

**How to determine the ranges:**

1. The caption sits at `bottom: 400px` with ~100px height, so it occupies
   roughly y=1420 to y=1520 in the 1920-tall canvas.
2. For each scene, estimate whether any element's bottom edge reaches into
   that zone after scaling. Key things to check:
   - Scenes with many stacked elements (header + cards + examples)
   - Scenes with tall visual elements (thermometers, desktop UIs, clapperboards)
   - The last element in a scene (often an "example card")
   - CTA scenes with large centered text
3. When in doubt, be generous — hide the caption for the full second half of
   the scene rather than risking overlap.
4. Common patterns:
   - Scene with 4+ stacked elements: overlap usually starts when the 3rd
     element appears
   - Scene with a tall visual (beaker, desktop): overlap covers most of the
     scene after the visual enters
   - CTA/centered scenes: overlap covers the full scene

### 4b. Add the detection function

```typescript
function isCaptionOverlappingVisuals(frame: number): boolean {
  return CAPTION_OVERLAP_RANGES.some(
    ([start, end]) => frame >= start && frame < end
  );
}
```

### 4c. Use it in the main component

In the parent component, compute the flag and apply it:

```typescript
// Hide caption when it overlaps with scene visuals (bottom ~400px area)
const isCaptionOverlapping = isCaptionOverlappingVisuals(frame);
```

Then update the caption rendering condition:

```typescript
// Before
{showCaptions && activeCaption && (

// After
{showCaptions && activeCaption && !isCaptionOverlapping && (
```

## Step 5: Verify

After making all changes, check:

1. **Every scene** has been scaled — open each scene sub-component and verify
   all numeric style values are multiplied by 1.5
2. **Captions** are untouched — confirm fontSize, padding, border, boxShadow,
   and position values match the originals
3. **Overlap ranges** are reasonable — each range should start before the
   caption would visually overlap and end at or after the scene boundary
4. **No broken imports** — the file should still compile without errors
5. **SVG viewBox values** are unchanged (only width/height scaled)

## Quick Reference: What Gets Scaled vs. What Doesn't

| Element                 | Scaled? | Multiplier |
|-------------------------|---------|------------|
| Font sizes              | Yes     | ×1.5       |
| Border widths           | Yes     | ×1.5       |
| Box shadow offsets      | Yes     | ×1.5       |
| Padding                 | Yes     | ×1.5       |
| Gaps                    | Yes     | ×1.5       |
| Margins                 | Yes     | ×1.5       |
| Container width/height  | Yes     | ×1.5       |
| maxWidth                | Yes     | ×1.5       |
| SVG width/height        | Yes     | ×1.5       |
| Absolute positions      | Yes     | ×1.5       |
| interpolate() outputs   | Yes     | ×1.5       |
| SVG viewBox             | No      | —          |
| Caption fontSize        | No      | —          |
| Caption border          | No      | —          |
| Caption boxShadow       | No      | —          |
| Caption padding         | No      | —          |
| Caption position        | No      | —          |
| Colors                  | No      | —          |
| Font weights            | No      | —          |
| spring() config         | No      | —          |
| Frame ranges            | No      | —          |
| rotate() angles         | No      | —          |
