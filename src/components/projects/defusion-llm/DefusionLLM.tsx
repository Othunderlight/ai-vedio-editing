import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { DefusionLLMCaptions } from "./DefusionLLMCaptions";

const PROJECT_RAW = "projects/defusion-llm/raw";

// Face video ends at ~90.63s => 2719 frames at 30fps
const VIDEO_END = 2719;

export const DefusionLLM: React.FC = () => {
  const frame = useCurrentFrame();

  const videoOpacity = interpolate(frame, [VIDEO_END - 15, VIDEO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        }}
      />

      {/* 2. Voiceover audio */}
      <Audio src={staticFile(`${PROJECT_RAW}/audio_only.mp3`)} />

      {/* 3. Captions — on top, bottom-pill while face visible */}
      <DefusionLLMCaptions />
    </AbsoluteFill>
  );
};
