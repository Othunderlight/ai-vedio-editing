import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandLogo, ModelBrand, MouseCursor } from "./BrandLogos";

const { fontFamily: newsreaderFont } = loadNewsreader("normal", {
  subsets: ["latin"],
  weights: ["600", "700"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

export interface ChartDataPoint {
  id: string;
  name: string;
  value: number;
  displayValue: string;
  color: string;
  brand: ModelBrand;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  isSpotlight?: boolean;
}

export const INTELLIGENCE_DATA: ChartDataPoint[] = [
  {
    id: "claude-fable",
    name: "Claude Fable 5.1 (max with fallback)",
    value: 53,
    displayValue: "53",
    color: "#C26E51",
    brand: "anthropic",
    isSpotlight: true,
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra (max)",
    value: 53,
    displayValue: "53",
    color: "#1F2421",
    brand: "openai",
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5 (max)",
    value: 51,
    displayValue: "51",
    color: "#C26E51",
    brand: "anthropic",
    isSpotlight: true,
  },
  {
    id: "muse-spark",
    name: "Muse Spark 1.3 (max)",
    value: 48,
    displayValue: "48",
    color: "#0284C7",
    brand: "meta",
  },
  {
    id: "glm-5.3",
    name: "GLM-5.3 (max)",
    value: 45,
    displayValue: "45",
    color: "#2563EB",
    brand: "zhipu",
  },
  {
    id: "grok-4.6",
    name: "Grok 4.6 (high)",
    value: 44,
    displayValue: "44",
    color: "#6366F1",
    brand: "xai",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3 (max)",
    value: 44,
    displayValue: "44",
    color: "#2563EB",
    brand: "kimi",
  },
  {
    id: "gemini-3.8",
    name: "Gemini 3.8 Flash (high)",
    value: 41,
    displayValue: "41",
    color: "#16A34A",
    brand: "google",
  },
  {
    id: "deepseek-v4.1",
    name: "DeepSeek V4.1 Flash (max)",
    value: 40,
    displayValue: "40",
    color: "#1D4ED8",
    brand: "deepseek",
    hasTooltip: true,
    tooltipTitle: "DeepSeek V4.1 Flash (max)",
    isSpotlight: true,
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna (max)",
    value: 38,
    displayValue: "38",
    color: "#1F2421",
    brand: "openai",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro 0813 (max)",
    value: 36,
    displayValue: "36",
    color: "#1D4ED8",
    brand: "deepseek",
    isSpotlight: true,
  },
];

export const COST_DATA: ChartDataPoint[] = [
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna (max)",
    value: 0.18,
    displayValue: "$0.18",
    color: "#1F2421",
    brand: "openai",
  },
  {
    id: "deepseek-v4.1",
    name: "DeepSeek V4.1 Flash (max)",
    value: 0.27,
    displayValue: "$0.27",
    color: "#1D4ED8",
    brand: "deepseek",
    isSpotlight: true,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro 0813 (max)",
    value: 0.67,
    displayValue: "$0.67",
    color: "#1D4ED8",
    brand: "deepseek",
    hasTooltip: true,
    tooltipTitle: "DeepSeek V4 Pro 0813 (max)",
    isSpotlight: true,
  },
  {
    id: "gemini-3.8",
    name: "Gemini 3.8 Flash (high)",
    value: 1.24,
    displayValue: "$1.24",
    color: "#16A34A",
    brand: "google",
  },
  {
    id: "muse-spark",
    name: "Muse Spark 1.3 (max)",
    value: 1.6,
    displayValue: "$1.60",
    color: "#0284C7",
    brand: "meta",
  },
  {
    id: "grok-4.6",
    name: "Grok 4.6 (high)",
    value: 1.86,
    displayValue: "$1.86",
    color: "#6366F1",
    brand: "xai",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3 (max)",
    value: 2.0,
    displayValue: "$2.00",
    color: "#0284C7",
    brand: "kimi",
  },
  {
    id: "glm-5.3",
    name: "GLM-5.3 (max)",
    value: 2.01,
    displayValue: "$2.01",
    color: "#0284C7",
    brand: "zhipu",
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra (max)",
    value: 3.26,
    displayValue: "$3.26",
    color: "#1F2421",
    brand: "openai",
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5 (max)",
    value: 5.86,
    displayValue: "$5.86",
    color: "#C26E51",
    brand: "anthropic",
    isSpotlight: true,
  },
  {
    id: "claude-fable",
    name: "Claude Fable 5.1 (max with fallback)",
    value: 7.63,
    displayValue: "$7.63",
    color: "#C26E51",
    brand: "anthropic",
    isSpotlight: true,
  },
];

export interface ArtificialAnalysisCardProps {
  type?: "intelligence" | "cost";
  startFrame?: number;
  highlightComparison?: boolean;
  scale?: number;
  width?: number;
  height?: number;
  showCursor?: boolean;
}

export const ArtificialAnalysisCard: React.FC<ArtificialAnalysisCardProps> = ({
  type = "intelligence",
  startFrame = 0,
  highlightComparison = false,
  width = 660,
  height = 580,
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isCost = type === "cost";
  const data = isCost ? COST_DATA : INTELLIGENCE_DATA;
  const maxValue = isCost ? 8.2 : 58;

  // Title configuration
  const title = isCost ? "Cost per Task" : "Intelligence";
  const badgeColor = isCost ? "#EA580C" : "#7C3AED";
  const subtitle = isCost
    ? "Weighted average cost (USD) per Intelligence Index task · Lower is better"
    : "Artificial Analysis Intelligence Index · Higher is better";

  // Animation timing
  const localFrame = Math.max(0, frame - startFrame);

  // Overall card entrance spring
  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 95 },
  });
  const cardOpacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.92, 1.0]);

  // Spotlight progress (dims non-spotlight bars when comparing Claude vs DeepSeek)
  const spotlightProgress = highlightComparison
    ? interpolate(localFrame, [25, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Tooltip animation
  const tooltipSpring = spring({
    frame: localFrame - 18,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 110 },
  });
  const tooltipOpacity = interpolate(localFrame, [18, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tooltipTranslateY = interpolate(tooltipSpring, [0, 1], [15, 0]);

  // Cursor pointer animation
  const cursorProgress = interpolate(localFrame, [20, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOpacity = interpolate(localFrame, [20, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [30, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [40, 0]);

  // Chart chart plot dimensions
  const plotHeight = 220;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        border: "1px solid #E5E7EB",
        boxShadow:
          "0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05)",
        padding: "24px 28px 20px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        transformOrigin: "center center",
        position: "relative",
        boxSizing: "border-box",
        fontFamily: plusJakartaFont,
      }}
    >
      {/* 1. Header Row */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: badgeColor,
                borderRadius: 3,
              }}
            />
            <h3
              style={{
                fontFamily: newsreaderFont,
                fontSize: 30,
                fontWeight: 600,
                color: "#111827",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>
          </div>

          {!isCost && (
            <div
              style={{
                backgroundColor: "#581C87",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 9999,
                letterSpacing: "0.01em",
              }}
            >
              Updated
            </div>
          )}
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 2. Chart Plot Area with Dotted Grid Lines */}
      <div
        style={{
          position: "relative",
          height: plotHeight,
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingTop: 30,
        }}
      >
        {/* Horizontal Dotted Grid Lines */}
        <div
          style={{
            position: "absolute",
            top: 25,
            left: 0,
            right: 0,
            borderTop: "1px dashed #E5E7EB",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 85,
            left: 0,
            right: 0,
            borderTop: "1px dashed #E5E7EB",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 145,
            left: 0,
            right: 0,
            borderTop: "1px dashed #E5E7EB",
            pointerEvents: "none",
          }}
        />

        {/* The 11 Bars */}
        {data.map((item, index) => {
          // Staggered bar entrance spring
          const barSpring = spring({
            frame: localFrame - 4 - index * 1.4,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 100 },
          });
          const targetHeight = (item.value / maxValue) * (plotHeight - 40);
          const currentHeight = Math.max(4, targetHeight * barSpring);

          // Dim un-highlighted models in comparison mode
          const isItemSpotlight = Boolean(item.isSpotlight);
          const barOpacity =
            1 - spotlightProgress * (isItemSpotlight ? 0 : 0.68);

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: 38,
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              {/* Highlight Column for tooltip item */}
              {item.hasTooltip && (
                <div
                  style={{
                    position: "absolute",
                    top: -15,
                    bottom: -6,
                    left: -4,
                    right: -4,
                    backgroundColor: "rgba(229, 231, 235, 0.4)",
                    borderRadius: 4,
                    opacity: tooltipOpacity,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Floating Tooltip Card */}
              {item.hasTooltip && (
                <div
                  style={{
                    position: "absolute",
                    bottom: currentHeight + 20,
                    left: "50%",
                    transform: `translateX(-50%) translateY(${tooltipTranslateY}px)`,
                    opacity: tooltipOpacity,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #93C5FD",
                    borderRadius: 8,
                    padding: "8px 12px",
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.06)",
                    zIndex: 30,
                    width: 175,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <BrandLogo brand={item.brand} size={14} />
                    <span>{item.tooltipTitle || item.name}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 2,
                    }}
                  >
                    {item.displayValue}
                  </div>
                  <div style={{ fontSize: 10, color: "#9CA3AF" }}>
                    Click for more info
                  </div>
                </div>
              )}

              {/* Mouse Cursor pointing to tooltip item */}
              {item.hasTooltip && showCursor && (
                <div
                  style={{
                    position: "absolute",
                    bottom: currentHeight + 12,
                    left: "50%",
                    transform: `translateX(calc(-50% + ${cursorX}px)) translateY(${cursorY}px)`,
                    opacity: cursorOpacity,
                    zIndex: 40,
                    pointerEvents: "none",
                  }}
                >
                  <MouseCursor size={22} />
                </div>
              )}

              {/* Value Label: Above bar for Cost, Inside bar for Intelligence */}
              {isCost && (
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: item.brand === "deepseek" ? "#1D4ED8" : "#111827",
                    marginBottom: 4,
                    opacity: barOpacity,
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.displayValue}
                </div>
              )}

              {/* Bar Element */}
              <div
                style={{
                  width: 32,
                  height: currentHeight,
                  backgroundColor: item.color,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  opacity: barOpacity,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 5,
                  boxSizing: "border-box",
                  position: "relative",
                  boxShadow:
                    item.hasTooltip && spotlightProgress > 0.5
                      ? `0 0 16px ${item.color}`
                      : "none",
                }}
              >
                {/* For Intelligence: value is rendered INSIDE the bar at top */}
                {!isCost && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
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

      {/* 3. X-Axis Brand Logos & Angled Labels */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          position: "relative",
          height: 125,
        }}
      >
        {data.map((item) => {
          const isItemSpotlight = Boolean(item.isSpotlight);
          const labelOpacity =
            1 - spotlightProgress * (isItemSpotlight ? 0 : 0.65);

          return (
            <div
              key={item.id}
              style={{
                width: 38,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: labelOpacity,
              }}
            >
              {/* Brand Logo icon */}
              <div style={{ height: 22, display: "flex", alignItems: "center" }}>
                <BrandLogo brand={item.brand} size={18} />
              </div>

              {/* Model Name rotated ~50 degrees */}
              <div
                style={{
                  transform: "rotate(50deg)",
                  transformOrigin: "top left",
                  marginTop: 6,
                  marginLeft: 14,
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "#374151",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
