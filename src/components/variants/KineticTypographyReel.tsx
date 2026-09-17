import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["900"],
});

export interface KineticTypographyReelProps {
  backgroundColor?: string;
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

export const KineticTypographyReel: React.FC<KineticTypographyReelProps> = ({
  backgroundColor = "#000000",
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
        backgroundColor,
        color: "#FFFFFF",
        fontFamily: montserratFont,
        overflow: "hidden",
      }}
    >
      {/* High-Energy Neon Progress Line */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "12px",
          backgroundColor: "#111111",
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FF5500, #FFE600, #00F0FF)",
            boxShadow: "0 0 20px #FF5500",
          }}
        />
      </div>

      {/* Minimal Beat Counter & Badge */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: 900,
          letterSpacing: "2px",
          zIndex: 40,
        }}
      >
        <span style={{ color: "#FFE600" }}>KINETIC • PRESENT SIMPLE</span>
        <span style={{ color: "#FF5500" }}>{timeCode}</span>
      </div>

      {/* =========================================================================
          SCENE 1: HOOK & TITLE (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1KineticHook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE (0:05 - 0:18 | frames 150 - 540)
          ========================================================================= */}
      {frame >= 150 && frame < 540 && (
        <Scene2KineticPositive frame={frame - 150} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:18 - 0:26 | frames 540 - 780)
          ========================================================================= */}
      {frame >= 540 && frame < 780 && (
        <Scene3KineticNegAndQ frame={frame - 540} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE (0:26 - 0:38 | frames 780 - 1140)
          ========================================================================= */}
      {frame >= 780 && frame < 1140 && (
        <Scene4KineticHabits frame={frame - 780} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:38 - 0:45 | frames 1140 - 1350)
          ========================================================================= */}
      {frame >= 1140 && frame < 1350 && (
        <Scene5KineticFacts frame={frame - 1140} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:45 - 0:51 | frames 1350 - 1530)
          ========================================================================= */}
      {frame >= 1350 && frame < 1530 && (
        <Scene6KineticInstructions frame={frame - 1350} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:51 - 0:56 | frames 1530 - 1680)
          ========================================================================= */}
      {frame >= 1530 && frame < 1680 && (
        <Scene7KineticStories frame={frame - 1530} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (0:56 - 1:00 | frames 1680 - 1800)
          ========================================================================= */}
      {frame >= 1680 && <Scene8KineticCTA frame={frame - 1680} fps={fps} />}

      {/* High-Contrast Bottom Subtitle Bar */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "40px",
            right: "40px",
            textAlign: "center",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.9)",
              border: "2px solid #333333",
              borderRadius: "20px",
              padding: "16px 28px",
              fontSize: "30px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            {activeCaption.text}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* --- SCENE 1: KINETIC HOOK --- */
const Scene1KineticHook: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const w1 = spring({ frame, fps, config: { mass: 0.3, damping: 6, stiffness: 220 } });
  const w2 = spring({ frame: frame - 18, fps, config: { mass: 0.3, damping: 6, stiffness: 220 } });
  const w3 = spring({ frame: frame - 36, fps, config: { mass: 0.3, damping: 6, stiffness: 220 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: "130px",
          fontWeight: 900,
          lineHeight: 0.95,
          color: "#FFFFFF",
          transform: `scale(${w1})`,
        }}
      >
        PRESENT
      </div>

      <div
        style={{
          fontSize: "140px",
          fontWeight: 900,
          lineHeight: 0.95,
          color: "#FFE600",
          transform: `scale(${w2})`,
          textShadow: "0 0 30px rgba(255, 230, 0, 0.4)",
        }}
      >
        SIMPLE
      </div>

      <div
        style={{
          fontSize: "90px",
          fontWeight: 900,
          lineHeight: 1.1,
          color: "#FF5500",
          marginTop: "30px",
          transform: `scale(${w3})`,
        }}
      >
        IN 60 SECONDS! ⏱️
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: KINETIC (+) POSITIVE --- */
const Scene2KineticPositive: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const s1 = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });
  const s2 = spring({ frame: frame - 40, fps, config: { mass: 0.4, damping: 7 } });
  const shakeS = frame > 60 && frame < 90 ? Math.sin(frame * 2) * 8 : 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      {/* Massive Formula */}
      <div style={{ transform: `scale(${s1})` }}>
        <div style={{ fontSize: "50px", color: "#00F0FF", letterSpacing: "4px" }}>
          POSITIVE FORM
        </div>
        <div
          style={{
            fontSize: "90px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginTop: "16px",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>SUBJECT</span>
          <br />
          <span style={{ color: "#888888" }}>+</span>{" "}
          <span style={{ color: "#FFE600" }}>VERB (V1)</span>
        </div>
      </div>

      {/* Massive S-Rule Warning */}
      <div
        style={{
          transform: `scale(${s2}) translateX(${shakeS}px)`,
          backgroundColor: "#FF5500",
          padding: "24px 40px",
          borderRadius: "16px",
        }}
      >
        <div style={{ fontSize: "40px", color: "#FFFFFF" }}>HE / SHE / IT</div>
        <div style={{ fontSize: "80px", fontWeight: 900, color: "#000000" }}>
          +S / -ES / -IES!
        </div>
      </div>

      {/* Bold Examples */}
      <div style={{ fontSize: "56px", fontWeight: 900 }}>
        <div>
          <span style={{ color: "#00F0FF" }}>I</span>{" "}
          <span style={{ color: "#FFE600" }}>study</span> law.
        </div>
        <div style={{ marginTop: "12px" }}>
          <span style={{ color: "#00F0FF" }}>She</span> like
          <span style={{ color: "#FF5500" }}>s</span> reading.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: KINETIC (– & ?) --- */
const Scene3KineticNegAndQ: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const popNeg = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });
  const popQ = spring({ frame: frame - 60, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "40px",
      }}
    >
      {/* Negative */}
      <div style={{ transform: `scale(${popNeg})` }}>
        <div style={{ fontSize: "40px", color: "#FF3366", letterSpacing: "3px" }}>
          NEGATIVE
        </div>
        <div style={{ fontSize: "80px", fontWeight: 900, color: "#FFFFFF" }}>
          DON'T / <span style={{ color: "#FF3366" }}>DOESN'T</span> + V0
        </div>
        <div style={{ fontSize: "48px", color: "#CCCCCC", marginTop: "10px" }}>
          He <span style={{ color: "#FF3366" }}>doesn't study</span> medicine.
        </div>
      </div>

      <div
        style={{
          width: "200px",
          height: "4px",
          backgroundColor: "#333333",
        }}
      />

      {/* Question */}
      <div style={{ transform: `scale(${popQ})` }}>
        <div style={{ fontSize: "40px", color: "#00F0FF", letterSpacing: "3px" }}>
          QUESTIONS
        </div>
        <div style={{ fontSize: "80px", fontWeight: 900, color: "#FFFFFF" }}>
          <span style={{ color: "#00F0FF" }}>DO / DOES</span> + SUBJ + V0?
        </div>
        <div style={{ fontSize: "48px", color: "#CCCCCC", marginTop: "10px" }}>
          <span style={{ color: "#00F0FF" }}>Does</span> he study law?
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: KINETIC HABITS --- */
const Scene4KineticHabits: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      <div style={{ transform: `scale(${pop})` }}>
        <div style={{ fontSize: "42px", color: "#FFE600", letterSpacing: "3px" }}>
          USE #1
        </div>
        <div style={{ fontSize: "96px", fontWeight: 900, color: "#FFFFFF" }}>
          HABITS &<br />
          ROUTINES!
        </div>
      </div>

      {/* Massive Pulsing X's */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "64px",
          fontWeight: 900,
          color: "#00F0FF",
        }}
      >
        <span>X</span>
        <span>X</span>
        <span style={{ color: "#FFE600" }}>X</span>
        <span>X</span>
        <span>X</span>
      </div>

      {/* Rhythmic Keywords */}
      <div style={{ fontSize: "46px", color: "#FF5500", fontWeight: 900 }}>
        ALWAYS • USUALLY • EVERY DAY
      </div>

      <div style={{ fontSize: "52px", color: "#FFFFFF", fontWeight: 900 }}>
        "I use the Internet <span style={{ color: "#FFE600" }}>every day</span>."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 5: KINETIC FACTS --- */
const Scene5KineticFacts: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      <div style={{ transform: `scale(${pop})` }}>
        <div style={{ fontSize: "42px", color: "#00F0FF", letterSpacing: "3px" }}>
          USE #2
        </div>
        <div style={{ fontSize: "96px", fontWeight: 900, color: "#FFFFFF" }}>
          UNIVERSAL<br />
          TRUTHS! ♨️
        </div>
      </div>

      <div
        style={{
          fontSize: "120px",
          fontWeight: 900,
          color: "#FF5500",
          lineHeight: 1,
        }}
      >
        100 °C
      </div>

      <div style={{ fontSize: "52px", color: "#FFFFFF", fontWeight: 900 }}>
        "If you heat water, it <span style={{ color: "#FFE600" }}>boils</span>."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 6: KINETIC INSTRUCTIONS --- */
const Scene6KineticInstructions: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      <div style={{ transform: `scale(${pop})` }}>
        <div style={{ fontSize: "42px", color: "#FFE600", letterSpacing: "3px" }}>
          USE #3
        </div>
        <div style={{ fontSize: "96px", fontWeight: 900, color: "#FFFFFF" }}>
          INSTRUCTIONS
        </div>
      </div>

      <div
        style={{
          fontSize: "120px",
          fontWeight: 900,
          color: "#00F0FF",
        }}
      >
        CLICK! 🖱️
      </div>

      <div style={{ fontSize: "50px", color: "#FFFFFF", fontWeight: 900 }}>
        "First <span style={{ color: "#FFE600" }}>click</span> on the desktop."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 7: KINETIC STORIES --- */
const Scene7KineticStories: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      <div style={{ transform: `scale(${pop})` }}>
        <div style={{ fontSize: "42px", color: "#FF5500", letterSpacing: "3px" }}>
          USE #4
        </div>
        <div style={{ fontSize: "96px", fontWeight: 900, color: "#FFFFFF" }}>
          STORIES &<br />
          FILMS 🎬
        </div>
      </div>

      <div style={{ fontSize: "52px", color: "#FFFFFF", fontWeight: 900 }}>
        "In the film, the hero{" "}
        <span style={{ color: "#FFE600" }}>saves</span> the villagers."
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 8: KINETIC CTA --- */
const Scene8KineticCTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const pop = spring({ frame, fps, config: { mass: 0.4, damping: 7 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "36px",
      }}
    >
      <div style={{ transform: `scale(${pop})` }}>
        <div style={{ fontSize: "110px", fontWeight: 900, color: "#FFFFFF" }}>
          COMMENT<br />
          <span style={{ color: "#FFE600" }}>BELOW! 💬</span>
        </div>

        <div
          style={{
            backgroundColor: "#FF5500",
            color: "#000000",
            padding: "24px 60px",
            fontSize: "48px",
            fontWeight: 900,
            borderRadius: "999px",
            marginTop: "30px",
            display: "inline-block",
          }}
        >
          + FOLLOW NOW 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};
