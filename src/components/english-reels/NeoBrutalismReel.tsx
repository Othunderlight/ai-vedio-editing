import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
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

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["800", "900"],
});

const { fontFamily: spaceGroteskFont } = loadSpaceGrotesk("normal", {
  subsets: ["latin"],
  weights: ["700"],
});

export interface NeoBrutalismReelProps {
  primaryBg?: string; // e.g. #FFE600 (Pastel Yellow)
  accentColor?: string; // e.g. #00F0FF (Cyan) or #FF5555
  showCaptions?: boolean;
}

// Subtitles synchronized with voiceover
const VOICEOVER_CAPTIONS = [
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
];

export const NeoBrutalismReel: React.FC<NeoBrutalismReelProps> = ({
  primaryBg = "#FFE600",
  showCaptions = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);
  const seconds = Math.floor(frame / fps);
  const timeCode = `00:${seconds.toString().padStart(2, "0")}`;

  // Current active caption
  const activeCaption = VOICEOVER_CAPTIONS.find(
    (c) => frame >= c.fromFrame && frame < c.toFrame
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: primaryBg,
        color: "#000000",
        fontFamily: spaceGroteskFont,
        overflow: "hidden",
      }}
    >
      {/* Background Neo-Brutalist Dot Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(#000000 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.12,
        }}
      />

      {/* Brutalist Top Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "40px",
          right: "40px",
          height: "20px",
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "4px 4px 0px #000000",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: "#00F0FF",
            borderRight: "3px solid #000000",
          }}
        />
      </div>

      {/* =========================================================================
          SCENE 1: HOOK & TITLE (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1BrutalistHook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE STRUCTURE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <Scene2BrutalistPositive frame={frame - 150} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <Scene3BrutalistNegAndQ frame={frame - 540} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE + TIMELINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <Scene4BrutalistHabits frame={frame - 780} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <Scene5BrutalistFacts frame={frame - 1140} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <Scene6BrutalistInstructions frame={frame - 1350} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <Scene7BrutalistStories frame={frame - 1530} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && (
        <Scene8BrutalistCTA frame={frame - 1680} fps={fps} />
      )}

      {/* =========================================================================
          BOTTOM NEO-BRUTALIST CAPTION BAR
          ========================================================================= */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "400px",
            left: "40px",
            right: "40px",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "4px solid #000000",
              boxShadow: "8px 8px 0px #000000",
              padding: "18px 28px",
              textAlign: "center",
            }}
          >
            {/* script */}
            <div
              dir="auto"
              style={{
                fontSize: "32px",
                fontWeight: 900,
                lineHeight: 1.3,
                color: "#000000",
                textAlign: "right",
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

/* --- SCENE 1: NEO-BRUTALIST HOOK --- */
const Scene1BrutalistHook: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const popIn = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 8, stiffness: 200 },
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
      {/* Main Chunky Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "14px 14px 0px #000000",
          padding: "50px 40px",
          textAlign: "center",
          maxWidth: "960px",
          transform: `scale(${popIn})`,
        }}
      >
        <h1
          style={{
            fontFamily: montserratFont,
            fontSize: "82px",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "20px 0 24px 0",
            textTransform: "uppercase",
          }}
        >
          PRESENT
          <br />
          <span
            style={{
              backgroundColor: "#00F0FF",
              border: "4px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              padding: "4px 20px",
              display: "inline-block",
              transform: "rotate(1.5deg)",
            }}
          >
            SIMPLE
          </span>
          <br />
          <span dir="auto">في 60 ثانية ⏱️</span>
        </h1>

      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: NEO-BRUTALIST (+) POSITIVE --- */
const Scene2BrutalistPositive: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop1 = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });
  const pop2 = spring({ frame: frame - 25, fps, config: { mass: 0.5, damping: 8 } });
  const pop3 = spring({ frame: frame - 60, fps, config: { mass: 0.5, damping: 8 } });
  const pop4 = spring({ frame: frame - 95, fps, config: { mass: 0.5, damping: 8 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "50px",
      }}
    >
      {/* Header Tag */}
      <div
        dir="auto"
        style={{
          display: "inline-block",
          alignSelf: "flex-end",
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "10px 24px",
          fontSize: "26px",
          fontWeight: 900,
          transform: `scale(${pop1}) rotate(-1.5deg)`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        (+) قاعدة الإثبات (Positive)
      </div>

      {/* Formula Box */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "32px 36px",
          transform: `scale(${pop1})`,
        }}
      >
        <div style={{ fontSize: "40px", fontWeight: 900, lineHeight: 1.3 }}>
          Subject +{" "}
          <span
            style={{
              backgroundColor: "#A29BFE",
              border: "3px solid #000000",
              padding: "2px 14px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            V1
          </span>{" "}
          /{" "}
          <span
            style={{
              backgroundColor: "#FFE600",
              border: "3px solid #000000",
              padding: "2px 14px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            V1 + s
          </span>
        </div>

        <div
          dir="auto"
          style={{
            marginTop: "20px",
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "12px 20px",
            fontSize: "24px",
            fontWeight: 900,
            textAlign: "right",
          }}
        >
          مع He / She / It: نضيف S!
        </div>
      </div>

      {/* Example 1 */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "20px 30px",
          fontSize: "36px",
          fontWeight: 900,
          transform: `scale(${pop2})`,
        }}
      >
        👉 <span style={{ color: "#0984E3" }}>I</span>{" "}
        <span style={{ textDecoration: "underline" }}>study</span> law.
      </div>

      {/* Example 2 */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "20px 30px",
          fontSize: "36px",
          fontWeight: 900,
          transform: `scale(${pop3})`,
        }}
      >
        👉 <span style={{ color: "#D63031" }}>She</span> like
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "2px solid #000000",
            padding: "0 8px",
          }}
        >
          s
        </span>{" "}
        reading.
      </div>

      {/* Example 3 */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "20px 30px",
          fontSize: "36px",
          fontWeight: 900,
          transform: `scale(${pop4})`,
        }}
      >
        👉 <span style={{ color: "#0984E3" }}>He</span> stud
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "2px solid #000000",
            padding: "0 8px",
          }}
        >
          ies
        </span>{" "}
        law.
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: NEO-BRUTALIST (– & ?) --- */
const Scene3BrutalistNegAndQ: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop1 = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });
  const pop2 = spring({ frame: frame - 40, fps, config: { mass: 0.5, damping: 8 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "50px",
      }}
    >
      {/* Negative Box */}
      <div
        style={{
          backgroundColor: "#FF7675",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "32px",
          color: "#FFFFFF",
          transform: `scale(${pop1})`,
          marginTop: "90px",
          marginBottom: "50px",
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "14px",
          }}
        >
          <div
            dir="auto"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              display: "inline-block",
              padding: "6px 16px",
              fontSize: "22px",
              fontWeight: 900,
              textAlign: "right",
            }}
          >
            (–) صيغة النفي (Negative)
          </div>
        </div>
        <div style={{ fontSize: "36px", fontWeight: 900, color: "#000000" }}>
          Subject +{" "}
          <span
            style={{
              backgroundColor: "#FFFFFF",
              border: "3px solid #000000",
              padding: "2px 12px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            don't / doesn't
          </span>{" "}
          + V0
        </div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "4px solid #000000",
            padding: "16px 20px",
            fontSize: "32px",
            fontWeight: 900,
            marginTop: "18px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          👉 He <span style={{ color: "#D63031" }}>doesn't study</span> medicine.
        </div>
      </div>

      {/* Question Box */}
      <div
        style={{
          backgroundColor: "#74B9FF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "32px",
          transform: `scale(${pop2})`,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "14px",
          }}
        >
          <div
            dir="auto"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              display: "inline-block",
              padding: "6px 16px",
              fontSize: "22px",
              fontWeight: 900,
              textAlign: "right",
            }}
          >
            (?) صيغة السؤال (Question)
          </div>
        </div>
        <div style={{ fontSize: "36px", fontWeight: 900 }}>
          <span
            style={{
              backgroundColor: "#FFE600",
              border: "3px solid #000000",
              padding: "2px 12px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            Do / Does
          </span>{" "}
          + Subject + V0 ?
        </div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "4px solid #000000",
            padding: "16px 20px",
            fontSize: "32px",
            fontWeight: 900,
            marginTop: "18px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          👉 <span style={{ color: "#0984E3" }}>Does</span> he study law
          <span style={{ color: "#D63031" }}>?</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: NEO-BRUTALIST HABITS & TIMELINE --- */
const Scene4BrutalistHabits: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });
  const m1 = spring({ frame: frame - 20, fps });
  const m2 = spring({ frame: frame - 40, fps });
  const m3 = spring({ frame: frame - 60, fps });
  const m4 = spring({ frame: frame - 80, fps });
  const m5 = spring({ frame: frame - 100, fps });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#00F0FF",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(-2deg)`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        الاستخدام 1: العادات والروتين (Habits)
      </div>

      {/* Brutalist Timeline Board */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "36px 30px",
          transform: `scale(${pop})`,
        }}
      >
        <div
          dir="auto"
          style={{
            fontSize: "24px",
            fontWeight: 900,
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <span dir="auto">الماضي (Past)</span>
          <span dir="auto" style={{ backgroundColor: "#FFE600", padding: "2px 10px", border: "2px solid #000" }}>
            الحاضر (Now)
          </span>
          <span dir="auto">المستقبل (Future):</span>
        </div>

        {/* The Black Axis */}
        <div style={{ position: "relative", height: "80px", marginBottom: "20px" }}>
          <div
            style={{
              position: "absolute",
              top: "36px",
              left: "10px",
              right: "10px",
              height: "8px",
              backgroundColor: "#000000",
            }}
          />

          {[
            { s: m1, left: "10%", text: "X" },
            { s: m2, left: "30%", text: "X" },
            { s: m3, left: "50%", text: "X", isCenter: true },
            { s: m4, left: "70%", text: "X" },
            { s: m5, left: "90%", text: "X" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: "10px",
                left: item.left,
                transform: `translateX(-50%) scale(${item.s})`,
                width: "56px",
                height: "56px",
                backgroundColor: item.isCenter ? "#FFE600" : "#55EFC4",
                border: "4px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 900,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>

        <div
          dir="auto"
          style={{
            fontSize: "22px",
            fontWeight: 800,
            textAlign: "right",
          }}
        >
          أفعال متكررة عبر الزمن: تحدث دائماً!
        </div>
      </div>

      {/* Floating Keywords */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {["always", "usually", "sometimes", "every day"].map((kw, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#A29BFE",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "8px 18px",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            ⚡ {kw}
          </div>
        ))}
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "34px",
          fontWeight: 900,
        }}
      >
        👉 I <span style={{ color: "#0984E3" }}>use</span> the Internet{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "2px solid #000000",
            padding: "2px 8px",
          }}
        >
          every day
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 5: NEO-BRUTALIST FACTS (With Original Animated Thermometer & Boiling Beaker) --- */
const Scene5BrutalistFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

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
        padding: "150px 50px 180px 50px",
        gap: "50x",
      }}
    >
      {/* Header Tag */}
      <div
        dir="auto"
        style={{
          backgroundColor: "#FF7675",
          color: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(1.5deg)`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        الاستخدام 2: الحقائق العلمية (Facts)
      </div>

      {/* SCIENTIFIC THERMOMETER & BOILING BEAKER CARD (Neo-Brutalist) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "32px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          transform: `scale(${pop})`,
        }}
      >
        {/* Animated Thermometer SVG (Brutalist style) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width="120" height="290" viewBox="0 0 100 280">
            {/* Outer glass tube */}
            <rect
              x="38"
              y="15"
              width="24"
              height="200"
              rx="12"
              fill="#F0F3F6"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Bottom Bulb */}
            <circle
              cx="50"
              cy="235"
              r="28"
              fill="#FF7675"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Temperature scale markings */}
            {[0, 25, 50, 75, 100].map((t, idx) => {
              const y = 200 - idx * 40;
              return (
                <g key={idx}>
                  <line
                    x1="66"
                    y1={y}
                    x2="80"
                    y2={y}
                    stroke="#000000"
                    strokeWidth="3"
                  />
                  <text
                    x="86"
                    y={y + 5}
                    fill="#000000"
                    fontSize="15"
                    fontWeight="900"
                    fontFamily="inherit"
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
              fill="#FF7675"
            />
          </svg>

          {/* Temperature Digital Readout Badge */}
          <div
            style={{
              backgroundColor: "#FFE600",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "6px 16px",
              fontSize: "26px",
              fontWeight: 900,
              color: "#000000",
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
              stroke="#000000"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 80 50 Q ${80 + steamWave2} 25, 85 5`}
              stroke="#000000"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 120 50 Q ${120 - steamWave} 25, 115 5`}
              stroke="#000000"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Beaker Container */}
          <div
            style={{
              width: "190px",
              height: "170px",
              borderRadius: "14px 14px 34px 34px",
              backgroundColor: "#E0F2FE",
              border: "5px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              position: "relative",
              overflow: "hidden",
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
                backgroundColor: "#74B9FF",
                borderTop: "4px solid #000000",
              }}
            >
              {/* Boiling Bubbles */}
              {[18, 48, 85, 125, 155].map((bx, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${bx}px`,
                    bottom: `${(frame * 4 + i * 25) % 105}px`,
                    width: `${12 + (i % 3) * 4}px`,
                    height: `${12 + (i % 3) * 4}px`,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #000000",
                  }}
                />
              ))}
            </div>

            {/* Bottom Flame Glow */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "22px",
                background:
                  "linear-gradient(to top, rgba(255, 118, 117, 0.9), transparent)",
              }}
            />
          </div>

          <div
            dir="auto"
            style={{
              marginTop: "14px",
              backgroundColor: "#55EFC4",
              border: "3px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              padding: "4px 14px",
              fontSize: "20px",
              fontWeight: 900,
              color: "#000000",
              textAlign: "right",
            }}
          >
            ♨️ غليان الماء عند 100°م
          </div>
        </div>
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
          lineHeight: 1.35,
          marginTop: "50px"
        }}
      >
        👉 If you heat water to{" "}
        <span
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #000000",
            padding: "2px 8px",
          }}
        >
          100 °C
        </span>
        , it{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "2px solid #000000",
            padding: "2px 8px",
          }}
        >
          boils
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 6: NEO-BRUTALIST INSTRUCTIONS (With Animated Gliding Mouse & Click) --- */
const Scene6BrutalistInstructions: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Animated Mouse Cursor gliding across to the desktop icon
  const cursorX = interpolate(frame, [0, 60], [100, 360], {
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [0, 60], [30, 95], {
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
        padding: "150px 50px 180px 50px",
        gap: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#A29BFE",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(-1.5deg)`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        الاستخدام 3: إعطاء التعليمات (Instructions)
      </div>

      {/* COMPUTER DESKTOP UI WINDOW CARD */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "28px",
          transform: `scale(${pop})`,
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
            borderBottom: "4px solid #000000",
            paddingBottom: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#FF7675",
                border: "2px solid #000000",
              }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#FFE600",
                border: "2px solid #000000",
              }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#55EFC4",
                border: "2px solid #000000",
              }}
            />
          </div>
          <div
            dir="auto"
            style={{
              fontSize: "20px",
              fontWeight: 900,
              color: "#000000",
              backgroundColor: "#FFE600",
              border: "2px solid #000000",
              padding: "2px 10px",
              textAlign: "right",
            }}
          >
            نظام التشغيل • التعليمات
          </div>
          <div style={{ width: "40px" }} />
        </div>

        {/* Desktop Screen Area */}
        <div
          style={{
            height: "210px",
            backgroundColor: "#DFE6E9",
            border: "4px solid #000000",
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
              left: "320px",
              top: "24px",
              transform: isClicked ? "scale(0.96) translate(3px, 3px)" : "scale(1)",
            }}
          >
            <div
              style={{
                width: "84px",
                height: "84px",
                backgroundColor: isClicked ? "#55EFC4" : "#74B9FF",
                border: "4px solid #000000",
                boxShadow: isClicked ? "2px 2px 0px #000" : "6px 6px 0px #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
              }}
            >
              💻
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 900,
                color: "#000000",
                backgroundColor: "#FFFFFF",
                border: "2px solid #000000",
                padding: "2px 8px",
                boxShadow: "2px 2px 0px #000",
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
                left: "362px",
                top: "66px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "5px solid #000000",
                backgroundColor: "rgba(85, 239, 196, 0.4)",
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
                left: "435px",
                top: "26px",
                backgroundColor: "#FF7675",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "20px",
                padding: "6px 14px",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                transform: "rotate(-3deg)",
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
              transform: isClicked ? "scale(0.88)" : "scale(1)",
              zIndex: 30,
              filter: "drop-shadow(3px 3px 0px #000000)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 3L11 20L14 13L21 11L4 3Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFE600",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
          lineHeight: 1.35,
        }}
      >
        👉 To start the programme, first{" "}
        <span
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #000000",
            padding: "2px 8px",
          }}
        >
          click
        </span>{" "}
        on the desktop.
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 7: NEO-BRUTALIST STORIES (With Animated Clapperboard & Hero Pop) --- */
const Scene7BrutalistStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

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
        padding: "150px 50px 180px 50px",
        gap: "50px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(2deg)`,
          textAlign: "right",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        الاستخدام 4: سرد القصص والأفلام (Stories)
      </div>

      {/* MOVIE CLAPPERBOARD & HERO GRAPHIC CARD (Neo-Brutalist) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "32px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          transform: `scale(${pop})`,
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
              width: "190px",
              height: "165px",
            }}
          >
            {/* Clapper Top Moving Bar */}
            <div
              style={{
                width: "190px",
                height: "34px",
                backgroundColor: "#000000",
                border: "3px solid #000000",
                transformOrigin: "left bottom",
                transform: `rotate(${clapAngle}deg)`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, #FFE600, #FFE600 15px, #000000 15px, #000000 30px)",
                marginBottom: "4px",
              }}
            />

            {/* Clapperboard Body */}
            <div
              style={{
                width: "190px",
                height: "125px",
                backgroundColor: "#000000",
                border: "3px solid #000000",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "5px 5px 0px #000000",
              }}
            >
              <div
                dir="auto"
                style={{
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "#FFE600",
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
                  color: "#FFFFFF",
                  fontWeight: 800,
                }}
              >
                <span dir="auto">مشهد: 04</span>
                <span dir="auto">تصوير: 01</span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#55EFC4",
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
              width: "160px",
              height: "160px",
              border: "5px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              overflow: "hidden",
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

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#74B9FF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
          lineHeight: 1.35,
        }}
      >
        👉 In the film, the hero{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "2px solid #000000",
            padding: "2px 8px",
          }}
        >
          saves
        </span>{" "}
        the villagers.
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 8: NEO-BRUTALIST CTA --- */
const Scene8BrutalistCTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        gap: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "14px 14px 0px #000000",
          padding: "50px 40px",
          textAlign: "center",
          transform: `scale(${pop})`,
          maxWidth: "920px",
        }}
      >
        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "64px",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "50px 0 20px 0",
          }}
        >
          تابعنا للمزيد من
          <br />
          <span dir="auto">قواعد الإنجليزية في دقيقة!</span>
        </h2>

        <div
          dir="auto"
          style={{
            backgroundColor: "#55EFC4",
            border: "4px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            padding: "16px 28px",
            fontSize: "28px",
            fontWeight: 900,
            marginBottom: "100px",
            marginTop: "100px",
          }}
        >
          💬 اكتب جملتك في التعليقات وسأصححها لك!
        </div>

        <div
          dir="auto"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "4px solid #000000",
            boxShadow: "8px 8px 0px #FFE600",
            padding: "18px 48px",
            fontSize: "36px",
            fontWeight: 900,
            display: "inline-block",
          }}
        >
          <span dir="auto">+ متابعة (Follow)</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
