import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
  { from_frame: 0, to_frame: 60, text: "ليش بحب Django؟" },
  { from_frame: 90, to_frame: 150, text: "فأنا ورفقاتي شغالين على مشروع طبي" },
  { from_frame: 180, to_frame: 240, text: "فيه ترجمة وتدقيق وهكذا" },
  { from_frame: 270, to_frame: 330, text: "الأخطاء أكيد رح تحدث لا محالة" },
  { from_frame: 360, to_frame: 450, text: "فبدي طريقة كان أحسن أعمل Revert" },
  { from_frame: 450, to_frame: 510, text: "للخطأ ليرجع الصح" },
  { from_frame: 540, to_frame: 600, text: "فهو مثل Git، هذا هو الفكرت فيه" },
  { from_frame: 630, to_frame: 690, text: "إنه أساويها Git بس لكل شي" },
  { from_frame: 690, to_frame: 750, text: "أعمل مثلاً git commit لكل تعديلات بتصير" },
  { from_frame: 780, to_frame: 870, text: "بس هذا الشي ما رح يصير لأنه أنا بدي ياها بالـ record" },
  { from_frame: 870, to_frame: 990, text: "ما بدي ياها بالعمودي يعني، إنه بالـ table، لا بدي ياها بالـ record" },
  { from_frame: 1020, to_frame: 1140, text: "فـ بعد تبحيـ.. بحثت شوي هيك هيك رأيت" },
  { from_frame: 1140, to_frame: 1200, text: "Django Simple History" },
  { from_frame: 1230, to_frame: 1290, text: "هي بتعمل كل شي بدي ياه" },
  { from_frame: 1290, to_frame: 1350, text: "بروح عالـ Admin" },
  { from_frame: 1350, to_frame: 1410, text: "بطلع بلاقي قائمة بكل التعديلات" },
  { from_frame: 1440, to_frame: 1470, text: "الوقت" },
  { from_frame: 1470, to_frame: 1530, text: "وأي واحد بدي ياه بس بكبس عليه" },
  { from_frame: 1530, to_frame: 1620, text: "بعدين بحط Revert بنرجع عليه" },
  { from_frame: 1650, to_frame: 1740, text: "والأحلى من هيك، إنه القصة ما بتاخد غير سطرين بس" },
  { from_frame: 1800, to_frame: 1860, text: "السطر الأول بالـ settings" },
  { from_frame: 1860, to_frame: 1950, text: "والسطر الثاني محل كل model" },
  { from_frame: 1950, to_frame: 2040, text: "بدي أضفلا هي الـ feature" },
];

const B_ROLL_RANGES: BRollRange[] = [
  { from_frame: 1140, to_frame: 1230 },
  { from_frame: 1290, to_frame: 1620 },
  { from_frame: 1800, to_frame: 1860 },
  { from_frame: 1860, to_frame: 2040 },
];

const FACE_VIDEO_END = 1646;

function isOverBRoll(frame: number): boolean {
  return B_ROLL_RANGES.some((r) => frame >= r.from_frame && frame <= r.to_frame);
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
        whiteSpace: "normal", // allows text to wrap automatically
        width: "90%",         // gives the container space to break lines
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

export const WhyILoveDjangoCaptions: React.FC<{
  hideRanges?: HideRange[];
}> = ({ hideRanges = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isHidden = hideRanges.some((r) => frame >= r.from && frame <= r.to);
  if (isHidden) return null;

  const activeCaption = CAPTIONS.find(
    (c) => frame >= c.from_frame && frame <= c.to_frame
  );

  if (!activeCaption) return null;

  const overBRoll = isOverBRoll(frame);
  const hasFaceVideo = frame < FACE_VIDEO_END;

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
  const disableFade = activeCaption.text.startsWith("والأحلى");

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
            disableFade={disableFade}
          />
        );
      })}
    </AbsoluteFill>
  );
};
