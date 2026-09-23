import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PANEL_H } from "./DiffusionExplainerBroll";

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800", "900"],
});

interface CaptionEntry {
  from_frame: number;
  to_frame: number;
  text: string;
}

interface BRollRange {
  from_frame: number;
  to_frame: number;
}

const CAPTIONS: CaptionEntry[] = [
  { from_frame: 0, to_frame: 60, text: "بعرف الإنترنت كله حالياً مفتون بـ Jev" },
  { from_frame: 60, to_frame: 120, text: "بس أنا بالحقيقة مفتون بشغلة ثانية" },
  { from_frame: 120, to_frame: 150, text: "عم تطير تحت الرادار" },
  { from_frame: 180, to_frame: 240, text: "يلي هي Diffusion LLM" },
  { from_frame: 270, to_frame: 330, text: "بكل بساطة الـ Diffusion..." },
  { from_frame: 330, to_frame: 420, text: "بتعرف شلون الـ AI بولد الصورة؟" },
  { from_frame: 420, to_frame: 480, text: "نفس الشيء بتصير بس للـ text" },
  { from_frame: 480, to_frame: 540, text: "ببلش noise بعدين بطلعلك النتيجة" },
  { from_frame: 570, to_frame: 660, text: "الفكرة كلها بميزتين أساسيتين" },
  { from_frame: 660, to_frame: 720, text: "الأولى، هي إنه حالياً الـ AI" },
  { from_frame: 720, to_frame: 780, text: "بس طلعلك سطر ما بحسن يرجع يعدله" },
  { from_frame: 780, to_frame: 840, text: "ما بحسن يرجع لفوق" },
  { from_frame: 840, to_frame: 900, text: "أما بالـ Diffusion LLM فعادي" },
  { from_frame: 900, to_frame: 960, text: "لأنه كلياتها بتطلع بنفس الوقت" },
  { from_frame: 990, to_frame: 1050, text: "كل النتائج يعني بتطلع بنفس الوقت" },
  { from_frame: 1080, to_frame: 1140, text: "أما الشغلة الثانية فهي السرعة" },
  { from_frame: 1140, to_frame: 1230, text: "الـ Diffusion أسرع بأكتر من 10 مرات" },
  { from_frame: 1230, to_frame: 1290, text: "من الـ LLM العادية" },
  { from_frame: 1320, to_frame: 1380, text: "بسبتمبر 9، Mercury 2.5 نزل" },
  { from_frame: 1380, to_frame: 1440, text: "تلت حالات للاستخدامات:" },
  { from_frame: 1440, to_frame: 1500, text: "الأول: Search Agent" },
  { from_frame: 1500, to_frame: 1560, text: "والـ RAG pipelines" },
  { from_frame: 1560, to_frame: 1620, text: "والثاني: الـ Voice Agents" },
  { from_frame: 1620, to_frame: 1680, text: "ومثلاً Assistant" },
  { from_frame: 1680, to_frame: 1740, text: "وآخر شيء: coding sub-agents" },
  { from_frame: 1740, to_frame: 1830, text: "وبيعمل Parallel Tool Call" },
  { from_frame: 1830, to_frame: 1890, text: "بس أنا بالحقيقة بستعمله للـ Coding" },
  { from_frame: 1920, to_frame: 1980, text: "فـ مثلاً، إذا عندي JSON" },
  { from_frame: 1980, to_frame: 2040, text: "أو markdown file" },
  { from_frame: 2040, to_frame: 2100, text: "مخربط بالفورمات تبعيته" },
  { from_frame: 2130, to_frame: 2190, text: "فـ بس، وأنا بـ Zed" },
  { from_frame: 2190, to_frame: 2220, text: "أنا بستعمل Zed IDE" },
  { from_frame: 2220, to_frame: 2280, text: "وأنا بـ Zed بخليه يصلحه" },
  { from_frame: 2280, to_frame: 2370, text: "بجزء من الثانية، كتير سريع!" },
  { from_frame: 2370, to_frame: 2430, text: "أو إذا بدي مثلاً أكتب function سريعة" },
  { from_frame: 2430, to_frame: 2490, text: "أضيف debugging، أشيل debugging وهكذا" },
  { from_frame: 2490, to_frame: 2580, text: "تصور استعمل Claude لهيك شيء؟" },
  { from_frame: 2580, to_frame: 2640, text: "أروح كل الـ tokens اللي عندي وأفلس؟" },
  { from_frame: 2670, to_frame: 2730, text: "أفلس tokens!" },
];

const B_ROLL_RANGES: BRollRange[] = [
  // Hook 0-60 is full-screen B-roll (off-white), keep pill logic but hook uses special style
  { from_frame: 0, to_frame: 60 },
];

// Split-layout sections: b-roll card on top, face below, caption pill on the boundary
export const SPLIT_RANGES: BRollRange[] = [
  { from_frame: 270, to_frame: 570 },
  { from_frame: 720, to_frame: 1050 },
];

const FACE_VIDEO_END = 2719;
const HOOK_END = 60;

function isOverBRoll(frame: number): boolean {
  return B_ROLL_RANGES.some((r) => frame >= r.from_frame && frame < r.to_frame);
}

const KineticWord: React.FC<{
  word: string;
  localFrame: number;
  framesPerWord: number;
  fps: number;
  disableFade?: boolean;
}> = ({ word, localFrame, framesPerWord, fps, disableFade }) => {
  if (disableFade) {
    if (localFrame < 0 || localFrame >= framesPerWord) return null;
    return (
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: alexandriaFont,
          fontSize: 76,
          fontWeight: 800,
          color: "#F6F1EB",
          whiteSpace: "nowrap",
          direction: "rtl",
        }}
      >
        {word}
      </div>
    );
  }

  if (localFrame < -2 || localFrame > framesPerWord + 4) return null;

  const entranceSpring = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 150 },
  });

  const exitProgress = interpolate(
    localFrame,
    [framesPerWord - 5, framesPerWord + 3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]) * (1 - exitProgress);
  const translateY = interpolate(entranceSpring, [0, 1], [40, 0]) - exitProgress * 25;
  const scale = interpolate(entranceSpring, [0, 1], [0.4, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        fontFamily: alexandriaFont,
        fontSize: 76,
        fontWeight: 800,
        color: "#F6F1EB",
        whiteSpace: "nowrap",
        direction: "rtl",
      }}
    >
      {word}
    </div>
  );
};

const HookCaption: React.FC<{
  text: string;
  frame: number;
  fromFrame: number;
  toFrame: number;
}> = ({ text, frame, fromFrame, toFrame }) => {
  const localFrame = frame - fromFrame;
  const duration = toFrame - fromFrame;

  const fadeIn = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [duration - 5, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        top: "58%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity,
        fontFamily: alexandriaFont,
        fontSize: 58,
        fontWeight: 900,
        color: "#1A1A1A",
        direction: "rtl",
        width: "88%",
        lineHeight: 1.25,
        textAlign: "center",
        letterSpacing: -0.5,
      }}
    >
      {text}
    </div>
  );
};

// Caption pill sitting on the boundary between top b-roll panel and face video
const SplitCaption: React.FC<{
  text: string;
  frame: number;
  fromFrame: number;
  toFrame: number;
}> = ({ text, frame, fromFrame, toFrame }) => {
  const localFrame = frame - fromFrame;
  const duration = toFrame - fromFrame;

  const fadeIn = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [duration - 5, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        top: PANEL_H,
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity,
        fontFamily: alexandriaFont,
        fontSize: 44,
        fontWeight: 800,
        color: "#FFFFFF",
        direction: "rtl",
        padding: "16px 32px",
        borderRadius: 14,
        backgroundColor: "#1B1B1D",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
        whiteSpace: "normal",
        width: "86%",
        lineHeight: 1.4,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

const BottomCaption: React.FC<{
  text: string;
  frame: number;
  fromFrame: number;
  toFrame: number;
}> = ({ text, frame, fromFrame, toFrame }) => {
  const localFrame = frame - fromFrame;
  const duration = toFrame - fromFrame;

  const fadeIn = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(localFrame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 340,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
        fontFamily: alexandriaFont,
        fontSize: 40,
        fontWeight: 800,
        color: "#FFFFFF",
        direction: "rtl",
        padding: "12px 28px",
        borderRadius: 12,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(8px)",
        textShadow: "0 2px 12px rgba(0, 0, 0, 0.7)",
        whiteSpace: "normal",
        width: "90%",
        lineHeight: 1.4,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

interface HideRange {
  from: number;
  to: number;
}

export const DefusionLLMCaptions: React.FC<{
  hideRanges?: HideRange[];
}> = ({ hideRanges = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isHidden = hideRanges.some((r) => frame >= r.from && frame <= r.to);
  if (isHidden) return null;

  const activeCaption = CAPTIONS.find(
    (c) => frame >= c.from_frame && frame < c.to_frame
  );

  if (!activeCaption) return null;

  const overBRoll = isOverBRoll(frame);
  const hasFaceVideo = frame < FACE_VIDEO_END;
  const isHook = frame >= 0 && frame < HOOK_END;
  const isSplit = SPLIT_RANGES.some(
    (r) => frame >= r.from_frame && frame < r.to_frame
  );

  if (isHook) {
    return (
      <HookCaption
        text={activeCaption.text}
        frame={frame}
        fromFrame={activeCaption.from_frame}
        toFrame={activeCaption.to_frame}
      />
    );
  }

  if (isSplit) {
    return (
      <SplitCaption
        text={activeCaption.text}
        frame={frame}
        fromFrame={activeCaption.from_frame}
        toFrame={activeCaption.to_frame}
      />
    );
  }

  if (hasFaceVideo || overBRoll) {
    return (
      <BottomCaption
        text={activeCaption.text}
        frame={frame}
        fromFrame={activeCaption.from_frame}
        toFrame={activeCaption.to_frame}
      />
    );
  }

  const words = activeCaption.text.split(" ");
  const duration = activeCaption.to_frame - activeCaption.from_frame;
  const framesPerWord = duration / words.length;
  const localFrame = frame - activeCaption.from_frame;

  return (
    <AbsoluteFill>
      {words.map((word, index) => {
        const wordStart = index * framesPerWord;
        const wordLocalFrame = localFrame - wordStart;

        return (
          <KineticWord
            key={`${activeCaption.from_frame}-${index}`}
            word={word}
            localFrame={wordLocalFrame}
            framesPerWord={framesPerWord}
            fps={fps}
          />
        );
      })}
    </AbsoluteFill>
  );
};
