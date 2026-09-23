import { loadFont as loadAlexandria } from "@remotion/google-fonts/Alexandria";
import { loadFont as loadArefRuqaa } from "@remotion/google-fonts/ArefRuqaa";
import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const HOOK_BG = "#F0EEEB";
// Full clip: 2.766s @ 30fps = 83 frames — play all of it (no trim) so the
// tail can overlap caption 2 (starts f60) for the L/J-cut feel before the
// 6-frame crossfade into the face.
export const HOOK_DURATION = 83;

const { fontFamily: alexandriaFont } = loadAlexandria("normal", {
  subsets: ["arabic", "latin"],
  weights: ["600", "700", "800", "900"],
});

const { fontFamily: arefRuqaaFont } = loadArefRuqaa("normal", {
  subsets: ["arabic", "latin"],
  weights: ["400", "700"],
});

// Word-by-word hook captions (30fps) — kinetic style: one word at a time.
// size = base Alexandria; highlight = Aref Ruqaa + green (important word).
const BASE_SIZE = 58; // same as the old hook caption
const BIG_SIZE = 84; // bigger than current
const HIGHLIGHT_SIZE = 96;

interface HookWord {
  from: number;
  to: number;
  text: string;
  size?: number;
  highlight?: boolean;
}

const HOOK_WORDS: HookWord[] = [
  { from: 0, to: 12, text: "بعرف", size: BIG_SIZE },
  { from: 12, to: 27, text: "الإنترنت", size: BIG_SIZE },
  { from: 27, to: 36, text: "كله", size: BASE_SIZE },
  { from: 36, to: 48, text: "حالياً", size: BASE_SIZE },
  { from: 48, to: 60, text: "مفتون", highlight: true },
  { from: 60, to: 72, text: "بـ Jeff", size: BIG_SIZE },
];

// Words shown in pairs on one line: word 1 appears, word 2 joins it when
// spoken, then the line clears. Hard cuts — no animations.
const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const WORD_CHUNKS = chunk(HOOK_WORDS, 2);

const HookWordCaption: React.FC = () => {
  const frame = useCurrentFrame();

  const active = WORD_CHUNKS.find(
    (c) => frame >= c[0].from && frame < c[c.length - 1].to
  );
  if (!active) return null;

  const visible = active.filter((w) => frame >= w.from);
  if (visible.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "58%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 22,
        direction: "rtl",
        whiteSpace: "nowrap",
      }}
    >
      {visible.map((w) => {
        const isHighlight = w.highlight === true;
        return (
          <span
            key={w.from}
            style={{
              fontFamily: isHighlight ? arefRuqaaFont : alexandriaFont,
              fontSize: isHighlight ? HIGHLIGHT_SIZE : (w.size ?? BASE_SIZE),
              fontWeight: isHighlight ? 700 : 900,
              color: isHighlight ? "#1A7A3E" : "#1A1A1A",
              lineHeight: 1.2,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

export const HookBroll: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: HOOK_BG, alignItems: "center" }}>
      {/* cuted animation — 720x732, off-white bg matches HOOK_BG.
          Own <Sequence> so it's an interactive/selectable layer in Studio. */}
      <Sequence
        durationInFrames={HOOK_DURATION}
        name="cuted.mp4"
        style={{
          scale: 1.796,
          translate: "0px 73.5px"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 380,
            width: "100%",
            height: 560,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OffthreadVideo
            src={staticFile("projects/defusion-llm/refrence/cuted.mp4")}
            style={{
              width: "105%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </Sequence>

      {/* word-by-word captions — big / normal / highlighted (Aref Ruqaa) */}
      <HookWordCaption />
    </AbsoluteFill>
  );
};
