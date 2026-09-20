---
name: remotion-B-roll-generator
description: Generate Remotion B-roll animation components and composition timelines from video editor script JSON containing captions, frame ranges, and B-roll specifications. Use this skill whenever the user provides video scripts, caption cuts, or B-roll metadata to build or update Remotion animations, whether generating programmatic visuals (SVGs, code animations, logos, graphs) or composing existing assets into a master timeline.
---

# Remotion B-Roll Generator

This skill guides you to generate production-ready Remotion components and composition timelines from structured video editor JSON inputs (captions and B-roll cues).

---

## 1. Input Specifications

The input is provided as a JSON payload with the following schema:

- **`video_format`**: `"portrait"` (1080x1920), `"landscape"` (1920x1080), or `"square"` (1080x1080). Default to 30 FPS unless specified otherwise.
- **`captions`**: Context of what the speaker is saying at each frame range. Use this as creative context to inform tone, rhythm, and visual storytelling.
- **`b_rolls`**: Array of visual cues to produce:
  - `from_frame` & `to_frame`: Exact timing boundaries. `durationInFrames = to_frame - from_frame`.
  - `source_type`:
    - `"generate_new"`: Requires building a standalone animated Remotion component based on `generation_prompt` and `reason`.
    - `"existing_asset"`: References an asset via `asset_id` (matched in `public/projects/<project-name>/assets/`).

---

## 2. Discovery & Context Exploration

1. **Inspect Existing B-Rolls & Components:**
   - Look inside `src/components/general/B-rolls/`, `src/components/general/captions/`, `src/components/general/final/` to match existing file naming conventions, import styles, and animation patterns.
   - Read at least 2-3 existing B-roll components to understand spring configs, interpolation patterns, and color schemes.
2. **Verify Asset Directory Structure:**
   - Specific Assets live in `public/projects/<project-name>/assets/`
   - Raw video/audio live in `public/projects/<project-name>/raw/`
   - General Assets (like logos) live in `public/assets/`
3. Find on the internet the assets that do not exist and download them, place them in the relevant general or project-specific assets.

---

## 3. Project Structure

```
src/components/projects/<project-name>/
├── <ComponentName>Broll.tsx      # Each generate_new B-roll
├── <ProjectName>Captions.tsx     # Caption overlays
└── <ProjectName>.tsx             # Master composition
```

All project components go in `src/components/projects/<project-name>/`. NOT in `src/projects/`.

---

## 4. CRITICAL: VEDIO B-Roll Overlay Pattern (Sequence Wrapper)

**This is the most important rule. Every B-roll MUST use `<Sequence>` to wrap its content.**

### Why?

`useCurrentFrame()` returns the **global** composition frame. If you render a B-roll at global frame 1320 without `<Sequence>`, then:
- `OffthreadVideo` receives `frame=1320` and tries to seek to that point instead of playing from the start
- `spring()` receives `frame=1320` and is already settled — no entrance animation
- Everything breaks

### The Correct Pattern

```tsx
const BRollOverlay: React.FC<{
  fromFrame: number;
  toFrame: number;
  children: React.ReactNode;
}> = ({ fromFrame, toFrame, children }) => {
  const durationInFrames = toFrame - fromFrame;

  return (
    <Sequence from={fromFrame} durationInFrames={durationInFrames}>
      <BRollFadeWrapper durationInFrames={durationInFrames}>
        {children}
      </BRollFadeWrapper>
    </Sequence>
  );
};

const BRollFadeWrapper: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame(); // NOW returns 0 locally!

  const fadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
```

### What `<Sequence>` does:
1. **Remounts children at `from` frame** — `OffthreadVideo` starts fresh from frame 0 of the video file
2. **Resets `useCurrentFrame()` inside** — children see `frame=0` locally, so springs animate and videos play from the beginning
3. **Auto-unmounts after duration** — no manual `if (frame < from) return null` needed

### ❌ NEVER DO THIS:
```tsx
// WRONG — frame is global, springs settled, video seeks wrong position
const frame = useCurrentFrame();
if (frame < fromFrame || frame > toFrame) return null;
// ... render children with global frame
```

---

## 5. Video Playback Rules

- **Always use `OffthreadVideo`** (not `<Video>`) for video elements. `<Video>` does not work correctly during rendering.
- **`OffthreadVideo` only plays when wrapped in `<Sequence>`**. Without `<Sequence>`, it shows only the first frame as a static image.
- Face/camera videos: use `objectFit: "cover"` to fill the frame.
- Screen recordings: use `objectFit: "contain"` or wrap in a styled container with border-radius and shadow.

---

## 6. Master Composition Pattern

```tsx
export const MyProject: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade out face video when it ends
  const videoOpacity = interpolate(frame, [VIDEO_END - 10, VIDEO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* 1. Base layer: face/camera video */}
      <OffthreadVideo
        src={staticFile(`${PROJECT_RAW}/video.mp4`)}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: videoOpacity }}
      />

      {/* 2. Voiceover audio — duration should match audio length, not video */}
      <Audio src={staticFile(`${PROJECT_RAW}/audio.mp3`)} />

      {/* 3. B-roll overlays — each wrapped in Sequence via BRollOverlay */}
      <BRollOverlay fromFrame={0} toFrame={60}>
        <IntroBroll />
      </BRollOverlay>

      <BRollOverlay fromFrame={540} toFrame={630}>
        <CodeOverlay assetFile="code.png" />
      </BRollOverlay>

      {/* 4. Captions — always on top */}
      <MyProjectCaptions />
    </AbsoluteFill>
  );
};
```

### Duration rule:
Set `durationInFrames` in Root.tsx to match the **audio** length, not the video. Use `ffprobe` to check:
```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 file.mp3
```
Then multiply by FPS (usually 30).

---

## 7. Caption System

Captions have **two modes** based on what's visually on screen at that moment:

### Mode 1: Bottom pill (default)
Used when **any video is visible** — face/camera video OR B-roll overlay. The pill sits at the bottom of the screen, semi-transparent, so it doesn't compete with the visual content.

**CRITICAL: Instagram UI safe zone.** Instagram Reels overlays UI elements on the bottom ~300px (username, caption, likes) and right side (heart, comment, share, save icons). Always use `bottom: 340` or higher to keep captions visible above the Instagram frame.

```tsx
<div style={{
  position: "absolute",
  bottom: 340,
  fontFamily: alexandriaFont,
  fontSize: 40,
  fontWeight: 800,
  color: "#FFFFFF",
  direction: "rtl",
  padding: "12px 28px",
  borderRadius: 12,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  backdropFilter: "blur(8px)",
  textShadow: "0 2px 12px rgba(0, 0, 0, 0.7)",
  whiteSpace: "normal",
  width: "90%",        
  lineHeight: 1.4,
  textAlign: "center",
}}>
  {text}
</div>
```

### Mode 2: Kinetic word-by-word (dark background only)
Used **only when there's no face video AND no B-roll** — pure dark background sections. One word at a time, centered, large, animated.

```tsx
// Split caption into words, show each for equal time
const words = entry.text.split(" ");
const framesPerWord = duration / words.length;
const activeIndex = Math.floor(localFrame / framesPerWord);

// Simple fade in/out per word — keep it clean and readable
const fadeIn = interpolate(wordLocalFrame, [0, 5], [0, 1], { ... });
const fadeOut = interpolate(wordLocalFrame, [framesPerWord - 5, framesPerWord], [1, 0], { ... });
```

Style: `fontSize: 76`, `fontWeight: 800`, centered, no text shadow, no scale animation. Keep it simple so the viewer can easily read each word.

### Decision logic (in order):

```
Is face video visible at this frame?
├── YES → bottom pill
└── NO → Is a B-roll active at this frame?
    ├── YES → bottom pill
    └── NO → kinetic word-by-word
```

**Key:** The face video end frame is NOT in the input JSON — you must determine it from the raw video duration (`ffprobe` on the face `.mp4`). Store it as a constant (e.g., `FACE_VIDEO_END`) in the captions component.

---

## 8. B-Roll Component Rules

### Graphics scaling for portrait mobile:
**Scale all B-roll graphics by 1.5x.** Portrait mobile screens need larger visuals. Apply via `transform: scale(${springValue * 1.5})` on the inner content wrapper.

### Generate_new B-rolls (SVG/animated):
- Use `spring()` for entrance: `{ mass: 0.6, damping: 10, stiffness: 150 }`
- Use `interpolate()` for exit fade: last 8 frames before `durationInFrames`
- Pulse/breathe effects: `Math.sin((frame / fps) * Math.PI * 2) * amplitude + base`
- Dark backgrounds (`#0D1117`) with radial gradient glows matching the accent color

### Existing asset B-rolls (images/video):
- Wrap in a styled container: `borderRadius: 16`, `boxShadow`, subtle `border`
- Use `spring()` for scale entrance: `interpolate(pop, [0, 1], [0.92, 1])`
- Images: use `<Img src={staticFile(...)} />`
- Videos: use `<OffthreadVideo src={staticFile(...)} />` inside `<Sequence>`

### Video B-roll: show the END of the video, not the start
By default, `OffthreadVideo` plays from frame 0. For screen recordings and video clips, the user usually wants to see the **end result**, not the beginning. Use `startFrom` to skip to the end:

```tsx
// Get video length: ffprobe -v error -show_entries stream=nb_frames -select_streams v:0 -of csv=p=0 file.mp4
const VIDEO_LENGTH = 532; // total frames of the video file
const B_ROLL_DURATION = toFrame - fromFrame; // how long the overlay is visible

<OffthreadVideo
  src={staticFile(...)}
  startFrom={VIDEO_LENGTH - B_ROLL_DURATION} // start near the end
  style={{ ... }}
/>
```

**Why:** `startFrom={VIDEO_LENGTH - B_ROLL_DURATION}` makes the video play its last `B_ROLL_DURATION` frames, so it ends exactly when the overlay ends. Always use `ffprobe` to get the real video length — don't guess.

---

## 9. Asset Mapping

The input JSON references `asset_id` values. Map them to actual files:

```tsx
const PROJECT = "my-project";
const PROJECT_ASSETS = `projects/${PROJECT}/assets`;
const PROJECT_RAW = `projects/${PROJECT}/raw`;

// In components:
staticFile(`${PROJECT_ASSETS}/code.png`)
staticFile(`${PROJECT_RAW}/video.mp4`)
staticFile(`${PROJECT_RAW}/audio.mp3`)
```

Check the asset directory first to verify exact filenames and extensions.

---

## 10. Root.tsx Registration

```tsx
import { MyProject } from "./components/projects/my-project/MyProject";

// Inside RemotionRoot:
<Folder name="my-project">
  <Composition
    id="MyProject-Portrait"
    component={MyProject}
    durationInFrames={2074}  // Match audio length
    fps={30}
    width={1080}
    height={1920}
  />
</Folder>
```

---

## 11. TypeScript & Lint

After creating all files, ALWAYS run:
```bash
npx tsc --noEmit 2>&1 | grep "<project-name>"
npx eslint src/components/projects/<project-name>/
```

Fix unused imports and variables. Common issues:
- `Sequence` imported but unused (only needed in master comp)
- `useCurrentFrame` or `fps` imported but unused in sub-components
- `Video` imported — should be `OffthreadVideo` instead

---

## 12. Complete Checklist

For each new project:

1. [ ] Read input.json, understand video_format, captions, b_rolls
2. [ ] Explore existing components for patterns
3. [ ] Create project folder: `src/components/projects/<name>/`
4. [ ] Check asset directory for existing files
5. [ ] Create each `generate_new` B-roll as a standalone component
6. [ ] Create captions component (bottom pill for face + B-roll, kinetic for no-video sections)
7. [ ] Create master composition with `<Sequence>`-wrapped `<BRollOverlay>`
8. [ ] Add `<Audio>` for voiceover
9. [ ] Set composition duration to match audio length
10. [ ] Register in Root.tsx
11. [ ] Run typecheck and lint
12. [ ] Verify `<OffthreadVideo>` is used (never `<Video>`)
13. [ ] Verify all B-rolls are wrapped in `<Sequence>`
14. [ ] Scale graphics 1.5x for portrait mobile

---

## finally:
use the other available remotion skills you have if needed.
