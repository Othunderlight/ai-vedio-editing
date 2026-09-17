import { loadFont as loadCairo } from "@remotion/google-fonts/Cairo";
import { loadFont as loadPlayfairDisplay } from "@remotion/google-fonts/PlayfairDisplay";
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

const { fontFamily: cairoFont } = loadCairo("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800"],
});

const { fontFamily: editorialSerif } = loadPlayfairDisplay("normal", {
  subsets: ["latin"],
  weights: ["700", "800", "900"],
});

export interface NotebookGrammarProps {
  baseVerb?: string;
  objectNoun?: string;
  firstPronouns?: string[];
  thirdPronouns?: string[];
  bgImagePath?: string;
}

// Paper-Cutout Badge component with prominent contrast and clean drop shadow
const PaperCutoutBadge: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  rotation?: number;
}> = ({ children, style, rotation = 0 }) => (
  <div
    style={{
      backgroundColor: "#FDFBF7",
      border: "2px solid rgba(43, 40, 37, 0.16)",
      boxShadow:
        "0 12px 32px rgba(43, 40, 37, 0.12), 0 3px 8px rgba(43, 40, 37, 0.08)",
      borderRadius: "14px",
      padding: "16px 36px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `rotate(${rotation}deg)`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const NotebookGrammarReel: React.FC<NotebookGrammarProps> = ({
  baseVerb = "drink",
  objectNoun = "coffee.",
  firstPronouns = ["I", "You"],
  thirdPronouns = ["He", "She"],
  bgImagePath = "assets/bg-en-claen.png",
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F4EFE6",
        overflow: "hidden",
      }}
    >
      {/* 1. Dotted Paper Background (Clean edge, no top border glitch) */}
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

      {/* SCENE 3: Negation with doesn't & S Detaching (265 - 420 frames, ~5.2s) */}
      <Sequence from={265} durationInFrames={155}>
        <SceneNegation baseVerb={baseVerb} objectNoun={objectNoun} />
      </Sequence>

      {/* SCENE 4: Comparison & Summary (420 - 540 frames, ~4.0s) */}
      <Sequence from={420} durationInFrames={120}>
        <SceneComparison baseVerb={baseVerb} objectNoun={objectNoun} />
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

  // Snappy, engaging spring physics for Instagram Reel pace
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  const verbRuleEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const pronounsEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const sentenceEntrance = spring({
    frame: frame - 42,
    fps,
    config: { damping: 10, mass: 0.8 },
  });

  const exitOpacity = interpolate(frame, [115, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "160px 80px 180px 80px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Top Header inside Paper Cutout Badge with dynamic tilt & scale */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [45, 0])}px) scale(${interpolate(headerEntrance, [0, 1], [0.9, 1])})`,
          marginBottom: "140px",
        }}
      >
        <PaperCutoutBadge rotation={-0.8} style={{ padding: "16px 42px" }}>
          <h2
            style={{
              fontFamily: cairoFont,
              fontSize: "74px",
              fontWeight: 800,
              color: "#1E1B18",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            ضمائر المتكلم والمخاطب
          </h2>
        </PaperCutoutBadge>
      </div>

      {/* Middle Grid: Left has verb rule + verb, Right has pronouns */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 40px",
          boxSizing: "border-box",
          marginBottom: "240px",
        }}
      >
        {/* Left: Paper Badge Note + Bold Editorial Verb */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: verbRuleEntrance,
            transform: `translateY(${interpolate(verbRuleEntrance, [0, 1], [35, 0])}px) scale(${interpolate(verbRuleEntrance, [0, 1], [0.92, 1])})`,
            gap: "22px",
          }}
        >
          <PaperCutoutBadge rotation={1.4} style={{ padding: "10px 30px" }}>
            <span
              style={{
                fontFamily: cairoFont,
                fontSize: "48px",
                fontWeight: 800,
                color: "#544E47",
                direction: "rtl",
              }}
            >
              فعل مجرد
            </span>
          </PaperCutoutBadge>

          <span
            style={{
              fontFamily: editorialSerif,
              fontSize: "118px",
              fontWeight: 800,
              color: "#1E1B18",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 8px rgba(30, 27, 24, 0.08)",
            }}
          >
            {verb}
          </span>
        </div>

        {/* Right: Pronouns (I, You) Hero Editorial Bold */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            opacity: pronounsEntrance,
            transform: `translateY(${interpolate(pronounsEntrance, [0, 1], [35, 0])}px) scale(${interpolate(pronounsEntrance, [0, 1], [0.92, 1])})`,
          }}
        >
          {pronouns.map((p) => (
            <span
              key={p}
              style={{
                fontFamily: editorialSerif,
                fontSize: "122px",
                fontWeight: 800,
                color: "#1E1B18",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 8px rgba(30, 27, 24, 0.08)",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Hero Sentence (Instagram Reel Hero Typography) */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          opacity: sentenceEntrance,
          transform: `scale(${interpolate(sentenceEntrance, [0, 1], [0.88, 1])}) translateY(${interpolate(sentenceEntrance, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: editorialSerif,
            fontSize: "128px",
            fontWeight: 800,
            color: "#1E1B18",
            letterSpacing: "-0.02em",
            textShadow: "0 3px 12px rgba(30, 27, 24, 0.1)",
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
    config: { damping: 12, mass: 0.75 },
  });

  const pronounsEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const sentenceEntrance = spring({
    frame: frame - 28,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  // Snappy spring for the letter 's' with punchy bounce and overshoot
  const sSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 9, mass: 0.6 },
  });

  const exitOpacity = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "160px 80px 180px 80px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Arabic Header with Paper Cutout Badge */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [45, 0])}px) scale(${interpolate(headerEntrance, [0, 1], [0.9, 1])})`,
          marginBottom: "140px",
        }}
      >
        <PaperCutoutBadge rotation={0.6} style={{ padding: "16px 42px" }}>
          <h2
            style={{
              fontFamily: cairoFont,
              fontSize: "74px",
              fontWeight: 800,
              color: "#1E1B18",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            الغائب المفرد
          </h2>
        </PaperCutoutBadge>
      </div>

      {/* Right-aligned Pronouns (He, She) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "50px",
          boxSizing: "border-box",
          marginBottom: "260px",
          opacity: pronounsEntrance,
          transform: `translateY(${interpolate(pronounsEntrance, [0, 1], [35, 0])}px) scale(${interpolate(pronounsEntrance, [0, 1], [0.92, 1])})`,
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
                fontFamily: editorialSerif,
                fontSize: "122px",
                fontWeight: 800,
                color: "#1E1B18",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 8px rgba(30, 27, 24, 0.08)",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Center Hero Sentence: He drink -> He drinks coffee */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          opacity: sentenceEntrance,
          transform: `translateY(${interpolate(sentenceEntrance, [0, 1], [40, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: editorialSerif,
            fontSize: "128px",
            fontWeight: 800,
            color: "#1E1B18",
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "center",
            textShadow: "0 3px 12px rgba(30, 27, 24, 0.1)",
          }}
        >
          <span>{pronouns[0]}&nbsp;</span>
          <span>{baseVerb}</span>

          {/* Smoothly Eased Vibrant Crimson 's' with punchy pop animation */}
          <span
            style={{
              color: "#D93838",
              fontWeight: 900,
              display: "inline-block",
              opacity: sSpring,
              transform: `scale(${interpolate(sSpring, [0, 1], [0, 1])}) translateY(${interpolate(sSpring, [0, 1], [-45, 0])}px)`,
              transformOrigin: "center bottom",
              textShadow: "0 4px 18px rgba(217, 56, 56, 0.35)",
              filter:
                sSpring > 0.1
                  ? `drop-shadow(0 0 ${interpolate(sSpring, [0, 0.7, 1], [0, 14, 2])}px rgba(217, 56, 56, 0.45))`
                  : undefined,
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
   SCENE 3: NEGATION, DOESN'T, ORGANIC SCRIBBLE, & DETACHING 's'
   ========================================================================= */
const SceneNegation: React.FC<{
  baseVerb: string;
  objectNoun: string;
}> = ({ baseVerb, objectNoun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Initial sentence "He not drinks coffee." enters smoothly
  const initialEntrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  // Phase 2 (frame 28 - 50): Authentic hand-drawn multi-stroke scribble draws across "not"
  const scribbleProgress = interpolate(frame, [28, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3 (frame 52 - 85): Snappy spring insertion of "doesn't"
  // Spring eases "doesn't" in while expanding space smoothly between "He" and "drink"
  const insertionSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  // Phase 4 (frame 85 - 120): The 's' detaches from "drinks", lifts upward, floats away & dissolves
  const sDetachSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const exitOpacity = interpolate(frame, [140, 155], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculations for insertion and detachment
  const notFadeOut = interpolate(frame, [52, 66], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // S float and dissolve values
  const sOpacity = interpolate(sDetachSpring, [0, 0.85, 1], [1, 0.7, 0]);
  const sTranslateY = interpolate(sDetachSpring, [0, 1], [0, -65]);
  const sTranslateX = interpolate(sDetachSpring, [0, 1], [0, 36]);
  const sRotation = interpolate(sDetachSpring, [0, 1], [0, 32]);
  const sScale = interpolate(sDetachSpring, [0, 1], [1, 0.25]);
  // Collapsing the space of 's' so 'coffee.' smoothly settles next to 'drink.'
  const sSlotWidth = interpolate(sDetachSpring, [0, 1], [46, 0]);

  // "doesn't" width expansion for seamless ease-out push of words (sized for 124px bold serif)
  const doesntWidth = interpolate(insertionSpring, [0, 1], [0, 420]);
  const showDoesnt = frame >= 52;

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "160px 80px 180px 80px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: initialEntrance,
          transform: `translateY(${interpolate(initialEntrance, [0, 1], [40, 0])}px)`,
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Main Hero Sentence (Scale 124px, Bold Editorial Serif, Rich Charcoal #1E1B18) */}
        <div
          style={{
            fontFamily: editorialSerif,
            fontSize: "124px",
            fontWeight: 800,
            color: "#1E1B18",
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "center",
            position: "relative",
            width: "100%",
            textShadow: "0 3px 12px rgba(30, 27, 24, 0.1)",
          }}
        >
          {/* "He" with smooth ease-out shifting */}
          <span style={{ display: "inline-block" }}>He</span>

          {/* DYNAMIC SLOT: "not" (with organic scribble) OR "doesn't" (Vibrant Electric Blue #2563EB) */}
          {!showDoesnt ? (
            <span
              style={{
                position: "relative",
                display: "inline-block",
                margin: "0 28px",
              }}
            >
              <span>not</span>

              {/* Hand-drawn organic ink scribble (3 overlapping energetic strokes) */}
              {scribbleProgress > 0 && (
                <svg
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-18px",
                    width: "calc(100% + 36px)",
                    height: "72px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    overflow: "visible",
                  }}
                  viewBox="0 0 120 40"
                >
                  <path
                    d="M 6,28 Q 32,12 65,24 T 114,10"
                    fill="none"
                    stroke="#D93838"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="140"
                    strokeDashoffset={140 * (1 - scribbleProgress)}
                  />
                  <path
                    d="M 112,26 Q 80,36 48,15 T 8,28"
                    fill="none"
                    stroke="#D93838"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="140"
                    strokeDashoffset={140 * (1 - scribbleProgress)}
                  />
                  <path
                    d="M 18,10 Q 56,22 104,26"
                    fill="none"
                    stroke="#D93838"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="120"
                    strokeDashoffset={120 * (1 - scribbleProgress)}
                  />
                </svg>
              )}
            </span>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                overflow: "hidden",
                width: `${doesntWidth}px`,
                opacity: insertionSpring,
                margin: "0 10px",
                justifyContent: "center",
              }}
            >
              {/* "not" fading out quickly */}
              {notFadeOut > 0.05 && (
                <span
                  style={{
                    position: "absolute",
                    opacity: notFadeOut,
                    color: "#1E1B18",
                  }}
                >
                  not
                </span>
              )}

              {/* "doesn't" entering with vibrant electric blue */}
              <span
                style={{
                  color: "#2563EB",
                  fontWeight: 900,
                  transform: `scale(${interpolate(insertionSpring, [0, 1], [0.82, 1])})`,
                  transformOrigin: "center baseline",
                  whiteSpace: "nowrap",
                  textShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
                  padding: "0 16px",
                }}
              >
                doesn't
              </span>
            </span>
          )}

          {/* "drink" (sliding smoothly to the right to make room) */}
          <span style={{ display: "inline-block", marginLeft: "16px" }}>
            {baseVerb}
          </span>

          {/* VISUAL DETACHING 's' (lifts off, floats away & dissolves) */}
          <span
            style={{
              display: "inline-block",
              width: `${sSlotWidth}px`,
              position: "relative",
              verticalAlign: "baseline",
            }}
          >
            <span
              style={{
                color: "#D93838",
                fontWeight: 900,
                display: "inline-block",
                opacity: sOpacity,
                transform: `translate(${sTranslateX}px, ${sTranslateY}px) rotate(${sRotation}deg) scale(${sScale})`,
                transformOrigin: "center center",
                textShadow: "0 4px 16px rgba(217, 56, 56, 0.35)",
              }}
            >
              s
            </span>
          </span>

          {/* " coffee." */}
          <span style={{ display: "inline-block", marginLeft: "12px" }}>
            {objectNoun}
          </span>
        </div>

        {/* Paper-Cutout Badge Note below with prominent contrast & size */}
        <div
          style={{
            marginTop: "110px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {frame < 80 ? (
            <PaperCutoutBadge
              rotation={-0.6}
              style={{
                opacity: spring({
                  frame: frame - 25,
                  fps,
                  config: { damping: 12, mass: 0.75 },
                }),
                borderColor: "rgba(217, 56, 56, 0.35)",
                padding: "18px 44px",
              }}
            >
              <span
                style={{
                  fontFamily: cairoFont,
                  fontSize: "48px",
                  color: "#D93838",
                  fontWeight: 800,
                  direction: "rtl",
                  letterSpacing: "-0.01em",
                }}
              >
                ❌ لا يمكن إضافة not بجانب الفعل مباشرة
              </span>
            </PaperCutoutBadge>
          ) : (
            <PaperCutoutBadge
              rotation={0.8}
              style={{
                opacity: spring({
                  frame: frame - 78,
                  fps,
                  config: { damping: 12, mass: 0.75 },
                }),
                borderColor: "rgba(37, 99, 235, 0.35)",
                padding: "18px 44px",
              }}
            >
              <span
                style={{
                  fontFamily: cairoFont,
                  fontSize: "48px",
                  color: "#2563EB",
                  fontWeight: 800,
                  direction: "rtl",
                  letterSpacing: "-0.01em",
                }}
              >
                ✨ تُسحب الـ (s) ويعود الفعل لشكله المجرّد
              </span>
            </PaperCutoutBadge>
          )}
        </div>
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
    config: { damping: 12, mass: 0.75 },
  });

  const line1Entrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const line2Entrance = spring({
    frame: frame - 28,
    fps,
    config: { damping: 11, mass: 0.75 },
  });

  const footerEntrance = spring({
    frame: frame - 48,
    fps,
    config: { damping: 12, mass: 0.75 },
  });

  return (
    <AbsoluteFill
      style={{
        padding: "160px 80px 180px 80px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Top Header inside Paper Cutout Badge */}
      <div
        style={{
          width: "100%",
          textAlign: "right",
          direction: "rtl",
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [45, 0])}px) scale(${interpolate(headerEntrance, [0, 1], [0.9, 1])})`,
          marginBottom: "130px",
        }}
      >
        <PaperCutoutBadge rotation={-0.6} style={{ padding: "16px 44px" }}>
          <h2
            style={{
              fontFamily: cairoFont,
              fontSize: "76px",
              fontWeight: 800,
              color: "#1E1B18",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            مقارنة
          </h2>
        </PaperCutoutBadge>
      </div>

      {/* Comparison Sentences Centered (Scale: 116px Bold Editorial Serif) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "80px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: "90px",
        }}
      >
        {/* Line 1: He drinks coffee. (Positive) */}
        <div
          style={{
            opacity: line1Entrance,
            transform: `scale(${interpolate(line1Entrance, [0, 1], [0.9, 1])}) translateY(${interpolate(line1Entrance, [0, 1], [35, 0])}px)`,
            fontFamily: editorialSerif,
            fontSize: "116px",
            fontWeight: 800,
            color: "#1E1B18",
            letterSpacing: "-0.02em",
            textShadow: "0 3px 12px rgba(30, 27, 24, 0.1)",
          }}
        >
          <span>He {baseVerb}</span>
          <span
            style={{
              color: "#D93838",
              fontWeight: 900,
              textShadow: "0 3px 14px rgba(217, 56, 56, 0.35)",
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
            transform: `scale(${interpolate(line2Entrance, [0, 1], [0.9, 1])}) translateY(${interpolate(line2Entrance, [0, 1], [35, 0])}px)`,
            fontFamily: editorialSerif,
            fontSize: "116px",
            fontWeight: 800,
            color: "#1E1B18",
            letterSpacing: "-0.02em",
            textShadow: "0 3px 12px rgba(30, 27, 24, 0.1)",
          }}
        >
          <span>He </span>
          <span
            style={{
              color: "#2563EB",
              fontWeight: 900,
              textShadow: "0 3px 16px rgba(37, 99, 235, 0.35)",
            }}
          >
            doesn't
          </span>
          <span> {baseVerb} {objectNoun}</span>
        </div>
      </div>

      {/* Footer Banner: عادات وروتين inside Paper Cutout Badge */}
      <div
        style={{
          marginTop: "auto",
          width: "100%",
          textAlign: "center",
          direction: "rtl",
          opacity: footerEntrance,
          transform: `translateY(${interpolate(footerEntrance, [0, 1], [30, 0])}px) scale(${interpolate(footerEntrance, [0, 1], [0.92, 1])})`,
        }}
      >
        <PaperCutoutBadge rotation={0.4} style={{ padding: "18px 54px" }}>
          <span
            style={{
              fontFamily: cairoFont,
              fontSize: "58px",
              fontWeight: 800,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            عادات وروتين
          </span>
        </PaperCutoutBadge>
      </div>
    </AbsoluteFill>
  );
};
