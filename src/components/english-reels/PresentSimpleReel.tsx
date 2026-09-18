import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["700", "800", "900"],
});

const { fontFamily: plusJakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800"],
});

export interface PresentSimpleReelProps {
  accentColor?: string;
  showVoiceoverCaptions?: boolean;
  showSoundEffects?: boolean;
  showTopTracker?: boolean;
}

// Subtitle segments synced with the 60-second voiceover script (30 fps)
interface CaptionSegment {
  fromFrame: number;
  toFrame: number;
  speaker: string;
  text: string;
  highlightedWord?: string;
}

const VOICEOVER_CAPTIONS = [
  // 00:06 – 00:12 (القاعدة: الجملة العادية)
  {
    fromFrame: 180,
    toFrame: 360,
    text: "أول شي، القاعدة: بالجملة العادية منستخدم الفعل متل ما هو (V1)."
  },

  // 00:12 – 00:18 (إضافة s/es/ies)
  {
    fromFrame: 360,
    toFrame: 560,
    text: "بس مع (he, she, it) بنضيف للفعل s أو es أو ies!"
  },

  // 00:19 – 00:21 (مثال مثبت)
  {
    fromFrame: 570,
    toFrame: 630,
    text: "متل: 'I study law'.."
  },

  // 00:21 – 00:26 (أمثلة مع المفرد)
  {
    fromFrame: 630,
    toFrame: 800,
    text: "بس منقول: 'She likes reading' و 'He studies law'."
  },

  // 00:27 – 00:34 (النفي)
  {
    fromFrame: 810,
    toFrame: 1040,
    text: "وبالنفي، منحط don't أو doesn't مع الفعل بالمصدر: 'He doesn't study medicine.'"
  },

  // 00:35 – 00:40 (السؤال)
  {
    fromFrame: 1050,
    toFrame: 1220,
    text: "أما بالسؤال، فمنبدأ بـ Do أو Does: 'Does he study law?'"
  },

  // 00:41 – 00:46 (الاستخدام 1: العادات)
  {
    fromFrame: 1230,
    toFrame: 1400,
    text: "طيّب، إيمتى منستخدمه؟ رقم واحد: للعادات والأشياء اللي بتتكرر دائماً."
  },

  // 00:47 – 00:53 (الخط الزمني)
  {
    fromFrame: 1410,
    toFrame: 1590,
    text: "شوف هالخط الزمني: بالماضي، الحاضر، والمستقبل.. الفعل عم يتكرر!"
  },

  // 00:53 – 00:56 (مثال العادات)
  {
    fromFrame: 1590,
    toFrame: 1700,
    text: "متل: 'I use the Internet every day.'"
  },

  // 00:56 – 00:59 (الاستخدام 2: الحقائق)
  {
    fromFrame: 1700,
    toFrame: 1780,
    text: "رقم اتنين: للحقائق العلمية والعامة! 🔬"
  },

  // 00:59 – 01:03 (مثال الحقائق)
  {
    fromFrame: 1780,
    toFrame: 1890,
    text: "'If you heat water to 100 degrees, it boils.'"
  }
];

export const PresentSimpleReel: React.FC<PresentSimpleReelProps> = ({
  accentColor = "#F59E0B",
  showVoiceoverCaptions = true,
  showSoundEffects = true,
  showTopTracker = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Progress percentage (0 - 100%)
  const overallProgress = Math.min(100, (frame / durationInFrames) * 100);

  // Time display (MM:SS)
  const currentSeconds = Math.floor(frame / fps);
  const formattedTime = `00:${currentSeconds.toString().padStart(2, "0")}`;

  // Current Scene Index (1 to 8)
  let currentSceneIndex = 1;
  let currentSceneName = "Hook";
  if (frame >= 150 && frame < 540) {
    currentSceneIndex = 2;
    currentSceneName = "(+) Positive Form";
  } else if (frame >= 540 && frame < 780) {
    currentSceneIndex = 3;
    currentSceneName = "(– / ?) Neg & Questions";
  } else if (frame >= 780 && frame < 1140) {
    currentSceneIndex = 4;
    currentSceneName = "1. Habits & Routine";
  } else if (frame >= 1140 && frame < 1350) {
    currentSceneIndex = 5;
    currentSceneName = "2. Facts & Truths";
  } else if (frame >= 1350 && frame < 1530) {
    currentSceneIndex = 6;
    currentSceneName = "3. Instructions";
  } else if (frame >= 1530 && frame < 1680) {
    currentSceneIndex = 7;
    currentSceneName = "4. Stories & Films";
  } else if (frame >= 1680) {
    currentSceneIndex = 8;
    currentSceneName = "Call To Action";
  }

  // Find active caption
  const activeCaption = VOICEOVER_CAPTIONS.find(
    (c) => frame >= c.fromFrame && frame < c.toFrame
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0F19",
        color: "#FFFFFF",
        fontFamily: plusJakartaFont,
        overflow: "hidden",
      }}
    >
      {/* Main Voiceover */}
      <Audio src={staticFile('assets/sounds/voicceover/present-simple.wav')} />

      {/* SFX placeholders (commented out for now) */}
      {/* <Sequence from={45}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.8} />
      </Sequence> */}

      {/* Dynamic Background Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.7) 0%, rgba(11, 15, 25, 0.98) 100%)",
        }}
      />

      {/* Subtle Grid Accent Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Ambient Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* =========================================================================
          GLOBAL HEADER & TIMER BAR (0 - 60s)
          ========================================================================= */}
      {showTopTracker && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "60px",
            right: "60px",
            zIndex: 50,
          }}
        >
          {/* Top Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: `${overallProgress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${accentColor}, #38BDF8)`,
                borderRadius: "999px",
                boxShadow: `0 0 16px ${accentColor}`,
              }}
            />
          </div>

          {/* Header Status Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >


            {/* Live Clock & Step Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 1: TITLE HOOK (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <SceneHook frame={frame} fps={fps} accentColor={accentColor} />}

      {/* =========================================================================
          SCENE 2: STRUCTURE CARD (+) POSITIVE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <ScenePositive
          frame={frame - 150}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 3: STRUCTURE CARD (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <SceneNegativeAndQuestion
          frame={frame - 540}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE + TIMELINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <SceneHabitsTimeline
          frame={frame - 780}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <SceneFactsTruths
          frame={frame - 1140}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS & DIRECTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <SceneInstructions
          frame={frame - 1350}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <SceneStoriesFilms
          frame={frame - 1530}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && (
        <SceneCallToAction
          frame={frame - 1680}
          fps={fps}
          accentColor={accentColor}
        />
      )}

      {/* =========================================================================
          BOTTOM DYNAMIC VOICEOVER SUBTITLES (TikTok/Reel Style)
          ========================================================================= */}
      {showVoiceoverCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "400px",
            left: "60px",
            right: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "2px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              borderRadius: "24px",
              padding: "20px 36px",
              maxWidth: "960px",
              textAlign: "center",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* script */}
            <div
              dir="auto"
              style={{
                fontSize: "34px",
                fontWeight: 800,
                lineHeight: 1.35,
                color: "#F8FAFC",
              }}
            >
              {renderHighlightedCaption(
                activeCaption.text,
                activeCaption.highlightedWord,
                accentColor
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sound Effect Visual Indicator (e.g. [WOOSH], [CLICK], [CLAP]) */}
      {showSoundEffects && (
        <SoundEffectCue frame={frame} />
      )}
    </AbsoluteFill>
  );
};

// Helper for rendering dynamic highlighted caption text
function renderHighlightedCaption(
  fullText: string,
  highlight?: string,
  color = "#F59E0B"
) {
  if (!highlight) return fullText;
  const parts = fullText.split(highlight);
  if (parts.length <= 1) return fullText;

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span
              style={{
                color: color,
                backgroundColor: `${color}25`,
                padding: "2px 10px",
                borderRadius: "8px",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              }}
            >
              {highlight}
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

// Sound Effect visual pop cues matching animation pacing
const SoundEffectCue: React.FC<{ frame: number }> = ({ frame }) => {
  // Define key frames where audio triggers happen
  const cues = [
    { frame: 12, label: "WOOSH 💨", color: "#38BDF8" },
    { frame: 165, label: "SLIDE IN ⚡", color: "#F59E0B" },
    { frame: 555, label: "TRANSITION 🔄", color: "#EC4899" },
    { frame: 800, label: "POP POP POP ✨", color: "#06B6D4" },
    { frame: 1160, label: "SIZZLE / BOIL ♨️", color: "#FB923C" },
    { frame: 1400, label: "CLICK! 🖱️", color: "#10B981" },
    { frame: 1545, label: "CLAP! 🎬", color: "#A855F7" },
    { frame: 1695, label: "TAP FOLLOW! 🚀", color: "#F59E0B" },
  ];

  const activeCue = cues.find((c) => Math.abs(frame - c.frame) <= 18);
  if (!activeCue) return null;

  const age = Math.abs(frame - activeCue.frame);
  const opacity = interpolate(age, [0, 18], [1, 0]);
  const scale = interpolate(age, [0, 18], [1.1, 0.9]);

  return (
    <div
      style={{
        position: "absolute",
        top: "165px",
        right: "60px",
        backgroundColor: `${activeCue.color}30`,
        border: `2px solid ${activeCue.color}`,
        color: activeCue.color,
        fontWeight: 800,
        fontSize: "20px",
        letterSpacing: "1px",
        padding: "8px 20px",
        borderRadius: "999px",
        opacity,
        transform: `scale(${scale})`,
        zIndex: 55,
      }}
    >
      SFX: {activeCue.label}
    </div>
  );
};

/* =========================================================================
   SCENE 1: HOOK & TITLE CARD (0:00 - 0:05)
   ========================================================================= */
export const SceneHook: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const titleEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const clockRotation = interpolate(frame, [0, 150], [0, 360]);
  const pulse = Math.sin(frame / 6) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        scale: 1.227
      }}
      from={1}
    >
      {/* Dynamic Animated Stopwatch Badge */}
      <div
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1E293B, #0F172A)",
          border: `4px solid ${accentColor}`,
          boxShadow: `0 0 60px ${accentColor}40, inset 0 0 30px rgba(0,0,0,0.6)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "50px",
          transform: `scale(${titleEntrance * pulse})`,
        }}
      >
        {/* Clock SVG Dial */}
        <svg width="180" height="180" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="4"
          />
          {/* Ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (deg, i) => (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="16"
                stroke={i % 3 === 0 ? accentColor : "rgba(255,255,255,0.4)"}
                strokeWidth={i % 3 === 0 ? "3" : "1.5"}
                transform={`rotate(${deg} 50 50)`}
              />
            )
          )}
          {/* Rotating Second Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${clockRotation} 50 50)`}
          />
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        </svg>

        {/* 60s Center Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "35px",
            fontSize: "22px",
            fontWeight: 900,
            color: accentColor,
          }}
        >
          60 SEC
        </div>
      </div>

      {/* Main Bold Title */}
      <div
        dir="auto"
        style={{
          textAlign: "center",
          transform: `scale(${titleEntrance}) translateY(${interpolate(
            titleEntrance,
            [0, 1],
            [60, 0]
          )}px)`,
          opacity: titleEntrance,
        }}
      >

        <h1
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "82px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "20px 0 20px 0",
          }}
        >
          Present Simple
          <br />
          <span
            dir="auto"
            style={{
              color: accentColor,
              textShadow: `0 0 40px ${accentColor}80`,
              fontSize: "70px",
              margin: "20px 0 20px 0",
            }}
          >
            المضارع البسيط في دقيقة
          </span>
        </h1>

        <p
          dir="auto"
          style={{
            fontSize: "34px",
            fontWeight: 600,
            color: "#94A3B8",
            maxWidth: "800px",
            margin: "100px auto 40px auto",
            lineHeight: 1.5,
          }}
        >
          الصيغ • القواعد • أمثلة حية • الاستخدامات الـ 4
        </p>

      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 2: STRUCTURE CARD (+) POSITIVE (0:05 - 0:18)
   ========================================================================= */
export const ScenePositive: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const cardSlideIn = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const ex1Entrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  const ex2Entrance = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  const ex3Entrance = spring({
    frame: frame - 150,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Title Section Banner */}
      <div
        dir="auto"
        style={{
          transform: `translateY(${interpolate(cardSlideIn, [0, 1], [-80, 0])}px)`,
          opacity: cardSlideIn,
          marginBottom: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(34, 197, 94, 0.15)",
            color: "#4ADE80",
            border: "2px solid rgba(34, 197, 94, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">(+) صيغة الإثبات (Positive)</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
          }}
        >
          تركيب الجملة المثبتة
        </h2>
      </div>

      {/* Main Formula Card */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `2px solid ${accentColor}80`,
          borderRadius: "28px",
          padding: "36px 44px",
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${accentColor}25`,
          transform: `scale(${cardSlideIn})`,
          marginBottom: "36px",
        }}
      >
        <div
          dir="auto"
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#94A3B8",
            marginBottom: "14px",
            textAlign: "right",
          }}
        >
          القاعدة الأساسية (Formula)
        </div>

        {/* Formula breakdown */}
        <div
          style={{
            fontSize: "44px",
            fontWeight: 900,
            color: "#F8FAFC",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px",
            lineHeight: 1.3,
          }}
        >
          <span>Subject</span>
          <span style={{ color: "#64748B" }}>+</span>
          <span
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "4px 18px",
              borderRadius: "12px",
            }}
          >
            V1
          </span>
          <span style={{ color: "#64748B" }}>/</span>
          <span
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              border: `2px solid ${accentColor}`,
              padding: "4px 18px",
              borderRadius: "12px",
            }}
          >
            V1 + s
          </span>
        </div>

        {/* Rule Highlight Pill */}
        <div
          dir="auto"
          style={{
            marginTop: "24px",
            padding: "16px 24px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "16px",
            textAlign: "right",
          }}
        >
          <div dir="auto" style={{ fontSize: "24px", fontWeight: 700, color: "#E2E8F0", textAlign: "right" }}>
            مع <span style={{ color: "#38BDF8" }}>He / She / It</span>: نضيف{" "}
            <span
              dir="auto"
              style={{
                color: "#FBBF24",
                fontWeight: 900,
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                padding: "2px 10px",
                borderRadius: "6px",
              }}
            >
              S
            </span>
            !
          </div>
        </div>
      </div>

      {/* 3 Real Examples Staggered */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Example 1: I study law */}
        <div
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "22px",
            padding: "26px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${ex1Entrance}) translateY(${interpolate(
              ex1Entrance,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: ex1Entrance,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "36px" }}>👉</span>
            <span style={{ fontSize: "40px", fontWeight: 700 }}>
              <span style={{ color: "#38BDF8" }}>I</span>{" "}
              <span
                style={{
                  color: "#F8FAFC",
                  textDecoration: "underline",
                  textUnderlineOffset: "8px",
                }}
              >
                study
              </span>{" "}
              law.
            </span>
          </div>
          <div
            dir="auto"
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "#38BDF8",
              padding: "8px 18px",
              borderRadius: "12px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            فعل مجرد (V1)
          </div>
        </div>

        {/* Example 2: She likes reading */}
        <div
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            border: `2px solid ${accentColor}70`,
            borderRadius: "22px",
            padding: "26px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${ex2Entrance}) translateY(${interpolate(
              ex2Entrance,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: ex2Entrance,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "36px" }}>👉</span>
            <span style={{ fontSize: "40px", fontWeight: 700 }}>
              <span style={{ color: "#F472B6" }}>She</span> like
              <span
                style={{
                  color: accentColor,
                  fontWeight: 900,
                  backgroundColor: `${accentColor}30`,
                  padding: "0 8px",
                  borderRadius: "6px",
                }}
              >
                s
              </span>{" "}
              reading.
            </span>
          </div>
          <div
            dir="auto"
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              padding: "8px 18px",
              borderRadius: "12px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            +s (للمفرد الغائب)
          </div>
        </div>

        {/* Example 3: He studies law */}
        <div
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            border: `2px solid ${accentColor}70`,
            borderRadius: "22px",
            padding: "26px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${ex3Entrance}) translateY(${interpolate(
              ex3Entrance,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: ex3Entrance,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "36px" }}>👉</span>
            <span style={{ fontSize: "40px", fontWeight: 700 }}>
              <span style={{ color: "#38BDF8" }}>He</span> stud
              <span
                style={{
                  color: accentColor,
                  fontWeight: 900,
                  backgroundColor: `${accentColor}30`,
                  padding: "0 8px",
                  borderRadius: "6px",
                }}
              >
                ies
              </span>{" "}
              law.
            </span>
          </div>
          <div
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              padding: "8px 18px",
              borderRadius: "12px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            study: -ies
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 3: STRUCTURE CARD (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26)
   ========================================================================= */
export const SceneNegativeAndQuestion: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const negEntrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const qEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Title */}
      <div
        dir="auto"
        style={{
          marginBottom: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(244, 63, 94, 0.15)",
            color: "#FB7185",
            border: "2px solid rgba(244, 63, 94, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">(– & ؟) النفي وتكوين السؤال</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
            marginBottom: "10px"
          }}
        >
          النفي وتكوين السؤال

        </h2>
      </div>

      {/* CARD 1: NEGATIVE FORM */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: "2px solid rgba(244, 63, 94, 0.6)",
          borderRadius: "26px",
          padding: "36px 40px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          transform: `scale(${negEntrance}) translateY(${interpolate(
            negEntrance,
            [0, 1],
            [50, 0]
          )}px)`,
          opacity: negEntrance,
          marginBottom: "30px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            marginBottom: "16px",
          }}
        >
          <div
            dir="auto"
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#FB7185",
              textAlign: "right",
            }}
          >
            (–) قاعدة النفي (Negative)
          </div>
          <div
            dir="auto"
            style={{
              backgroundColor: "rgba(244, 63, 94, 0.15)",
              color: "#FDA4AF",
              padding: "6px 16px",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            don't / doesn't + فعل مجرد
          </div>
        </div>

        {/* Formula */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "20px",
            marginTop: "50px",
            color: "#F8FAFC",
          }}
        >
          Subject +{" "}
          <span
            style={{
              color: "#FB7185",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              padding: "2px 12px",
              borderRadius: "8px",
              fontWeight: 900,
            }}
          >
            don’t / doesn’t
          </span>{" "}
          + <span style={{ color: "#38BDF8" }}>V0 (Base)</span>
        </div>

        {/* Example */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            padding: "20px 28px",
            borderRadius: "16px",
            fontSize: "36px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          <span>👉</span>
          <span>
            He{" "}
            <span style={{ color: "#FB7185", fontWeight: 900 }}>
              doesn't study
            </span>{" "}
            medicine.
          </span>
        </div>
      </div>

      {/* CARD 2: QUESTION FORM */}
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#1E293B",
          border: "2px solid rgba(56, 189, 248, 0.6)",
          borderRadius: "26px",
          padding: "36px 40px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          transform: `scale(${qEntrance}) translateY(${interpolate(
            qEntrance,
            [0, 1],
            [50, 0]
          )}px)`,
          opacity: qEntrance,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            marginBottom: "50px",
          }}
        >
          <div
            dir="auto"
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#38BDF8",
              textAlign: "right",
            }}
          >
            (؟) قاعدة السؤال (Questions)
          </div>
          <div
            dir="auto"
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "#7DD3FC",
              padding: "6px 16px",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            Do / Does + فعل مجرد؟
          </div>
        </div>

        {/* Formula */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "20px",
            color: "#F8FAFC",
          }}
        >
          <span
            style={{
              color: "#38BDF8",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              padding: "2px 12px",
              borderRadius: "8px",
              fontWeight: 900,
            }}
          >
            Do / Does
          </span>{" "}
          + Subject + <span style={{ color: "#A7F3D0" }}>V0</span>
          <span
            style={{
              color: accentColor,
              fontWeight: 900,
              marginLeft: "4px",
              fontSize: "42px",
            }}
          >
            ?
          </span>
        </div>

        {/* Example */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            padding: "20px 28px",
            borderRadius: "16px",
            fontSize: "36px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          <span>👉</span>
          <span>
            <span style={{ color: "#38BDF8", fontWeight: 900 }}>Does</span> he
            study law
            <span style={{ color: accentColor, fontWeight: 900 }}>?</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 4: USE 1: HABITS & ROUTINE + TIMELINE (0:26 - 0:38)
   ========================================================================= */
export const SceneHabitsTimeline: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Timeline markers progress
  const marker1 = spring({ frame: frame - 25, fps });
  const marker2 = spring({ frame: frame - 55, fps });
  const marker3 = spring({ frame: frame - 85, fps });
  const marker4 = spring({ frame: frame - 115, fps });
  const marker5 = spring({ frame: frame - 145, fps });

  // Floating keywords staggered
  const tag1 = spring({ frame: frame - 160, fps });
  const tag2 = spring({ frame: frame - 180, fps });
  const tag3 = spring({ frame: frame - 200, fps });
  const tag4 = spring({ frame: frame - 220, fps });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Title */}
      <div
        dir="auto"
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(14, 165, 233, 0.15)",
            color: "#38BDF8",
            border: "2px solid rgba(14, 165, 233, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">الاستخدام 1 من 4</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
          }}
        >
          1. العادات والروتين اليومي (Habits)
        </h2>
      </div>

      {/* TIMELINE DIAGRAM CARD */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `2px solid ${accentColor}80`,
          borderRadius: "28px",
          padding: "40px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
          transform: `scale(${entrance})`,
          marginBottom: "32px",
        }}
      >
        <div
          dir="auto"
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#94A3B8",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <span dir="auto">خط زمني لتكرار الحدث (Timeline)</span>
          <span dir="auto" style={{ color: accentColor }}>الماضي: الحاضر: المستقبل</span>
        </div>

        {/* The Timeline SVG Track */}
        <div style={{ position: "relative", height: "130px", margin: "20px 0" }}>
          {/* Main Axis Line */}
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "40px",
              right: "40px",
              height: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "999px",
            }}
          />

          {/* Arrow Head on right */}
          <div
            style={{
              position: "absolute",
              top: "43px",
              right: "30px",
              width: "0",
              height: "0",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: `16px solid ${accentColor}`,
            }}
          />

          {/* Sequential 'X' Marks along timeline */}
          {[
            { springVal: marker1, left: "12%", label: "الماضي" },
            { springVal: marker2, left: "32%", label: "أمس" },
            { springVal: marker3, left: "52%", label: "الآن (الحاضر)", isCenter: true },
            { springVal: marker4, left: "72%", label: "غداً" },
            { springVal: marker5, left: "90%", label: "المستقبل" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: "15px",
                left: item.left,
                transform: `translateX(-50%) scale(${item.springVal})`,
                opacity: item.springVal,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* The 'X' Mark Badge */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: item.isCenter ? accentColor : "#0F172A",
                  border: `3px solid ${
                    item.isCenter ? "#FFFFFF" : accentColor
                  }`,
                  color: item.isCenter ? "#0F172A" : accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: 900,
                  boxShadow: `0 0 20px ${accentColor}60`,
                }}
              >
                X
              </div>
              <span
                dir="auto"
                style={{
                  marginTop: "16px",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: item.isCenter ? "#F8FAFC" : "#94A3B8",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Caption beneath timeline */}
        <div
          dir="auto"
          style={{
            textAlign: "right",
            fontSize: "24px",
            fontWeight: 700,
            color: "#CBD5E1",
            marginTop: "10px",
          }}
        >
          "حدثت في الماضي، وتحدث الآن، وستتكرر مستقبلاً!"
        </div>
      </div>

      {/* Floating Keywords tags */}
      <div
        dir="auto"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: "14px",
          marginBottom: "30px",
        }}
      >
        {[
          { text: "⚡ always (دائماً)", s: tag1 },
          { text: "⚡ usually (عادةً)", s: tag2 },
          { text: "⚡ sometimes (أحياناً)", s: tag3 },
          { text: "⚡ every day (كل يوم)", s: tag4 },
        ].map((kw, i) => (
          <div
            key={i}
            dir="auto"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1.5px solid rgba(245, 158, 11, 0.4)",
              color: "#FBBF24",
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "24px",
              fontWeight: 800,
              transform: `scale(${kw.s})`,
              opacity: kw.s,
            }}
          >
            {kw.text}
          </div>
        ))}
      </div>

      {/* Example Box */}
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          border: `2px solid ${accentColor}`,
          borderRadius: "24px",
          padding: "28px 36px",
          fontSize: "40px",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: `0 16px 40px ${accentColor}20`,
        }}
      >
        <span style={{ fontSize: "40px" }}>👉</span>
        <span>
          I{" "}
          <span
            style={{
              color: "#38BDF8",
              textDecoration: "underline",
              textUnderlineOffset: "8px",
            }}
          >
            use
          </span>{" "}
          the Internet{" "}
          <span
            style={{
              color: accentColor,
              backgroundColor: `${accentColor}25`,
              padding: "2px 12px",
              borderRadius: "10px",
            }}
          >
            every day
          </span>
          .
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45)
   ========================================================================= */
export const SceneFactsTruths: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Thermometer temperature rising from 20°C to 100°C
  const tempProgress = interpolate(frame, [10, 100], [20, 100], {
    extrapolateRight: "clamp",
  });
  const mercuryHeight = interpolate(tempProgress, [20, 100], [50, 240]);

  // Boiling steam wave oscillation
  const steamWave = Math.sin(frame / 4) * 8;
  const steamWave2 = Math.cos(frame / 3) * 10;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Header */}
      <div
        dir="auto"
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(251, 146, 60, 0.15)",
            color: "#FB923C",
            border: "2px solid rgba(251, 146, 60, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">الاستخدام 2 من 4</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
          }}
        >
          2. الحقائق العلمية والثوابت (Facts)
        </h2>
      </div>

      {/* SCIENTIFIC THERMOMETER & BOILING VISUAL CARD */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `2px solid ${accentColor}80`,
          borderRadius: "28px",
          padding: "36px 44px",
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${accentColor}25`,
          transform: `scale(${entrance})`,
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Animated Thermometer SVG */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width="120" height="300" viewBox="0 0 100 280">
            {/* Outer glass tube */}
            <rect
              x="38"
              y="15"
              width="24"
              height="200"
              rx="12"
              fill="rgba(255,255,255,0.08)"
              stroke="#94A3B8"
              strokeWidth="3"
            />
            {/* Bottom Bulb */}
            <circle
              cx="50"
              cy="235"
              r="28"
              fill="#EF4444"
              stroke="#94A3B8"
              strokeWidth="3"
            />
            {/* Temperature scale markings */}
            {[0, 25, 50, 75, 100].map((t, idx) => {
              const y = 200 - idx * 40;
              return (
                <g key={idx}>
                  <line
                    x1="66"
                    y1={y}
                    x2="78"
                    y2={y}
                    stroke="#94A3B8"
                    strokeWidth="2"
                  />
                  <text
                    x="84"
                    y={y + 5}
                    fill="#94A3B8"
                    fontSize="14"
                    fontWeight="700"
                  >
                    {t}°
                  </text>
                </g>
              );
            })}
            {/* Rising Mercury Bar */}
            <rect
              x="43"
              y={215 - (mercuryHeight - 50)}
              width="14"
              height={mercuryHeight - 30}
              rx="7"
              fill="url(#mercuryGradient)"
            />
            <defs>
              <linearGradient
                id="mercuryGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Temperature Digital Readout */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #EF4444",
              borderRadius: "14px",
              padding: "6px 18px",
              fontSize: "26px",
              fontWeight: 900,
              color: "#FCA5A5",
              marginTop: "8px",
            }}
          >
            {Math.round(tempProgress)} °C
          </div>
        </div>

        {/* Animated Boiling Beaker / Kettle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Steam wisps rising */}
          <svg width="180" height="70" viewBox="0 0 160 60">
            <path
              d={`M 40 50 Q ${40 + steamWave} 25, 45 5`}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 80 50 Q ${80 + steamWave2} 25, 85 5`}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 120 50 Q ${120 - steamWave} 25, 115 5`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Beaker Container */}
          <div
            style={{
              width: "200px",
              height: "170px",
              borderRadius: "16px 16px 36px 36px",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "4px solid rgba(255, 255, 255, 0.4)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(56, 189, 248, 0.3)",
            }}
          >
            {/* Boiling Water Liquid */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                backgroundColor: "rgba(14, 165, 233, 0.5)",
                borderTop: "3px solid #38BDF8",
              }}
            >
              {/* Boiling Bubbles */}
              {[20, 50, 90, 130, 160].map((bx, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${bx}px`,
                    bottom: `${(frame * 4 + i * 25) % 110}px`,
                    width: `${10 + (i % 3) * 4}px`,
                    height: `${10 + (i % 3) * 4}px`,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    boxShadow: "0 0 8px #FFFFFF",
                  }}
                />
              ))}
            </div>

            {/* Heat Fire Glow at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "20px",
                background:
                  "linear-gradient(to top, rgba(239, 68, 68, 0.8), transparent)",
              }}
            />
          </div>

          <div
            dir="auto"
            style={{
              marginTop: "16px",
              fontSize: "22px",
              fontWeight: 800,
              color: "#38BDF8",
              textAlign: "right",
            }}
          >
            ♨️ غليان الماء عند 100°م (حقيقة علمية)
          </div>
        </div>
      </div>

      {/* Example Box */}
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          border: "2px solid #FB923C",
          borderRadius: "24px",
          padding: "30px 36px",
          fontSize: "38px",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 16px 40px rgba(251, 146, 60, 0.2)",
          lineHeight: 1.35,
        }}
      >
        <span style={{ fontSize: "40px" }}>👉</span>
        <span>
          If you{" "}
          <span style={{ color: "#38BDF8", fontWeight: 900 }}>heat</span> water
          to{" "}
          <span
            style={{
              color: "#FB923C",
              backgroundColor: "rgba(251, 146, 60, 0.2)",
              padding: "2px 12px",
              borderRadius: "8px",
            }}
          >
            100 °C
          </span>
          , it{" "}
          <span
            style={{
              color: "#FBBF24",
              fontWeight: 900,
              textDecoration: "underline",
              textUnderlineOffset: "6px",
            }}
          >
            boils
          </span>
          .
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 6: USE 3: INSTRUCTIONS & DIRECTIONS (0:45 - 0:51)
   ========================================================================= */
export const SceneInstructions: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Animated Mouse Cursor gliding across to the desktop icon
  const cursorX = interpolate(frame, [0, 60], [120, 360], {
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [0, 60], [40, 110], {
    extrapolateRight: "clamp",
  });

  // Click pulse animation at frame 60
  const isClicked = frame >= 60;
  const clickWave = isClicked
    ? interpolate(frame - 60, [0, 25], [0.8, 2.2], {
        extrapolateRight: "clamp",
      })
    : 0;
  const clickWaveOpacity = isClicked
    ? interpolate(frame - 60, [0, 25], [1, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Header */}
      <div
        dir="auto"
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            color: "#34D399",
            border: "2px solid rgba(16, 185, 129, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">الاستخدام 3 من 4</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
          }}
        >
          3. إعطاء التعليمات والتوجيهات (Instructions)
        </h2>
      </div>

      {/* COMPUTER DESKTOP UI WINDOW CARD */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `2px solid ${accentColor}80`,
          borderRadius: "28px",
          padding: "36px",
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${accentColor}25`,
          transform: `scale(${entrance})`,
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Desktop Titlebar */}
        <div
          dir="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "18px",
            marginBottom: "26px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#EF4444",
              }}
            />
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
              }}
            />
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
          </div>
          <div
            dir="auto"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#94A3B8",
              textAlign: "right",
            }}
          >
            نظام التشغيل • خطوات التشغيل والضغط
          </div>
          <div style={{ width: "40px" }} />
        </div>

        {/* Desktop Screen Area */}
        <div
          style={{
            height: "220px",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            borderRadius: "18px",
            padding: "24px",
            position: "relative",
            display: "flex",
            gap: "40px",
          }}
        >
          {/* Target App Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              position: "absolute",
              left: "320px",
              top: "30px",
              transform: isClicked ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "20px",
                backgroundColor: isClicked ? "#10B981" : "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isClicked
                  ? "0 0 30px #10B981"
                  : "0 10px 25px rgba(0,0,0,0.5)",
                fontSize: "44px",
              }}
            >
              💻
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#FFFFFF",
                backgroundColor: isClicked
                  ? "rgba(16, 185, 129, 0.4)"
                  : "rgba(255, 255, 255, 0.15)",
                padding: "4px 12px",
                borderRadius: "8px",
              }}
            >
              Programme.exe
            </span>
          </div>

          {/* Click Shockwave Ripple */}
          {isClicked && (
            <div
              style={{
                position: "absolute",
                left: "365px",
                top: "75px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "4px solid #10B981",
                transform: `translate(-50%, -50%) scale(${clickWave})`,
                opacity: clickWaveOpacity,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Click Badge */}
          {isClicked && (
            <div
              dir="auto"
              style={{
                position: "absolute",
                left: "430px",
                top: "30px",
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "20px",
                padding: "6px 16px",
                borderRadius: "999px",
                boxShadow: "0 0 20px #10B981",
              }}
            >
              *اضغط هنا!* 🖱️
            </div>
          )}

          {/* Moving Mouse Cursor */}
          <div
            style={{
              position: "absolute",
              left: `${cursorX}px`,
              top: `${cursorY}px`,
              transform: isClicked ? "scale(0.85)" : "scale(1)",
              zIndex: 30,
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 3L11 20L14 13L21 11L4 3Z"
                fill="#FFFFFF"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Example Box */}
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          border: "2px solid #10B981",
          borderRadius: "24px",
          padding: "30px 36px",
          fontSize: "36px",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 16px 40px rgba(16, 185, 129, 0.2)",
          lineHeight: 1.4,
        }}
      >
        <span style={{ fontSize: "40px" }}>👉</span>
        <span>
          To <span style={{ color: "#38BDF8" }}>start</span> the programme,
          first{" "}
          <span
            style={{
              color: "#34D399",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              padding: "2px 12px",
              borderRadius: "8px",
              fontWeight: 900,
            }}
          >
            click
          </span>{" "}
          on the desktop.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56)
   ========================================================================= */
export const SceneStoriesFilms: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Movie Clapper snap animation
  const clapAngle = interpolate(frame, [0, 20, 35], [-25, 0, 0], {
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, mass: 0.7 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "190px 70px 180px 70px",
      }}
    >
      {/* Header */}
      <div
        dir="auto"
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          width: "100%",
          gap: "100px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            color: "#C084FC",
            border: "2px solid rgba(168, 85, 247, 0.4)",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          <span dir="auto">الاستخدام 4 من 4</span>
        </div>
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-1px",
            textAlign: "right",
          }}
        >
          4. سرد القصص وتلخيص الأفلام (Stories)
        </h2>
      </div>

      {/* MOVIE CLAPPERBOARD & HERO GRAPHIC CARD */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `2px solid ${accentColor}80`,
          borderRadius: "28px",
          padding: "36px 44px",
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${accentColor}25`,
          transform: `scale(${entrance})`,
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Animated Movie Clapperboard */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "170px",
            }}
          >
            {/* Clapper Top Moving Bar */}
            <div
              style={{
                width: "200px",
                height: "36px",
                backgroundColor: "#0F172A",
                border: "2px solid #FFFFFF",
                borderRadius: "6px",
                transformOrigin: "left bottom",
                transform: `rotate(${clapAngle}deg)`,
                backgroundImage:
                    "repeating-linear-gradient(45deg, #FFFFFF, #FFFFFF 15px, #0F172A 15px, #0F172A 30px)",
                marginBottom: "4px",
              }}
            />

            {/* Clapperboard Body */}
            <div
              style={{
                width: "200px",
                height: "130px",
                backgroundColor: "#0F172A",
                border: "2px solid #FFFFFF",
                borderRadius: "6px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                dir="auto"
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#C084FC",
                  letterSpacing: "1px",
                  textAlign: "right",
                }}
              >
                PROD: Spiderman
              </div>
              <div
                dir="auto"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  fontSize: "14px",
                  color: "#94A3B8",
                  fontWeight: 700,
                }}
              >
                <span dir="auto">مشهد: 04</span>
                <span dir="auto">تصوير: 01</span>
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#FBBF24",
                }}
              >
                ACTION! 🎬
              </div>
            </div>
          </div>
        </div>

        {/* Hero Comic Action Badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${heroPop})`,
          }}
        >
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 0 50px rgba(236, 72, 153, 0.5)",
            }}
          >
            <Img
              src={staticFile("/assets/spiderman-crawling.webp")}
              alt="Spiderman crawling - movie scene"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Example Box */}
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          border: "2px solid #C084FC",
          borderRadius: "24px",
          padding: "30px 36px",
          fontSize: "38px",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 16px 40px rgba(168, 85, 247, 0.2)",
          lineHeight: 1.4,
        }}
      >
        <span style={{ fontSize: "40px" }}>👉</span>
        <span>
          In the film, the hero{" "}
          <span
            style={{
              color: "#FBBF24",
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              padding: "2px 12px",
              borderRadius: "8px",
              fontWeight: 900,
            }}
          >
            saves
          </span>{" "}
          the villagers.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00)
   ========================================================================= */
export const SceneCallToAction: React.FC<{
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ frame, fps, accentColor }) => {
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const buttonFollow = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, mass: 0.7 },
  });

  const isFollowClicked = frame >= 45;
  const pulseRocket = Math.sin(frame / 4) * 10;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          border: `3px solid ${accentColor}`,
          borderRadius: "36px",
          padding: "60px",
          maxWidth: "920px",
          width: "100%",
          textAlign: "center",
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px ${accentColor}30`,
          transform: `scale(${cardEntrance})`,
        }}
      >

        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "60px",
            fontWeight: 900,
            margin: "50px 0 16px 0",
            lineHeight: 1.2,
          }}
        >
          تابعنا للمزيد من
          <br />
          <span dir="auto" style={{ color: accentColor }}>قواعد الإنجليزية في دقيقة!</span>
        </h2>


        {/* Comment prompt Box */}
        <div
          dir="auto"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "2px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
            padding: "24px 30px",
            marginBottom: "100px",
            marginTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "36px" }}>💬</span>
          <span
            dir="auto"
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#F8FAFC",
            }}
          >
            "اكتب جملتك في التعليقات وسأصححها لك!"
          </span>
        </div>

        {/* Animated Follow Button */}
        <div
          dir="auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            backgroundColor: isFollowClicked ? "#10B981" : accentColor,
            color: isFollowClicked ? "#FFFFFF" : "#0F172A",
            padding: "20px 60px",
            borderRadius: "999px",
            fontSize: "34px",
            fontWeight: 900,
            transform: `scale(${buttonFollow})`,
            boxShadow: `0 10px 30px ${
              isFollowClicked ? "#10B98160" : `${accentColor}60`
            }`,
          }}
        >
          <span dir="auto">{isFollowClicked ? "تمت المتابعة ✔️" : "+ متابعة (Follow)"}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   STANDALONE SCENE COMPOSITION WRAPPERS (For individual scene rendering & preview)
   ========================================================================= */
const StandaloneSceneWrapper: React.FC<{
  children: React.ReactNode;
  sceneName: string;
  stepNumber: number;
  totalSteps?: number;
  timeEstimate: string;
  accentColor?: string;
}> = ({
  children,
  sceneName,
  stepNumber,
  totalSteps = 8,
  timeEstimate,
  accentColor = "#F59E0B",
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#0B0F19",
      color: "#FFFFFF",
      fontFamily: plusJakartaFont,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.7) 0%, rgba(11, 15, 25, 0.98) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "60px",
        left: "60px",
        right: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "8px 22px",
          borderRadius: "999px",
          fontSize: "20px",
          fontWeight: 700,
          color: "#E2E8F0",
        }}
      >
        REEL SCENE {stepNumber}/{totalSteps} • {sceneName}
      </div>
      <div
        style={{
          backgroundColor: `${accentColor}20`,
          border: `1px solid ${accentColor}60`,
          padding: "8px 20px",
          borderRadius: "999px",
          fontSize: "20px",
          fontWeight: 800,
          color: accentColor,
        }}
      >
        ⏱️ {timeEstimate}
      </div>
    </div>
    {children}
  </AbsoluteFill>
);

export const StandaloneHookScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="Hook & Title"
      stepNumber={1}
      timeEstimate="0:00 - 0:05"
      accentColor={accentColor}
    >
      <SceneHook frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};

export const StandalonePositiveScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="(+) Positive Form"
      stepNumber={2}
      timeEstimate="0:05 - 0:18"
      accentColor={accentColor}
    >
      <ScenePositive frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneNegativeScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="(– / ?) Negatives & Questions"
      stepNumber={3}
      timeEstimate="0:18 - 0:26"
      accentColor={accentColor}
    >
      <SceneNegativeAndQuestion
        frame={frame}
        fps={fps}
        accentColor={accentColor}
      />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneHabitsScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="1. Habits & Routine"
      stepNumber={4}
      timeEstimate="0:26 - 0:38"
      accentColor={accentColor}
    >
      <SceneHabitsTimeline
        frame={frame}
        fps={fps}
        accentColor={accentColor}
      />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneFactsScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="2. Facts & Truths"
      stepNumber={5}
      timeEstimate="0:38 - 0:45"
      accentColor={accentColor}
    >
      <SceneFactsTruths frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneInstructionsScene: React.FC<{
  accentColor?: string;
}> = ({ accentColor = "#F59E0B" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="3. Instructions"
      stepNumber={6}
      timeEstimate="0:45 - 0:51"
      accentColor={accentColor}
    >
      <SceneInstructions frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneStoriesScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="4. Stories & Films"
      stepNumber={7}
      timeEstimate="0:51 - 0:56"
      accentColor={accentColor}
    >
      <SceneStoriesFilms frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};

export const StandaloneCTAScene: React.FC<{ accentColor?: string }> = ({
  accentColor = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <StandaloneSceneWrapper
      sceneName="Call to Action"
      stepNumber={8}
      timeEstimate="0:56 - 1:00"
      accentColor={accentColor}
    >
      <SceneCallToAction frame={frame} fps={fps} accentColor={accentColor} />
    </StandaloneSceneWrapper>
  );
};
