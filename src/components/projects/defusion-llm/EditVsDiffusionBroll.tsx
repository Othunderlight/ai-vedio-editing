import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HOOK_BG } from "./HookBroll";
import { CARD_H, CARD_TOP, CARD_W, PANEL_H } from "./DiffusionExplainerBroll";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800", "900"],
});

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

// Normal LLM output: two normal lines, then a self-correction aimed at line 1
const LINES = [
  "Step 1: write all the code",
  "Step 2: test it at the end",
  "wait, actually fix line 1: test as you go",
];
// Line timing (local frames): L1 6-30, L2 30-54, L3 54-82
const LINE_RANGES: [number, number][] = [
  [6, 30],
  [30, 54],
  [54, 82],
];
const FIX_LINE_COLOR = "#E45A35";

// Phase A: 0..120 (global 720-840), Phase B: 120..330 (global 840-1050 = 0:35)
const PHASE_B_START = 120;
const PHASE_B_DURATION = 210;

// dllm.mkv trimmed from 0:17 (frame 510 @ 30fps), 7s -> ends 0:24 (inside 0:16-0:27)
const DLLM_START_FROM = 510;

const cardBox: React.CSSProperties = {
  position: "absolute",
  top: CARD_TOP,
  left: "50%",
  transform: "translateX(-50%)",
  width: CARD_W,
  height: CARD_H,
  backgroundColor: "#FFFFFF",
  borderRadius: 30,
  border: "1px solid rgba(0, 0, 0, 0.05)",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.10)",
  boxSizing: "border-box",
  padding: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const DiffusionClip: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: CARD_TOP,
        left: "50%",
        transform: "translateX(-50%)",
        width: CARD_W,
        height: CARD_H,
        borderRadius: 30,
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#0B0D10",
        opacity,
      }}
    >
      <OffthreadVideo
        src={staticFile("projects/defusion-llm/assets/dllm.mkv")}
        startFrom={DLLM_START_FROM}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          fontFamily: alexandriaFont,
          fontSize: 26,
          fontWeight: 800,
          color: "#FFFFFF",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          padding: "10px 20px",
          borderRadius: 10,
          direction: "ltr",
        }}
      >
        Diffusion LLM
      </div>
    </div>
  );
};

export const EditVsDiffusionBroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clamp = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  };

  // --- Phase A: LLM generates 3 lines (3rd is a fix to line 1), backspace blocked ---
  const enter = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const cardScale = interpolate(enter, [0, 1], [0.94, 1]);
  const cardEnterOpacity = interpolate(enter, [0, 1], [0, 1]);

  const typed = LINES.map((line, i) =>
    Math.round(
      interpolate(frame, LINE_RANGES[i], [0, line.length], clamp)
    )
  );
  // Active line (caret lives here) — -1 once all lines are done
  const activeLine = LINE_RANGES.findIndex(
    ([a, b]) => frame >= a && frame < b
  );
  const blink = Math.floor(frame / 8) % 2 === 0;
  const typingDone = frame >= LINE_RANGES[2][1];
  // Solid caret while typing, blinking when idle
  const caretOn = activeLine >= 0 ? true : blink;

  const keyEnter = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { mass: 0.6, damping: 11, stiffness: 150 },
  });
  const keyOpacity = interpolate(frame, [40, 46], [0, 1], clamp);
  // Double press: down-up-down-up
  const keyScale = interpolate(
    frame,
    [86, 89, 93, 97, 101],
    [1, 0.84, 0.96, 0.9, 1],
    clamp
  );

  // Line shakes while backspace fails
  const shake =
    frame >= 88 && frame <= 112
      ? Math.sin((frame - 88) * 1.6) * 9 * (1 - (frame - 88) / 24)
      : 0;

  const badgePop = spring({
    frame: Math.max(0, frame - 96),
    fps,
    config: { mass: 0.5, damping: 10, stiffness: 160 },
  });
  const badgeOpacity = interpolate(frame, [96, 100], [0, 1], clamp);

  // Crossfade A -> B around the handoff (panel background stays)
  const phaseAOpacity =
    cardEnterOpacity *
    interpolate(frame, [PHASE_B_START - 6, PHASE_B_START], [1, 0], clamp);

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
          backgroundColor: HOOK_BG,
        }}
      >
        {/* Phase A card: LLM generates, edit attempt blocked — visual only */}
        <div
          style={{
            ...cardBox,
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: phaseAOpacity,
          }}
        >
          {/* Editor box with 3 generated lines */}
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#F6F5F3",
              border: "1px solid #E8E6E2",
              borderRadius: 18,
              padding: "44px 44px",
              transform: `translateX(${shake}px)`,
            }}
          >
            {LINES.map((line, i) => {
              if (frame < LINE_RANGES[i][0]) return null;
              const isActive =
                activeLine === i || (typingDone && i === LINES.length - 1);

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 50,
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 30,
                      color: i === 2 ? FIX_LINE_COLOR : "#16181C",
                      direction: "ltr",
                      whiteSpace: "pre",
                    }}
                  >
                    {line.slice(0, typed[i])}
                  </span>
                  {isActive ? (
                    <div
                      style={{
                        width: 4,
                        height: 38,
                        marginLeft: 6,
                        backgroundColor:
                          i === 2 ? FIX_LINE_COLOR : "#16181C",
                        opacity: caretOn ? 1 : 0.15,
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Backspace key + blocked badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              marginTop: 40,
            }}
          >
            <div
              style={{
                opacity: keyOpacity,
                transform: `translateY(${interpolate(
                  keyEnter,
                  [0, 1],
                  [30, 0]
                )}px) scale(${keyScale})`,
              }}
            >
              <svg width="104" height="66" viewBox="0 0 104 66">
                <path
                  d="M36 4 H94 A8 8 0 0 1 102 12 V54 A8 8 0 0 1 94 62 H36 L4 33 Z"
                  fill="#16181C"
                />
                <path
                  d="M56 22 L80 44 M80 22 L56 44"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: badgeOpacity,
                transform: `scale(${badgePop})`,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34">
                <path
                  d="M7 7 L27 27 M27 7 L7 27"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Phase B: diffusion screen recording */}
        <Sequence
          from={PHASE_B_START}
          durationInFrames={PHASE_B_DURATION}
        >
          <DiffusionClip />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
