import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Video,
  OffthreadVideo,
  staticFile,
} from "remotion";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["700", "800", "900"],
});

interface WordTiming {
  word: string;
  startTime: number;
  endTime: number;
  index: number;
}

const WORDS: WordTiming[] = [
  { word: "احذر", startTime: 0.35, endTime: 0.95, index: 0 },
  { word: "توقع", startTime: 0.95, endTime: 1.4, index: 1 },
  { word: "بفخ", startTime: 1.4, endTime: 2.1, index: 2 },
  { word: "كلود", startTime: 2.15, endTime: 2.75, index: 3 },
  { word: "ثم", startTime: 2.8, endTime: 3.15, index: 4 },
  { word: "كلود", startTime: 3.2, endTime: 3.85, index: 5 },
  { word: "ثم", startTime: 3.9, endTime: 4.2, index: 6 },
  { word: "كلود", startTime: 4.25, endTime: 4.85, index: 7 },
  { word: "ثم", startTime: 4.9, endTime: 5.25, index: 8 },
  { word: "ما", startTime: 5.3, endTime: 5.65, index: 9 },
  { word: "حدا", startTime: 5.65, endTime: 6.35, index: 10 },
];

const ClaudeWord: React.FC<{
  timing: WordTiming;
  frame: number;
  fps: number;
  claudeCount: number;
}> = ({ timing, frame, fps, claudeCount }) => {
  const startFrame = Math.round(timing.startTime * fps);
  const endFrame = Math.round(timing.endTime * fps);
  const durationFrames = endFrame - startFrame;
  const localFrame = frame - startFrame;

  if (localFrame < -2 || frame > endFrame + 8) return null;

  // First كلود = text, second and third = logo
  const isClaude = timing.word === "كلود";
  const isClaudeLogo = isClaude && claudeCount >= 1;

  // Entrance spring
  const entranceSpring = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 150 },
  });

  // Exit fade
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 4, durationFrames + 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scale based on Claude count (each Claude gets bigger)
  const claudeScale = isClaude ? 1 + claudeCount * 0.18 : 1;

  // "بفخ" gets special shake effect
  const isBafakh = timing.word === "بفخ";
  const shakeX = isBafakh
    ? Math.sin(localFrame * 1.8) * interpolate(localFrame, [0, durationFrames], [6, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  // Base scale animation
  const baseScale = interpolate(entranceSpring, [0, 1], [0.3, 1]);
  const finalScale = baseScale * claudeScale;

  // Opacity
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Y position - words slide up from below
  const translateY = interpolate(entranceSpring, [0, 1], [50, 0]) - exitProgress * 30;

  // "ما حدا" gets slam effect - starts bigger and slams down
  const isMaHada = timing.word === "ما" || timing.word === "حدا";
  const slamScale = isMaHada
    ? interpolate(localFrame, [0, 3], [1.4, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const color = isClaude ? "#D97757" : "#F6F1EB";
  const glowIntensity = isClaude ? 0.6 + claudeCount * 0.15 : 0;
  const claudeLogoSize = isClaudeLogo ? 220 + claudeCount * 80 : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: `translate(-50%, -50%) translateY(${translateY}px) translateX(${shakeX}px) scale(${finalScale * slamScale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {isClaudeLogo ? (
        <svg
          height={claudeLogoSize}
          width={claudeLogoSize}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: `drop-shadow(0 0 ${20 * glowIntensity}px rgba(217, 119, 87, ${glowIntensity})) drop-shadow(0 4px 20px rgba(0,0,0,0.9))`,
          }}
        >
          <path
            d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
            fill="#D97757"
            fillRule="nonzero"
          />
        </svg>
      ) : (
        <div
          style={{
            fontFamily: alexandriaFont,
            fontSize: isClaude ? 180 : 90,
            fontWeight: 900,
            color,
            textShadow: isClaude
              ? `0 0 ${30 * glowIntensity}px rgba(217, 119, 87, ${glowIntensity}), 0 4px 20px rgba(0,0,0,0.9)`
              : "0 4px 20px rgba(0,0,0,0.9)",
            whiteSpace: "nowrap",
            direction: "rtl",
          }}
        >
          {timing.word}
        </div>
      )}
    </div>
  );
};

export const KineticWithVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  return (
    <AbsoluteFill>
      {/* Background video */}
      <OffthreadVideo
        src={staticFile("assets/rawvedio/claude.mp4")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Kinetic typography overlay */}
      <AbsoluteFill
        style={{
          overflow: "hidden",
        }}
      >
        {WORDS.map((timing) => (
          <ClaudeWord
            key={timing.index}
            timing={timing}
            frame={frame}
            fps={fps}
            claudeCount={
              timing.word === "كلود"
                ? WORDS.filter(
                    (w) =>
                      w.word === "كلود" &&
                      w.index < timing.index &&
                      currentTime >= w.startTime
                  ).length
                : 0
            }
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
