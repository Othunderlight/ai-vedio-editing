import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

export const HOOK_BG = "#F0EEEB";
// Full clip: 2.766s @ 30fps = 83 frames — play all of it (no trim) so the
// tail can overlap caption 2 (starts f60) for the L/J-cut feel before the
// 6-frame crossfade into the face.
export const HOOK_DURATION = 83;

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
    </AbsoluteFill>
  );
};
