import React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";


const TABLE_ROWS = [
  { changed: false },
  { changed: true },
  { changed: false },
  { changed: true },
  { changed: false },
];

const TIMELINE_NODES = [
  { time: "10:32 AM", color: "#6B7280" },
  { time: "11:15 AM", color: "#6B7280" },
  { time: "02:48 PM", color: "#22C55E" },
  { time: "04:05 PM", color: "#3B82F6" },
];

export const RecordVsTableBroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitDuration = 12;
  const exitStart = durationInFrames - exitDuration;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const leftSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 85 },
  });
  const leftScale = interpolate(leftSpring, [0, 1], [0.85, 1.5]);
  const leftOpacity = interpolate(frame, [6, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 85 },
  });
  const rightScale = interpolate(rightSpring, [0, 1], [0.85, 1.5]);
  const rightOpacity = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const changeFlash = interpolate(frame, [45, 51, 57, 63], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const revertNode = 2;
  const revertSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D1117",
        opacity: exitOpacity,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <Interactive.Div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(34, 197, 94, 0.1) 45%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* Table Level */}
      <Interactive.Div
        style={{
          opacity: leftOpacity,
          transform: `scale(${leftScale})`,
          backgroundColor: "rgba(239, 68, 68, 0.06)",
          border: "2px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 24,
          padding: "28px 36px",
          width: 820,
          zIndex: 10,
          translate: "258.9px -302.9px",
          scale: 1.239
        }}
      >
        <Interactive.Div
          style={{
            display: "flex",
            gap: 5,
            paddingBottom: 12,
            borderBottom: "1.5px solid rgba(255, 255, 255, 0.12)",
            marginBottom: 8,
          }}
        >
          {["ID", "DRUG"].map((h) => (
            <Interactive.Div
              key={h}
              style={{
                flex: 1,
                fontSize: 14,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: 1.5,
              }}
            >
              {h}
            </Interactive.Div>
          ))}
        </Interactive.Div>
        {TABLE_ROWS.map((row, i) => {
          const rowDelay = 18 + i * 3;
          const rowSpring = spring({
            frame: frame - rowDelay,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 100 },
          });
          const isFlashing = row.changed && changeFlash > 0;

          return (
            <Interactive.Div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                backgroundColor: isFlashing
                  ? `rgba(239, 68, 68, ${0.25 * changeFlash})`
                  : "transparent",
                borderRadius: 10,
                transform: `translateX(${interpolate(rowSpring, [0, 1], [20, 0])}px)`,
                opacity: interpolate(rowSpring, [0, 1], [0, 1]),
              }}
            >
              <Interactive.Div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#D1D5DB" }}>
                #{101 + i}
              </Interactive.Div>
              <Interactive.Div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#F6F1EB" }}>
                Record #{101 + i}
              </Interactive.Div>
            </Interactive.Div>
          );
        })}
      </Interactive.Div>

      {/* Record Level */}
      <Interactive.Div
        style={{
          opacity: rightOpacity,
          transform: `scale(${rightScale})`,
          backgroundColor: "rgba(34, 197, 94, 0.06)",
          border: "2px solid rgba(34, 197, 94, 0.3)",
          borderRadius: 24,
          padding: "32px 40px",
          width: 820,
          zIndex: 10,
          display: "flex",
          gap: 28,
          alignItems: "center",
          translate: "-425.5px 49.9px",
          scale: 1.858
        }}
      >
        {/* Single record */}
        <Interactive.Div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 255, 255, 0)",
            padding: "24px 28px",
            translate: "334px -89.6px",
            scale: 0.989
          }}
        >
          <Interactive.Div style={{ fontSize: 14, fontWeight: 700, color: "#6B7280", marginBottom: 6 }}>
            DRUG RECORD
          </Interactive.Div>
          <Interactive.Div style={{ fontSize: 28, fontWeight: 800, color: "#F6F1EB", marginBottom: 4 }}>
            #102
          </Interactive.Div>
          <Interactive.Div style={{ fontSize: 18, fontWeight: 600, color: "#D1D5DB" }}>
            Aspirin
          </Interactive.Div>
        </Interactive.Div>

        {/* Timeline */}
        <Interactive.Div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            flex: 1,
          }}
        >
          {TIMELINE_NODES.map((node, i) => {
            const nodeDelay = 28 + i * 7;
            const nodeSpring = spring({
              frame: frame - nodeDelay,
              fps,
              config: { damping: 12, mass: 0.5, stiffness: 120 },
            });
            const isReverted = i === revertNode && frame >= 65;
            const nodeColor = isReverted
              ? interpolate(revertSpring, [0, 1], [0, 1]) > 0.5
                ? "#22C55E"
                : node.color
              : node.color;

            return (
              <React.Fragment key={i}>
                <Interactive.Div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: interpolate(nodeSpring, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(nodeSpring, [0, 1], [0.7, 1])})`,
                  }}
                >
                  <Interactive.Div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: nodeColor,
                      border: isReverted
                        ? "2.5px solid #22C55E"
                        : "2.5px solid rgba(255,255,255,0.2)",
                      boxShadow: isReverted
                        ? "0 0 16px rgba(34, 197, 94, 0.6)"
                        : "none",
                    }}
                  />
                  <Interactive.Div>
                    <Interactive.Div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: isReverted ? "#22C55E" : "#F6F1EB",
                      }}
                    >
                      Edit #{i + 1}
                    </Interactive.Div>
                    <Interactive.Div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>
                      {node.time}
                    </Interactive.Div>
                  </Interactive.Div>
                  {isReverted && (
                    <Interactive.Div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#22C55E",
                        backgroundColor: "rgba(34, 197, 94, 0.15)",
                        padding: "3px 8px",
                        borderRadius: 6,
                        marginLeft: 4,
                      }}
                    >
                      REVERT
                    </Interactive.Div>
                  )}
                </Interactive.Div>
                {i < TIMELINE_NODES.length - 1 && (
                  <Interactive.Div
                    style={{
                      width: 2.5,
                      height: 28,
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      marginLeft: 7,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
