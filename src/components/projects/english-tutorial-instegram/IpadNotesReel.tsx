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
  Img,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";

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

  // 00:05 – 00:10
  {
    fromFrame: 150,
    toFrame: 310,
    text: "أول شي: القاعدة. بالجملة العادية منستخدم الفعل مثل ما هو (V1)."
  },

  // 00:10 – 00:16
  {
    fromFrame: 310,
    toFrame: 480,
    text: "بس مع he, she, it منضيف للفعل s أو es أو ies."
  },

  // 00:16 – 00:18
  {
    fromFrame: 480,
    toFrame: 540,
    text: "مثل:"
  },

  // 00:18 – 00:22
  {
    fromFrame: 540,
    toFrame: 660,
    text: "بس بنقول:"
  },

  // 00:22 – 00:27
  {
    fromFrame: 660,
    toFrame: 810,
    text: "وبالنفي، بنحط don't أو doesn't مع الفعل بالمصدر: "
  },

  // 00:27 – 00:32
  {
    fromFrame: 810,
    toFrame: 960,
    text: "أما بالسؤال، فمنبدأ بـ Do أو Does:"
  },

  // 00:32 – 00:37
  {
    fromFrame: 960,
    toFrame: 1110,
    text: "طيب، أيمتى منستخدمه؟ رقم واحد: للعادات والأشياء اللي بتتكرر دائماً."
  },

  // 00:37 – 00:43
  {
    fromFrame: 1110,
    toFrame: 1290,
    text: "شوف هالخط الزمني: بالماضي، الحاضر، والمستقبل، الفعل عم يتكرر."
  },

  // 00:43 – 00:46
  {
    fromFrame: 1290,
    toFrame: 1380,
    text: "مثل:"
  },

  // 00:46 – 00:52
  {
    fromFrame: 1380,
    toFrame: 1560,
    text: "رقم اتنين: للحقائق العلمية والعامة: "
  },

  // 00:52 – 00:59
  {
    fromFrame: 1560,
    toFrame: 1770,
    text: "رقم تلاتة: لنعطي تعليمات أو إرشادات: "
  },

  // 00:59 – 01:05
  {
    fromFrame: 1770,
    toFrame: 1950,
    text: "ورقم أربعة: لما نحكي ملخص فيلم أو قصة: "
  },

];

// Frame ranges where caption overlaps with scene visuals (bottom ~400px area)
// Caption occupies roughly y=1420 to y=1520 in the 1920-tall canvas
const CAPTION_OVERLAP_RANGES: [number, number][] = [
  // Scene 4 (Habits): timeline + tags + example push deep into caption zone
  [1230, 1380],
  // Scene 5 (Facts): thermometer + beaker are tall, example card at bottom
  [1470, 1560],
  // Scene 6 (Instructions): desktop UI + example are tall
  [1670, 1770],
  // Scene 7 (Stories): clapperboard + hero image + example
  [1860, 1950],
  // Scene 8 (CTA): full-screen centered content
  [1950, 2190],
];

function isCaptionOverlappingVisuals(frame: number): boolean {
  return CAPTION_OVERLAP_RANGES.some(
    ([start, end]) => frame >= start && frame < end
  );
}

export const IpadNotesReel: React.FC<IpadNotesReelProps> = ({
  showCaptions = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);

  const activeCaption = VOICEOVER_CAPTIONS.find(
    (c) => frame >= c.fromFrame && frame < c.toFrame
  );

  const isCaptionOverlapping = isCaptionOverlappingVisuals(frame);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF7F2",
        color: "#292524",
        fontFamily: jakartaFont,
        overflow: "hidden",
      }}
    >
      {/* Main Voiceover */}
      <Audio src={staticFile('assets/sounds/voicceover/present-simple.wav')} />

      {/* SFX – Scene Transitions & Key Moments (low volume, voiceover is priority) */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.20} />
      </Sequence>
      <Sequence from={150}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/deep-whoosh.wav')} volume={0.15} />
      </Sequence>
      <Sequence from={310}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.20} />
      </Sequence>
      <Sequence from={480}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
      </Sequence>
      <Sequence from={540}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
      </Sequence>
      <Sequence from={595}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.15} />
      </Sequence>
      <Sequence from={660}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/swish-whoosh-large.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={810}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={960}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={975}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/pop-hand.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={1380}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.20} />
      </Sequence>
      <Sequence from={1400} durationInFrames={160}>
        <Audio src={staticFile('assets/sounds/sfx/other/water_boils.wav')} volume={0.12} />
      </Sequence>
      <Sequence from={1560}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={1620}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/mouse-click-1.wav')} volume={0.20} />
      </Sequence>
      <Sequence from={1770}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/swish-whoosh-large.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={1790}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/camera-shutter-1-shot.wav')} volume={0.20} />
      </Sequence>
      <Sequence from={1950}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/fast-whoosh.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={1970}>
        <Audio src={staticFile('assets/sounds/sfx/waven-sfx/notification-ding.wav')} volume={0.18} />
      </Sequence>

      {/* Aesthetic Dotted / Grid Paper Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(#D6D3CD 2.25px, transparent 2.25px)",
          backgroundSize: "42px 42px",
          opacity: 0.6,
        }}
      />

      {/* iPad Top Status Bar */}
      <div
        style={{
          position: "absolute",
          top: "45px",
          left: "75px",
          right: "75px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "28.5px",
          fontWeight: 600,
          color: "#78716C",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>9:41 AM</span>
          <span style={{ fontSize: "21px", color: "#A8A29E" }}>• iPad</span>
        </div>
      </div>

      {/* Aesthetic Thin Notebook Progress Ribbon */}
      <div
        style={{
          position: "absolute",
          top: "127.5px",
          left: "75px",
          right: "75px",
          height: "9px",
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
          right: "45px",
          bottom: "180px",
          width: "42px",
          height: "240px",
          background: "linear-gradient(180deg, #FFFFFF, #E2E8F0 80%, #718096)",
          borderRadius: "21px 21px 6px 6px",
          boxShadow: "6px 12px 30px rgba(0,0,0,0.15)",
          border: "1.5px solid #CBD5E1",
          zIndex: 45,
          opacity: 0.85,
          transform: `rotate(-15deg) translateY(${Math.sin(frame / 15) * 9}px)`,
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
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "21px solid #4A5568",
          }}
        />
      </div>

      {/* =========================================================================
          SCENE 1: HOOK & TITLE (0:00 - 0:05 | frames 0 - 150)
          ========================================================================= */}
      {frame < 150 && <Scene1IpadHook frame={frame} fps={fps} />}

      {/* =========================================================================
          SCENE 2: (+) POSITIVE STRUCTURE (0:05 - 0:22 | frames 150 - 660)
          ========================================================================= */}
      {frame >= 150 && frame < 660 && (
        <Scene2IpadPositive frame={frame - 150} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 3: (– & ?) NEGATIVE & QUESTIONS (0:22 - 0:32 | frames 660 - 960)
          ========================================================================= */}
      {frame >= 660 && frame < 960 && (
        <Scene3IpadNegAndQ frame={frame - 660} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 4: USE 1: HABITS & ROUTINE (0:32 - 0:46 | frames 960 - 1380)
          ========================================================================= */}
      {frame >= 960 && frame < 1380 && (
        <Scene4IpadHabits frame={frame - 960} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 5: USE 2: FACTS & TRUTHS (0:46 - 0:52 | frames 1380 - 1560)
          ========================================================================= */}
      {frame >= 1380 && frame < 1560 && (
        <Scene5IpadFacts frame={frame - 1380} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 6: USE 3: INSTRUCTIONS (0:52 - 0:59 | frames 1560 - 1770)
          ========================================================================= */}
      {frame >= 1560 && frame < 1770 && (
        <Scene6IpadInstructions frame={frame - 1560} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 7: USE 4: STORIES & FILMS (0:59 - 1:05 | frames 1770 - 1950)
          ========================================================================= */}
      {frame >= 1770 && frame < 1950 && (
        <Scene7IpadStories frame={frame - 1770} fps={fps} />
      )}

      {/* =========================================================================
          SCENE 8: CALL TO ACTION & END CARD (1:05 - 1:13 | frames 1950 - 2190)
          ========================================================================= */}
      {frame >= 1950 && <Scene8IpadCTA frame={frame - 1950} fps={fps} />}

      {/* Synchronized Handwritten Style Caption Bar */}
      {showCaptions && activeCaption && !isCaptionOverlapping && (
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
        padding: "90px",
      }}
    >
      {/* Aesthetic Study Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "48px",
          boxShadow: "0 30px 75px rgba(44, 40, 37, 0.08)",
          padding: "90px 72px",
          textAlign: "center",
          maxWidth: "1380px",
          position: "relative",
          transform: `scale(${enter})`,
        }}
      >
        {/* Cute Washi Tape at Top */}
        <div
          style={{
            position: "absolute",
            top: "-24px",
            left: "50%",
            transform: "translateX(-50%) rotate(-1deg)",
            width: "240px",
            height: "48px",
            backgroundColor: "rgba(254, 240, 138, 0.7)",
            border: "1.5px dashed rgba(202, 138, 4, 0.4)",
          }}
        />

        <div
          dir="auto"
          style={{
            display: "inline-block",
            backgroundColor: "#ECFDF5",
            color: "#059669",
            border: "1.5px solid #A7F3D0",
            padding: "12px 36px",
            borderRadius: "999px",
            fontSize: "33px",
            fontWeight: 700,
            marginBottom: "75px",
          }}
        >
          الانكليزية ب 60 ثانية لطلاب البكالوريا
        </div>

        <h1
          dir="auto"
          style={{
            fontSize: "114px",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1C1917",
            margin: "0 0 30px 0",
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
                bottom: "6px",
                height: "33px",
                width: `${revealW}%`,
                backgroundColor: "rgba(254, 240, 138, 0.55)",
                zIndex: -1,
                borderRadius: "6px",
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
  // +s rule highlight (local frame ~160)
  const highlightW = interpolate(frame, [160, 200], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  // "I study law" (local frame ~330)
  const write1 = interpolate(frame, [330, 365], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  // "She likes reading" (local frame ~390)
  const write2 = interpolate(frame, [390, 425], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  // "He studies law" (local frame ~420)
  const write3 = interpolate(frame, [445, 455], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "210px 90px 270px 90px",
        gap: "36px",
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
          padding: "12px 36px",
          borderRadius: "30px",
          fontSize: "33px",
          fontWeight: 800,
          transform: `scale(${enter})`,
          textAlign: "right",
          marginTop: "75px",
          marginBottom: "75px",
        }}
      >
        📌 القاعدة 1: صيغة الإثبات (Positive)
      </div>

      {/* Formula Study Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "42px",
          padding: "54px",
          boxShadow: "0 21px 60px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div style={{ fontSize: "54px", fontWeight: 800, color: "#1C1917" }}>
          Subject + <span style={{ color: "#2563EB" }}>V1</span> (الفعل الأساسي)
        </div>

        {/* Highlight Note */}
        <div
          dir="auto"
          style={{
            position: "relative",
            marginTop: "24px",
            fontSize: "42px",
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
              right: "-6px",
              bottom: "-3px",
              height: "24px",
              width: `${highlightW}%`,
              backgroundColor: "rgba(254, 240, 138, 0.6)",
              zIndex: -1,
              borderRadius: "6px",
            }}
          />
        </div>
      </div>

      {/* Handwritten Examples in Lined Notebook Style */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "42px",
          padding: "54px",
          boxShadow: "0 21px 60px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "69px",
            color: "#1E293B",
            opacity: write1 > 0 ? 1 : 0,
            borderBottom: "1.5px dashed #E2E8F0",
            paddingBottom: "18px",
          }}
        >
          • <span style={{ color: "#2563EB" }}>I</span> study law.
        </div>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "69px",
            color: "#1E293B",
            opacity: write2 > 0 ? 1 : 0,
            borderBottom: "1.5px dashed #E2E8F0",
            paddingBottom: "18px",
          }}
        >
          • <span style={{ color: "#DC2626" }}>She</span>{" "}
          <span style={{ position: "relative", zIndex: 2 }}>like</span>
          <span
            style={{
              backgroundColor: "#FEF08A",
              padding: "0 2px",
              borderRadius: "6px",
              position: "relative",
              zIndex: 1,
            }}
          >
            s
          </span>{" "}
          reading.
        </div>

        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "69px",
            color: "#1E293B",
            opacity: write3 > 0 ? 1 : 0,
          }}
        >
          • <span style={{ color: "#2563EB" }}>He</span>{" "}
          <span style={{ position: "relative", zIndex: 2 }}>stud</span>
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 1)",
              padding: "0 2px",
              borderRadius: "6px",
              position: "relative",
              zIndex: 1,
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
  const negEnter = spring({ frame, fps, config: { damping: 14 } });
  // Question card appears when voiceover says "أما بالسؤال" (local frame ~150)
  const qEnter = spring({ frame: frame - 150, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "210px 90px 270px 90px",
        gap: "75px",
        marginTop: "75px",
        marginBottom: "75px",
      }}
    >
      {/* Negative Note */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #FECDD3",
          borderRadius: "42px",
          padding: "48px",
          boxShadow: "0 15px 45px rgba(225, 29, 72, 0.05)",
          transform: `scale(${negEnter})`,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "18px",
          }}
        >
          <div
            dir="auto"
            style={{
              display: "inline-block",
              backgroundColor: "#FFE4E6",
              color: "#E11D48",
              padding: "6px 27px",
              borderRadius: "21px",
              fontSize: "27px",
              fontWeight: 800,
              textAlign: "right",
            }}
          >
            (–) صيغة النفي: don't / doesn't
          </div>
        </div>
        <div style={{ fontSize: "45px", fontWeight: 700, color: "#1C1917" }}>
          Subject +{" "}
          <span style={{ color: "#E11D48", fontWeight: 800 }}>
            don't / doesn't
          </span>{" "}
          + V0
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "66px",
            color: "#334155",
            marginTop: "21px",
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
          borderRadius: "42px",
          padding: "48px",
          boxShadow: "0 15px 45px rgba(2, 132, 199, 0.05)",
          transform: `scale(${qEnter})`,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "18px",
          }}
        >
          <div
            dir="auto"
            style={{
              display: "inline-block",
              backgroundColor: "#E0F2FE",
              color: "#0284C7",
              padding: "6px 27px",
              borderRadius: "21px",
              fontSize: "27px",
              fontWeight: 800,
              textAlign: "right",
            }}
          >
            (?) صيغة السؤال: Do / Does
          </div>
        </div>
        <div style={{ fontSize: "45px", fontWeight: 700, color: "#1C1917" }}>
          <span style={{ color: "#0284C7", fontWeight: 800 }}>Do / Does</span> +
          Subject + V0?
        </div>
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "66px",
            color: "#334155",
            marginTop: "21px",
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
  // Tags appear with intro (local frame ~10)
  const tagsEnter = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  // Example appears when voiceover says "مثل: I use the internet" (local frame ~330)
  const exampleEnter = spring({ frame: frame - 330, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "210px 90px 270px 90px",
        gap: "75px",
        marginTop: "75px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-block",
          alignSelf: "flex-end",
          backgroundColor: "#FEF3C7",
          color: "#B45309",
          padding: "12px 36px",
          borderRadius: "30px",
          fontSize: "33px",
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
          borderRadius: "42px",
          padding: "54px",
          boxShadow: "0 15px 45px rgba(0,0,0,0.05)",
          transform: `scale(${enter})`,
        }}
      >
        <div
          dir="auto"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            fontSize: "30px",
            fontWeight: 700,
            color: "#64748B",
            marginBottom: "36px",
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
            height: "90px",
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
              height: "4.5px",
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
                fontSize: "57px",
                color: i === 2 ? "#059669" : "#2563EB",
                fontWeight: 900,
                backgroundColor: "#FFFFFF",
                padding: "0 12px",
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
            fontSize: "48px",
            color: "#64748B",
            textAlign: "right",
            marginTop: "18px",
          }}
        >
          *أفعال وعادات متكررة عبر الزمن*
        </div>
      </div>

      {/* Cute Pastel Frequency Tags */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", opacity: tagsEnter, transform: `translateY(${interpolate(tagsEnter, [0, 1], [22.5, 0])}px)` }}>
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
              padding: "9px 27px",
              borderRadius: "24px",
              fontSize: "30px",
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
          borderRadius: "36px",
          padding: "36px 45px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
          opacity: exampleEnter,
          transform: `scale(${exampleEnter})`,
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "66px",
            color: "#1C1917",
          }}
        >
          👉 "I use the Internet{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 9px",
              borderRadius: "6px",
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
        padding: "210px 90px 270px 90px",
        gap: "75px",
        marginTop: "75px",
      }}
    >
      {/* Category Pill Tag */}
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          alignSelf: "flex-end",
          backgroundColor: "#DCFCE7",
          color: "#166534",
          padding: "12px 36px",
          borderRadius: "30px",
          fontSize: "33px",
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
          borderRadius: "42px",
          padding: "42px 36px",
          boxShadow: "0 18px 54px rgba(0,0,0,0.06)",
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
          <svg width="165" height="420" viewBox="0 0 100 280">
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
              borderRadius: "18px",
              padding: "6px 21px",
              fontSize: "33px",
              fontWeight: 800,
              color: "#DC2626",
              marginTop: "9px",
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
          <svg width="255" height="97.5" viewBox="0 0 160 60">
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
              width: "270px",
              height: "240px",
              borderRadius: "21px 21px 48px 48px",
              backgroundColor: "rgba(224, 242, 254, 0.6)",
              border: "4.5px solid #94A3B8",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(56, 189, 248, 0.15)",
            }}
          >
            {/* Boiling Water Liquid */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "165px",
                backgroundColor: "rgba(56, 189, 248, 0.5)",
                borderTop: "3px solid #38BDF8",
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
                height: "27px",
                background:
                  "linear-gradient(to top, rgba(239, 68, 68, 0.6), transparent)",
              }}
            />
          </div>

          <div
            dir="auto"
            style={{
              marginTop: "18px",
              fontFamily: caveatFont,
              fontSize: "39px",
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
          borderRadius: "36px",
          padding: "39px 48px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "66px",
            color: "#1C1917",
            lineHeight: 1.4,
          }}
        >
          👉 "If you heat water to 100 °C, it{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 12px",
              borderRadius: "6px",
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
  const cursorX = interpolate(frame, [0, 60], [150, 510], {
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [0, 60], [45, 135], {
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
        padding: "210px 90px 270px 90px",
        gap: "75px",
        marginTop: "75px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          alignSelf: "flex-end",
          backgroundColor: "#F3E8FF",
          color: "#7E22CE",
          padding: "12px 36px",
          borderRadius: "30px",
          fontSize: "33px",
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
          borderRadius: "42px",
          padding: "39px",
          boxShadow: "0 18px 54px rgba(0,0,0,0.06)",
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
            paddingBottom: "21px",
            marginBottom: "27px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                backgroundColor: "#EF4444",
              }}
            />
            <div
              style={{
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
              }}
            />
            <div
              style={{
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
          </div>
          <div
            dir="auto"
            style={{
              fontSize: "25.5px",
              fontWeight: 700,
              color: "#64748B",
              textAlign: "right",
            }}
          >
            نظام التشغيل • إرشادات النقر
          </div>
          <div style={{ width: "60px" }} />
        </div>

        {/* Desktop Screen Area */}
        <div
          style={{
            height: "285px",
            backgroundColor: "#F8FAFC",
            borderRadius: "24px",
            border: "1px solid #E2E8F0",
            padding: "30px",
            position: "relative",
          }}
        >
          {/* Target App Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              position: "absolute",
              left: "450px",
              top: "30px",
              transform: isClicked ? "scale(1.04)" : "scale(1)",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "27px",
                backgroundColor: isClicked ? "#10B981" : "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isClicked
                  ? "0 0 36px rgba(16, 185, 129, 0.4)"
                  : "0 12px 24px rgba(0,0,0,0.12)",
                fontSize: "60px",
              }}
            >
              💻
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#334155",
                backgroundColor: "#FFFFFF",
                padding: "3px 12px",
                borderRadius: "9px",
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
                left: "510px",
                top: "90px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "4.5px solid #10B981",
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
                left: "607.5px",
                top: "33px",
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "27px",
                padding: "6px 21px",
                borderRadius: "999px",
                boxShadow: "0 6px 18px rgba(16, 185, 129, 0.3)",
              }}
            >
              *اضغط هنا!* 🖱️
            </div>
          )}

          {/* Moving Mouse Cursor */}
          <div
            style={{
              position: "absolute",
              left: `${cursorX * 1.5}px`,
              top: `${cursorY * 1.5}px`,
              transform: isClicked ? "scale(0.85)" : "scale(1)",
              zIndex: 30,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
            }}
          >
            <svg width="66" height="66" viewBox="0 0 24 24" fill="none">
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
          borderRadius: "36px",
          padding: "39px 48px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "63px",
            color: "#1C1917",
            lineHeight: 1.4,
          }}
        >
          👉 "To start the programme, first{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 12px",
              borderRadius: "6px",
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
        padding: "210px 90px 270px 90px",
        gap: "75px",
        marginTop: "75px",
      }}
    >
      <div
        dir="auto"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          alignSelf: "flex-end",
          backgroundColor: "#FFE4E6",
          color: "#E11D48",
          padding: "12px 36px",
          borderRadius: "30px",
          fontSize: "33px",
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
          borderRadius: "42px",
          padding: "42px 36px",
          boxShadow: "0 18px 54px rgba(0,0,0,0.06)",
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
              width: "277.5px",
              height: "240px",
            }}
          >
            {/* Clapper Top Moving Bar */}
            <div
              style={{
                width: "277.5px",
                height: "48px",
                backgroundColor: "#1E293B",
                border: "3px solid #0F172A",
                borderRadius: "7.5px",
                transformOrigin: "left bottom",
                transform: `rotate(${clapAngle}deg)`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, #FFFFFF, #FFFFFF 12px, #1E293B 12px, #1E293B 24px)",
                marginBottom: "6px",
              }}
            />

            {/* Clapperboard Body */}
            <div
              style={{
                width: "277.5px",
                height: "180px",
                backgroundColor: "#1E293B",
                border: "3px solid #0F172A",
                borderRadius: "7.5px",
                padding: "15px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 9px 24px rgba(0,0,0,0.15)",
              }}
            >
              <div
                dir="auto"
                style={{
                  fontSize: "21px",
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
                  fontSize: "19.5px",
                  color: "#94A3B8",
                  fontWeight: 700,
                }}
              >
                <span dir="auto">مشهد: 04</span>
                <span dir="auto">تصوير: 01</span>
              </div>
              <div
                style={{
                  fontSize: "27px",
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
              width: "225px",
              height: "225px",
              borderRadius: "36px",
              overflow: "hidden",
              boxShadow: "0 12px 37.5px rgba(236, 72, 153, 0.35)",
              border: "4.5px solid #E2E8F0",
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
          borderRadius: "36px",
          padding: "39px 48px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: caveatFont,
            fontSize: "63px",
            color: "#1C1917",
            lineHeight: 1.4,
          }}
        >
          👉 "In the film, the hero{" "}
          <span
            style={{
              backgroundColor: "rgba(254, 240, 138, 0.7)",
              padding: "0 12px",
              borderRadius: "6px",
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
        padding: "90px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "54px",
          boxShadow: "0 30px 75px rgba(0,0,0,0.08)",
          padding: "81px 66px",
          textAlign: "center",
          maxWidth: "1320px",
          transform: `scale(${enter})`,
        }}
      >
        <h2
          dir="auto"
          style={{
            fontFamily: jakartaFont,
            fontSize: "84px",
            fontWeight: 800,
            margin: "75px 0 24px 0",
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
            border: "3px dashed #D6D3CD",
            borderRadius: "30px",
            padding: "30px 42px",
            marginBottom: "60px",
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "21px",
          }}
        >
          <span style={{ fontSize: "48px" }}>💬</span>
          <span
            dir="auto"
            style={{
              fontSize: "39px",
              fontWeight: 700,
              color: "#1C1917",
            }}
          >
            "علّق ب "ملخص" لأبعتلك واحد مجانا"
          </span>
        </div>

        {/* Animated Follow Button */}
        <div
          dir="auto"
          style={{
            backgroundColor: isFollowClicked ? "#10B981" : "#10B981",
            color: "#FFFFFF",
            padding: "24px 72px",
            borderRadius: "999px",
            fontSize: "45px",
            fontWeight: 800,
            display: "inline-block",
            boxShadow: "0 15px 36px rgba(16, 185, 129, 0.3)",
            transform: `scale(${buttonPop})`,
          }}
        >
          <span dir="auto">{isFollowClicked ? "تمت المتابعة ✔️" : "+ متابعة (Follow)"}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
