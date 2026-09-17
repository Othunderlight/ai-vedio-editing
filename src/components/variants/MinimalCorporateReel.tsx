import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: interFont } = loadInter("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800"],
});

export interface MinimalCorporateReelProps {
  brandColor?: string; // e.g. #0F172A (Deep Royal Navy) or #059669
  accentBlue?: string; // e.g. #2563EB
  showCaptions?: boolean;
}

const VOICEOVER_CAPTIONS = [
  // 0:00 – 0:05 المقدمة (Hook)
  { fromFrame: 0, toFrame: 75, text: "رح تفهم الـ Present Simple بأقل من دقيقة!" },
  { fromFrame: 75, toFrame: 150, text: "جاهز؟ خلّينا نبلّش بسرعة! ⏱️" },
  // 0:05 – 0:17 التركيب: الإيجاب (Positive)
  { fromFrame: 150, toFrame: 240, text: "أول شي، القاعدة: بالجملة العادية منستخدم الفعل متل ما هو (V1)." },
  { fromFrame: 240, toFrame: 330, text: "بس مع (he, she, it) بنضيف للفعل s أو es أو ies!" },
  { fromFrame: 330, toFrame: 420, text: "متل: 'I study law'.." },
  { fromFrame: 420, toFrame: 540, text: "بس منقول: 'She likes reading' و 'He studies law'." },
  // 0:17 – 0:27 التركيب: النفي والسؤال (Negative & Question)
  { fromFrame: 540, toFrame: 660, text: "وبالنفي، منحط don't أو doesn't مع الفعل بالمصدر: 'He doesn't study medicine.'" },
  { fromFrame: 660, toFrame: 780, text: "أما بالسؤال، فمنبدأ بـ Do أو Does: 'Does he study law?'" },
  // 0:27 – 0:38 الاستخدام 1: العادات والتكرار (Habits)
  { fromFrame: 780, toFrame: 890, text: "طيّب، إيمتى منستخدمه؟ رقم واحد: للعادات والأشياء اللي بتتكرر دائماً." },
  { fromFrame: 890, toFrame: 1010, text: "شوف هالخط الزمني: بالماضي، الحاضر، والمستقبل.. الفعل عم يتكرر!" },
  { fromFrame: 1010, toFrame: 1140, text: "متل: 'I use the Internet every day.'" },
  // 0:38 – 0:44 الاستخدام 2: الحقائق (Facts)
  { fromFrame: 1140, toFrame: 1230, text: "رقم اتنين: للحقائق العلمية والعامة! 🔬" },
  { fromFrame: 1230, toFrame: 1350, text: "'If you heat water to 100 degrees, it boils.'" },
  // 0:44 – 0:50 الاستخدام 3: التعليمات (Instructions)
  { fromFrame: 1350, toFrame: 1430, text: "رقم تلاتة: لنعطي تعليمات أو إرشادات! 📋" },
  { fromFrame: 1430, toFrame: 1530, text: "'To start the programme, first click on the desktop.'" },
  // 0:50 – 0:55 الاستخدام 4: ملخصات الأفلام والقصص (Stories)
  { fromFrame: 1530, toFrame: 1600, text: "ورقم أربعة: لما نحكي ملخص فيلم أو قصة! 🎬" },
  { fromFrame: 1600, toFrame: 1680, text: "'In the film, the hero saves the villagers.'" },
  // 0:55 – 1:00 الخاتمة (Call to Action)
  { fromFrame: 1680, toFrame: 1740, text: "اكتبلي جملتك بالـ Present Simple بالتعليقات! 💬" },
  { fromFrame: 1740, toFrame: 1800, text: "وتابع الحساب لتتعلم قواعد تانية بدقيقة وحدة! 🚀" },
];

export const MinimalCorporateReel: React.FC<MinimalCorporateReelProps> = ({
  brandColor = "#0F172A",
  accentBlue = "#2563EB",
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
        backgroundColor: "#FFFFFF",
        color: brandColor,
        fontFamily: interFont,
        overflow: "hidden",
      }}
    >
      {/* Ultra-Fine Minimalist Progress Line */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "3px",
          backgroundColor: "#F1F5F9",
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: accentBlue,
          }}
        />
      </div>

      {/* Top Academic Header */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: "18px",
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "1.5px",
          color: "#64748B",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: brandColor, fontWeight: 800 }}>ACADEMY</span>
          <span>•</span>
          <span>ENGLISH GRAMMAR</span>
        </div>
        <div style={{ color: brandColor, fontWeight: 700 }}>{timeCode} / 01:00</div>
      </div>

      {/* =========================================================================
          SCENE 1: HOOK (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1CorpHook frame={frame} brandColor={brandColor} accentBlue={accentBlue} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <Scene2CorpPositive
          frame={frame - 150}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <Scene3CorpNegAndQ
          frame={frame - 540}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <Scene4CorpHabits
          frame={frame - 780}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <Scene5CorpFacts
          frame={frame - 1140}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <Scene6CorpInstructions
          frame={frame - 1350}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <Scene7CorpStories
          frame={frame - 1530}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && (
        <Scene8CorpCTA
          frame={frame - 1680}
          brandColor={brandColor}
          accentBlue={accentBlue}
        />
      )}

      {/* Elegant Swiss Subtitle Bar */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "60px",
            right: "60px",
            textAlign: "center",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              padding: "18px 32px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: accentBlue,
                letterSpacing: "1px",
                marginBottom: "4px",
                textTransform: "uppercase",
              }}
            >
              Lesson Audio
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: brandColor,
                lineHeight: 1.4,
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

/* --- SCENE 1: CORPORATE HOOK --- */
const Scene1CorpHook: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const translateY = interpolate(frame, [0, 25], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          border: "1px solid #E2E8F0",
          borderRadius: "20px",
          padding: "8px 24px",
          fontSize: "18px",
          fontWeight: 600,
          color: accentBlue,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        Executive Masterclass
      </div>

      <h1
        style={{
          fontSize: "80px",
          fontWeight: 800,
          lineHeight: 1.1,
          color: brandColor,
          textAlign: "center",
          margin: "0 0 24px 0",
          letterSpacing: "-1px",
        }}
      >
        Present Simple
        <br />
        <span style={{ color: accentBlue, fontWeight: 700 }}>
          in 60 Seconds
        </span>
      </h1>

      <p
        style={{
          fontSize: "30px",
          color: "#64748B",
          textAlign: "center",
          maxWidth: "760px",
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        A precise breakdown of structure, mechanics, and real-world usage.
      </p>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: CORPORATE (+) POSITIVE --- */
const Scene2CorpPositive: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const op = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "28px",
        opacity: op,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        SECTION 01 • POSITIVE FORM
      </div>

      <div
        style={{
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
          padding: "32px 0",
        }}
      >
        <div style={{ fontSize: "40px", fontWeight: 700, color: brandColor }}>
          Subject + <span style={{ color: accentBlue }}>Base Verb (V1)</span>
        </div>
        <div style={{ fontSize: "24px", color: "#64748B", marginTop: "12px" }}>
          Third-person singular (he, she, it) appends{" "}
          <strong style={{ color: brandColor }}>-s, -es, or -ies</strong>.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "32px", color: "#334155", fontWeight: 500 }}>
          • I <strong style={{ color: brandColor }}>study</strong> law.
        </div>
        <div style={{ fontSize: "32px", color: "#334155", fontWeight: 500 }}>
          • She <strong style={{ color: accentBlue }}>likes</strong> reading.
        </div>
        <div style={{ fontSize: "32px", color: "#334155", fontWeight: 500 }}>
          • He <strong style={{ color: accentBlue }}>studies</strong> law.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: CORPORATE (– & ?) --- */
const Scene3CorpNegAndQ: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "36px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        SECTION 02 • NEGATIVE & QUESTION
      </div>

      <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "24px" }}>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#64748B", marginBottom: "8px" }}>
          NEGATIVE SYNTAX
        </div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: brandColor }}>
          Subject + don't / doesn't + V0
        </div>
        <div style={{ fontSize: "28px", color: "#334155", marginTop: "10px" }}>
          "He <span style={{ color: accentBlue, fontWeight: 700 }}>doesn't study</span> medicine."
        </div>
      </div>

      <div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#64748B", marginBottom: "8px" }}>
          INTERROGATIVE SYNTAX
        </div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: brandColor }}>
          Do / Does + Subject + V0?
        </div>
        <div style={{ fontSize: "28px", color: "#334155", marginTop: "10px" }}>
          "<span style={{ color: accentBlue, fontWeight: 700 }}>Does</span> he study law?"
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: CORPORATE HABITS --- */
const Scene4CorpHabits: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "32px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        APPLICATION 01 • HABITS & REPETITION
      </div>

      <div style={{ fontSize: "38px", fontWeight: 700, color: brandColor }}>
        Continuous Periodic Events
      </div>

      {/* Swiss Architectural Timeline */}
      <div style={{ padding: "30px 0", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "#94A3B8", fontWeight: 600 }}>
          <span>PAST</span>
          <span style={{ color: accentBlue, fontWeight: 700 }}>PRESENT</span>
          <span>FUTURE</span>
        </div>

        <div style={{ position: "relative", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: "1px", backgroundColor: "#CBD5E1" }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: i === 2 ? accentBlue : "#94A3B8",
                zIndex: 2,
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: "20px", color: "#64748B", textAlign: "center" }}>
          Recurrent frequency: always, usually, every day
        </div>
      </div>

      <div style={{ fontSize: "32px", color: brandColor, fontWeight: 600 }}>
        "I use the Internet <span style={{ color: accentBlue }}>every day</span>."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 5: CORPORATE FACTS --- */
const Scene5CorpFacts: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "32px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        APPLICATION 02 • UNIVERSAL FACTS
      </div>

      <div style={{ borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "32px 0" }}>
        <div style={{ fontSize: "38px", fontWeight: 700, color: brandColor, marginBottom: "14px" }}>
          Scientific Invariants
        </div>
        <div style={{ fontSize: "24px", color: "#64748B", lineHeight: 1.5 }}>
          Statements that remain universally accurate regardless of time or observation context.
        </div>
      </div>

      <div style={{ fontSize: "32px", color: brandColor, fontWeight: 600 }}>
        "If you heat water to 100 °C, it <span style={{ color: accentBlue }}>boils</span>."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 6: CORPORATE INSTRUCTIONS --- */
const Scene6CorpInstructions: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "32px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        APPLICATION 03 • PROCEDURAL INSTRUCTIONS
      </div>

      <div style={{ borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "32px 0" }}>
        <div style={{ fontSize: "38px", fontWeight: 700, color: brandColor, marginBottom: "14px" }}>
          Directives & Commands
        </div>
        <div style={{ fontSize: "24px", color: "#64748B" }}>
          Sequencing operating instructions in technological or procedural contexts.
        </div>
      </div>

      <div style={{ fontSize: "32px", color: brandColor, fontWeight: 600 }}>
        "To start the programme, first <span style={{ color: accentBlue }}>click</span> on the desktop."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 7: CORPORATE STORIES --- */
const Scene7CorpStories: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "140px 70px 180px 70px",
        gap: "32px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 700, color: accentBlue, letterSpacing: "1px" }}>
        APPLICATION 04 • NARRATIVE & MEDIA
      </div>

      <div style={{ borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "32px 0" }}>
        <div style={{ fontSize: "38px", fontWeight: 700, color: brandColor, marginBottom: "14px" }}>
          Literary & Dramatic Present
        </div>
        <div style={{ fontSize: "24px", color: "#64748B" }}>
          Standard convention for recounting film synopses, novel storylines, and drama.
        </div>
      </div>

      <div style={{ fontSize: "32px", color: brandColor, fontWeight: 600 }}>
        "In the film, the hero <span style={{ color: accentBlue }}>saves</span> the villagers."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 8: CORPORATE CTA --- */
const Scene8CorpCTA: React.FC<{
  frame: number;
  brandColor: string;
  accentBlue: string;
}> = ({ frame, brandColor, accentBlue }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          border: `1px solid ${accentBlue}40`,
          borderRadius: "32px",
          padding: "60px 50px",
          maxWidth: "840px",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.04)",
        }}
      >
        <h2 style={{ fontSize: "52px", fontWeight: 800, color: brandColor, margin: "0 0 16px 0" }}>
          Elevate Your English
        </h2>
        <p style={{ fontSize: "24px", color: "#64748B", margin: "0 0 32px 0" }}>
          Contribute your example sentence in the discussion below.
        </p>

        <div
          style={{
            backgroundColor: brandColor,
            color: "#FFFFFF",
            padding: "18px 48px",
            borderRadius: "12px",
            fontSize: "26px",
            fontWeight: 700,
            display: "inline-block",
            letterSpacing: "0.5px",
            border: `1px solid ${accentBlue}`,
          }}
        >
          Follow Academy
        </div>
      </div>
    </AbsoluteFill>
  );
};
