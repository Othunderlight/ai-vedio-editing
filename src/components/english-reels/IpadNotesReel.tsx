import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img
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
            bottom: "400px",
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
            {/* script */}
            <div
              dir="auto"
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
          dir="auto"
          style={{
            display: "inline-block",
            backgroundColor: "#ECFDF5",
            color: "#059669",
            border: "1px solid #A7F3D0",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "50px",
          }}
        >
          الانكليزية ب 60 ثانية لطلاب البكالوريا
        </div>

        <h1
          dir="auto"
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
          <span dir="auto" style={{ position: "relative", display: "inline-block" }}>
            في 60 ثانية ⏱️
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
        dir="auto"
        style={{
          display: "inline-block",
          alignSelf: "flex-end",
          backgroundColor: "#DCFCE7",
          color: "#166534",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        📌 القاعدة 1: صيغة الإثبات (Positive)
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
          Subject + <span style={{ color: "#2563EB" }}>V1</span> (الفعل الأساسي)
        </div>

        {/* Highlight Note */}
        <div
          dir="auto"
          style={{
            position: "relative",
            marginTop: "16px",
            display: "inline-block",
            fontSize: "28px",
            fontWeight: 700,
            color: "#B45309",
            textAlign: "right",
          }}
        >
          مع He / She / It: نضيف{" "}
          <span style={{ fontWeight: 800, color: "#DC2626" }}>
            S
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
        gap: "50px",
        marginTop: "50px",
        marginBottom: "50px",
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
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <div
            dir="auto"
            style={{
              display: "inline-block",
              backgroundColor: "#FFE4E6",
              color: "#E11D48",
              padding: "4px 18px",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 800,
              textAlign: "right",
            }}
          >
            (–) صيغة النفي: don't / doesn't
          </div>
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
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <div
            dir="auto"
            style={{
              display: "inline-block",
              backgroundColor: "#E0F2FE",
              color: "#0284C7",
              padding: "4px 18px",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 800,
              textAlign: "right",
            }}
          >
            (?) صيغة السؤال: Do / Does
          </div>
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
        gap: "50px",
        marginTop: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-block",
          alignSelf: "flex-end",
          backgroundColor: "#FEF3C7",
          color: "#B45309",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
        }}
      >
        📅 الاستخدام 1: العادات والروتين (Habits)
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
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            fontSize: "20px",
            fontWeight: 700,
            color: "#64748B",
            marginBottom: "24px",
          }}
        >
          <span dir="auto">الماضي (Past)</span>
          <span dir="auto" style={{ color: "#059669", fontWeight: 800 }}>الحاضر (Now)</span>
          <span dir="auto">المستقبل (Future)</span>
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
          dir="auto"
          style={{
            fontFamily: caveatFont,
            fontSize: "32px",
            color: "#64748B",
            textAlign: "right",
            marginTop: "12px",
          }}
        >
          *أفعال وعادات متكررة عبر الزمن*
        </div>
      </div>

      {/* Cute Pastel Frequency Tags */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {[
          { en: "always", ar: "دائماً" },
          { en: "usually", ar: "عادةً" },
          { en: "sometimes", ar: "أحياناً" },
          { en: "every day", ar: "كل يوم" },
        ].map((kw, i) => (
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
            🏷️ {kw.en} ({kw.ar})
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

/* --- SCENE 5: IPAD NOTEBOOK FACTS (With Original Animated Thermometer & Boiling Beaker) --- */
const Scene5IpadFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

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
        padding: "140px 60px 180px 60px",
        gap: "50px",
        marginTop: "50px",
      }}
    >
      {/* Category Pill Tag */}
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "flex-end",
          backgroundColor: "#DCFCE7",
          color: "#166534",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
        }}
      >
        <span dir="auto">🔬 الاستخدام 2 من 4:</span>
        <span dir="auto" style={{ fontWeight: 700 }}>الحقائق العلمية (Facts & Scientific Truths)</span>
      </div>

      {/* SCIENTIFIC THERMOMETER & BOILING LAB CARD (iPad Note Card) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "28px 24px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          transform: `scale(${enter})`,
        }}
      >
        {/* Animated Thermometer SVG (Clean Modern iPad Style) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width="110" height="280" viewBox="0 0 100 280">
            {/* Outer glass tube */}
            <rect
              x="38"
              y="15"
              width="24"
              height="200"
              rx="12"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="3"
            />
            {/* Bottom Bulb */}
            <circle
              cx="50"
              cy="235"
              r="28"
              fill="#EF4444"
              stroke="#CBD5E1"
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
                    fill="#64748B"
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
              fill="url(#mercuryGradIpad)"
            />
            <defs>
              <linearGradient
                id="mercuryGradIpad"
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

          {/* Temperature Digital Readout Pill */}
          <div
            style={{
              backgroundColor: "#FEE2E2",
              border: "1px solid #FCA5A5",
              borderRadius: "12px",
              padding: "4px 14px",
              fontSize: "22px",
              fontWeight: 800,
              color: "#DC2626",
              marginTop: "6px",
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
          <svg width="170" height="65" viewBox="0 0 160 60">
            <path
              d={`M 40 50 Q ${40 + steamWave} 25, 45 5`}
              stroke="rgba(100, 116, 139, 0.5)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 80 50 Q ${80 + steamWave2} 25, 85 5`}
              stroke="rgba(100, 116, 139, 0.7)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 120 50 Q ${120 - steamWave} 25, 115 5`}
              stroke="rgba(100, 116, 139, 0.4)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Beaker Container */}
          <div
            style={{
              width: "180px",
              height: "160px",
              borderRadius: "14px 14px 32px 32px",
              backgroundColor: "rgba(224, 242, 254, 0.6)",
              border: "3px solid #94A3B8",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(56, 189, 248, 0.15)",
            }}
          >
            {/* Boiling Water Liquid */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "110px",
                backgroundColor: "rgba(56, 189, 248, 0.5)",
                borderTop: "2px solid #38BDF8",
              }}
            >
              {/* Boiling Bubbles */}
              {[16, 45, 80, 120, 150].map((bx, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${bx}px`,
                    bottom: `${(frame * 4 + i * 25) % 100}px`,
                    width: `${9 + (i % 3) * 4}px`,
                    height: `${9 + (i % 3) * 4}px`,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 0 4px rgba(255,255,255,0.8)",
                  }}
                />
              ))}
            </div>

            {/* Bottom Heat Fire Glow */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "18px",
                background:
                  "linear-gradient(to top, rgba(239, 68, 68, 0.6), transparent)",
              }}
            />
          </div>

          <div
            dir="auto"
            style={{
              marginTop: "12px",
              fontFamily: caveatFont,
              fontSize: "26px",
              color: "#0369A1",
              fontWeight: 700,
              textAlign: "right",
            }}
          >
            ♨️ غليان الماء عند 100°م (Boiling water)
          </div>
        </div>
      </div>

      {/* Example Box */}
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
            lineHeight: 1.4,
          }}
        >
          👉 "If you heat water to 100 °C, it{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 8px",
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

/* --- SCENE 6: IPAD NOTEBOOK INSTRUCTIONS (With Animated Gliding Mouse & Click) --- */
const Scene6IpadInstructions: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

  // Animated Mouse Cursor gliding across to the desktop icon
  const cursorX = interpolate(frame, [0, 60], [100, 340], {
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [0, 60], [30, 90], {
    extrapolateRight: "clamp",
  });

  // Click shockwave animation at frame 60
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
        padding: "140px 60px 180px 60px",
        gap: "50px",
        marginTop: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "flex-end",
          backgroundColor: "#F3E8FF",
          color: "#7E22CE",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
        }}
      >
        <span dir="auto">📋 الاستخدام 3 من 4:</span>
        <span dir="auto" style={{ fontWeight: 700 }}>إعطاء التعليمات والإرشادات (Instructions)</span>
      </div>

      {/* COMPUTER DESKTOP UI WINDOW CARD (iPad Digital Study Frame) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "26px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
          transform: `scale(${enter})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Window Titlebar */}
        <div
          dir="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            borderBottom: "1px solid #E2E8F0",
            paddingBottom: "14px",
            marginBottom: "18px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
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
              fontSize: "17px",
              fontWeight: 700,
              color: "#64748B",
              textAlign: "right",
            }}
          >
            نظام التشغيل • إرشادات النقر
          </div>
          <div style={{ width: "40px" }} />
        </div>

        {/* Desktop Screen Area */}
        <div
          style={{
            height: "190px",
            backgroundColor: "#F8FAFC",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* Target App Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              position: "absolute",
              left: "300px",
              top: "20px",
              transform: isClicked ? "scale(1.04)" : "scale(1)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "18px",
                backgroundColor: isClicked ? "#10B981" : "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isClicked
                  ? "0 0 24px rgba(16, 185, 129, 0.4)"
                  : "0 8px 16px rgba(0,0,0,0.12)",
                fontSize: "40px",
              }}
            >
              💻
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#334155",
                backgroundColor: "#FFFFFF",
                padding: "2px 8px",
                borderRadius: "6px",
                border: "1px solid #E2E8F0",
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
                left: "340px",
                top: "60px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "3px solid #10B981",
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
                left: "405px",
                top: "22px",
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "18px",
                padding: "4px 14px",
                borderRadius: "999px",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
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
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 3L11 20L14 13L21 11L4 3Z"
                fill="#1E293B"
                stroke="#FFFFFF"
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
            lineHeight: 1.4,
          }}
        >
          👉 "To start the programme, first{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 8px",
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

/* --- SCENE 7: IPAD NOTEBOOK STORIES (With Animated Clapperboard & Hero Pop) --- */
const Scene7IpadStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14 } });

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
        padding: "140px 60px 180px 60px",
        gap: "50px",
        marginTop: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "flex-end",
          backgroundColor: "#FFE4E6",
          color: "#E11D48",
          padding: "8px 24px",
          borderRadius: "20px",
          fontSize: "22px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
        }}
      >
        <span dir="auto">🎬 الاستخدام 4 من 4:</span>
        <span dir="auto" style={{ fontWeight: 700 }}>سرد القصص وحبكات الأفلام (Stories)</span>
      </div>

      {/* MOVIE CLAPPERBOARD & HERO GRAPHIC CARD (iPad Note Card) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          padding: "28px 24px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          transform: `scale(${enter})`,
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
              width: "185px",
              height: "160px",
            }}
          >
            {/* Clapper Top Moving Bar */}
            <div
              style={{
                width: "185px",
                height: "32px",
                backgroundColor: "#1E293B",
                border: "2px solid #0F172A",
                borderRadius: "5px",
                transformOrigin: "left bottom",
                transform: `rotate(${clapAngle}deg)`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, #FFFFFF, #FFFFFF 12px, #1E293B 12px, #1E293B 24px)",
                marginBottom: "4px",
              }}
            />

            {/* Clapperboard Body */}
            <div
              style={{
                width: "185px",
                height: "120px",
                backgroundColor: "#1E293B",
                border: "2px solid #0F172A",
                borderRadius: "5px",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              }}
            >
              <div
                dir="auto"
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
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
                  fontSize: "13px",
                  color: "#94A3B8",
                  fontWeight: 700,
                }}
              >
                <span dir="auto">مشهد: 04</span>
                <span dir="auto">تصوير: 01</span>
              </div>
              <div
                style={{
                  fontSize: "18px",
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
              width: "150px",
              height: "150px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(236, 72, 153, 0.35)",
              border: "3px solid #E2E8F0",
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
            lineHeight: 1.4,
          }}
        >
          👉 "In the film, the hero{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 8px",
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
  const buttonPop = spring({ frame: frame - 20, fps, config: { damping: 10, mass: 0.7 } });
  const isFollowClicked = frame >= 45;

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
        <h2
          dir="auto"
          style={{
            fontFamily: jakartaFont,
            fontSize: "56px",
            fontWeight: 800,
            margin: "50px 0 16px 0",
            lineHeight: 1.2,
          }}
        >
          تابعنا للمزيد من
          <br />
          <span dir="auto" style={{ color: "#059669" }}>قواعد الإنجليزية في دقيقة!</span>
        </h2>

        {/* Comment Prompt Box */}
        <div
          dir="auto"
          style={{
            backgroundColor: "#F8FAFC",
            border: "2px dashed #D6D3CD",
            borderRadius: "20px",
            padding: "20px 28px",
            marginBottom: "40px",
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "32px" }}>💬</span>
          <span
            dir="auto"
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#1C1917",
            }}
          >
            "اكتب جملتك في التعليقات وسأصححها لك!"
          </span>
        </div>

        {/* Animated Follow Button */}
        <div
          dir="auto"
          style={{
            backgroundColor: isFollowClicked ? "#10B981" : "#10B981",
            color: "#FFFFFF",
            padding: "16px 48px",
            borderRadius: "999px",
            fontSize: "30px",
            fontWeight: 800,
            display: "inline-block",
            boxShadow: "0 10px 24px rgba(16, 185, 129, 0.3)",
            transform: `scale(${buttonPop})`,
          }}
        >
          <span dir="auto">{isFollowClicked ? "تمت المتابعة ✔️" : "+ متابعة (Follow)"}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
