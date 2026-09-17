import { loadFont as loadSpaceMono } from "@remotion/google-fonts/SpaceMono";
import { loadFont as loadVT323 } from "@remotion/google-fonts/VT323";
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: vt323Font } = loadVT323("normal", {
  subsets: ["latin"],
  weights: ["400"],
});

const { fontFamily: spaceMonoFont } = loadSpaceMono("normal", {
  subsets: ["latin"],
  weights: ["700"],
});

export interface RetroDesktopReelProps {
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

export const RetroDesktopReel: React.FC<RetroDesktopReelProps> = ({
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
        backgroundColor: "#008080", // Classic Windows 95 Teal Desktop
        color: "#000000",
        fontFamily: spaceMonoFont,
        overflow: "hidden",
      }}
    >
      {/* CRT Scanline Overlay Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          zIndex: 90,
          opacity: 0.4,
        }}
      />

      {/* Desktop Icons */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          zIndex: 20,
        }}
      >
        <div style={{ textAlign: "center", color: "#FFFFFF", width: "90px" }}>
          <div style={{ fontSize: "42px" }}>📁</div>
          <div
            style={{
              fontSize: "16px",
              fontFamily: vt323Font,
              backgroundColor: "#000080",
              padding: "2px 4px",
            }}
          >
            Grammar.exe
          </div>
        </div>
        <div style={{ textAlign: "center", color: "#FFFFFF", width: "90px" }}>
          <div style={{ fontSize: "42px" }}>💾</div>
          <div
            style={{
              fontSize: "16px",
              fontFamily: vt323Font,
              backgroundColor: "#000080",
              padding: "2px 4px",
            }}
          >
            Rules.txt
          </div>
        </div>
      </div>

      {/* Top Retro OS Header Bar */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "46px",
          backgroundColor: "#C0C0C0",
          borderBottom: "2px solid #808080",
          boxShadow: "inset 0 1px #FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 50,
          fontSize: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              backgroundColor: "#C0C0C0",
              borderTop: "2px solid #FFFFFF",
              borderLeft: "2px solid #FFFFFF",
              borderRight: "2px solid #000000",
              borderBottom: "2px solid #000000",
              padding: "2px 10px",
              fontWeight: 900,
              fontSize: "18px",
            }}
          >
            🪟 Start
          </span>
          <span style={{ fontSize: "16px", color: "#333333" }}>
            Grammar_OS v3.11
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "18px", fontFamily: vt323Font }}>
            ⏱️ {timeCode}
          </span>
          <div
            style={{
              width: "120px",
              height: "18px",
              backgroundColor: "#FFFFFF",
              border: "2px inset #808080",
              padding: "1px",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "#000080",
              }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 1: HOOK (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1RetroHook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <Scene2RetroPositive frame={frame - 150} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <Scene3RetroNegAndQ frame={frame - 540} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <Scene4RetroHabits frame={frame - 780} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <Scene5RetroFacts frame={frame - 1140} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <Scene6RetroInstructions frame={frame - 1350} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <Scene7RetroStories frame={frame - 1530} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && <Scene8RetroCTA frame={frame - 1680} fps={fps} />}

      {/* Retro Command Prompt Subtitle Bar */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            right: "40px",
            backgroundColor: "#000000",
            border: "3px solid #C0C0C0",
            boxShadow: "inset 2px 2px #000000, 4px 4px 0px rgba(0,0,0,0.5)",
            padding: "16px 24px",
            zIndex: 80,
          }}
        >
          <div
            style={{
              fontFamily: vt323Font,
              fontSize: "24px",
              color: "#00FF66",
              marginBottom: "4px",
            }}
          >
            C:\VOICEOVER\AUDIO.WAV &gt;
          </div>
          <div
            style={{
              fontFamily: spaceMonoFont,
              fontSize: "26px",
              color: "#FFFFFF",
              lineHeight: 1.3,
            }}
          >
            {activeCaption.text}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Reusable Retro OS Window Container
const RetroWindow: React.FC<{
  title: string;
  children: React.ReactNode;
  width?: string;
}> = ({ title, children, width = "920px" }) => (
  <div
    style={{
      width,
      backgroundColor: "#C0C0C0",
      borderTop: "3px solid #FFFFFF",
      borderLeft: "3px solid #FFFFFF",
      borderRight: "3px solid #000000",
      borderBottom: "3px solid #000000",
      boxShadow: "8px 8px 0px rgba(0,0,0,0.4)",
      padding: "4px",
    }}
  >
    {/* Blue Title Bar */}
    <div
      style={{
        background: "linear-gradient(90deg, #000080, #1084D0)",
        color: "#FFFFFF",
        padding: "6px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 700,
        fontSize: "22px",
        letterSpacing: "1px",
      }}
    >
      <span>🗂️ {title}</span>
      <div style={{ display: "flex", gap: "4px" }}>
        {["_", "□", "✕"].map((btn, i) => (
          <div
            key={i}
            style={{
              width: "24px",
              height: "22px",
              backgroundColor: "#C0C0C0",
              color: "#000000",
              borderTop: "2px solid #FFFFFF",
              borderLeft: "2px solid #FFFFFF",
              borderRight: "2px solid #000000",
              borderBottom: "2px solid #000000",
              fontSize: "14px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {btn}
          </div>
        ))}
      </div>
    </div>

    {/* Window Body */}
    <div style={{ padding: "28px" }}>{children}</div>
  </div>
);

/* --- SCENE 1: RETRO HOOK --- */
const Scene1RetroHook: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const cursorBlink = frame % 16 < 8 ? "_" : " ";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="PRESENT_SIMPLE_TUTORIAL.EXE">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px" }}>⏳</div>
          <h1
            style={{
              fontFamily: vt323Font,
              fontSize: "90px",
              lineHeight: 1,
              margin: "0 0 16px 0",
              color: "#000080",
            }}
          >
            PRESENT SIMPLE
            <br />
            IN 60 SECONDS!
          </h1>
          <div
            style={{
              backgroundColor: "#000000",
              color: "#00FF66",
              fontFamily: vt323Font,
              fontSize: "36px",
              padding: "12px 20px",
              border: "2px inset #808080",
              display: "inline-block",
            }}
          >
            &gt; INITIALIZING CRASH COURSE... [OK]{cursorBlink}
          </div>
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: RETRO (+) POSITIVE --- */
const Scene2RetroPositive: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const cursorBlink = frame % 16 < 8 ? "▮" : " ";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        gap: "24px",
      }}
    >
      <RetroWindow title="SYNTAX_RULE_1.HLP">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px inset #808080",
            padding: "24px",
            fontSize: "28px",
            lineHeight: 1.4,
          }}
        >
          <div style={{ fontWeight: 900, color: "#000080", marginBottom: "8px" }}>
            (+) POSITIVE RULE:
          </div>
          <div>Subject + V1 (base)</div>
          <div
            style={{
              backgroundColor: "#FFFF99",
              padding: "6px 12px",
              marginTop: "12px",
              border: "1px solid #CCCC00",
              fontWeight: 700,
            }}
          >
            He / She / It ➔ +S, -ES, -IES
          </div>
        </div>

        <div
          style={{
            marginTop: "18px",
            backgroundColor: "#000000",
            color: "#00FF66",
            fontFamily: vt323Font,
            fontSize: "38px",
            padding: "16px 20px",
            border: "2px inset #808080",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div>&gt; I study law.</div>
          <div>&gt; She like[s] reading.</div>
          <div>&gt; He stud[ies] law. {cursorBlink}</div>
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: RETRO (– & ?) --- */
const Scene3RetroNegAndQ: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const cursorBlink = frame % 16 < 8 ? "▮" : " ";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        gap: "24px",
      }}
    >
      <RetroWindow title="NEGATIVE_AND_QUESTIONS.SYS">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px inset #808080",
            padding: "24px",
            fontSize: "26px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div>
            <span style={{ color: "#CC0000", fontWeight: 900 }}>(–) NEGATIVE:</span>
            <br />
            don't / doesn't + V0
            <br />
            <span style={{ color: "#555555" }}>
              "He doesn't study medicine."
            </span>
          </div>

          <hr style={{ border: "1px inset #808080" }} />

          <div>
            <span style={{ color: "#000080", fontWeight: 900 }}>(?) QUESTION:</span>
            <br />
            Do / Does + Subject + V0?
            <br />
            <span style={{ color: "#555555" }}>"Does he study law?{cursorBlink}"</span>
          </div>
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: RETRO HABITS --- */
const Scene4RetroHabits: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const tick = Math.floor(frame / 6) % 4;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="TIMELINE_ANALYZER.EXE">
        <div style={{ textAlign: "center", marginBottom: "16px", fontSize: "24px", fontWeight: 700 }}>
          [ USE #1: HABITS & ROUTINE ]
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "#00FF66",
            fontFamily: vt323Font,
            fontSize: "44px",
            padding: "20px",
            border: "2px inset #808080",
            textAlign: "center",
          }}
        >
          PAST &lt;--- {tick === 0 ? ">>>" : "[X]"}---[X]---[X]---[X] ---&gt; FUTURE
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px inset #808080",
            padding: "16px",
            fontSize: "24px",
            marginTop: "16px",
          }}
        >
          KEYWORDS: always, usually, every day
          <br />
          <strong>"I use the Internet every day."</strong>
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 5: RETRO FACTS --- */
const Scene5RetroFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const blink = frame % 12 < 6 ? "♨️" : "♨️♨️";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="PHYSICS_SIMULATION.DAT">
        <div style={{ textAlign: "center", marginBottom: "16px", fontSize: "24px", fontWeight: 700 }}>
          [ USE #2: UNIVERSAL FACTS ]
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "#FF3366",
            fontFamily: vt323Font,
            fontSize: "56px",
            padding: "24px",
            border: "2px inset #808080",
            textAlign: "center",
          }}
        >
          TEMPERATURE: 100°C [BOILING {blink}]
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px inset #808080",
            padding: "16px",
            fontSize: "24px",
            marginTop: "16px",
          }}
        >
          "If you heat water to 100 °C, it <strong>boils</strong>."
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 6: RETRO INSTRUCTIONS --- */
const Scene6RetroInstructions: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const cursorX = (frame % 20) * 2;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="SYSTEM_INSTRUCTIONS.TXT">
        <div style={{ textAlign: "center", marginBottom: "16px", fontSize: "24px", fontWeight: 700 }}>
          [ USE #3: INSTRUCTIONS ]
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px inset #808080",
            padding: "24px",
            fontSize: "26px",
          }}
        >
          <span style={{ display: "inline-block", transform: `translateX(${cursorX}px)` }}>🖱️</span> MOUSE_CLICK_EVENT:
          <br />
          "To start the programme, first <strong>click</strong> on the desktop."
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 7: RETRO STORIES --- */
const Scene7RetroStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const playIcon = frame % 16 < 8 ? "▶" : "■";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="MEDIA_PLAYER_95.AVI">
        <div style={{ textAlign: "center", marginBottom: "16px", fontSize: "24px", fontWeight: 700 }}>
          [ USE #4: FILM PLOTS {playIcon} ]
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "#FFFF00",
            fontFamily: vt323Font,
            fontSize: "44px",
            padding: "24px",
            border: "2px inset #808080",
            textAlign: "center",
          }}
        >
          🎬 "In the film, the hero SAVES the villagers."
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};

/* --- SCENE 8: RETRO CTA --- */
const Scene8RetroCTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const blink = frame % 14 < 7;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <RetroWindow title="DIALOG_PROMPT.MSGBOX">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: "50px", marginBottom: "14px" }}>💾</div>
          <div style={{ fontSize: "32px", fontWeight: 900, marginBottom: "14px" }}>
            Save this lesson?
          </div>
          <div style={{ fontSize: "22px", color: "#333333", marginBottom: "24px" }}>
            Leave a comment with your example sentence!
          </div>

          <div
            style={{
              backgroundColor: blink ? "#000080" : "#C0C0C0",
              color: blink ? "#FFFFFF" : "#000000",
              borderTop: "3px solid #FFFFFF",
              borderLeft: "3px solid #FFFFFF",
              borderRight: "3px solid #000000",
              borderBottom: "3px solid #000000",
              padding: "12px 32px",
              fontSize: "26px",
              fontWeight: 900,
              display: "inline-block",
            }}
          >
            [ + Follow ]
          </div>
        </div>
      </RetroWindow>
    </AbsoluteFill>
  );
};
