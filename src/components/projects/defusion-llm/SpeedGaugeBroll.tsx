import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HOOK_BG } from "./HookBroll";
import { CARD_H, CARD_TOP, CARD_W, PANEL_H } from "./DiffusionExplainerBroll";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["400", "600", "700", "800", "900"],
});

// Gauge geometry (px, matches SVG rendered size 1:1 so HTML markers align)
const SVG_W = 700;
const SVG_H = 400;
const CX = 320;
const CY = 300;
const R = 260;
const TRACK_W = 46;

const HUB_W = 176;
const HUB_H = 110;
const MARK_S = 100; // "Normal LLM" square at the slow (left) end

const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

// Ticks across the arc band (fractions 0.1..0.9)
const TICKS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((f) => {
  const theta = Math.PI * f;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return {
    x1: CX - 247 * cos,
    y1: CY - 247 * sin,
    x2: CX - 273 * cos,
    y2: CY - 273 * sin,
  };
});

const labelBox: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  direction: "ltr",
  fontFamily: alexandriaFont,
  lineHeight: 1.15,
};

export const SpeedGaugeBroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clamp = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  };

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const cardScale = interpolate(enter, [0, 1], [0.94, 1]);
  const cardOpacity = interpolate(enter, [0, 1], [0, 1]);

  // Needle sweep: starts near the slow end, springs up past full with a small
  // overshoot bounce, settles by ~f70
  const sweep = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { mass: 1, damping: 11, stiffness: 70 },
  });
  const p = 0.05 + sweep * 1.0;
  const needleDeg = 180 * p;

  // Speed dashes off the right end — in after the sweep, gentle pulse after
  const dashOpacity =
    interpolate(frame, [68, 80], [0, 1], clamp) *
    (frame > 80 ? 0.75 + 0.25 * Math.sin((frame - 80) / 10) : 1);

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
        <div
          style={{
            position: "absolute",
            top: CARD_TOP,
            left: "50%",
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: cardOpacity,
            width: CARD_W,
            height: CARD_H,
            backgroundColor: "#FFFFFF",
            borderRadius: 30,
            border: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.10)",
            boxSizing: "border-box",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: SVG_W, height: SVG_H }}>
            <svg
              width={SVG_W}
              height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A5DFB4" />
                  <stop offset="100%" stopColor="#35A65F" />
                </linearGradient>
              </defs>

              {/* Track */}
              <path
                d={ARC_PATH}
                fill="none"
                stroke="#E7E9EC"
                strokeWidth={TRACK_W}
                strokeLinecap="round"
              />
              {/* Green progress, sweeps west -> north -> east */}
              <path
                d={ARC_PATH}
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth={TRACK_W}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={`${p * 100} 100`}
              />
              {/* Ticks over the band */}
              {TICKS.map((t, i) => (
                <line
                  key={i}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke="#C4C9CF"
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={0.85}
                />
              ))}

              {/* Needle — drawn pointing west, rotates clockwise with p */}
              <line
                x1={CX}
                y1={CY}
                x2={CX - (R - 10)}
                y2={CY}
                stroke="#16181C"
                strokeWidth={14}
                strokeLinecap="round"
                transform={`rotate(${needleDeg} ${CX} ${CY})`}
              />

              {/* Speed dashes off the east end */}
              <g opacity={dashOpacity}>
                <line x1={620} y1={250} x2={684} y2={238} stroke="#37A863" strokeWidth={9} strokeLinecap="round" />
                <line x1={624} y1={300} x2={694} y2={300} stroke="#37A863" strokeWidth={9} strokeLinecap="round" />
                <line x1={620} y1={350} x2={684} y2={362} stroke="#37A863" strokeWidth={9} strokeLinecap="round" />
              </g>
            </svg>

            {/* Hub label — Diffusion LLM (needle pivot, on top of needle base) */}
            <div
              style={{
                ...labelBox,
                left: CX - HUB_W / 2,
                top: CY - HUB_H / 2,
                width: HUB_W,
                height: HUB_H,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.14)",
                fontSize: 28,
                fontWeight: 900,
                color: "#16181C",
              }}
            >
              Diffusion
              <br />
              LLM
            </div>

            {/* Slow-end marker — Normal LLM (replaces the pink icon) */}
            <div
              style={{
                ...labelBox,
                left: CX - R - MARK_S / 2,
                top: CY - MARK_S / 2,
                width: MARK_S,
                height: MARK_S,
                backgroundColor: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: 22,
                fontSize: 24,
                fontWeight: 800,
                color: "#16181C",
              }}
            >
              Normal
              <br />
              LLM
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
