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
   - Look inside `src/` (e.g., `src/components/general/B-rolls`, `src/components/general/captions`) to match existing file naming conventions, import styles, and animation patterns.
2. **Verify Asset Directory Structure:**
   - Specific Assets live in `public/projects/<project-name>/assets/`
   - Raw video/audio live in `public/projects/<project-name>/raw/`
   - Genral Assets (like logos..) live in `public/assets/`
3. find on the internet the assets that doensot exists and download them, place them in the relvant genral or project spicific assets 
---

## 3. Workflow & Output Deliverables

First create the project in `src/components/projects/`

### Step A: for every B-Roll, Generate Standalone Components (`generate_new`)

For each B-roll item marked `"generate_new"`:
1. Create a dedicated React component in the project's B-roll folder (e.g., `src/projects/<project-name>/parts/b-roll/<ComponentName>.tsx`).
2. Animation Principles: use the same as the other ones already built `src/components/general/B-rolls/`.


### Step B: genrate the captions component and animations:
1. Create a dedicated React component in the project's B-roll folder (e.g., `src/projects/<project-name>/parts/captions/<ComponentName>.tsx`).
2. Animation Principles: use the same as the other ones already built `src/components/general/captions/`
3. follow the user instructions about the vedio type for animations, or if he dont need captions or just in a specifc places. if the user didnot specify, you dicde based on the vedio context. (same applies for the VFXs)

### Step C: Build the Master Composition (the main component)

Create or update the sequence coordinator component (e.g., `src/projects/<project-name>/<project-name>.tsx`):
do it like i did in `src/components/general/final/KineticWithVideo.tsx` and in `src/components/projects/english-tutorial-instegram/NeoBrutalismReel.tsx`

---

## 4. Aply it in Root:
in `src/Root.tsx` add a new folder with <Composition> for each B-roll and captions we created, as well as the final ouput.

---

## finally:
use the other avilable remotion skills you have if needed.

```
