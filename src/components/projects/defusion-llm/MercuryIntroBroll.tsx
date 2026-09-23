import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

// Full-screen Mercury 2.5 intro clip — 1290-1830 (18s of the 22.6s source),
// exact 9:16 (514x914) so cover fills without cropping.
// Muted: voiceover stays on top (unmute only if the clip's own audio is wanted).
export const MercuryIntroBroll: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <OffthreadVideo
        src={staticFile("projects/defusion-llm/assets/intorucing-mercury-2-5.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Bottom scrim fade — keeps the bottom caption pill readable over video */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 640,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
