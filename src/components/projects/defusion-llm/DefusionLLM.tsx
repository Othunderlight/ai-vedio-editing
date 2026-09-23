import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { DefusionLLMCaptions, SPLIT_RANGES } from "./DefusionLLMCaptions";
import { HookBroll } from "./HookBroll";
import { DiffusionExplainerBroll } from "./DiffusionExplainerBroll";
import { EditVsDiffusionBroll } from "./EditVsDiffusionBroll";

const PROJECT_RAW = "projects/defusion-llm/raw";

// Face video ends at ~90.63s => 2719 frames at 30fps
const VIDEO_END = 2719;

const BRollFadeWrapper: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();

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

export const DefusionLLM: React.FC = () => {
  const frame = useCurrentFrame();

  const videoOpacity = interpolate(frame, [VIDEO_END - 15, VIDEO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Split sections: hard CUT (no zoom animation) — the face snaps to the
  // reframed framing exactly on the boundary frame, like a jump cut
  const inSplit = SPLIT_RANGES.some(
    (r) => frame >= r.from_frame && frame < r.to_frame
  );
  const splitT = inSplit ? 1 : 0;

  const faceScale = 1 + 0.3 * splitT;
  const faceShift = 270 * splitT;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* 1. Base layer: face/camera video — 1080x1920 portrait, cover */}
      <OffthreadVideo
        src={staticFile(`${PROJECT_RAW}/video_only.mp4`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoOpacity,
          transform: `translateY(${faceShift}px) scale(${faceScale})`,
        }}
      />

      {/* 2. Voiceover audio */}
      <Audio src={staticFile(`${PROJECT_RAW}/audio_only.mp3`)} />

      {/* 3. Hook B-roll — 0-60 (first 2s) off-white duel, cuted.mp4 on top */}
      <BRollOverlay fromFrame={0} toFrame={60}>
        <HookBroll />
      </BRollOverlay>

      {/* 4. Diffusion explainer — 270-570: card top, face bottom */}
      <BRollOverlay fromFrame={270} toFrame={570}>
        <DiffusionExplainerBroll />
      </BRollOverlay>

      {/* 5. Can't-edit graphic 720-840, dllm.mkv clip 840-1050 (0:35) */}
      <BRollOverlay fromFrame={720} toFrame={1050}>
        <EditVsDiffusionBroll />
      </BRollOverlay>

      {/* 6. Captions — hook / split-boundary / pill */}
      <DefusionLLMCaptions />
    </AbsoluteFill>
  );
};
