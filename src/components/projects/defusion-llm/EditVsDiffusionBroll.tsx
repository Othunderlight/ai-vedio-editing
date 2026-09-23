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
  weights: ["400", "600", "700", "800", "900"],
});

// Normal LLM chat output: two claims, then the model corrects itself
const LINES = [
  "To find player velocity, we divide current_position by delta_time.",
  "This verifies player speed on the server to prevent speed-hacking.",
  "Wait, actually, that gives distance from the map origin, not velocity.",
  "We must calculate the change in position first: (current_position - previous_position) / delta_time.",
];
// Line timing (local frames): L1 4-28, L2 28-48, L3 48-66, L4 66-90
const LINE_RANGES: [number, number][] = [
  [4, 28],
  [28, 48],
  [48, 66],
  [66, 90],
];
const FIX_LINE_COLOR = "#E45A35";

// Phase A: 0..120 (global 720-840), Phase B: 114..330 (global 834-1050 = 0:35)
// Phase B starts slightly early so its 6f fade-in crossfades with Phase A's fade-out
const PHASE_B_START = 114;
const PHASE_B_DURATION = 216;

// dllm.mp4 trimmed from 0:19 (frame 570 @ 30fps), 216f = 7.2s -> ends ~0:26 (inside 0:16-0:27)
const DLLM_START_FROM = 570;

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
  padding: "48px 56px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
};

const DiffusionClip: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Full-bleed: video fills the entire top panel, no card/container
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: PANEL_H,
        overflow: "hidden",
        opacity,
      }}
    >
      <OffthreadVideo
        src={staticFile("projects/defusion-llm/assets/dllm.mp4")}
        startFrom={DLLM_START_FROM}
        muted
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
  const typingDone = frame >= LINE_RANGES[3][1];
  // Solid caret while typing, blinking when idle
  const caretOn = activeLine >= 0 ? true : blink;

  const keyEnter = spring({
    frame: Math.max(0, frame - 56),
    fps,
    config: { mass: 0.6, damping: 11, stiffness: 150 },
  });
  const keyOpacity = interpolate(frame, [56, 62], [0, 1], clamp);
  // Double press: down-up-down-up
  const keyScale = interpolate(
    frame,
    [92, 95, 98, 101, 105],
    [1, 0.84, 0.96, 0.9, 1],
    clamp
  );

  // Text shakes while backspace fails
  const shake =
    frame >= 94 && frame <= 114
      ? Math.sin((frame - 94) * 1.6) * 9 * (1 - (frame - 94) / 20)
      : 0;

  const badgePop = spring({
    frame: Math.max(0, frame - 92),
    fps,
    config: { mass: 0.5, damping: 10, stiffness: 160 },
  });
  const badgeOpacity = interpolate(frame, [92, 96], [0, 1], clamp);

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
        {/* Phase A card: chat-style message, generated line by line */}
        <div
          style={{
            ...cardBox,
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: phaseAOpacity,
          }}
        >
          {/* Message text directly on the card — no box, ChatGPT-like */}
          <div style={{ width: "100%", transform: `translateX(${shake}px)` }}>
            {LINES.map((line, i) => {
              if (frame < LINE_RANGES[i][0]) return null;
              const isActive =
                activeLine === i || (typingDone && i === LINES.length - 1);
              const lineColor = i === 2 ? FIX_LINE_COLOR : "#0D0D0D";

              return (
                <p
                  key={i}
                  style={{
                    margin: "0 0 22px 0",
                    fontFamily: alexandriaFont,
                    fontSize: 31,
                    fontWeight: 400,
                    lineHeight: 1.55,
                    color: lineColor,
                    direction: "ltr",
                    textAlign: "left",
                  }}
                >
                  {line.slice(0, typed[i])}
                  {isActive ? (
                    <span
                      style={{
                        display: "inline-block",
                        width: 4,
                        height: "0.95em",
                        marginLeft: 4,
                        verticalAlign: "text-bottom",
                        borderRadius: 1,
                        backgroundColor: lineColor,
                        opacity: caretOn ? 1 : 0.15,
                      }}
                    />
                  ) : null}
                </p>
              );
            })}
          </div>

          {/* Backspace key + blocked badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              marginTop: 34,
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
          style={{
            scale: 1.366,
            translate: "0px -147.6px"
          }}
        >
          <DiffusionClip />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
