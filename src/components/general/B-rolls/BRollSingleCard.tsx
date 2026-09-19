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

export interface BRollSingleCardProps {
  type?: "cost" | "intelligence";
  arabicHeadline?: string;
  arabicSubheadline?: string;
  highlightComparison?: boolean;
}

export const BRollSingleCard: React.FC<BRollSingleCardProps> = ({
  type = "cost",
  arabicHeadline,
  arabicSubheadline,
  highlightComparison = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const isVertical = height > width;
  const isCost = type === "cost";

  const defaultHeadline = isCost
    ? "السعر: كلود 7$ عالتاسك... ديب سيك 0.67$!"
    : "مقارنة الذكاء: ديب سيك وكلود بنفس الكفاءة!";
  const defaultSubheadline = isCost
    ? "وفر أكثر من 11 ضعف التكلفة لنفس النتيجة بالضبط 💸"
    : "أداء شبه متطابق في المهام متوسطة الصعوبة 🧠";

  const headline = arabicHeadline || defaultHeadline;
  const subheadline = arabicSubheadline || defaultSubheadline;

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

  // Header entrance
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 90 },
  });
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  // Card entrance
  const cardSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 85 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.88, 1.0]);

  // Callout banner entrance
  const bannerSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 100 },
  });
  const bannerOpacity = interpolate(frame, [38, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bannerScale = interpolate(bannerSpring, [0, 1], [0.9, 1.0]);

  // Card sizing for single card focus
  const cardWidth = isVertical ? 980 : 1100;
  const cardHeight = isVertical ? 650 : 600;

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
        padding: isVertical ? "90px 40px 80px 40px" : "50px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Background glow matching the chart type */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          height: "90vw",
          borderRadius: "50%",
          background: isCost
            ? "radial-gradient(circle, rgba(29, 78, 216, 0.25) 0%, rgba(228, 90, 53, 0.12) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(29, 78, 216, 0.1) 45%, transparent 70%)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      {/* 1. Header */}
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `translateY(${headerY}px)`,
          zIndex: 20,
          direction: "rtl",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: 9999,
            padding: "8px 20px",
            marginBottom: 16,
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: isCost ? "#F59E0B" : "#A855F7",
              boxShadow: isCost ? "0 0 10px #F59E0B" : "0 0 10px #A855F7",
            }}
          />
          <span
            style={{
              fontFamily: alexandriaFont,
              fontSize: 16,
              fontWeight: 600,
              color: "#E5E7EB",
            }}
          >
            {isCost ? "تحليل الأسعار • Cost per Task" : "مؤشر الذكاء • Intelligence Index"}
          </span>
        </div>

        <h1
          style={{
            fontFamily: alexandriaFont,
            fontSize: isVertical ? 42 : 36,
            fontWeight: 900,
            color: "#F6F1EB",
            margin: "0 0 8px 0",
            lineHeight: 1.3,
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.85)",
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            fontFamily: alexandriaFont,
            fontSize: isVertical ? 20 : 18,
            fontWeight: 500,
            color: "#D1D5DB",
            margin: 0,
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* 2. Central Giant Card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          zIndex: 10,
          margin: "10px 0",
        }}
      >
        <ArtificialAnalysisCard
          type={type}
          startFrame={8}
          highlightComparison={highlightComparison}
          width={cardWidth}
          height={cardHeight}
        />
      </div>

      {/* 3. Bottom Audio Context Pill */}
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          opacity: bannerOpacity,
          transform: `scale(${bannerScale})`,
          zIndex: 20,
          direction: "rtl",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(18, 14, 12, 0.9)",
            border: "1.5px solid rgba(59, 130, 246, 0.5)",
            borderRadius: 18,
            padding: "16px 28px",
            boxShadow:
              "0 14px 35px -5px rgba(0, 0, 0, 0.7), 0 0 24px rgba(59, 130, 246, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 26 }}>⚡</span>
            <div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#93C5FD",
                }}
              >
                {isCost
                  ? "«ديب سيك: 0.67$ مقابل كلود: 7.63$»"
                  : "«كلود وديب سيك رح يطلعوا نفس الشي بالذكاء»"}
              </div>
              <div
                style={{
                  fontFamily: alexandriaFont,
                  fontSize: 14,
                  color: "#D1D5DB",
                  marginTop: 2,
                }}
              >
                المصدر: Artificial Analysis Intelligence & Cost Index
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: isCost ? "#1D4ED8" : "#7C3AED",
              color: "#FFFFFF",
              fontFamily: alexandriaFont,
              fontWeight: 800,
              fontSize: 16,
              padding: "8px 18px",
              borderRadius: 10,
              boxShadow: "0 0 14px rgba(29, 78, 216, 0.4)",
            }}
          >
            {isCost ? "11.4x أرخص" : "كفاءة متطابقة"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
