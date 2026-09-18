---
name: remotion-sfx
description: >
  Add sound effects (SFX) to Remotion video components that use scene-based
  structure with frame ranges. Use this skill whenever working on Remotion
  projects that need audio SFX synchronized to visual elements — scene
  transitions, element pop-ins, clicks, impacts, or any timed audio cue.
  Covers SFX catalog mapping, volume balancing against voiceover, frame
  alignment to scene boundaries, clipping long audio files, and ensuring
  every visual element has a matching sound. Applies to all Remotion React
  components using Sequence + Audio from @remotion/media.
---

# Remotion SFX Integration

Add timed sound effects to Remotion video components. Voiceover always stays
at full volume — SFX are background elements that support, never compete.

## Prerequisites

- Remotion project with `@remotion/media` installed
- SFX catalog JSON (defines durations, tags, default volumes per sound)
- Audio WAV/MP3 files accessible via `staticFile()`
- Components with scene-based structure (frame ranges per scene)

## Step 1: Map the Scene Structure

Before adding any SFX, extract the frame boundaries from the component.
Every scene has exact start/end frames — these are non-negotiable anchor
points for SFX timing.

```
Scene 1 Hook:       frames    0 – 150
Scene 2 Positive:   frames  150 – 660
Scene 3 Negative:   frames  660 – 960
Scene 4 Habits:     frames  960 – 1380
Scene 5 Facts:      frames 1380 – 1560
Scene 6 Instructions: frames 1560 – 1770
Scene 7 Stories:    frames 1770 – 1950
Scene 8 CTA:        frames 1950 – 2190
```

Read the component to find:
1. The frame ranges in the parent component's conditional renders
   (`{frame >= X && frame < Y && <SceneComponent />}`)
2. Local frame offsets in each scene sub-component
   (`spring({ frame: frame - OFFSET })`)
3. `interpolate()` keyframes for element appearances

## Step 2: Read the SFX Catalog

The catalog JSON has entries like:
```json
{
  "id": "fast-whoosh",
  "duration_ms": 395,
  "tags": ["whoosh", "transition"],
  "default_volume": 0.45
}
```

Key fields:
- `id`: Maps to the filename (e.g., `fast-whoosh` → `fast-whoosh.wav`)
- `duration_ms`: **Critical** — determines if an SFX will bleed into the
  next scene. Convert to frames: `duration_ms / 1000 * fps`
- `tags`: Helps pick the right SFX for the right moment

Duration awareness prevents bleed. At 30fps:
- `fast-whoosh` (395ms = ~12 frames) — safe for any scene
- `pop-hand` (348ms = ~10 frames) — safe for any scene
- `deep-whoosh` (3228ms = ~97 frames) — **will bleed 3+ seconds**,
  only use at major scene transitions where overlap is acceptable
- `base-drop` (3297ms = ~99 frames) — same, avoid within short scenes

## Step 3: Choose SFX for Each Moment

Match SFX type to the visual event:

| Visual Event | SFX Type | Example |
|---|---|---|
| Scene transition (major) | deep-whoosh, swish-whoosh-large | Scene 1→2 |
| Scene transition (quick) | fast-whoosh | Scene 3→4 |
| Element pop-in | pop-hand | Cards, rules, examples appearing |
| Mouse click action | mouse-click-1 | Interactive UI simulations |
| Camera/flash moment | camera-shutter-1-shot | Clapperboard, photos |
| Notification/follow | notification-ding | CTA buttons |
| Long ambient effect | water_boils, keyboard-typing | Must be clipped (see Step 5) |

Every visual element that appears with its own animation should get a
matching SFX. If three examples pop in at different frames, each needs
its own `pop-hand` at that exact frame.

## Step 4: Add SFX with Correct Timing

### Frame alignment rule

SFX frame numbers MUST match scene boundary frames exactly. Being off by
even 2 frames causes the sound to fire before the visual appears.

**Wrong:** `<Sequence from={148}>` when Scene 2 starts at frame 150
**Right:** `<Sequence from={150}>` — exact scene boundary

**Wrong:** `<Sequence from={658}>` when Scene 3 starts at frame 660
**Right:** `<Sequence from={660}>` — exact scene boundary

### SFX placement in the component

Place all SFX `<Sequence>` blocks right after the voiceover `<Audio>` and
before any visual `<div>` elements. This keeps audio logic grouped together.

```tsx
<AbsoluteFill>
  {/* Main Voiceover — ALWAYS first, no volume prop (defaults to 1.0) */}
  <Audio src={staticFile('assets/sounds/voicceover/voiceover.wav')} />

  {/* SFX — Scene Transitions & Key Moments (low volume, voiceover is priority) */}
  <Sequence from={5}>
    <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.20} />
  </Sequence>
  <Sequence from={150}>
    <Audio src={staticFile('assets/sounds/sfx/waven-sfx/deep-whoosh.wav')} volume={0.15} />
  </Sequence>
  {/* ... more SFX ... */}

  {/* Visual elements below */}
  <div style={{ ... }}>
```

### Volume guidelines

Voiceover is the main audio — it MUST stay at default volume (1.0). SFX
are atmospheric and should sit underneath:

| SFX Type | Volume Range | Reasoning |
|---|---|---|
| Transition whooshes | 0.15 – 0.18 | Brief, shouldn't draw attention |
| Element pops/clicks | 0.15 – 0.20 | Quick punctuation, not dominant |
| Long ambient effects | 0.10 – 0.15 | Sustained, would overpower if loud |
| Impact/dramatic | 0.18 – 0.20 | Slightly louder for emphasis |

Never exceed 0.25 for any SFX. If it sounds loud at 0.20, it will
absolutely drown out speech at normal listening volume.

### Basic SFX pattern

```tsx
{/* SFX – Scene Transitions & Key Moments (low volume, voiceover is priority) */}

{/* Hook entrance */}
<Sequence from={5}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.20} />
</Sequence>

{/* Scene 1→2 transition */}
<Sequence from={150}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/deep-whoosh.wav')} volume={0.15} />
</Sequence>

{/* +s rule highlight appears */}
<Sequence from={310}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.20} />
</Sequence>

{/* Example 1: "I study law" */}
<Sequence from={480}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
</Sequence>

{/* Example 2: "She likes reading" */}
<Sequence from={540}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
</Sequence>

{/* Example 3: "He studies law" — MUST have SFX like the first two */}
<Sequence from={595}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
</Sequence>

{/* Scene 2→3 transition */}
<Sequence from={660}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/swish-whoosh-large.wav')} volume={0.18} />
</Sequence>

{/* Question card appears — MUST have SFX like the negative card */}
<Sequence from={810}>
  <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.18} />
</Sequence>
```

## Step 5: Clip Long Audio Files

Any SFX that is longer than the scene it belongs to MUST be clipped.
Otherwise it bleeds into the next scene and plays over the wrong visuals.

Use `durationInFrames` on the `<Sequence>` to enforce a hard stop:

```tsx
{/* water_boils.wav is long — clip it to Scene 5's duration */}
<Sequence from={1400} durationInFrames={160}>
  <Audio src={staticFile('assets/sounds/sfx/other/water_boils.wav')} volume={0.12} />
</Sequence>
```

Calculate `durationInFrames`:
```
Scene end frame − SFX start frame = durationInFrames
1560 − 1400 = 160 frames
```

This works because Remotion's `<Sequence>` acts as a time boundary — when
the sequence ends, all children (including audio) stop immediately.

## Common Pitfalls (and how to avoid them)

### 1. Missing SFX on identical elements

**Problem:** First two examples have `pop-hand`, third example has nothing.
**Why it happens:** The third element's frame was calculated separately and
the SFX was overlooked.
**Fix:** After adding SFX, audit every `spring()` or `interpolate()` in
each scene sub-component. Each one that controls an element's appearance
needs a matching SFX at the corresponding global frame.

Global frame = scene start frame + local frame offset

### 2. SFX volume competing with voiceover

**Problem:** SFX at 0.5–0.7 drown out the voiceover.
**Fix:** Drop all SFX to 0.12–0.20 range. Voiceover stays at 1.0.
The ear perceives speech as dominant when SFX are 12–20% volume.

### 3. Long SFX bleeding into wrong scenes

**Problem:** `deep-whoosh` (3.2s) or `base-drop` (3.3s) plays over the
next scene's visuals.
**Fix:** Either clip with `durationInFrames`, or replace long SFX with
shorter alternatives (`fast-whoosh` at 395ms) at scene transitions.

### 4. Frame numbers off by 2–3 frames

**Problem:** SFX fires before the visual element appears (sound before
sight feels wrong).
**Fix:** Use exact scene boundary frames. If Scene 3 starts at frame 660,
the transition SFX must be `<Sequence from={660}>`, not `from={658}`.

### 5. Audio file path wrong

**Problem:** `staticFile()` path doesn't match the actual file location.
**Fix:** `staticFile()` paths are relative to the `public/` directory.
File at `public/assets/sounds/sfx/waven-sfx/fast-whoosh.wav` becomes:
`staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')`

## File Path Reference

```
public/
├── assets/sounds/
│   ├── voicceover/          ← Voiceover files (note the typo in directory name)
│   │   └── present-simple.wav
│   └── sfx/
│       ├── waven-sfx/       ← Main SFX catalog files
│       │   ├── fast-whoosh.wav
│       │   ├── deep-whoosh.wav
│       │   ├── pop-hand.wav
│       │   └── ... (35 files)
│       ├── waven-sfx-catalog.json  ← Duration/tag metadata
│       └── other/           ← Special/one-off SFX
│           └── water_boils.wav
```

## Checklist Before Finishing

- [ ] Voiceover `<Audio>` has NO volume prop (stays at 1.0)
- [ ] Every scene transition has a whoosh/swish SFX
- [ ] Every element pop-in (`spring()` / `interpolate()`) has a matching SFX
- [ ] All SFX volumes are ≤ 0.20
- [ ] All SFX frame numbers match exact scene boundary frames
- [ ] Long audio files have `durationInFrames` to clip them
- [ ] No SFX bleeds past its scene's end frame
- [ ] Run `npm run lint` — no new errors introduced
