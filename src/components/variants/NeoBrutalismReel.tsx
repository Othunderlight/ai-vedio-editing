import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
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

      {/* Retro Brutalist Corner Badges */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          backgroundColor: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "5px 5px 0px #000000",
          padding: "6px 16px",
          fontSize: "20px",
          fontWeight: 900,
          letterSpacing: "1px",
          zIndex: 40,
          transform: "rotate(-2deg)",
        }}
      >
        GRAMMAR REEL #01
      </div>

      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          backgroundColor: "#FF7675",
          color: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "5px 5px 0px #000000",
          padding: "6px 18px",
          fontSize: "22px",
          fontWeight: 900,
          zIndex: 40,
          transform: "rotate(2deg)",
        }}
      >
        ⏱️ {timeCode} / 01:00
      </div>

      {/* Brutalist Top Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: "105px",
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
            bottom: "80px",
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
            <div
              style={{
                fontSize: "16px",
                fontWeight: 900,
                color: "#000000",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              🎙️ VOICEOVER
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 900,
                lineHeight: 1.3,
                color: "#000000",
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
      {/* Pop-in Stamp Sticker */}
      <div
        style={{
          backgroundColor: "#55EFC4",
          border: "5px solid #000000",
          boxShadow: "8px 8px 0px #000000",
          padding: "12px 32px",
          fontSize: "26px",
          fontWeight: 900,
          letterSpacing: "2px",
          transform: `scale(${popIn}) rotate(-3deg)`,
          marginBottom: "36px",
        }}
      >
        ⚡ CRASH COURSE IN 60 SECONDS
      </div>

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
            margin: "0 0 24px 0",
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
          IN 60 SECONDS ⏱️
        </h1>

        <div
          style={{
            backgroundColor: "#FFE600",
            border: "4px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            padding: "16px 28px",
            fontSize: "32px",
            fontWeight: 900,
            marginTop: "16px",
            display: "inline-block",
          }}
        >
          👉 "Let's break it down step-by-step!"
        </div>
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
        gap: "24px",
      }}
    >
      {/* Header Tag */}
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "10px 24px",
          fontSize: "26px",
          fontWeight: 900,
          transform: `scale(${pop1}) rotate(-1.5deg)`,
        }}
      >
        (+) POSITIVE FORMULA
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
            V1 + s, es, ies
          </span>
        </div>

        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "12px 20px",
            fontSize: "24px",
            fontWeight: 900,
          }}
        >
          ⚠️ RULE: For He / She / It ➔ ADD -S, -ES, or -IES!
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
        gap: "28px",
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
        }}
      >
        <div
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            display: "inline-block",
            padding: "6px 16px",
            fontSize: "22px",
            fontWeight: 900,
            marginBottom: "14px",
          }}
        >
          (–) NEGATIVE FORM
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
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            display: "inline-block",
            padding: "6px 16px",
            fontSize: "22px",
            fontWeight: 900,
            marginBottom: "14px",
          }}
        >
          (?) QUESTION FORM
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
        gap: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#00F0FF",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-start",
          transform: `scale(${pop}) rotate(-2deg)`,
        }}
      >
        USE #1: HABITS & ROUTINE
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
          style={{
            fontSize: "24px",
            fontWeight: 900,
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>PAST</span>
          <span style={{ backgroundColor: "#FFE600", padding: "2px 10px", border: "2px solid #000" }}>
            PRESENT (NOW)
          </span>
          <span>FUTURE ➔</span>
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

        <div style={{ fontSize: "22px", fontWeight: 800, textAlign: "center" }}>
          Repeated actions across time: always happens!
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

/* --- SCENE 5: NEO-BRUTALIST FACTS --- */
const Scene5BrutalistFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });
  const temp = interpolate(frame, [10, 90], [20, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "28px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FF7675",
          color: "#FFFFFF",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-start",
          transform: `scale(${pop}) rotate(2deg)`,
        }}
      >
        USE #2: FACTS & TRUTHS
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "40px 30px",
          display: "flex",
          alignItems: "center",
          gap: "36px",
          transform: `scale(${pop})`,
        }}
      >
        {/* Chunky Beaker / Thermometer Graphic */}
        <div
          style={{
            width: "160px",
            height: "220px",
            border: "5px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            backgroundColor: "#74B9FF",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${temp}%`,
              backgroundColor: "#FF7675",
              borderTop: "4px solid #000000",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "24px",
              fontWeight: 900,
              backgroundColor: "#FFFFFF",
              border: "2px solid #000000",
              padding: "2px 6px",
            }}
          >
            {Math.round(temp)}°C
          </div>
        </div>

        <div>
          <div style={{ fontSize: "36px", fontWeight: 900, marginBottom: "16px" }}>
            UNIVERSAL TRUTH ♨️
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#2D3436" }}>
            Water boils at 100°C everywhere in the universe. It never changes!
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
        }}
      >
        👉 If you heat water to 100 °C, it{" "}
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

/* --- SCENE 6: NEO-BRUTALIST INSTRUCTIONS --- */
const Scene6BrutalistInstructions: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });
  const isClicked = frame > 45;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "28px",
      }}
    >
      <div
        style={{
          backgroundColor: "#A29BFE",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-start",
          transform: `scale(${pop}) rotate(-1.5deg)`,
        }}
      >
        USE #3: INSTRUCTIONS
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "36px",
          transform: `scale(${pop})`,
        }}
      >
        <div
          style={{
            border: "4px solid #000000",
            backgroundColor: "#DFE6E9",
            padding: "30px",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: isClicked ? "#55EFC4" : "#FFFFFF",
              border: "4px solid #000000",
              boxShadow: isClicked ? "2px 2px 0px #000" : "6px 6px 0px #000",
              padding: "16px 24px",
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "28px",
              fontWeight: 900,
              transform: isClicked ? "translate(4px, 4px)" : "none",
            }}
          >
            <span>💻</span>
            <span>PROGRAMME.EXE</span>
          </div>

          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "40px",
              backgroundColor: "#FF7675",
              color: "#FFFFFF",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "6px 14px",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            {isClicked ? "CLICKED! 🖱️" : "CURSOR CLICKING..."}
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFE600",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
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

/* --- SCENE 7: NEO-BRUTALIST STORIES --- */
const Scene7BrutalistStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 50px 180px 50px",
        gap: "28px",
      }}
    >
      <div
        style={{
          backgroundColor: "#55EFC4",
          border: "4px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          padding: "8px 24px",
          fontSize: "26px",
          fontWeight: 900,
          alignSelf: "flex-start",
          transform: `scale(${pop}) rotate(2deg)`,
        }}
      >
        USE #4: STORIES & FILMS
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "5px solid #000000",
          boxShadow: "10px 10px 0px #000000",
          padding: "36px",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          transform: `scale(${pop})`,
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "4px solid #000000",
            boxShadow: "5px 5px 0px #FFE600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "64px",
          }}
        >
          🎬
        </div>
        <div>
          <div style={{ fontSize: "32px", fontWeight: 900 }}>MOVIE SUMMARY</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#636E72" }}>
            When retelling plots of books or movies, use Present Simple!
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#74B9FF",
          border: "4px solid #000000",
          boxShadow: "7px 7px 0px #000000",
          padding: "24px",
          fontSize: "32px",
          fontWeight: 900,
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
        <div style={{ fontSize: "70px", marginBottom: "16px" }}>🚀</div>
        <h2
          style={{
            fontFamily: montserratFont,
            fontSize: "64px",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "0 0 20px 0",
          }}
        >
          Follow for More
          <br />
          Grammar in 1 Min!
        </h2>

        <div
          style={{
            backgroundColor: "#55EFC4",
            border: "4px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            padding: "16px 28px",
            fontSize: "28px",
            fontWeight: 900,
            marginBottom: "30px",
          }}
        >
          💬 Drop your own example sentence below!
        </div>

        <div
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
          + FOLLOW NOW
        </div>
      </div>
    </AbsoluteFill>
  );
};
