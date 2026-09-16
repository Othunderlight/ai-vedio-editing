import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
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

const { fontFamily: newsreaderFont } = loadNewsreader("normal", {
  subsets: ["latin"],
  weights: ["600", "700"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

export interface FocusedBarData {
  id: string;
  nameLine1: string;
  nameLine2: string;
  value: number;
  displayValue: string;
  color: string;
  logoPath: string;
  brandColor: string;
}

// 1. Intelligence Data: Claude Fable 5.1 (53), Claude Opus 5 (51), DeepSeek V4.1 Flash (40)
export const FOCUSED_INTELLIGENCE_DATA: FocusedBarData[] = [
  {
    id: "claude-fable",
    nameLine1: "Claude Fable 5.1",
    nameLine2: "(max with fallback)",
    value: 53,
    displayValue: "53",
    color: "#D97757",
    brandColor: "#D97757",
    logoPath: "assets/claude.svg",
  },
  {
    id: "claude-opus-5",
    nameLine1: "Claude Opus 5",
    nameLine2: "(max)",
    value: 51,
    displayValue: "51",
    color: "#D97757",
    brandColor: "#D97757",
    logoPath: "assets/claude.svg",
  },
  {
    id: "deepseek-v4.1",
    nameLine1: "DeepSeek V4.1 Flash",
    nameLine2: "(max)",
    value: 40,
    displayValue: "40",
    color: "#4D6BFE",
    brandColor: "#4D6BFE",
    logoPath: "assets/deepseek.svg",
  },
];

// 2. Cost Data: DeepSeek ($0.67), Claude Opus ($5.86), Claude Fable ($7.63)
export const FOCUSED_COST_DATA: FocusedBarData[] = [
  {
    id: "deepseek-v4.1",
    nameLine1: "DeepSeek V4.1 Flash",
    nameLine2: "(max)",
    value: 0.67,
    displayValue: "$0.67",
    color: "#4D6BFE",
    brandColor: "#4D6BFE",
    logoPath: "assets/deepseek.svg",
  },
  {
    id: "claude-opus-5",
    nameLine1: "Claude Opus 5",
    nameLine2: "(max)",
    value: 5.86,
    displayValue: "$5.86",
    color: "#D97757",
    brandColor: "#D97757",
    logoPath: "assets/claude.svg",
  },
  {
    id: "claude-fable",
    nameLine1: "Claude Fable 5.1",
    nameLine2: "(max with fallback)",
    value: 7.63,
    displayValue: "$7.63",
    color: "#D97757",
    brandColor: "#D97757",
    logoPath: "assets/claude.svg",
  },
];

export interface FocusedReelShotProps {
  type?: "intelligence" | "cost";
  data?: FocusedBarData[];
}

export const FocusedReelShot: React.FC<FocusedReelShotProps> = ({
  type = "intelligence",
  data: customData,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const isCost = type === "cost";
  const data =
    customData || (isCost ? FOCUSED_COST_DATA : FOCUSED_INTELLIGENCE_DATA);

  // Axis maximums
  const maxValue = isCost ? 8.5 : 60;

  // Title configuration
  const title = isCost ? "Cost per Task" : "Intelligence";
  const badgeColor = isCost ? "#EA580C" : "#9333EA";
  const subtitle = isCost
    ? "Weighted average cost (USD) per Intelligence Index task · Lower is better"
    : "Artificial Analysis Intelligence Index · Higher is better";

  // Exit transition in last 12 frames
  const exitDuration = 12;
  const exitStart = durationInFrames - exitDuration;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Entrance spring for Title at top
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 90 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [-40, 0]);
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Dimensions for high-impact 9:16 mobile view
  const plotHeight = 940;
  const barWidth = 240;

  // Subtle breathing background glow
  const glowPulse = Math.sin((frame / fps) * Math.PI * 1.5) * 0.08 + 0.92;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0807",
        opacity: exitOpacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "100px 60px 80px 60px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: plusJakartaFont,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${glowPulse})`,
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          background: isCost
            ? "radial-gradient(circle, rgba(77, 107, 254, 0.22) 0%, rgba(217, 119, 87, 0.16) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(147, 51, 234, 0.22) 0%, rgba(77, 107, 254, 0.14) 45%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* 1. TOP HEADER: Placed at the very top, large & prominent */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          zIndex: 20,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 14,
          }}
        >
          {/* Badge Icon */}
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: badgeColor,
              borderRadius: 8,
              boxShadow: `0 0 22px ${badgeColor}aa`,
            }}
          />
          {/* Massive Display Title */}
          <h1
            style={{
              fontFamily: newsreaderFont,
              fontSize: 78,
              fontWeight: 700,
              color: "#F9FAFB",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "#9CA3AF",
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            maxWidth: 920,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 2. UNIFIED CHART SECTION: Bars + Labels right under the graph */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Columns & Bars Area */}
        <div
          style={{
            position: "relative",
            height: plotHeight,
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Subtle Horizontal Dotted Gridlines across the plot */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              borderTop: "2px dashed rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "33%",
              left: 0,
              right: 0,
              borderTop: "2px dashed rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "66%",
              left: 0,
              right: 0,
              borderTop: "2px dashed rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />

          {/* Baseline Axis Line directly at the bottom of the bars */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderBottom: "2.5px solid rgba(255, 255, 255, 0.22)",
              pointerEvents: "none",
            }}
          />

          {/* The 3 Columns with values and animated bars */}
          {data.map((item, index) => {
            const barSpring = spring({
              frame: frame - 6 - index * 3,
              fps,
              config: { damping: 14, mass: 0.7, stiffness: 90 },
            });

            // Height calculation
            const targetHeight = (item.value / maxValue) * (plotHeight - 130);
            const currentHeight = Math.max(20, targetHeight * barSpring);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  width: barWidth,
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {/* For Cost: Value sits directly ABOVE the bar */}
                {isCost && (
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      color: item.brandColor,
                      marginBottom: 16,
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                      textShadow: `0 0 28px ${item.brandColor}88`,
                    }}
                  >
                    {item.displayValue}
                  </div>
                )}

                {/* The Giant Vertical Bar */}
                <div
                  style={{
                    width: barWidth,
                    height: currentHeight,
                    backgroundColor: item.color,
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: 20,
                    boxSizing: "border-box",
                    boxShadow: `0 8px 36px ${item.brandColor}55`,
                    position: "relative",
                  }}
                >
                  {/* For Intelligence: Value is prominently inside the top of the bar */}
                  {!isCost && (
                    <span
                      style={{
                        fontSize: 52,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {item.displayValue}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. LOGOS & TITLES PLACED RIGHT UNDER THE GRAPH WITH SMALL SPACE */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
            marginTop: 22,
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                width: barWidth,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Pure SVG Company Logo: Much bigger, NO background box */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Img
                  src={staticFile(item.logoPath)}
                  style={{
                    width: 76,
                    height: 76,
                    objectFit: "contain",
                    filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
                  }}
                />
              </div>

              {/* Model Name: Bigger, normal 90-degree upright text (no slant, no italic) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                    whiteSpace: "normal",
                  }}
                >
                  {item.nameLine1}
                </span>
                <span
                  style={{
                    fontSize: 21,
                    fontWeight: 600,
                    color: "#9CA3AF",
                    lineHeight: 1.2,
                  }}
                >
                  {item.nameLine2}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
