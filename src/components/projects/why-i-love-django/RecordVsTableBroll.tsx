import React from "react";
import {
  AbsoluteFill,
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
        gap: 50,
      }}
    >
      <div
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
      <div
        style={{
          opacity: leftOpacity,
          transform: `scale(${leftScale})`,
          backgroundColor: "rgba(239, 68, 68, 0.06)",
          border: "1.5px solid rgba(239, 68, 68, 0.25)",
          borderRadius: 20,
          padding: "20px 24px",
          width: 680,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingBottom: 8,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: 6,
          }}
        >
          {["ID", "Patient", "Status"].map((h) => (
            <div
              key={h}
              style={{
                flex: 1,
                fontSize: 11,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: 1,
              }}
            >
              {h}
            </div>
          ))}
        </div>
        {TABLE_ROWS.map((row, i) => {
          const rowDelay = 18 + i * 3;
          const rowSpring = spring({
            frame: frame - rowDelay,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 100 },
          });
          const isFlashing = row.changed && changeFlash > 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: isFlashing
                  ? `rgba(239, 68, 68, ${0.25 * changeFlash})`
                  : "transparent",
                borderRadius: 8,
                transform: `translateX(${interpolate(rowSpring, [0, 1], [20, 0])}px)`,
                opacity: interpolate(rowSpring, [0, 1], [0, 1]),
              }}
            >
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#D1D5DB" }}>
                #{101 + i}
              </div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#F6F1EB" }}>
                Record #{101 + i}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: 700,
                  color: isFlashing ? "#EF4444" : "#22C55E",
                }}
              >
                {isFlashing ? "CHANGED" : "OK"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Level */}
      <div
        style={{
          opacity: rightOpacity,
          transform: `scale(${rightScale})`,
          backgroundColor: "rgba(34, 197, 94, 0.06)",
          border: "1.5px solid rgba(34, 197, 94, 0.25)",
          borderRadius: 20,
          padding: "20px 24px",
          width: 680,
          zIndex: 10,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        {/* Single record */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4 }}>
            PATIENT RECORD
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#F6F1EB", marginBottom: 2 }}>
            #102
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB" }}>
            Omar Gatab
          </div>
        </div>

        {/* Timeline */}
        <div
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: interpolate(nodeSpring, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(nodeSpring, [0, 1], [0.7, 1])})`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: nodeColor,
                      border: isReverted
                        ? "2px solid #22C55E"
                        : "2px solid rgba(255,255,255,0.2)",
                      boxShadow: isReverted
                        ? "0 0 12px rgba(34, 197, 94, 0.6)"
                        : "none",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: isReverted ? "#22C55E" : "#F6F1EB",
                      }}
                    >
                      Edit #{i + 1}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#6B7280" }}>
                      {node.time}
                    </div>
                  </div>
                  {isReverted && (
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#22C55E",
                        backgroundColor: "rgba(34, 197, 94, 0.15)",
                        padding: "2px 6px",
                        borderRadius: 6,
                        marginLeft: 4,
                      }}
                    >
                      REVERT
                    </div>
                  )}
                </div>
                {i < TIMELINE_NODES.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 22,
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      marginLeft: 5,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
