import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const HOOK_BG = "#F0EEEB";

export const HookBroll: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: HOOK_BG, alignItems: "center" }}>
      {/* cuted animation — 720x732, off-white bg matches HOOK_BG */}
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
    </AbsoluteFill>
  );
};
