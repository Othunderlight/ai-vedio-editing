import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WhyILoveDjangoCaptions } from "./WhyILoveDjangoCaptions";
import { useVideoDuration } from "./useVideoDuration";
import { RecordVsTableBroll } from "./RecordVsTableBroll";

const PROJECT = "why-i-love-django";
const PROJECT_ASSETS = `projects/${PROJECT}/assets`;
const PROJECT_RAW = `projects/${PROJECT}/raw`;

const VIDEO_END = 1646;

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

  return <AbsoluteFill
    style={{
      opacity
    }}
    from={-1}
  >{children}</AbsoluteFill>;
};

const HIDE_CAPTIONS_RANGES: { from: number; to: number }[] = [
  { from: 870, to: 990 },
  { from: 1140, to: 1230 },
  { from: 1290, to: 1620 },

];

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

export const WhyILoveDjango: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adminDuration = useVideoDuration(`${PROJECT_ASSETS}/admin_screen_recording.mp4`);

  const bRollDurationSec = (1620 - 1290) / fps;
  const adminStartFrom = adminDuration
    ? Math.round((adminDuration - bRollDurationSec) * fps)
    : 0;

  const videoOpacity = interpolate(frame, [VIDEO_END - 15, VIDEO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <OffthreadVideo
        src={staticFile(`${PROJECT_RAW}/mian.mp4`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoOpacity,
        }}
      />

      <Audio src={staticFile(`${PROJECT_RAW}/main.mp3`)} />

      <BRollOverlay fromFrame={870} toFrame={990}>
        <RecordVsTableBroll />
      </BRollOverlay>

      <BRollOverlay fromFrame={1140} toFrame={1230}>
        <AbsoluteFill
          style={{
            backgroundColor: "#0D1117",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(`${PROJECT_ASSETS}/django_simple_history.png`)}
            style={{
              width: "85%",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </AbsoluteFill>
      </BRollOverlay>

      <BRollOverlay fromFrame={1290} toFrame={1620}>
        <AbsoluteFill
          style={{
            backgroundColor: "#0D1117",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OffthreadVideo
            src={staticFile(`${PROJECT_ASSETS}/admin_screen_recording.mp4`)}
            startFrom={adminStartFrom}
            style={{
              width: "90%",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      </BRollOverlay>

      <BRollOverlay fromFrame={1800} toFrame={1860}>
        <AbsoluteFill
          style={{
            backgroundColor: "#0D1117",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(`${PROJECT_ASSETS}/code_1.png`)}
            style={{
              width: "85%",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </AbsoluteFill>
      </BRollOverlay>

      <BRollOverlay fromFrame={1860} toFrame={2040}>
        <AbsoluteFill
          style={{
            backgroundColor: "#0D1117",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(`${PROJECT_ASSETS}/code_2.png`)}
            style={{
              width: "85%",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </AbsoluteFill>
      </BRollOverlay>

      <WhyILoveDjangoCaptions hideRanges={HIDE_CAPTIONS_RANGES} />
    </AbsoluteFill>
  );
};
