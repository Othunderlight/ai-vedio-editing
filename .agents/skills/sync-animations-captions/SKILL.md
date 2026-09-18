---
name: sync-animations-captions
description: Sync Remotion component animations and scene transitions with voiceover caption timings. Use this whenever captions or voiceover scripts change and the visual elements (scene boundaries, element reveals, spring animation delays, SFX cues, or composition duration) need to be re-timed to match. Also use when building new Remotion scenes that need to sync with a script.
---

# Sync Animations to Captions

When voiceover captions change, the visuals must follow. This skill covers the full resync workflow for Remotion projects: scene boundaries, inner element reveals, composition duration, and SFX cues.

## Prerequisites

- Remotion project with `<Sequence>`, `spring()`, `interpolate()`, `staticFile()` patterns
- A VOICEOVER_CAPTIONS array (or similar) defining frame ranges for each subtitle
- Components using `useCurrentFrame()` and `useVideoConfig()`

## Workflow

### 1. Map captions to scenes

Read the VOICEOVER_CAPTIONS array and identify which caption segments belong to which visual scene. Build a table:

| Scene | Caption frames | Local frame range | What the voiceover says |
|-------|---------------|-------------------|------------------------|
| Hook | 0–150 | 0–149 | intro text |
| Scene 2 | 150–660 | 0–509 | formula, rules, examples |
| ... | ... | ... | ... |

### 2. Update scene transition boundaries

In the main component's render, update the frame conditions that control which scene is visible. Each scene receives a local frame offset via `frame - startFrame`.

```
// Before
{frame >= 150 && frame < 540 && <ScenePositive frame={frame - 150} />}

// After ( captions now span 150–660 )
{frame >= 150 && frame < 660 && <ScenePositive frame={frame - 150} />}
```

**Files to update:** Every component that renders the same scenes (e.g., all visual variants of the same reel).

### 3. Update scene index logic

If the component tracks `currentSceneIndex` / `currentSceneName` for UI display, update those frame ranges too.

### 4. Sync inner animation delays

This is the core step. Within each scene component, elements must appear when the voiceover mentions them. The local frame is passed as the `frame` prop.

**For `spring()` animations:**
```
// Before: example appears immediately
const ex1 = spring({ frame, fps });

// After: example appears at local frame 330 when voiceover says it
const ex1 = spring({ frame: frame - 330, fps });
```

**For `interpolate()` animations:**
```
// Before
const write1 = interpolate(frame, [40, 75], [0, 100], { extrapolateRight: "clamp" });

// After
const write1 = interpolate(frame, [330, 365], [0, 100], {
  extrapolateRight: "clamp",
  extrapolateLeft: "clamp",
});
```

**For visibility toggles**, add opacity/transform driven by the entrance spring:
```
<div style={{ opacity: entrance, transform: `scale(${entrance})` }}>
```

**Mapping rule:** For each element, find the caption that mentions it, calculate the local frame offset (caption.fromFrame - sceneStartFrame), and set the animation delay to that value.

### 5. Update composition duration

If the total frame count changed, update `durationInFrames` in Root.tsx (or wherever `<Composition>` is defined) for all variants.

### 6. Update SFX cue timings

If there's a `SoundEffectCue` component or similar, shift the cue frame numbers to match the new scene start times.

### 7. Update comment headers

Keep the scene comment headers accurate (scene name, time range, frame range) so the next person can navigate the file.

## Quick reference: common patterns

### Staggered reveals (examples appearing one by one)
```
const ex1 = spring({ frame: frame - 330, fps });
const ex2 = spring({ frame: frame - 390, fps });
const ex3 = spring({ frame: frame - 420, fps });
```

### Two-part scene (negative then question)
```
const negEntrance = spring({ frame, fps });                    // appears first
const qEntrance = spring({ frame: frame - 150, fps });         // appears when voiceover switches topic
```

### Timeline markers appearing during narration
```
const marker1 = spring({ frame: frame - 150, fps });  // voiceover: "look at this timeline"
const marker2 = spring({ frame: frame - 175, fps });  // staggered every 25 frames
```

### Elements hidden until mentioned
```
// Before: always visible
<div style={{ transform: `scale(${enter})` }}>

// After: invisible until voiceover mentions it
<div style={{ opacity: ruleEntrance, transform: `translateY(${interpolate(ruleEntrance, [0,1], [20,0])}px)` }}>
```

## Gotchas

- Always add `extrapolateLeft: "clamp"` to interpolate calls when shifting start frames, otherwise values go negative before the animation starts.
- When the same scene exists in multiple component variants (e.g., dark mode / light mode / brutalist), update ALL of them with the same timings.
- `durationInFrames` in `<Composition>` must be >= the last caption's `toFrame`, otherwise the video cuts off early.
- Springs with negative frame values return 0, so `frame - 330` before frame 330 just means "not yet visible" — no extra guards needed.
