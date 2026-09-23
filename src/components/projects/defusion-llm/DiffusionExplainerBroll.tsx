import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HOOK_BG } from "./HookBroll";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800", "900"],
});

// Split layout: off-white panel on top (0..PANEL_H), face video shows below
export const PANEL_H = 860;
const CARD_W = 940;
const CARD_H = 600;
const CARD_TOP = 110;

const CELL = 60;
const GRID_GAP = 6;
const GRID_COLS = 6;
const COL_W = GRID_COLS * CELL + (GRID_COLS - 1) * GRID_GAP; // 390

const hash = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

const smooth = (t: number) => t * t * (3 - 2 * t);

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

const noiseColor = (i: number, block: number): string => {
  const g = Math.floor(35 + hash(i * 13.7 + block * 7.3) * 195);
  return `rgb(${g}, ${g}, ${g})`;
};

const BAR_WIDTHS = [1, 0.85, 0.62];

export const DiffusionExplainerBroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 150 },
  });
  const cardScale = interpolate(enter, [0, 1], [0.94, 1]);
  const cardOpacity = interpolate(enter, [0, 1], [0, 1]);

  // Noise runs until 0:17 (local frame 240 = global 510), then cat/text fully shown.
  // Reveal is done by opacity crossfade — img fades in, noise fades out.
  const p = smooth(clamp01(frame / 240));
  const block = Math.floor(frame / 4);

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
        {/* White card */}
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
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: alexandriaFont,
              fontSize: 38,
              fontWeight: 900,
              color: "#16181C",
              textAlign: "center",
              letterSpacing: -0.5,
              direction: "ltr",
            }}
          >
            Diffusion = Image Gen, but for text
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: 44,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Left column — image generation */}
            <div style={{ width: COL_W }}>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#16181C",
                  marginBottom: 16,
                  direction: "ltr",
                  textAlign: "left",
                }}
              >
                Image Generation
              </div>
              <div
                style={{
                  position: "relative",
                  width: COL_W,
                  height: 4 * CELL + 3 * GRID_GAP,
                }}
              >
                {/* Real cat photo — fades in (opacity 0 → 1) as noise fades out */}
                <Img
                  src={staticFile("assets/imgs/general/cat.jpeg")}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                    opacity: p,
                  }}
                />
                {/* Noise layer — fades out (opacity 1 → 0), not stacked on the img */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL}px)`,
                    gap: GRID_GAP,
                    opacity: 1 - p,
                  }}
                >
                  {Array.from({ length: GRID_COLS * 4 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 8,
                        backgroundColor: noiseColor(i, block),
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#8A8F98",
                  marginTop: 16,
                  direction: "ltr",
                  textAlign: "left",
                }}
              >
                noise → image
              </div>
            </div>

            {/* Dashed divider */}
            <div
              style={{
                width: 2,
                height: 258,
                marginTop: 52,
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #E3E1DE 0 10px, transparent 10px 20px)",
              }}
            />

            {/* Right column — diffusion LLM */}
            <div style={{ width: COL_W }}>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#16181C",
                  marginBottom: 16,
                  direction: "ltr",
                  textAlign: "left",
                }}
              >
                Diffusion LLM
              </div>
              <div
                style={{
                  height: 4 * CELL + 3 * GRID_GAP,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                {BAR_WIDTHS.map((frac, j) => (
                  <div
                    key={j}
                    style={{
                      width: COL_W * frac,
                      height: 34,
                      backgroundColor: "#EDEBE8",
                      borderRadius: 17,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Resolve fills right-to-left (RTL text) */}
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: `${p * 100}%`,
                        backgroundColor: "#16181C",
                        borderRadius: 17,
                      }}
                    />
                    {/* Noise dashes fade out as it resolves */}
                    {Array.from({ length: 6 }).map((__, k) => (
                      <div
                        key={k}
                        style={{
                          position: "absolute",
                          left: `${hash(j * 11 + k * 3.3 + block) * 84}%`,
                          top: `${hash(j * 7 + k * 5.1 + block * 2) * 58}%`,
                          width: "9%",
                          height: "38%",
                          borderRadius: 4,
                          backgroundColor: "#A8A5A0",
                          opacity:
                            (1 - p) * (0.45 + 0.55 * hash(j + k + block)),
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#8A8F98",
                  marginTop: 16,
                  direction: "ltr",
                  textAlign: "left",
                }}
              >
                noise → text
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
