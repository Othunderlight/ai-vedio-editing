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

  // Staggered Snappy Reel Animations
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  const card1Entrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const card2Entrance = spring({
    frame: frame - 22,
    fps,
    config: { damping: 10, mass: 0.75 },
  });

  const exampleEntrance = spring({
    frame: frame - 38,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const tipEntrance = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, mass: 0.75 },
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundColor: currentBadge.bg,
              border: `1.5px solid ${currentBadge.border}`,
              color: currentBadge.text,
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: currentBadge.text,
                boxShadow: `0 0 10px ${currentBadge.text}`,
              }}
            />
            {category.toUpperCase()}
          </div>

          <div
            style={{
              color: "#94A3B8",
              fontSize: "24px",
              fontWeight: 700,
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
            fontSize: "72px",
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
            fontSize: "30px",
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
          margin: "24px 0",
        }}
      >
        {/* INCORRECT / BASIC CARD */}
        <div
          style={{
            opacity: card1Entrance,
            transform: `translateY(${interpolate(card1Entrance, [0, 1], [40, 0])}px)`,
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            border: "2px solid rgba(239, 68, 68, 0.35)",
            borderRadius: "24px",
            padding: "28px 36px",
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
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              ❌ {incorrectLabel}
            </span>
            <div
              style={{
                fontSize: "46px",
                fontWeight: 700,
                color: "#E2E8F0",
                textDecoration: "line-through",
                opacity: 0.9,
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
            transform: `scale(${interpolate(card2Entrance, [0, 1], [0.93, 1])}) translateY(${interpolate(card2Entrance, [0, 1], [30, 0])}px)`,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "2.5px solid rgba(16, 185, 129, 0.55)",
            borderRadius: "28px",
            padding: "36px 40px",
            boxShadow: "0 24px 48px -15px rgba(16, 185, 129, 0.22)",
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
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                color: "#34D399",
                fontSize: "24px",
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
                  color: "#CBD5E1",
                  fontSize: "26px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  padding: "6px 14px",
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
              fontSize: "68px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              marginBottom: "12px",
            }}
          >
            {correctPhrase}
          </div>

          {/* Meaning / definition */}
          {meaning && (
            <div
              style={{
                fontSize: "28px",
                color: "#A7F3D0",
                fontWeight: 600,
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
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1.5px solid rgba(255, 255, 255, 0.14)",
            borderRadius: "22px",
            padding: "28px 34px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#94A3B8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            🗣️ In Conversation:
          </div>
          <div
            style={{
              fontSize: "34px",
              color: "#F8FAFC",
              lineHeight: 1.5,
              fontWeight: 600,
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
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "1.5px dashed rgba(245, 158, 11, 0.4)",
              borderRadius: "20px",
              padding: "22px 28px",
              fontSize: "26px",
              color: "#FDE68A",
              fontWeight: 600,
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
          padding: "22px 28px",
          backgroundColor: "rgba(255, 255, 255, 0.07)",
          borderRadius: "18px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <span
          style={{
            fontSize: "26px",
            fontWeight: 700,
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
