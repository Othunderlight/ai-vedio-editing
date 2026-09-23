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
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["800", "900"],
});

const { fontFamily: spaceGroteskFont } = loadSpaceGrotesk("normal", {
  subsets: ["latin"],
  weights: ["700"],
});

export interface PresentContinuousNeoBrutalismReelProps {
  primaryBg?: string; // e.g. #FFE600 (Pastel / Vivid Yellow)
  accentColor?: string; // e.g. #00F0FF (Cyan)
  showCaptions?: boolean;
}

// Subtitles synchronized with voiceover for Present Continuous in 1 minute
export const PRESENT_CONTINUOUS_CAPTIONS = [
  // 00:00 – 00:04
  {
    fromFrame: 0,
    toFrame: 120,
    text: "هل من الممكن تفهم الـ Present Continuous بأقل من دقيقة؟",
  },

  // 00:04 – 00:06
  {
    fromFrame: 120,
    toFrame: 180,
    text: "خلينا نشوف سوا.",
  },

  // 00:06 – 00:13
  {
    fromFrame: 180,
    toFrame: 390,
    text: "التركيب بسيط كتير: am أو is أو are زائد الفعل ومعه ing.",
  },

  // 00:13 – 00:16
  {
    fromFrame: 390,
    toFrame: 480,
    text: "بالإيجاب: He is studying French now.",
  },

  // 00:16 – 00:20
  {
    fromFrame: 480,
    toFrame: 600,
    text: "بالنفي: He is not studying French now.",
  },

  // 00:20 – 00:23
  {
    fromFrame: 600,
    toFrame: 690,
    text: "وبالسؤال: Is he studying French now?",
  },

  // 00:23 – 00:30
  {
    fromFrame: 690,
    toFrame: 900,
    text: "طيب، أيمتى بنستخدمه؟ رقم واحد: لحدث عم يصير هلق بهاللحظة: I'm waiting for my friends.",
  },

  // 00:30 – 00:36
  {
    fromFrame: 900,
    toFrame: 1080,
    text: "تنين: لموقف مؤقت: He's studying really hard for his exams.",
  },

  // 00:36 – 00:43
  {
    fromFrame: 1080,
    toFrame: 1290,
    text: "تلاتة: لتغيير عام أو ترند عم يصير: The price of petrol is rising dramatically.",
  },

  // 00:43 – 00:50
  {
    fromFrame: 1290,
    toFrame: 1500,
    text: "وأربعة: للشكوى من عادة بتضايقنا ومستمرة: My roommate is always throwing his clothes on the floor!",
  },

  // 00:50 – 01:01
  {
    fromFrame: 1500,
    toFrame: 1830,
    text: "بس انتبه لسر مهم: الأفعال التي تعبر عن الحالة أو الـ stative verbs مثل prefer أو own أو know ما بتاخد ing أبداً.",
  },

  // 01:01 – 01:06
  {
    fromFrame: 1830,
    toFrame: 1980,
    text: "اكتب كلمة ملخص بالتعليقات لأبعتلك الـ cheat sheet مجاناً.",
  },

  // 01:06 – 01:10
  {
    fromFrame: 1980,
    toFrame: 2100,
    text: "وتابعني لتتعلم قواعد تانية بدقيقة واحدة.",
  },
];

export const PresentContinuousNeoBrutalismReel: React.FC<
  PresentContinuousNeoBrutalismReelProps
> = ({ primaryBg = "#FFE600", showCaptions = true }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);

  // Current active caption
  const activeCaption = PRESENT_CONTINUOUS_CAPTIONS.find(
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
      {/* Main Voiceover Audio */}
      <Audio
        src={staticFile(
          "projects/english-tutorials-instegram/raw/present-continous.wav"
        )}
      />

      {/* SFX – Scene Transitions & Key Moments */}
      <Sequence from={5}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/fast-whoosh.wav")}
          volume={0.2}
        />
      </Sequence>
      <Sequence from={180}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/deep-whoosh.wav")}
          volume={0.16}
        />
      </Sequence>
      <Sequence from={390}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/pop-hand.wav")}
          volume={0.2}
        />
      </Sequence>
      <Sequence from={480}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/pop-hand.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={600}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/pop-hand.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={690}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/swish-whoosh-large.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={900}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/fast-whoosh.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={1080}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/fast-whoosh.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={1290}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/swish-whoosh-large.wav")}
          volume={0.18}
        />
      </Sequence>
      <Sequence from={1500}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/fast-whoosh.wav")}
          volume={0.22}
        />
      </Sequence>
      <Sequence from={1830}>
        <Audio
          src={staticFile("assets/sounds/sfx/waven-sfx/notification-ding.wav")}
          volume={0.2}
        />
      </Sequence>

      {/* Background Neo-Brutalist Dot Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#000000 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.12,
        }}
      />

      {/* Brutalist Top Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: "105px",
          left: "60px",
          right: "60px",
          height: "30px",
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "6px 6px 0px #000000",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: "#00F0FF",
            borderRight: "4.5px solid #000000",
          }}
        />
      </div>

      {/* =========================================================================
          SCENE 1: HOOK & TITLE (0:00 - 0:06 | frames 0 - 180)
          ========================================================================= */}
      {frame < 180 && <PCScene1Hook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: STRUCTURE (+, –, ?) (0:06 - 0:23 | frames 180 - 690)
          ========================================================================= */}
      {frame >= 180 && frame < 690 && (
        <PCScene2Structure frame={frame - 180} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: USE 1: HAPPENING RIGHT NOW + CURVED TIMELINE (0:23 - 0:30 | frames 690 - 900)
          ========================================================================= */}
      {frame >= 690 && frame < 900 && (
        <PCScene3HappeningNow frame={frame - 690} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 2: TEMPORARY SITUATIONS (0:30 - 0:36 | frames 900 - 1080)
          ========================================================================= */}
      {frame >= 900 && frame < 1080 && (
        <PCScene4Temporary frame={frame - 900} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 3: CHANGING TRENDS (0:36 - 0:43 | frames 1080 - 1290)
          ========================================================================= */}
      {frame >= 1080 && frame < 1290 && (
        <PCScene5Trends frame={frame - 1080} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 4: ANNOYING HABITS (CRITICISM) (0:43 - 0:50 | frames 1290 - 1500)
          ========================================================================= */}
      {frame >= 1290 && frame < 1500 && (
        <PCScene6AnnoyingHabits frame={frame - 1290} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: WARNING CARD (STATE VERBS!) (0:50 - 01:01 | frames 1500 - 1830)
          ========================================================================= */}
      {frame >= 1500 && frame < 1830 && (
        <PCScene7StateVerbsWarning frame={frame - 1500} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (01:01 - 01:10 | frames 1830 - 2100)
          ========================================================================= */}
      {frame >= 1830 && <PCScene8CTA frame={frame - 1830} fps={fps} />}

      {/* =========================================================================
          BOTTOM NEO-BRUTALIST CAPTION BAR
          ========================================================================= */}
      {showCaptions && activeCaption && (
        <div
          style={{
            position: "absolute",
            bottom: "290px",
            left: "45px",
            right: "45px",
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "5px solid #000000",
              boxShadow: "9px 9px 0px #000000",
              padding: "18px 28px",
              textAlign: "center",
            }}
          >
            <div
              dir="auto"
              style={{
                fontSize: "33px",
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

export interface PCSceneProps {
  frame?: number;
  fps?: number;
}

/* =========================================================================
   SCENE 1: NEO-BRUTALIST HOOK & TITLE (0:00 - 0:06 | 180 frames)
   ========================================================================= */
export const PCScene1Hook: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const popIn = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 8, stiffness: 200 },
  });

  const badgeRotate = interpolate(frame, [0, 30], [-4, 2], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "90px",
      }}
    >
      {/* Main Chunky Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "9px solid #000000",
          boxShadow: "21px 21px 0px #000000",
          padding: "75px 60px",
          textAlign: "center",
          maxWidth: "1440px",
          transform: `scale(${popIn})`,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "inline-block",
            backgroundColor: "#FFE600",
            border: "4.5px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            padding: "9px 30px",
            fontSize: "36px",
            fontWeight: 900,
            textTransform: "uppercase",
            marginBottom: "24px",
            transform: `rotate(${badgeRotate}deg)`,
          }}
        >
          ⏱️ في دقيقة واحدة
        </div>

        <h1
          style={{
            fontFamily: montserratFont,
            fontSize: "108px",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "20px 0 32px 0",
            textTransform: "uppercase",
          }}
        >
          PRESENT
          <br />
          <span
            style={{
              backgroundColor: "#00F0FF",
              border: "6px solid #000000",
              boxShadow: "9px 9px 0px #000000",
              padding: "6px 28px",
              display: "inline-block",
              transform: "rotate(1.5deg)",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            CONTINUOUS
          </span>
          <br />
          <span dir="auto" style={{ fontSize: "96px" }}>
            المضارع المستمر ⏱️
          </span>
        </h1>

        <div
          dir="auto"
          style={{
            backgroundColor: "#55EFC4",
            border: "5px solid #000000",
            boxShadow: "7.5px 7.5px 0px #000000",
            padding: "15px 36px",
            fontSize: "38px",
            fontWeight: 900,
            display: "inline-block",
            marginTop: "15px",
          }}
        >
          قواعد وأمثلة واستخدامات بسهولة ⚡
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 2: STRUCTURE CARD (+, –, ?) (0:06 - 0:23 | 510 frames)
   ========================================================================= */
export const PCScene2Structure: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop1 = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Positive card pops at speech frame 390 (local frame 210)
  const popPos = spring({
    frame: frame - 210,
    fps,
    config: { mass: 0.5, damping: 8 },
  });

  // Negative card pops at speech frame 480 (local frame 300)
  const popNeg = spring({
    frame: frame - 300,
    fps,
    config: { mass: 0.5, damping: 8 },
  });

  // Question card pops at speech frame 600 (local frame 420)
  const popQ = spring({
    frame: frame - 420,
    fps,
    config: { mass: 0.5, damping: 8 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "42px",
      }}
    >
      {/* Header Tag */}
      <div
        dir="auto"
        style={{
          display: "inline-block",
          alignSelf: "flex-end",
          backgroundColor: "#55EFC4",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          transform: `scale(${pop1}) rotate(-1.5deg)`,
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        (+) (–) (?) قاعدة التركيب (Structure)
      </div>

      {/* Formula Box */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "36px 45px",
          transform: `scale(${pop1})`,
        }}
      >
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span>Subject +</span>
          <span
            style={{
              backgroundColor: "#FFE600",
              border: "4.5px solid #000000",
              padding: "4px 21px",
              boxShadow: "6px 6px 0px #000000",
            }}
          >
            am / is / are
          </span>
          <span>+</span>
          <span
            style={{
              backgroundColor: "#A29BFE",
              border: "4.5px solid #000000",
              padding: "4px 21px",
              boxShadow: "6px 6px 0px #000000",
            }}
          >
            V-ing
          </span>
        </div>

        {/* Pronoun Rule Pills */}
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            marginTop: "24px",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#E0F2FE",
              border: "3.5px solid #000000",
              padding: "8px 18px",
              fontSize: "26px",
              fontWeight: 800,
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            I ➔ <strong>am</strong>
          </div>
          <div
            style={{
              backgroundColor: "#FFEAA7",
              border: "3.5px solid #000000",
              padding: "8px 18px",
              fontSize: "26px",
              fontWeight: 800,
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            He / She / It ➔ <strong>is</strong>
          </div>
          <div
            style={{
              backgroundColor: "#DFF9FB",
              border: "3.5px solid #000000",
              padding: "8px 18px",
              fontSize: "26px",
              fontWeight: 800,
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            We / They / You ➔ <strong>are</strong>
          </div>
        </div>
      </div>

      {/* Example 1: (+) Positive */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "26px 36px",
          fontSize: "46px",
          fontWeight: 900,
          transform: `scale(${popPos})`,
          opacity: popPos,
        }}
      >
        <span
          style={{
            backgroundColor: "#55EFC4",
            border: "3px solid #000000",
            padding: "2px 14px",
            marginRight: "15px",
            fontSize: "36px",
          }}
        >
          (+)
        </span>
        👉 He{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          is
        </span>{" "}
        study
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          ing
        </span>{" "}
        French <span style={{ color: "#0984E3" }}>now</span>.
      </div>

      {/* Example 2: (–) Negative */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "26px 36px",
          fontSize: "46px",
          fontWeight: 900,
          transform: `scale(${popNeg})`,
          opacity: popNeg,
        }}
      >
        <span
          style={{
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3px solid #000000",
            padding: "2px 14px",
            marginRight: "15px",
            fontSize: "36px",
          }}
        >
          (–)
        </span>
        👉 He{" "}
        <span
          style={{
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          is not
        </span>{" "}
        study
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          ing
        </span>{" "}
        French now.
      </div>

      {/* Example 3: (?) Question */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "26px 36px",
          fontSize: "46px",
          fontWeight: 900,
          transform: `scale(${popQ})`,
          opacity: popQ,
        }}
      >
        <span
          style={{
            backgroundColor: "#74B9FF",
            border: "3px solid #000000",
            padding: "2px 14px",
            marginRight: "15px",
            fontSize: "36px",
          }}
        >
          (?)
        </span>
        👉{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          Is
        </span>{" "}
        he study
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "0 12px",
          }}
        >
          ing
        </span>{" "}
        French now<span style={{ color: "#D63031" }}>?</span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 3: USE 1 - HAPPENING RIGHT NOW + CURVED TIMELINE (0:23 - 0:30 | 210 frames)
   ========================================================================= */
export const PCScene3HappeningNow: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Timeline curve drawing progress
  const curveDraw = interpolate(frame, [15, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Beacon pulse
  const beaconPulse = 1 + Math.sin(frame / 4) * 0.15;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "42px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#00F0FF",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(-2deg)`,
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        الاستخدام 1: حدث يحدث الآن (Happening Now)
      </div>

      {/* Brutalist Curved Timeline Board */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "42px 42px",
          transform: `scale(${pop})`,
        }}
      >
        <div
          dir="auto"
          style={{
            fontSize: "36px",
            fontWeight: 900,
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <span dir="auto">الماضي (Past)</span>
          <span
            dir="auto"
            style={{
              backgroundColor: "#FFE600",
              padding: "4px 21px",
              border: "3.5px solid #000",
              boxShadow: "4px 4px 0px #000",
            }}
          >
            الحاضر (NOW)
          </span>
          <span dir="auto">المستقبل (Future)</span>
        </div>

        {/* The Animated Curved Timeline Diagram */}
        <div
          style={{
            position: "relative",
            height: "170px",
            marginBottom: "20px",
          }}
        >
          {/* Main Axis Line */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "20px",
              right: "20px",
              height: "10px",
              backgroundColor: "#000000",
            }}
          />

          {/* Key Axis Nodes */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "15%",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#A29BFE",
              border: "4px solid #000",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "22px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              backgroundColor: "#FFE600",
              border: "5px solid #000",
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30px",
              right: "15%",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#74B9FF",
              border: "4px solid #000",
            }}
          />

          {/* SVG Animated Under-Curve: starts in Past, peaks at NOW, might continue */}
          <svg
            width="100%"
            height="150"
            viewBox="0 0 800 150"
            style={{ position: "absolute", top: "40px", left: 0 }}
          >
            {/* The curved path connecting Past -> Now -> Future */}
            <path
              d="M 120 0 C 260 110, 360 110, 400 0 C 440 110, 540 110, 680 0"
              fill="none"
              stroke="#000000"
              strokeWidth="8"
              strokeDasharray="14 10"
            />
            {/* Animated Solid Curve for current ongoing action */}
            <path
              d="M 120 0 Q 300 130, 400 0"
              fill="none"
              stroke="#55EFC4"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - curveDraw)}
            />
          </svg>

          {/* Pulsing LIVE NOW Indicator Badge */}
          <div
            dir="auto"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: `translateX(-50%) scale(${beaconPulse})`,
              backgroundColor: "#FF7675",
              color: "#FFFFFF",
              border: "3.5px solid #000000",
              boxShadow: "4.5px 4.5px 0px #000000",
              padding: "6px 20px",
              fontSize: "27px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
              }}
            />
            عم يصير هلق بهاللحظة!
          </div>
        </div>

        <div
          dir="auto"
          style={{
            fontSize: "30px",
            fontWeight: 800,
            textAlign: "right",
            color: "#2D3436",
            borderTop: "3.5px dashed #000000",
            paddingTop: "16px",
          }}
        >
          حدث بدأ في الماضي، مستمر <strong>الآن</strong>، وقد يستمر للمستقبل.
        </div>
      </div>

      {/* Visual illustration: Waiting friends with watch */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#E0F2FE",
            border: "5px solid #000000",
            boxShadow: "7.5px 7.5px 0px #000000",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              backgroundColor: "#FFE600",
              border: "3.5px solid #000",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⏳
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 900 }}>
              Live Stopwatch
            </div>
            <div
              dir="auto"
              style={{ fontSize: "24px", fontWeight: 700, color: "#636E72" }}
            >
              عم ينتظر أصدقاؤه بالشارع
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#55EFC4",
            border: "5px solid #000000",
            boxShadow: "7.5px 7.5px 0px #000000",
            padding: "20px 28px",
            fontSize: "30px",
            fontWeight: 900,
          }}
        >
          ⚡ Right now!
        </div>
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "32px 38px",
          fontSize: "48px",
          fontWeight: 900,
        }}
      >
        👉 <span style={{ color: "#0984E3" }}>I'm</span>{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "2px 14px",
          }}
        >
          waiting
        </span>{" "}
        for my friends.
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 4: USE 2 - TEMPORARY SITUATIONS (0:30 - 0:36 | 180 frames)
   ========================================================================= */
export const PCScene4Temporary: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Floating coffee steam
  const steamY = (frame * 2) % 30;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "42px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#A29BFE",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(1.5deg)`,
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        الاستخدام 2: مواقف مؤقتة (Temporary)
      </div>

      {/* Study Desk Graphic Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "38px 42px",
          transform: `scale(${pop})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Textbook Stack Neo-Brutalist Illustration */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "44px",
              backgroundColor: "#FF7675",
              border: "4.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 900,
              color: "#FFFFFF",
              transform: "rotate(-2deg)",
            }}
          >
            FRENCH B2 📖
          </div>
          <div
            style={{
              width: "240px",
              height: "48px",
              backgroundColor: "#55EFC4",
              border: "4.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 900,
              marginTop: "-6px",
              transform: "rotate(1deg)",
            }}
          >
            GRAMMAR EXAMS 📚
          </div>
          <div
            style={{
              width: "260px",
              height: "52px",
              backgroundColor: "#74B9FF",
              border: "4.5px solid #000000",
              boxShadow: "5px 5px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "25px",
              fontWeight: 900,
              marginTop: "-6px",
            }}
          >
            LAW & HISTORY 📝
          </div>
        </div>

        {/* Exam Period & Coffee Tag */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "flex-end",
          }}
        >
          <div
            dir="auto"
            style={{
              backgroundColor: "#FFE600",
              border: "4.5px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              padding: "12px 24px",
              fontSize: "30px",
              fontWeight: 900,
              textAlign: "right",
            }}
          >
            📅 أسبوع الامتحانات فقط!
          </div>

          <div
            dir="auto"
            style={{
              backgroundColor: "#DFE6E9",
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "8px 18px",
              fontSize: "26px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>☕ قهوة ودراسة مكثفة</span>
            <span style={{ transform: `translateY(-${steamY * 0.2}px)` }}>
              ♨️
            </span>
          </div>

          <div
            dir="auto"
            style={{
              backgroundColor: "#55EFC4",
              border: "3.5px solid #000000",
              padding: "6px 16px",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            💡 مو دائم، حالة مؤقتة تنتهي قريباً
          </div>
        </div>
      </div>

      {/* Temporary Badge Pill */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div
          style={{
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "4px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            padding: "10px 22px",
            fontSize: "28px",
            fontWeight: 900,
          }}
        >
          ⏳ TEMPORARY
        </div>
        <div
          dir="auto"
          style={{
            backgroundColor: "#FFFFFF",
            border: "4px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            padding: "10px 22px",
            fontSize: "28px",
            fontWeight: 900,
          }}
        >
          مو عادة دائمة • لفترة الامتحانات بس
        </div>
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "32px 38px",
          fontSize: "46px",
          fontWeight: 900,
          lineHeight: 1.35,
        }}
      >
        👉 He's{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "2px 14px",
          }}
        >
          studying
        </span>{" "}
        really hard for his{" "}
        <span
          style={{
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3.5px solid #000000",
            padding: "2px 14px",
          }}
        >
          exams
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 5: USE 3 - CHANGING TRENDS (0:36 - 0:43 | 210 frames)
   ========================================================================= */
export const PCScene5Trends: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Petrol price rising counter simulation
  const petrolPrice = interpolate(frame, [0, 150], [1.35, 3.45], {
    extrapolateRight: "clamp",
  });

  const arrowY = Math.sin(frame / 3) * 6;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "42px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#55EFC4",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(-1.5deg)`,
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        الاستخدام 3: تغيرات عامة وتريند (Changing Trends)
      </div>

      {/* Neo-brutalist Rising Trends & Gas Station Board */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "36px 42px",
          transform: `scale(${pop})`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Gas Pump Icon & Price Counter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: "#FF7675",
                  border: "4.5px solid #000000",
                  boxShadow: "5px 5px 0px #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "52px",
                }}
              >
                ⛽
              </div>
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                  }}
                >
                  Petrol / Gas Price
                </div>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 900,
                    color: "#D63031",
                    fontFamily: montserratFont,
                  }}
                >
                  ${petrolPrice.toFixed(2)}
                  <span style={{ fontSize: "24px", color: "#000" }}>/L</span>
                </div>
              </div>
            </div>

            <div
              dir="auto"
              style={{
                backgroundColor: "#FFE600",
                border: "3.5px solid #000000",
                padding: "6px 15px",
                fontSize: "24px",
                fontWeight: 900,
                textAlign: "right",
              }}
            >
              📈 أسعار الوقود عم ترتفع بشكل حاد!
            </div>
          </div>

          {/* Neo-Brutalist Rising Chart SVG */}
          <div
            style={{
              width: "280px",
              height: "170px",
              backgroundColor: "#2D3436",
              border: "5px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              padding: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(#4A4B4D 1px, transparent 1px), linear-gradient(90deg, #4A4B4D 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                opacity: 0.4,
              }}
            />

            {/* Rising Polyline */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 260 150"
              style={{ position: "relative", zIndex: 5 }}
            >
              <polyline
                fill="none"
                stroke="#55EFC4"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10,130 60,110 110,115 160,70 210,50 250,15"
              />
              <circle
                cx="250"
                cy="15"
                r="8"
                fill="#FFE600"
                stroke="#000"
                strokeWidth="3"
              />
            </svg>

            {/* Floating Rocket indicator */}
            <div
              style={{
                position: "absolute",
                top: `${12 + arrowY}px`,
                right: "15px",
                fontSize: "32px",
                zIndex: 10,
              }}
            >
              🚀
            </div>
          </div>
        </div>
      </div>

      {/* Trend Keyword Badges */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {["rising", "changing", "increasing", "getting hotter"].map((kw, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#E0F2FE",
              border: "4px solid #000000",
              boxShadow: "5px 5px 0px #000000",
              padding: "10px 22px",
              fontSize: "30px",
              fontWeight: 900,
            }}
          >
            📈 {kw}
          </div>
        ))}
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "32px 38px",
          fontSize: "44px",
          fontWeight: 900,
          lineHeight: 1.35,
        }}
      >
        👉 The price of petrol{" "}
        <span
          style={{
            backgroundColor: "#55EFC4",
            border: "3.5px solid #000000",
            padding: "2px 12px",
          }}
        >
          is rising
        </span>{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "2px 12px",
          }}
        >
          dramatically
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 6: USE 4 - ANNOYING HABITS (CRITICISM) (0:43 - 0:50 | 210 frames)
   ========================================================================= */
export const PCScene6AnnoyingHabits: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Floating sock/shirt wiggle
  const wiggle = Math.sin(frame / 4) * 5;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "42px",
      }}
    >
      <div
        dir="auto"
        style={{
          backgroundColor: "#FF7675",
          color: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(2deg)`,
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        الاستخدام 4: عادات مزعجة للشكوى (Annoying Habits)
      </div>

      {/* Cluttered Clothes on Floor Illustration Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "36px 42px",
          transform: `scale(${pop})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Floor & Clothes Graphic */}
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "170px",
            backgroundColor: "#F1F2F6",
            border: "5px solid #000000",
            boxShadow: "6px 6px 0px #000000",
            overflow: "hidden",
          }}
        >
          {/* Wood floor planks pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(to right, #DFE4EA 2px, transparent 2px)",
              backgroundSize: "60px 100%",
            }}
          />

          {/* Clothes thrown on floor */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "25px",
              fontSize: "54px",
              transform: `rotate(${-15 + wiggle}deg)`,
            }}
          >
            👕
          </div>
          <div
            style={{
              position: "absolute",
              top: "70px",
              left: "110px",
              fontSize: "48px",
              transform: `rotate(${25 - wiggle}deg)`,
            }}
          >
            👖
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              right: "30px",
              fontSize: "46px",
              transform: `rotate(${-35 + wiggle}deg)`,
            }}
          >
            🧦
          </div>
        </div>

        {/* Reaction bubble & Rule Callout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <div
            dir="auto"
            style={{
              backgroundColor: "#FFE600",
              border: "4.5px solid #000000",
              boxShadow: "5px 5px 0px #000000",
              padding: "10px 22px",
              fontSize: "28px",
              fontWeight: 900,
              transform: "rotate(-2deg)",
            }}
          >
            😤 دايماً رامي أواعيه عالأرض!
          </div>

          <div
            style={{
              backgroundColor: "#00F0FF",
              border: "4px solid #000000",
              boxShadow: "5px 5px 0px #000000",
              padding: "8px 18px",
              fontSize: "26px",
              fontWeight: 900,
            }}
          >
            ⚡ always + V-ing = Criticism
          </div>

          <div
            dir="auto"
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#636E72",
              textAlign: "right",
            }}
          >
            نستخدم always هنا لإظهار الانزعاج
          </div>
        </div>
      </div>

      {/* Example Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "32px 38px",
          fontSize: "43px",
          fontWeight: 900,
          lineHeight: 1.35,
        }}
      >
        👉 My roommate's{" "}
        <span
          style={{
            backgroundColor: "#FFE600",
            border: "3.5px solid #000000",
            padding: "2px 10px",
          }}
        >
          always throwing
        </span>{" "}
        his clothes on the{" "}
        <span
          style={{
            backgroundColor: "#FF7675",
            color: "#FFFFFF",
            border: "3.5px solid #000000",
            padding: "2px 10px",
          }}
        >
          floor
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 7: WARNING CARD (STATE VERBS!) (0:50 - 01:01 | 330 frames)
   ========================================================================= */
export const PCScene7StateVerbsWarning: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  // Flashing hazard warning
  const flash = Math.floor(frame / 6) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "190px 75px 440px 75px",
        gap: "36px",
      }}
    >
      {/* Red Warning Header Tag */}
      <div
        dir="auto"
        style={{
          backgroundColor: flash ? "#D63031" : "#FF7675",
          color: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "9px 9px 0px #000000",
          padding: "15px 36px",
          fontSize: "39px",
          fontWeight: 900,
          alignSelf: "flex-end",
          transform: `scale(${pop}) rotate(-1.5deg)`,
          textAlign: "right",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        ⚠️ تحذير خطير: أفعال الحالة (State Verbs)
      </div>

      {/* Hazard Warning Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "7.5px solid #000000",
          boxShadow: "15px 15px 0px #000000",
          padding: "28px 36px",
          transform: `scale(${pop})`,
        }}
      >
        {/* Hazard Stripe Header */}
        <div
          style={{
            height: "24px",
            backgroundImage:
              "repeating-linear-gradient(45deg, #FFE600, #FFE600 20px, #000000 20px, #000000 40px)",
            border: "3.5px solid #000000",
            marginBottom: "18px",
          }}
        />

        <div
          dir="auto"
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#D63031",
            marginBottom: "12px",
            textAlign: "right",
          }}
        >
          ❌ ممنوع إضافة -ing مع أفعال المشاعر والحواس والملكية!
        </div>

        {/* Cross out pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          {["prefer", "own", "know", "like", "love"].map((verb, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFEAA7",
                border: "3.5px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                padding: "6px 18px",
                fontSize: "28px",
                fontWeight: 900,
                position: "relative",
              }}
            >
              <span>{verb} + ing</span>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D63031",
                  fontSize: "40px",
                  fontWeight: 900,
                }}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Example 1: prefer */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "24px 34px",
          fontSize: "43px",
          fontWeight: 900,
        }}
      >
        <div>
          👉 I{" "}
          <span
            style={{
              backgroundColor: "#55EFC4",
              border: "3px solid #000",
              padding: "0 10px",
            }}
          >
            prefer
          </span>{" "}
          coffee to tea ☕
        </div>
        <div
          style={{
            color: "#D63031",
            fontSize: "32px",
            marginTop: "8px",
            fontWeight: 800,
          }}
        >
          ❌ NOT: I am preferring coffee
        </div>
      </div>

      {/* Example 2: own */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "6px solid #000000",
          boxShadow: "10.5px 10.5px 0px #000000",
          padding: "24px 34px",
          fontSize: "43px",
          fontWeight: 900,
        }}
      >
        <div>
          👉 My uncle{" "}
          <span
            style={{
              backgroundColor: "#55EFC4",
              border: "3px solid #000",
              padding: "0 10px",
            }}
          >
            owns
          </span>{" "}
          a villa 🏡
        </div>
        <div
          style={{
            color: "#D63031",
            fontSize: "32px",
            marginTop: "8px",
            fontWeight: 800,
          }}
        >
          ❌ NOT: My uncle is owning a villa
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE 8: CALL TO ACTION & END CARD (01:01 - 01:10 | 270 frames)
   ========================================================================= */
export const PCScene8CTA: React.FC<PCSceneProps> = ({
  frame: propFrame,
  fps: propFps,
}) => {
  const currentFrame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const frame = propFrame ?? currentFrame;
  const fps = propFps ?? videoConfig.fps;

  const pop = spring({ frame, fps, config: { mass: 0.5, damping: 8 } });

  const bounceGift = Math.sin(frame / 4) * 8;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "90px",
        gap: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "9px solid #000000",
          boxShadow: "21px 21px 0px #000000",
          padding: "65px 50px",
          textAlign: "center",
          transform: `scale(${pop})`,
          maxWidth: "1380px",
        }}
      >
        {/* Floating Cheatsheet Booklet Card */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#FFE600",
            border: "5px solid #000000",
            boxShadow: "8px 8px 0px #000000",
            padding: "12px 30px",
            fontSize: "34px",
            fontWeight: 900,
            marginBottom: "24px",
            transform: `translateY(${bounceGift}px) rotate(-1.5deg)`,
          }}
        >
          🎁 FREE CHEATSHEET • ورقة ملخص مجانية
        </div>

        <h2
          dir="auto"
          style={{
            fontFamily: montserratFont,
            fontSize: "86px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "20px 0 35px 0",
          }}
        >
          تابعني لتتعلم قواعد تانية
          <br />
          <span
            dir="auto"
            style={{
              backgroundColor: "#00F0FF",
              border: "5px solid #000",
              boxShadow: "7px 7px 0px #000",
              padding: "4px 24px",
              display: "inline-block",
              marginTop: "12px",
            }}
          >
            بدقيقة واحدة! ⏱️
          </span>
        </h2>

        {/* Comment prompt box */}
        <div
          dir="auto"
          style={{
            backgroundColor: "#55EFC4",
            border: "6px solid #000000",
            boxShadow: "9px 9px 0px #000000",
            padding: "24px 36px",
            fontSize: "44px",
            fontWeight: 900,
            marginBottom: "35px",
          }}
        >
          💬 اكتب كلمة <strong>"ملخص"</strong> بالتعليقات لأبعتلك الـ cheat sheet مجاناً! 🎁
        </div>

        {/* Follow Button */}
        <div
          dir="auto"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "6px solid #000000",
            boxShadow: "12px 12px 0px #FFE600",
            padding: "24px 64px",
            fontSize: "52px",
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
