import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["400", "700", "900"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["500", "600", "700", "800", "900"],
});

export interface ChapterTransitionProps {
  chapterNumber?: string;
  chapterSubtitle?: string;
  titleLine1?: string;
  titleLine2?: string;
  currentChapter?: number;
  totalChapters?: number;
  accentColor?: string;
  numberColor?: string;
  glowColor?: string;
  isRTL?: boolean;
  trackerPosition?: "right" | "left";
  showTracker?: boolean;
}

const containsArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

export const Overlay: React.FC<ChapterTransitionProps> = ({
  chapterNumber = "05",
  chapterSubtitle = "Chapter 5 of 10",
  titleLine1 = "Generate Your",
  titleLine2 = "Video and Images",
  currentChapter = 5,
  totalChapters = 10,
  accentColor = "#E45A35",
  numberColor = "#43291F",
  glowColor = "rgba(215, 88, 38, 0.44)",
  isRTL,
  trackerPosition = "right",
  showTracker = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Auto-detect RTL if Arabic characters are present in title or subtitle
  const isArabic = useMemo(() => {
    if (typeof isRTL === "boolean") return isRTL;
    return (
      containsArabic(titleLine1) ||
      (titleLine2 ? containsArabic(titleLine2) : false) ||
      (chapterSubtitle ? containsArabic(chapterSubtitle) : false)
    );
  }, [isRTL, titleLine1, titleLine2, chapterSubtitle]);

  const activeFont = isArabic ? alexandriaFont : plusJakartaFont;

  // Responsive font sizes and paddings
  const hasSubtitle = Boolean(chapterSubtitle && chapterSubtitle.trim().length > 0);
  const isSingleLine = !titleLine2 || titleLine2.trim().length === 0;

  const titleFontSize = useMemo(() => {
    if (isVertical) {
      if (isSingleLine) return isArabic ? 96 : 92;
      return isArabic ? 80 : 76;
    }
    return isArabic ? 72 : 78;
  }, [isVertical, isSingleLine, isArabic]);

  const numberFontSize = isVertical ? 460 : 580;
  const contentPadding = isVertical ? "0 50px" : "0 140px";

  // Exit transition (last 16 frames)
  const exitDuration = 16;
  const exitStart = durationInFrames - exitDuration;
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 1. Massive Background Number Animation
  const numberEntrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.85,
      stiffness: 85,
    },
  });

  const numberEntranceScale = interpolate(numberEntrance, [0, 1], [0.82, 1.0]);
  const numberEntranceOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle continuous drift during hero hold
  const driftY = interpolate(frame, [0, durationInFrames], [12, -12]);
  const driftScale = interpolate(frame, [0, durationInFrames], [1.0, 1.025]);

  // Combined number transforms
  const finalNumberScale =
    numberEntranceScale * driftScale * (1 + exitProgress * 0.08);
  const finalNumberY = driftY - exitProgress * 30;
  const finalNumberOpacity = numberEntranceOpacity * (1 - exitProgress);

  // 2. Chapter Subtitle ("Chapter 5 of 10" / "الفصل 1 من 2")
  const subtitleSpring = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 15,
      mass: 0.65,
      stiffness: 110,
    },
  });
  const subtitleY =
    interpolate(subtitleSpring, [0, 1], [32, 0]) - exitProgress * 40;
  const subtitleOpacity =
    interpolate(subtitleSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // 3. Title Line 1
  const title1Spring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 15,
      mass: 0.65,
      stiffness: 105,
    },
  });
  const title1Y =
    interpolate(title1Spring, [0, 1], [40, 0]) - exitProgress * 45;
  const title1Opacity =
    interpolate(title1Spring, [0, 1], [0, 1]) * (1 - exitProgress);

  // 4. Title Line 2
  const title2Spring = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 15,
      mass: 0.65,
      stiffness: 105,
    },
  });
  const title2Y =
    interpolate(title2Spring, [0, 1], [40, 0]) - exitProgress * 50;
  const title2Opacity =
    interpolate(title2Spring, [0, 1], [0, 1]) * (1 - exitProgress);

  // 5. Ambient Bottom Glow Breathing
  const glowEntrance = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glowPulse = Math.sin((frame / fps) * Math.PI * 1.2) * 0.03;
  const glowScale = (1 + glowPulse) * (1 - exitProgress * 0.1);
  const glowOpacity = glowEntrance * (1 - exitProgress);

  // 6. Chapter Progress Indicator Track
  const trackerSpring = spring({
    frame: frame - 6,
    fps,
    config: {
      damping: 16,
      mass: 0.6,
      stiffness: 100,
    },
  });
  const trackerOffset = interpolate(trackerSpring, [0, 1], [25, 0]);
  const trackerOpacity =
    interpolate(trackerSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Memoized chapter ticks
  const chapterTicks = useMemo(() => {
    return Array.from({ length: totalChapters }, (_, i) => i + 1);
  }, [totalChapters]);

  // Scaled height for tracker to avoid awkward stretching when totalChapters is small (e.g. 2)
  const trackerHeight = useMemo(() => {
    return Math.min(380, Math.max(140, totalChapters * 45));
  }, [totalChapters]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0C0806",
        overflow: "hidden",
        position: "relative",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* 1. Deep Atmospheric Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(5, 3, 2, 0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 2. Warm Terracotta/Amber Ambient Bottom Glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: isVertical ? "65%" : "80%",
          pointerEvents: "none",
          background: `radial-gradient(ellipse 110% 70% at 50% 102%, ${glowColor} 0%, rgba(145, 52, 20, 0.28) 38%, rgba(52, 18, 10, 0.12) 68%, rgba(12, 8, 6, 0) 90%)`,
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          transformOrigin: "bottom center",
        }}
      />

      {/* 3. Core Warm Radial Light */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? -40 : -80,
          left: "50%",
          width: isVertical ? 760 : 900,
          height: isVertical ? 520 : 400,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 100%, rgba(255, 115, 55, 0.35) 0%, rgba(210, 75, 30, 0.18) 45%, transparent 75%)",
          filter: "blur(60px)",
          opacity: glowOpacity,
          transform: `translateX(-50%) scale(${glowScale})`,
          transformOrigin: "bottom center",
        }}
      />

      {/* 4. Giant Background Chapter Number ("01", "02", "05") */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          direction: "ltr", // Numbers are always LTR
        }}
      >
        <div
          style={{
            fontFamily: montserratFont,
            fontSize: numberFontSize,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: numberColor,
            transform: `translateY(${finalNumberY}px) scale(${finalNumberScale})`,
            opacity: finalNumberOpacity,
            userSelect: "none",
            transformOrigin: "center center",
            textAlign: "center",
          }}
        >
          {chapterNumber}
        </div>
      </div>

      {/* 5. Central Foreground Text (Subtitle + Multi-line Title) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          padding: contentPadding,
        }}
      >
        {/* Chapter Eyebrow ("Chapter 5 of 10" / "الفصل 1 من 2") - Only if provided */}
        {hasSubtitle && (
          <div
            style={{
              fontFamily: activeFont,
              fontSize: isVertical ? (isArabic ? 38 : 34) : (isArabic ? 34 : 32),
              fontWeight: 600,
              color: "#A79589",
              letterSpacing: isArabic ? "0" : "0.015em",
              marginBottom: isArabic ? 22 : 24,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.75)",
            }}
          >
            {chapterSubtitle}
          </div>
        )}

        {/* Main Title Heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isArabic ? (isVertical ? 16 : 12) : 6,
          }}
        >
          <div
            style={{
              fontFamily: activeFont,
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: isArabic ? 1.32 : 1.15,
              letterSpacing: isArabic ? "-0.01em" : "-0.03em",
              color: "#F6F1EB",
              opacity: title1Opacity,
              transform: `translateY(${title1Y}px)`,
              textShadow:
                "0 4px 28px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.95)",
            }}
          >
            {titleLine1}
          </div>
          {titleLine2 && titleLine2.trim().length > 0 && (
            <div
              style={{
                fontFamily: activeFont,
                fontSize: titleFontSize,
                fontWeight: 800,
                lineHeight: isArabic ? 1.32 : 1.15,
                letterSpacing: isArabic ? "-0.01em" : "-0.03em",
                color: "#F6F1EB",
                opacity: title2Opacity,
                transform: `translateY(${title2Y}px)`,
                textShadow:
                  "0 4px 28px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.95)",
              }}
            >
              {titleLine2}
            </div>
          )}
        </div>
      </div>

      {/* 6. Chapter Progress Indicator Track */}
      {showTracker && (
        <div
          style={{
            position: "absolute",
            ...(trackerPosition === "left"
              ? {
                  left: isVertical ? 36 : 56,
                  transform: `translateY(-50%) translateX(-${trackerOffset}px)`,
                }
              : {
                  right: isVertical ? 36 : 56,
                  transform: `translateY(-50%) translateX(${trackerOffset}px)`,
                }),
            top: "50%",
            opacity: trackerOpacity,
            height: trackerHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {/* Subtle continuous background rail */}
          <div
            style={{
              position: "absolute",
              top: 10,
              bottom: 10,
              width: 2,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: 1,
            }}
          />

          {chapterTicks.map((tick) => {
            const isActive = tick === currentChapter;
            return (
              <div
                key={tick}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isActive ? (
                  // Active Chapter Pill Indicator
                  <div
                    style={{
                      width: 5,
                      height: totalChapters <= 3 ? 42 : 34,
                      borderRadius: 3,
                      backgroundColor: accentColor,
                      boxShadow: `0 0 14px ${accentColor}, 0 0 28px ${glowColor}`,
                    }}
                  />
                ) : (
                  // Inactive Tick Notch
                  <div
                    style={{
                      width: 2,
                      height: totalChapters <= 3 ? 20 : 16,
                      borderRadius: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.18)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 7. Subtle Vignette Border Rim */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 80,
          background:
            "linear-gradient(to right, rgba(8, 5, 4, 0.6) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 80,
          background:
            "linear-gradient(to left, rgba(8, 5, 4, 0.6) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
