import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ArtificialAnalysisCard } from "./ArtificialAnalysisCard";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800", "900"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

export interface BRollPriceComparisonProps {
  // Optional customizations
  titleArabicLine1?: string;
  titleArabicLine2?: string;
  claudePriceText?: string;
  deepseekPriceText?: string;
  multiplierText?: string;
  highlightComparison?: boolean;
}

export const BRollPriceComparison: React.FC<BRollPriceComparisonProps> = ({
  titleArabicLine1 = "كلود 7 دولار تقريباً عالتاسك...",
  titleArabicLine2 = "ديب سيك 0.67 دولار فقط!",
  claudePriceText = "$7.63",
  deepseekPriceText = "$0.67",
  multiplierText = "أرخص بأكثر من 11 ضعف!",
  highlightComparison = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const isVertical = height > width;

  // Global exit fade in last 12 frames
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

  // 1. Header Entrance Spring
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 90 },
  });
  const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  // 2. Intelligence Card Entrance (startFrame = 8)
  const card1Start = 6;
  const card1Spring = spring({
    frame: frame - card1Start,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 85 },
  });
  const card1Y = interpolate(card1Spring, [0, 1], [40, 0]);

  // 3. Cost Card Entrance (startFrame = 22)
  const card2Start = 20;
  const card2Spring = spring({
    frame: frame - card2Start,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 85 },
  });
  const card2Y = interpolate(card2Spring, [0, 1], [40, 0]);

  // 4. Comparison Callout Banner (triggers at frame 50)
  const calloutStart = 48;
  const calloutSpring = spring({
    frame: frame - calloutStart,
    fps,
    config: { damping: 12, mass: 0.75, stiffness: 100 },
  });
  const calloutOpacity = interpolate(frame, [calloutStart, calloutStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const calloutScale = interpolate(calloutSpring, [0, 1], [0.85, 1.0]);

  // Ambient pulsing glow
  const glowPulse = Math.sin((frame / fps) * Math.PI * 1.5) * 0.08 + 0.92;

  // Dimensions for cards in 9:16 layout
  const cardWidth = isVertical ? 940 : 860;
  const cardHeight = isVertical ? 570 : 540;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0807",
        opacity: exitOpacity,
        fontFamily: plusJakartaFont,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isVertical ? "65px 40px 60px 40px" : "40px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Ambient background glows */}
      {/* Top right Anthropic terracotta glow */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(228, 90, 53, 0.22) 0%, rgba(228, 90, 53, 0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          transform: `scale(${glowPulse})`,
          pointerEvents: "none",
        }}
      />

      {/* Bottom left DeepSeek blue glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "75vw",
          height: "75vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.26) 0%, rgba(29, 78, 216, 0.06) 50%, transparent 75%)",
          filter: "blur(95px)",
          transform: `scale(${glowPulse})`,
          pointerEvents: "none",
        }}
      />

      {/* 1. TOP HEADER: Audio Cue Context Banner */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          zIndex: 20,
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: 9999,
            padding: "8px 18px",
            marginBottom: 16,
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
            }}
          />
          <span
            style={{
              fontFamily: alexandriaFont,
              fontSize: 15,
              fontWeight: 600,
              color: "#E5E7EB",
              direction: "rtl",
            }}
          >
            مقارنة الأداء والأسعار • Artificial Analysis
          </span>
        </div>

        {/* Dynamic Speech Quote Title */}
        <div
          style={{
            fontFamily: alexandriaFont,
            direction: "rtl",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: isVertical ? 38 : 34,
              fontWeight: 800,
              color: "#F6F1EB",
              margin: 0,
              lineHeight: 1.35,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span>{titleArabicLine1} </span>
            <span
              style={{
                color: "#60A5FA",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              }}
            >
              {titleArabicLine2}
            </span>
          </h2>
        </div>
      </div>

      {/* 2. BODY CONTENT: The Two Cards */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isVertical ? 24 : 32,
          zIndex: 10,
          margin: isVertical ? "16px 0" : "0",
        }}
      >
        {/* Card 1: Intelligence */}
        <div
          style={{
            transform: `translateY(${card1Y}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ArtificialAnalysisCard
            type="intelligence"
            startFrame={card1Start}
            highlightComparison={highlightComparison}
            width={cardWidth}
            height={cardHeight}
          />
        </div>

        {/* Card 2: Cost per Task */}
        <div
          style={{
            transform: `translateY(${card2Y}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ArtificialAnalysisCard
            type="cost"
            startFrame={card2Start}
            highlightComparison={highlightComparison}
            width={cardWidth}
            height={cardHeight}
          />
        </div>
      </div>

      {/* 3. BOTTOM COMPARISON HIGHLIGHT PILL */}
      <div
        style={{
          width: "100%",
          maxWidth: 940,
          opacity: calloutOpacity,
          transform: `scale(${calloutScale})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(18, 14, 12, 0.88)",
            border: "1.5px solid rgba(245, 158, 11, 0.45)",
            borderRadius: 18,
            padding: isVertical ? "16px 24px" : "14px 28px",
            boxShadow:
              "0 14px 35px -5px rgba(0, 0, 0, 0.7), 0 0 24px rgba(245, 158, 11, 0.2)",
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isVertical ? 10 : 20,
            backdropFilter: "blur(14px)",
            direction: "rtl",
          }}
        >
          {/* Main takeaway in Arabic */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                border: "1px solid #F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              💡
            </div>
            <div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: isVertical ? 20 : 18,
                  fontWeight: 800,
                  color: "#FDE68A",
                }}
              >
                النتيجة متطابقة تقريباً... ولكن ديب سيك {multiplierText}
              </div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#D1D5DB",
                  marginTop: 2,
                }}
              >
                الذكاء: كلود (53) مقابل ديب سيك (40) • فرق السعر هائل لكل تاسك
              </div>
            </div>
          </div>

          {/* Quick numbers tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              direction: "ltr",
            }}
          >
            {/* Claude price */}
            <div
              style={{
                backgroundColor: "rgba(194, 110, 81, 0.18)",
                border: "1px solid #C26E51",
                borderRadius: 10,
                padding: "6px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 10.5, color: "#FCA5A5", fontWeight: 600 }}>
                Claude
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                {claudePriceText}
              </span>
            </div>

            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#9CA3AF",
              }}
            >
              vs
            </span>

            {/* DeepSeek price */}
            <div
              style={{
                backgroundColor: "rgba(29, 78, 216, 0.22)",
                border: "1.5px solid #3B82F6",
                borderRadius: 10,
                padding: "6px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)",
              }}
            >
              <span style={{ fontSize: 10.5, color: "#93C5FD", fontWeight: 600 }}>
                DeepSeek
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#60A5FA",
                }}
              >
                {deepseekPriceText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
