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
    <AbsoluteFill
      style={{
        opacity: Math.min(fadeInOpacity, fadeOutOpacity),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OffthreadVideo
        src={staticFile(asset)}
        startFrom={startFrom}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

export const ZedCodingBroll: React.FC = () => {
  return (
    <AbsoluteFill>
      {/*
        This container strictly contains the video AND the HOOK_BG color.
        clipPath: "inset(0)" guarantees that neither the background color
        nor the scaled video can spill out or trim the caption underneath.
      */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: PANEL_H,
          backgroundColor: HOOK_BG,
          clipPath: "inset(0px 0px 0px 0px)",
        }}
      >
        {/* Clip 1 — preserves your Studio transforms */}
        <Sequence
          durationInFrames={CLIP1_DURATION}
          name="zed.mkv 0:11-0:19"
          style={{
            width: "100%",
            height: "100%",
            scale: 1.487,
            translate: "263px -8.6px",
          }}
        >
          <ClipVideo
            asset="projects/defusion-llm/assets/zed.mkv"
            startFrom={ZED_START_FROM}
            durationInFrames={CLIP1_DURATION}
            fadeOut={8}
          />
        </Sequence>

        {/* Clip 2 — preserves your Studio transforms */}
        <Sequence
          from={CLIP2_START}
          durationInFrames={CLIP2_DURATION}
          name="inline.mkv 0:31-0:37"
          style={{
            width: "100%",
            height: "100%",
            scale: 2.009,
            translate: "139.7px 32.6px",
          }}
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
