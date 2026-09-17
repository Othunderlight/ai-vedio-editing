import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: caveatFont } = loadCaveat("normal", {
  subsets: ["latin"],
  weights: ["700"],
});

const { fontFamily: jakartaFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "700", "800"],
});

export interface IpadNotesReelProps {
  showCaptions?: boolean;
}

const VOICEOVER_CAPTIONS = [
  { fromFrame: 0, toFrame: 75, text: "Master the Present Simple in under 60 seconds!" },
  { fromFrame: 75, toFrame: 150, text: "Let's break it down! ⏱️" },
  { fromFrame: 150, toFrame: 230, text: "First, the form! For positive sentences, use base verb (V1)." },
  { fromFrame: 230, toFrame: 330, text: "But for he, she, or it, add -s, -es, or -ies!" },
  { fromFrame: 330, toFrame: 420, text: "Like: 'I study law.'" },
  { fromFrame: 420, toFrame: 540, text: "But: 'She likes reading' and 'He studies law.'" },
  { fromFrame: 540, toFrame: 650, text: "For negatives, use don't or doesn't + V0: 'He doesn't study medicine.'" },
  { fromFrame: 650, toFrame: 780, text: "For questions: start with Do or Does: 'Does he study law?'" },
  { fromFrame: 780, toFrame: 880, text: "Now, when do we use it? Number 1: Regular habits or repeated actions!" },
  { fromFrame: 880, toFrame: 1010, text: "Look at this timeline: past, present, future—it keeps happening!" },
  { fromFrame: 1010, toFrame: 1140, text: "Example: 'I use the Internet every day.'" },
  { fromFrame: 1140, toFrame: 1240, text: "Number 2: Universal facts and truths!" },
  { fromFrame: 1240, toFrame: 1350, text: "'If you heat water to 100 degrees Celsius, it boils.'" },
  { fromFrame: 1350, toFrame: 1430, text: "Number 3: Giving instructions or directions!" },
  { fromFrame: 1430, toFrame: 1530, text: "'To start the programme, first click on the desktop.'" },
  { fromFrame: 1530, toFrame: 1610, text: "And number 4: Summarizing books or movies!" },
  { fromFrame: 1610, toFrame: 1680, text: "'In the film, the hero saves the villagers.'" },
  { fromFrame: 1680, toFrame: 1800, text: "Drop your own example sentence in the comments, and follow for more! 🚀" },
];

export const IpadNotesReel: React.FC<IpadNotesReelProps> = ({
  showCaptions = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);
  const seconds = Math.floor(frame / fps);
  const timeCode = `00:${seconds.toString().padStart(2, "0")}`;

  const activeCaption = VOICEOVER_CAPTIONS.find(
    (c) => frame >= c.fromFrame && frame < c.toFrame
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF7F2",
        color: "#292524",
        fontFamily: jakartaFont,
        overflow: "hidden",
      }}
    >
      {/* Aesthetic Dotted / Grid Paper Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(#D6D3CD 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />

      {/* iPad Top Status Bar */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50px",
          right: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "19px",
          fontWeight: 600,
          color: "#78716C",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>9:41 AM</span>
          <span style={{ fontSize: "14px", color: "#A8A29E" }}>• iPad</span>
        </div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "6px 20px",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #E7E5E4",
            fontSize: "18px",
            fontWeight: 700,
            color: "#44403C",
          }}
        >
          📓 English Study Guide • Present Simple
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span>⏱️ {timeCode}</span>
          <span>100% 🔋</span>
        </div>
      </div>

      {/* Aesthetic Thin Notebook Progress Ribbon */}
      <div
        style={{
          position: "absolute",
          top: "85px",
          left: "50px",
          right: "50px",
          height: "6px",
          backgroundColor: "#E7E5E4",
          borderRadius: "999px",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: "#10B981",
            borderRadius: "999px",
          }}
        />
      </div>

      {/* Floating Apple Pencil Stylus Graphic */}
      <div
        style={{
          position: "absolute",
          right: "30px",
          bottom: "120px",
          width: "28px",
          height: "160px",
          background: "linear-gradient(180deg, #FFFFFF, #E2E8F0 80%, #718096)",
          borderRadius: "14px 14px 4px 4px",
          boxShadow: "4px 8px 20px rgba(0,0,0,0.15)",
          border: "1px solid #CBD5E1",
          zIndex: 45,
          opacity: 0.85,
          transform: `rotate(-15deg) translateY(${Math.sin(frame / 15) * 6}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "14px solid #4A5568",
          }}
        />
      </div>

      {/* =========================================================================
          SCENE 1: HOOK & TITLE (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1IpadHook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE STRUCTURE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <Scene2IpadPositive frame={frame - 150} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <Scene3IpadNegAndQ frame={frame - 540} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <Scene4IpadHabits frame={frame - 780} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <Scene5IpadFacts frame={frame - 1140} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <Scene6IpadInstructions frame={frame - 1350} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <Scene7IpadStories frame={frame - 1530} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && <Scene8IpadCTA frame={frame - 1680} fps={fps} />}

      {/* Synchronized Handwritten Style Caption Bar */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50px",
            right: "50px",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E7E5E4",
              borderRadius: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              padding: "16px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#10B981",
                letterSpacing: "1px",
                marginBottom: "4px",
              }}
            >
              🎙️ TEACHER NOTES
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#1C1917",
                lineHeight: 1.3,
              }}
            >
              {activeCaption.text}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* --- SCENE 1: IPAD NOTEBOOK HOOK --- */
const Scene1IpadHook: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const revealW = interpolate(frame, [15, 60], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      {/* Aesthetic Study Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "32px",
          boxShadow: "0 20px 50px rgba(44, 40, 37, 0.08)",
          padding: "60px 48px",
          textAlign: "center",
          maxWidth: "920px",
          position: "relative",
          transform: `scale(${enter})`,
        }}
      >
        {/* Cute Washi Tape at Top */}
        <div
          style={{
            position: "absolute",
            top: "-16px",
            left: "50%",
            transform: "translateX(-50%) rotate(-1deg)",
            width: "160px",
            height: "32px",
            backgroundColor: "rgba(254, 240, 138, 0.7)",
            border: "1px dashed rgba(202, 138, 4, 0.4)",
          }}
        />

        <div
          style={{
            display: "inline-block",
            backgroundColor: "#ECFDF5",
            color: "#059669",
            border: "1px solid #A7F3D0",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          ✨ Master English Grammar • 60s
        </div>

        <h1
          style={{
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1C1917",
            margin: "0 0 20px 0",
          }}
        >
          Present Simple
          <br />
          <span style={{ position: "relative", display: "inline-block" }}>
            in 60 Seconds ⏱️
            {/* Highlighter Wipe Underneath */}
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: "4px",
                height: "22px",
                width: `${revealW}%`,
                backgroundColor: "rgba(254, 240, 138, 0.55)",
                zIndex: -1,
                borderRadius: "4px",
              }}
            />
          </span>
        </h1>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "44px",
            color: "#059669",
            marginTop: "16px",
          }}
        >
          "Let's break it down step-by-step!" ✏️
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: IPAD NOTEBOOK (+) POSITIVE --- */
const Scene2IpadPositive: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const highlightW = interpolate(frame, [30, 70], [0, 100], {
    extrapolateRight: "clamp",
  });
  const write1 = interpolate(frame, [40, 75], [0, 100], { extrapolateRight: "clamp" });
  const write2 = interpolate(frame, [80, 115], [0, 100], { extrapolateRight: "clamp" });
  const write3 = interpolate(frame, [120, 155], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      {/* Chapter Tag */}
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#DCFCE7",
          color: "#166534",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
        }}
      >
        📌 Rule 1: Positive Form
      </div>

      {/* Formula Study Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div style={{ fontSize: "36px", fontWeight: 800, color: "#1C1917" }}>
          Subject + <span style={{ color: "#2563EB" }}>V1</span> (base verb)
        </div>

        {/* Highlight Note */}
        <div
          style={{
            position: "relative",
            marginTop: "16px",
            display: "inline-block",
            fontSize: "28px",
            fontWeight: 700,
            color: "#B45309",
          }}
        >
          For He / She / It ➔ add{" "}
          <span style={{ fontWeight: 800, color: "#DC2626" }}>
            -s, -es, or -ies
          </span>
          {/* Highlighter Line */}
          <span
            style={{
              position: "absolute",
              left: "-4px",
              bottom: "-2px",
              height: "16px",
              width: `${highlightW}%`,
              backgroundColor: "rgba(254, 240, 138, 0.6)",
              zIndex: -1,
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* Handwritten Examples in Lined Notebook Style */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "46px",
            color: "#1E293B",
            opacity: write1 > 0 ? 1 : 0,
            borderBottom: "1px dashed #E2E8F0",
            paddingBottom: "12px",
          }}
        >
          • <span style={{ color: "#2563EB" }}>I</span> study law.
        </div>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "46px",
            color: "#1E293B",
            opacity: write2 > 0 ? 1 : 0,
            borderBottom: "1px dashed #E2E8F0",
            paddingBottom: "12px",
          }}
        >
          • <span style={{ color: "#DC2626" }}>She</span> like
          <span
            style={{
              backgroundColor: "#FEF08A",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            s
          </span>{" "}
          reading.
        </div>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "46px",
            color: "#1E293B",
            opacity: write3 > 0 ? 1 : 0,
          }}
        >
          • <span style={{ color: "#2563EB" }}>He</span> stud
          <span
            style={{
              backgroundColor: "#FEF08A",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            ies
          </span>{" "}
          law.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: IPAD NOTEBOOK (– & ?) --- */
const Scene3IpadNegAndQ: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      {/* Negative Note */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #FECDD3",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(225, 29, 72, 0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#FFE4E6",
            color: "#E11D48",
            padding: "4px 18px",
            borderRadius: "14px",
            fontSize: "18px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          (–) Negatives: don't / doesn't
        </div>
        <div style={{ fontSize: "30px", fontWeight: 700, color: "#1C1917" }}>
          Subject +{" "}
          <span style={{ color: "#E11D48", fontWeight: 800 }}>
            don't / doesn't
          </span>{" "}
          + V0
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "44px",
            color: "#334155",
            marginTop: "14px",
          }}
        >
          "He <span style={{ color: "#E11D48" }}>doesn't study</span> medicine."
        </div>
      </div>

      {/* Question Note */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #BAE6FD",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(2, 132, 199, 0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#E0F2FE",
            color: "#0284C7",
            padding: "4px 18px",
            borderRadius: "14px",
            fontSize: "18px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          (?) Questions: Do / Does
        </div>
        <div style={{ fontSize: "30px", fontWeight: 700, color: "#1C1917" }}>
          <span style={{ color: "#0284C7", fontWeight: 800 }}>Do / Does</span> +
          Subject + V0?
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "44px",
            color: "#334155",
            marginTop: "14px",
          }}
        >
          "<span style={{ color: "#0284C7" }}>Does</span> he study law?"
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: IPAD NOTEBOOK HABITS --- */
const Scene4IpadHabits: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#FEF3C7",
          color: "#B45309",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
        }}
      >
        📅 Use #1: Habits & Routine
      </div>

      {/* Hand-drawn Style Timeline on Lined Notebook */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            fontWeight: 700,
            color: "#64748B",
            marginBottom: "24px",
          }}
        >
          <span>Past</span>
          <span style={{ color: "#059669", fontWeight: 800 }}>Present (Now)</span>
          <span>Future</span>
        </div>

        {/* Drawn Timeline */}
        <div
          style={{
            position: "relative",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "#94A3B8",
              borderRadius: "2px",
            }}
          />
          {["X", "X", "X", "X", "X"].map((x, i) => (
            <div
              key={i}
              style={{
                zIndex: 2,
                fontFamily: caveatFont,
                fontSize: "38px",
                color: i === 2 ? "#059669" : "#2563EB",
                fontWeight: 900,
                backgroundColor: "#FFFFFF",
                padding: "0 8px",
              }}
            >
              {x}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "32px",
            color: "#64748B",
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          *repeated habits over time*
        </div>
      </div>

      {/* Cute Pastel Frequency Tags */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {["always", "usually", "sometimes", "every day"].map((kw, i) => (
          <span
            key={i}
            style={{
              backgroundColor: "#ECFDF5",
              color: "#059669",
              border: "1px solid #A7F3D0",
              padding: "6px 18px",
              borderRadius: "16px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            🏷️ {kw}
          </span>
        ))}
      </div>

      {/* Example */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "24px",
          padding: "24px 30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "44px",
            color: "#1C1917",
          }}
        >
          👉 "I use the Internet{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            every day
          </span>
          ."
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 5: IPAD NOTEBOOK FACTS --- */
const Scene5IpadFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const temp = Math.min(100, Math.round(interpolate(frame, [10, 80], [20, 100])));

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#DCFCE7",
          color: "#166534",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
        }}
      >
        🔬 Use #2: Facts & Scientific Truths
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          transform: `scale(${enter})`,
        }}
      >
        <div
          style={{
            fontSize: "64px",
            backgroundColor: "#EFF6FF",
            padding: "20px",
            borderRadius: "24px",
          }}
        >
          🧪
        </div>
        <div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#1E293B" }}>
            Universal Law: {temp}°C
          </div>
          <div
            style={{
              fontFamily: caveatFont,
              fontSize: "36px",
              color: "#64748B",
              marginTop: "6px",
            }}
          >
            Water boils at 100°C everywhere!
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "24px",
          padding: "26px 32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "44px",
            color: "#1C1917",
          }}
        >
          👉 "If you heat water to 100 °C, it{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            boils
          </span>
          ."
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 6: IPAD NOTEBOOK INSTRUCTIONS --- */
const Scene6IpadInstructions: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#F3E8FF",
          color: "#7E22CE",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
        }}
      >
        📋 Use #3: Instructions
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#1E293B" }}>
          Step-by-Step Directions
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "40px",
            color: "#64748B",
            marginTop: "10px",
          }}
        >
          Click the app icon to begin 🖱️
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "24px",
          padding: "26px 32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "42px",
            color: "#1C1917",
          }}
        >
          👉 "To start the programme, first{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            click
          </span>{" "}
          on the desktop."
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 7: IPAD NOTEBOOK STORIES --- */
const Scene7IpadStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 60px 180px 60px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#FFE4E6",
          color: "#E11D48",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
        }}
      >
        🎬 Use #4: Stories & Movies
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#1E293B" }}>
          Plot Summaries
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "40px",
            color: "#64748B",
            marginTop: "10px",
          }}
        >
          Use Present Simple when retelling film stories!
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "24px",
          padding: "26px 32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "42px",
            color: "#1C1917",
          }}
        >
          👉 "In the film, the hero{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 6px",
              borderRadius: "4px",
            }}
          >
            saves
          </span>{" "}
          the villagers."
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 8: IPAD NOTEBOOK CTA --- */
const Scene8IpadCTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "36px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          padding: "54px 44px",
          textAlign: "center",
          maxWidth: "880px",
          transform: `scale(${enter})`,
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "12px" }}>✏️</div>
        <h2 style={{ fontSize: "56px", fontWeight: 800, margin: "0 0 16px 0" }}>
          Save This Note!
        </h2>
        <p style={{ fontSize: "28px", color: "#64748B", margin: "0 0 28px 0" }}>
          Drop your own example sentence below to test yourself!
        </p>
        <div
          style={{
            backgroundColor: "#10B981",
            color: "#FFFFFF",
            padding: "16px 48px",
            borderRadius: "999px",
            fontSize: "30px",
            fontWeight: 800,
            display: "inline-block",
            boxShadow: "0 10px 24px rgba(16, 185, 129, 0.3)",
          }}
        >
          + Follow for Daily Notes
        </div>
      </div>
    </AbsoluteFill>
  );
};
