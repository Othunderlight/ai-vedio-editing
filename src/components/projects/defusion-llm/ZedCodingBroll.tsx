import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { HOOK_BG } from "./HookBroll";
import { PANEL_H } from "./DiffusionExplainerBroll";

// Split-screen coding demo — 1920-2370 (1920 = "فـ مثلاً، إذا عندي JSON",
// ends right before "أو إذا بدي مثلاً أكتب function سريعة").
// Both clips are full-bleed in the top panel (no container, like dllm.mkv),
// each in its own <Sequence> so it's an interactive/selectable layer in Studio.
//   clip 1: zed.mkv    0:11-0:19 (startFrom 330), local 0-240   -> global 1920-2160
//   breath: off-white panel only, local 240-270                  -> global 2160-2190
//   clip 2: inline.mkv 0:31-0:37 (startFrom 930), local 270-450 -> global 2190-2370
// Both muted — voiceover stays on top.

const CLIP1_DURATION = 240;
const CLIP2_START = 270;
const CLIP2_DURATION = 180;

const ZED_START_FROM = 330;
const INLINE_START_FROM = 930;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ClipVideo: React.FC<{
  asset: string;
  startFrom: number;
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
}> = ({ asset, startFrom, durationInFrames, fadeIn = 0, fadeOut = 0 }) => {
  // Frame is local to the parent <Sequence>
  const frame = useCurrentFrame();

  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, fadeIn], [0, 1], clamp)
    : 1;
  const fadeOutOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - fadeOut, durationInFrames],
        [1, 0],
        clamp
      )
    : 1;

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeInOpacity, fadeOutOpacity) }}>
      <OffthreadVideo
        src={staticFile(asset)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

export const ZedCodingBroll: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Top panel — face video stays visible below PANEL_H */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: PANEL_H,
          overflow: "hidden",
          backgroundColor: HOOK_BG,
        }}
      >
        {/* Clip 1 — zed.mkv, fades out into the off-white breath */}
        <Sequence
          durationInFrames={CLIP1_DURATION}
          name="zed.mkv 0:11-0:19"
          style={{
            transformOrigin: "100% 50%"
          }}
        >
          <ClipVideo
            asset="projects/defusion-llm/assets/zed.mkv"
            startFrom={ZED_START_FROM}
            durationInFrames={CLIP1_DURATION}
            fadeOut={8}
          />
        </Sequence>

        {/* Clip 2 — inline.mkv, fades in from the breath, runs to section end */}
        <Sequence
          from={CLIP2_START}
          durationInFrames={CLIP2_DURATION}
          name="inline.mkv 0:31-0:37"
        >
          <ClipVideo
            asset="projects/defusion-llm/assets/inline.mkv"
            startFrom={INLINE_START_FROM}
            durationInFrames={CLIP2_DURATION}
            fadeIn={8}
          />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
