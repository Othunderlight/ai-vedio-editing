import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { HOOK_BG } from "./HookBroll";
import { PANEL_H } from "./DiffusionExplainerBroll";

// Split-screen coding demo — 1920-2370 (1920 = "فـ مثلاً، إذا عندي JSON",
// ends right before "أو إذا بدي مثلاً أكتب function سريعة").
// Two clips, full-bleed in the top panel (no container, like dllm.mkv):
//   clip 1: zed.mkv    0:11-0:19 (startFrom 330), local 0-240   -> global 1920-2160
//   breath: off-white panel only, local 240-270                  -> global 2160-2190
//   clip 2: inline.mkv 0:31-0:37 (startFrom 930), local 270-450 -> global 2190-2370
// Both muted — voiceover stays on top.

const CLIP1_END = 240;
const CLIP2_START = 270;

const ZED_START_FROM = 330;
const INLINE_START_FROM = 930;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const ZedCodingBroll: React.FC = () => {
  const frame = useCurrentFrame();

  // Overlay handles the section's in/out fades (0-6 / 444-450);
  // only the hand-off between the two clips needs its own crossfade beat.
  const clip1Opacity = interpolate(frame, [CLIP1_END - 8, CLIP1_END], [1, 0], clamp);
  const clip2Opacity = interpolate(frame, [CLIP2_START, CLIP2_START + 8], [0, 1], clamp);

  const panelStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: PANEL_H,
    overflow: "hidden",
    backgroundColor: HOOK_BG,
  };

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <AbsoluteFill>
      <div style={panelStyle}>
        {frame < CLIP1_END && (
          <div style={{ position: "absolute", inset: 0, opacity: clip1Opacity }}>
            <OffthreadVideo
              src={staticFile("projects/defusion-llm/assets/zed.mkv")}
              startFrom={ZED_START_FROM}
              muted
              style={videoStyle}
            />
          </div>
        )}

        {frame >= CLIP2_START && (
          <div style={{ position: "absolute", inset: 0, opacity: clip2Opacity }}>
            <OffthreadVideo
              src={staticFile("projects/defusion-llm/assets/inline.mkv")}
              startFrom={INLINE_START_FROM}
              muted
              style={videoStyle}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
