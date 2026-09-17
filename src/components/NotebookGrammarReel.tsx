import { loadFont as loadAmiri } from "@remotion/google-fonts/Amiri";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { loadFont as loadCairo } from "@remotion/google-fonts/Cairo";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: amiriFont } = loadAmiri("normal", {
  subsets: ["arabic", "latin"],
  weights: ["400", "700"],
});

const { fontFamily: cairoFont } = loadCairo("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800"],
});

const { fontFamily: loraFont } = loadLora("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});

export interface NotebookGrammarProps {
  baseVerb?: string;
  objectNoun?: string;
  firstPronouns?: string[];
  thirdPronouns?: string[];
  bgImagePath?: string;
}

export const NotebookGrammarReel: React.FC<NotebookGrammarProps> = ({
  baseVerb = "drink",
  objectNoun = "coffee.",
  firstPronouns = ["I", "You"],
  thirdPronouns = ["He", "She"],
  bgImagePath = "assets/bg-en-claen.png",
}) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Overall top progress bar (subtle ink style)
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F4EFE6",
        overflow: "hidden",
      }}
    >
      {/* 1. Paper Background */}
      <AbsoluteFill>
        <Img
          src={staticFile(bgImagePath)}
          style={{
            width: "1080px",
            height: "1920px",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Top Subtle Reading Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "8px",
          width: `${progress}%`,
          backgroundColor: "#DC2626",
          zIndex: 60,
          boxShadow: "0 2px 8px rgba(220, 38, 38, 0.4)",
        }}
      />

      {/* SCENE 1: First & Second Person (0 - 130 frames, ~4.3s) */}
      <Sequence durationInFrames={130}>
        <SceneFirstPerson
          pronouns={firstPronouns}
          verb={baseVerb}
          objectNoun={objectNoun}
        />
      </Sequence>

      {/* SCENE 2: Third Person Singular & S Addition (130 - 265 frames, ~4.5s) */}
      <Sequence from={130} durationInFrames={135}>
        <SceneThirdPerson
          pronouns={thirdPronouns}
          baseVerb={baseVerb}
          objectNoun={objectNoun}
        />
      </Sequence>

      {/* SCENE 3: Negation with doesn't & S Removal (265 - 415 frames, ~5.0s) */}
      <Sequence from={265} durationInFrames={150}>
        <SceneNegation
          baseVerb={baseVerb}
          objectNoun={objectNoun}
        />
      </Sequence>

      {/* SCENE 4: Comparison & Summary (415 - 540 frames, ~4.2s) */}
      <Sequence from={415} durationInFrames={125}>
        <SceneComparison
          baseVerb={baseVerb}
          objectNoun={objectNoun}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 1: FIRST & SECOND PERSON (ضمائر المتكلم والمخاطب)
   ========================================================================= */
const SceneFirstPerson: React.FC<{
  pronouns: string[];
  verb: string;
  objectNoun: string;
}> = ({ pronouns, verb, objectNoun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const pronounsEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 0.9 },
  });

  const verbRuleEntrance = spring({
    frame: frame - 35,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  const sentenceEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, mass: 0.9 },
  });

  // Exit transition
  const exitOpacity = interpolate(frame, [115, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "180px 100px 200px 100px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Arabic Header - Right Aligned */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [30, 0])}px)`,
          marginBottom: "120px",
        }}
      >
        <h2
          style={{
            fontFamily: cairoFont,
            fontSize: "64px",
            fontWeight: 700,
            color: "#1E293B",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          ضمائر المتكلم والمخاطب
        </h2>
      </div>

      {/* Middle Content Grid: Left has verb rule, Right has Pronouns (I / You) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 60px",
          boxSizing: "border-box",
          marginBottom: "260px",
        }}
      >
        {/* Left: Verb Rule + Base Verb */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: verbRuleEntrance,
            transform: `translateY(${interpolate(verbRuleEntrance, [0, 1], [25, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: amiriFont,
              fontSize: "36px",
              color: "#94A3B8",
              marginBottom: "12px",
              direction: "rtl",
            }}
          >
            فعل مجرد
          </span>
          <span
            style={{
              fontFamily: loraFont,
              fontSize: "68px",
              fontWeight: 600,
              color: "#1E293B",
              letterSpacing: "0.02em",
            }}
          >
            {verb}
          </span>
        </div>

        {/* Right: Pronouns list (I, You) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            opacity: pronounsEntrance,
            transform: `translateY(${interpolate(pronounsEntrance, [0, 1], [25, 0])}px)`,
          }}
        >
          {pronouns.map((p) => (
            <span
              key={p}
              style={{
                fontFamily: loraFont,
                fontSize: "72px",
                fontWeight: 600,
                color: "#1E293B",
                lineHeight: 1.1,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Result Sentence: I drink coffee. */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          opacity: sentenceEntrance,
          transform: `scale(${interpolate(sentenceEntrance, [0, 1], [0.94, 1])}) translateY(${interpolate(sentenceEntrance, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: loraFont,
            fontSize: "66px",
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "0.01em",
          }}
        >
          {pronouns[0]} {verb} {objectNoun}
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 2: THIRD PERSON SINGULAR (الغائب المفرد & attaching 's')
   ========================================================================= */
const SceneThirdPerson: React.FC<{
  pronouns: string[];
  baseVerb: string;
  objectNoun: string;
}> = ({ pronouns, baseVerb, objectNoun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const pronounsEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, mass: 0.9 },
  });

  const sentenceEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 13, mass: 0.85 },
  });

  // Animation when the letter 's' appears and attaches in red
  // S pops in with spring at frame 60
  const sProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 11, mass: 0.7 },
  });

  const exitOpacity = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "180px 100px 200px 100px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Arabic Header - Right Aligned */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [30, 0])}px)`,
          marginBottom: "140px",
        }}
      >
        <h2
          style={{
            fontFamily: cairoFont,
            fontSize: "64px",
            fontWeight: 700,
            color: "#1E293B",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          الغائب المفرد
        </h2>
      </div>

      {/* Right-aligned Pronouns (He, She) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "60px",
          boxSizing: "border-box",
          marginBottom: "300px",
          opacity: pronounsEntrance,
          transform: `translateY(${interpolate(pronounsEntrance, [0, 1], [25, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {pronouns.map((p) => (
            <span
              key={p}
              style={{
                fontFamily: loraFont,
                fontSize: "72px",
                fontWeight: 600,
                color: "#1E293B",
                lineHeight: 1.1,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Center Sentence: He drink -> He drinks coffee */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          opacity: sentenceEntrance,
          transform: `translateY(${interpolate(sentenceEntrance, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: loraFont,
            fontSize: "68px",
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "0.01em",
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <span>{pronouns[0]}&nbsp;</span>
          <span>{baseVerb}</span>

          {/* Animated Red 's' */}
          <span
            style={{
              color: "#DC2626",
              fontWeight: 700,
              display: "inline-block",
              opacity: sProgress,
              transform: `scale(${interpolate(sProgress, [0, 1], [0, 1.15])})`,
              transformOrigin: "center bottom",
              textShadow: "0 2px 10px rgba(220, 38, 38, 0.25)",
            }}
          >
            s
          </span>

          <span>&nbsp;{objectNoun}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 3: NEGATION & DOESN'T (النفي: شطب not وسحب الـ s)
   ========================================================================= */
const SceneNegation: React.FC<{
  baseVerb: string;
  objectNoun: string;
}> = ({ baseVerb, objectNoun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1 (frame 0-35): Sentence "He not drinks coffee." appears
  const step1Entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Step 2 (frame 35-65): Red Cross-out lines over "not"
  const crossProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 3 (frame 65-95): "doesn't" swoops in replacing "not"
  const doesntEntrance = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, mass: 0.85 },
  });

  // Step 4 (frame 90-120): The 's' gets pulled away/disappears from drinks -> drink
  const sRemovalProgress = interpolate(frame, [90, 110], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Is "doesn't" active?
  const showDoesnt = frame >= 65;

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "180px 100px 200px 100px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: step1Entrance,
          transform: `translateY(${interpolate(step1Entrance, [0, 1], [30, 0])}px)`,
          textAlign: "center",
        }}
      >
        {/* Main Sentence with interactive morphing elements */}
        <div
          style={{
            fontFamily: loraFont,
            fontSize: "66px",
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "0.01em",
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* "He " */}
          <span>He&nbsp;</span>

          {/* EITHER: "not" with red hand-drawn strikeout OR "doesn't" */}
          {!showDoesnt ? (
            <span
              style={{
                position: "relative",
                display: "inline-block",
                padding: "0 4px",
              }}
            >
              <span>not</span>
              {/* Hand-drawn red scribble/strikeout SVG */}
              {crossProgress > 0 && (
                <svg
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-8px",
                    width: "calc(100% + 16px)",
                    height: "36px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 100 40"
                >
                  <line
                    x1="2"
                    y1="34"
                    x2="98"
                    y2="6"
                    stroke="#DC2626"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="120"
                    strokeDashoffset={120 * (1 - crossProgress)}
                  />
                  <line
                    x1="2"
                    y1="6"
                    x2="98"
                    y2="34"
                    stroke="#DC2626"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="120"
                    strokeDashoffset={120 * (1 - crossProgress)}
                  />
                </svg>
              )}
            </span>
          ) : (
            <span
              style={{
                display: "inline-block",
                color: "#2563EB",
                fontWeight: 700,
                opacity: doesntEntrance,
                transform: `scale(${interpolate(doesntEntrance, [0, 1], [0.85, 1])})`,
                textShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
              }}
            >
              doesn't
            </span>
          )}

          <span>&nbsp;{baseVerb}</span>

          {/* The letter 's' on drink(s) */}
          <span
            style={{
              color: "#DC2626",
              fontWeight: 700,
              display: "inline-block",
              opacity: sRemovalProgress,
              transform: `scale(${sRemovalProgress})`,
              width: `${sRemovalProgress * 28}px`,
              overflow: "hidden",
            }}
          >
            s
          </span>

          <span>&nbsp;{objectNoun}</span>
        </div>

        {/* Dynamic Teacher Helper Note */}
        {frame >= 70 && (
          <div
            style={{
              marginTop: "80px",
              fontFamily: cairoFont,
              fontSize: "36px",
              color: frame >= 90 ? "#059669" : "#DC2626",
              fontWeight: 700,
              direction: "rtl",
              opacity: spring({
                frame: frame - 70,
                fps,
                config: { damping: 14, mass: 0.8 },
              }),
            }}
          >
            {frame >= 95
              ? "✨ تُسحب الـ (s) ويعود الفعل مجرداً"
              : "❌ لا يمكن استخدام not مباشرة"}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 4: COMPARISON & SUMMARY (مقارنة & عادات وروتين)
   ========================================================================= */
const SceneComparison: React.FC<{
  baseVerb: string;
  objectNoun: string;
}> = ({ baseVerb, objectNoun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const line1Entrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 13, mass: 0.85 },
  });

  const line2Entrance = spring({
    frame: frame - 35,
    fps,
    config: { damping: 13, mass: 0.85 },
  });

  const footerEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        padding: "180px 100px 200px 100px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Arabic Header: مقارنة - Right Aligned */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [30, 0])}px)`,
          marginBottom: "140px",
        }}
      >
        <h2
          style={{
            fontFamily: cairoFont,
            fontSize: "64px",
            fontWeight: 700,
            color: "#1E293B",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          مقارنة
        </h2>
      </div>

      {/* Comparison Sentences Centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: "120px",
        }}
      >
        {/* Line 1: He drinks coffee. (Positive) */}
        <div
          style={{
            opacity: line1Entrance,
            transform: `translateY(${interpolate(line1Entrance, [0, 1], [25, 0])}px)`,
            fontFamily: loraFont,
            fontSize: "64px",
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "0.01em",
          }}
        >
          <span>He {baseVerb}</span>
          <span
            style={{
              color: "#DC2626",
              fontWeight: 700,
              textShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
            }}
          >
            s
          </span>
          <span> {objectNoun}</span>
        </div>

        {/* Line 2: He doesn't drink coffee. (Negative) */}
        <div
          style={{
            opacity: line2Entrance,
            transform: `translateY(${interpolate(line2Entrance, [0, 1], [25, 0])}px)`,
            fontFamily: loraFont,
            fontSize: "64px",
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "0.01em",
          }}
        >
          <span>He </span>
          <span
            style={{
              color: "#2563EB",
              fontWeight: 700,
              textShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
            }}
          >
            doesn't
          </span>
          <span> {baseVerb} {objectNoun}</span>
        </div>
      </div>

      {/* Footer Label: عادات وروتين */}
      <div
        style={{
          marginTop: "auto",
          width: "100%",
          textAlign: "center",
          direction: "rtl",
          opacity: footerEntrance,
          transform: `translateY(${interpolate(footerEntrance, [0, 1], [20, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: cairoFont,
            fontSize: "44px",
            fontWeight: 700,
            color: "#475569",
            letterSpacing: "0.02em",
          }}
        >
          عادات وروتين
        </span>
      </div>
    </AbsoluteFill>
  );
};
