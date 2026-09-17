import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["700", "800", "900"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800"],
});

export interface EnglishTutorialProps {
  episodeTag?: string;
  category?: "vocabulary" | "grammar" | "pronunciation" | "phrasal-verbs" | "slang";
  headline?: string;
  hookSubtext?: string;
  incorrectPhrase?: string;
  incorrectLabel?: string;
  correctPhrase?: string;
  correctLabel?: string;
  phonetic?: string;
  meaning?: string;
  exampleSentence?: string;
  exampleHighlight?: string;
  proTip?: string;
  accentColor?: string;
  ctaText?: string;
}

export const EnglishTutorialReel: React.FC<EnglishTutorialProps> = ({
  episodeTag = "DAILY ENGLISH • EPISODE 01",
  category = "vocabulary",
  headline = "Stop Saying 'I'm Very Busy'!",
  hookSubtext = "Level up your conversational English with this native phrase",
  incorrectPhrase = "I am very busy today.",
  incorrectLabel = "COMMON & REPETITIVE",
  correctPhrase = "I'm swamped.",
  correctLabel = "NATIVE & NATURAL",
  phonetic = "/swɑːmpt/",
  meaning = "Having too much to deal with at once",
  exampleSentence = '"Sorry I couldn\'t reply earlier, I\'m completely swamped with work."',
  exampleHighlight = "swamped",
  proTip = "💡 Nuance: Use 'swamped' at work or with friends when overwhelmed by tasks.",
  accentColor = "#F59E0B",
  ctaText = "Double tap ❤️ & save for your next conversation!",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Progress Bar
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Staggered Animations
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const card1Entrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  const card2Entrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.9 },
  });

  const exampleEntrance = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, mass: 0.85 },
  });

  const tipEntrance = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Category badge label color
  const categoryBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
    vocabulary: { bg: "rgba(245, 158, 11, 0.12)", text: "#FBBF24", border: "rgba(245, 158, 11, 0.3)" },
    grammar: { bg: "rgba(59, 130, 246, 0.12)", text: "#60A5FA", border: "rgba(59, 130, 246, 0.3)" },
    pronunciation: { bg: "rgba(168, 85, 247, 0.12)", text: "#C084FC", border: "rgba(168, 85, 247, 0.3)" },
    "phrasal-verbs": { bg: "rgba(16, 185, 129, 0.12)", text: "#34D399", border: "rgba(16, 185, 129, 0.3)" },
    slang: { bg: "rgba(236, 72, 153, 0.12)", text: "#F472B6", border: "rgba(236, 72, 153, 0.3)" },
  };

  const currentBadge = categoryBadgeColors[category] || categoryBadgeColors.vocabulary;

  // Split example to highlight target word
  const renderExample = () => {
    if (!exampleHighlight || !exampleSentence.includes(exampleHighlight)) {
      return <span>{exampleSentence}</span>;
    }
    const parts = exampleSentence.split(exampleHighlight);
    return (
      <span>
        {parts[0]}
        <span
          style={{
            backgroundColor: `${accentColor}28`,
            color: accentColor,
            padding: "2px 8px",
            borderRadius: "6px",
            fontWeight: 800,
            borderBottom: `2px solid ${accentColor}`,
          }}
        >
          {exampleHighlight}
        </span>
        {parts.slice(1).join(exampleHighlight)}
      </span>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0D14",
        color: "#FFFFFF",
        fontFamily: plusJakartaFont,
        padding: "160px 96px 240px 96px", // Safe zone for Instagram vertical reels
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Top Video Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "6px",
          width: `${progress}%`,
          backgroundColor: accentColor,
          boxShadow: `0 0 16px ${accentColor}`,
          zIndex: 50,
        }}
      />

      {/* Subtle Background Glow Spheres */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, rgba(10,13,20,0) 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "-120px",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(10,13,20,0) 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* SECTION 1: HEADER & HOOK */}
      <div
        style={{
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [40, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Badges Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: currentBadge.bg,
              border: `1px solid ${currentBadge.border}`,
              color: currentBadge.text,
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: currentBadge.text,
                boxShadow: `0 0 8px ${currentBadge.text}`,
              }}
            />
            {category.toUpperCase()}
          </div>

          <div
            style={{
              color: "#94A3B8",
              fontSize: "19px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {episodeTag}
          </div>
        </div>

        {/* Hook Headline */}
        <h1
          style={{
            fontFamily: montserratFont,
            fontSize: "58px",
            lineHeight: 1.15,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "24px",
            color: "#94A3B8",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {hookSubtext}
        </p>
      </div>

      {/* SECTION 2: COMPARISON CARDS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          margin: "30px 0",
        }}
      >
        {/* INCORRECT / BASIC CARD */}
        <div
          style={{
            opacity: card1Entrance,
            transform: `translateY(${interpolate(card1Entrance, [0, 1], [40, 0])}px)`,
            backgroundColor: "rgba(239, 68, 68, 0.06)",
            border: "1.5px solid rgba(239, 68, 68, 0.25)",
            borderRadius: "24px",
            padding: "26px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                color: "#F87171",
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              ❌ {incorrectLabel}
            </span>
            <div
              style={{
                fontSize: "34px",
                fontWeight: 600,
                color: "#E2E8F0",
                textDecoration: "line-through",
                opacity: 0.85,
              }}
            >
              {incorrectPhrase}
            </div>
          </div>
        </div>

        {/* NATIVE / BETTER CARD */}
        <div
          style={{
            opacity: card2Entrance,
            transform: `scale(${interpolate(card2Entrance, [0, 1], [0.94, 1])}) translateY(${interpolate(card2Entrance, [0, 1], [30, 0])}px)`,
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            border: "2px solid rgba(16, 185, 129, 0.45)",
            borderRadius: "28px",
            padding: "32px 36px",
            boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Label & phonetic */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: "#34D399",
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ✅ {correctLabel}
            </span>
            {phonetic && (
              <span
                style={{
                  color: "#94A3B8",
                  fontSize: "22px",
                  fontWeight: 500,
                  fontFamily: "monospace",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  padding: "4px 12px",
                  borderRadius: "8px",
                }}
              >
                {phonetic}
              </span>
            )}
          </div>

          {/* Main Correct Phrase */}
          <div
            style={{
              fontFamily: montserratFont,
              fontSize: "52px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              marginBottom: "10px",
            }}
          >
            {correctPhrase}
          </div>

          {/* Meaning / definition */}
          {meaning && (
            <div
              style={{
                fontSize: "22px",
                color: "#A7F3D0",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              Meaning: {meaning}
            </div>
          )}
        </div>

        {/* REAL-WORLD EXAMPLE CARD */}
        <div
          style={{
            opacity: exampleEntrance,
            transform: `translateY(${interpolate(exampleEntrance, [0, 1], [30, 0])}px)`,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "22px",
            padding: "26px 30px",
          }}
        >
          <div
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#94A3B8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            🗣️ In Conversation:
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#F8FAFC",
              lineHeight: 1.5,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            {renderExample()}
          </div>
        </div>

        {/* PRO TIP / NUANCE */}
        {proTip && (
          <div
            style={{
              opacity: tipEntrance,
              transform: `translateY(${interpolate(tipEntrance, [0, 1], [20, 0])}px)`,
              backgroundColor: "rgba(245, 158, 11, 0.08)",
              border: "1px dashed rgba(245, 158, 11, 0.3)",
              borderRadius: "18px",
              padding: "18px 24px",
              fontSize: "20px",
              color: "#FDE68A",
              fontWeight: 500,
              lineHeight: 1.45,
            }}
          >
            {proTip}
          </div>
        )}
      </div>

      {/* SECTION 3: BOTTOM CALL TO ACTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          padding: "18px 24px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#CBD5E1",
            textAlign: "center",
          }}
        >
          {ctaText}
        </span>
      </div>
    </AbsoluteFill>
  );
};
