import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: monoFont } = loadJetBrainsMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});

const { fontFamily: uiFont } = loadPlusJakartaSans("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

interface CodeLine {
  lineNum: number;
  indent: number;
  tokens: Array<{ text: string; color: string }>;
}

// Extensive, realistic TypeScript API boilerplate & OpenAPI documentation lines
const BOILERPLATE_CODE_LINES: CodeLine[] = [
  {
    lineNum: 1,
    indent: 0,
    tokens: [
      { text: "import", color: "#F43F5E" },
      { text: " { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpStatus } ", color: "#E2E8F0" },
      { text: "from", color: "#F43F5E" },
      { text: " '@nestjs/common';", color: "#34D399" },
    ],
  },
  {
    lineNum: 2,
    indent: 0,
    tokens: [
      { text: "import", color: "#F43F5E" },
      { text: " { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } ", color: "#E2E8F0" },
      { text: "from", color: "#F43F5E" },
      { text: " '@nestjs/swagger';", color: "#34D399" },
    ],
  },
  {
    lineNum: 3,
    indent: 0,
    tokens: [
      { text: "import", color: "#F43F5E" },
      { text: " { CreateUserDto, UpdateUserDto, UserFilterDto, UserResponseDto } ", color: "#E2E8F0" },
      { text: "from", color: "#F43F5E" },
      { text: " './dto';", color: "#34D399" },
    ],
  },
  {
    lineNum: 4,
    indent: 0,
    tokens: [
      { text: "import", color: "#F43F5E" },
      { text: " { UsersService } ", color: "#E2E8F0" },
      { text: "from", color: "#F43F5E" },
      { text: " './users.service';", color: "#34D399" },
    ],
  },
  { lineNum: 5, indent: 0, tokens: [] },
  {
    lineNum: 6,
    indent: 0,
    tokens: [
      { text: "@ApiTags", color: "#FBBF24" },
      { text: "('Users Management API')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 7,
    indent: 0,
    tokens: [
      { text: "@ApiBearerAuth", color: "#FBBF24" },
      { text: "('JWT-auth')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 8,
    indent: 0,
    tokens: [
      { text: "@Controller", color: "#FBBF24" },
      { text: "('api/v1/users')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 9,
    indent: 0,
    tokens: [
      { text: "export class", color: "#F43F5E" },
      { text: " UsersController {", color: "#60A5FA" },
    ],
  },
  {
    lineNum: 10,
    indent: 1,
    tokens: [
      { text: "constructor(", color: "#93C5FD" },
      { text: "private readonly", color: "#F43F5E" },
      { text: " usersService: UsersService", color: "#CBD5E1" },
      { text: ") {}", color: "#93C5FD" },
    ],
  },
  { lineNum: 11, indent: 1, tokens: [] },
  {
    lineNum: 12,
    indent: 1,
    tokens: [
      { text: "/** GET /api/v1/users - Paginated collection list **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 13,
    indent: 1,
    tokens: [
      { text: "@Get", color: "#FBBF24" },
      { text: "()", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 14,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'List all registered users with filter & cursor pagination'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 15,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.OK, type: [UserResponseDto] })", color: "#A78BFA" },
    ],
  },
  {
    lineNum: 16,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " findAll(", color: "#60A5FA" },
      { text: "@Query()", color: "#FBBF24" },
      { text: " filter: UserFilterDto", color: "#E2E8F0" },
      { text: "): Promise<UserResponseDto[]> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 17,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.findAll(filter);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 18,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 19, indent: 1, tokens: [] },
  {
    lineNum: 20,
    indent: 1,
    tokens: [
      { text: "/** POST /api/v1/users - Create new user record **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 21,
    indent: 1,
    tokens: [
      { text: "@Post", color: "#FBBF24" },
      { text: "()", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 22,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Create a new user with validation and verification hook'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 23,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.CREATED, type: UserResponseDto })", color: "#A78BFA" },
    ],
  },
  {
    lineNum: 24,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })", color: "#F87171" },
    ],
  },
  {
    lineNum: 25,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " create(", color: "#60A5FA" },
      { text: "@Body()", color: "#FBBF24" },
      { text: " dto: CreateUserDto", color: "#E2E8F0" },
      { text: "): Promise<UserResponseDto> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 26,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.create(dto);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 27,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 28, indent: 1, tokens: [] },
  {
    lineNum: 29,
    indent: 1,
    tokens: [
      { text: "/** GET /api/v1/users/:id - Lookup entity by UUID **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 30,
    indent: 1,
    tokens: [
      { text: "@Get", color: "#FBBF24" },
      { text: "(':id')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 31,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Retrieve single user details by unique identifier'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 32,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.OK, type: UserResponseDto })", color: "#A78BFA" },
    ],
  },
  {
    lineNum: 33,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.NOT_FOUND, description: 'User not found' })", color: "#F87171" },
    ],
  },
  {
    lineNum: 34,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " findOne(", color: "#60A5FA" },
      { text: "@Param('id')", color: "#FBBF24" },
      { text: " id: string", color: "#E2E8F0" },
      { text: "): Promise<UserResponseDto> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 35,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.findOne(id);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 36,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 37, indent: 1, tokens: [] },
  {
    lineNum: 38,
    indent: 1,
    tokens: [
      { text: "/** PUT /api/v1/users/:id - Complete resource update **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 39,
    indent: 1,
    tokens: [
      { text: "@Put", color: "#FBBF24" },
      { text: "(':id')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 40,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Full replacement update of existing user fields'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 41,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.OK, type: UserResponseDto })", color: "#A78BFA" },
    ],
  },
  {
    lineNum: 42,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " update(", color: "#60A5FA" },
      { text: "@Param('id')", color: "#FBBF24" },
      { text: " id: string, ", color: "#E2E8F0" },
      { text: "@Body()", color: "#FBBF24" },
      { text: " dto: UpdateUserDto", color: "#E2E8F0" },
      { text: "): Promise<UserResponseDto> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 43,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.update(id, dto);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 44,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 45, indent: 1, tokens: [] },
  {
    lineNum: 46,
    indent: 1,
    tokens: [
      { text: "/** PATCH /api/v1/users/:id/status - Partial state transition **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 47,
    indent: 1,
    tokens: [
      { text: "@Patch", color: "#FBBF24" },
      { text: "(':id/status')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 48,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Activate or suspend account credentials'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 49,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " updateStatus(", color: "#60A5FA" },
      { text: "@Param('id')", color: "#FBBF24" },
      { text: " id: string, ", color: "#E2E8F0" },
      { text: "@Body('isActive')", color: "#FBBF24" },
      { text: " isActive: boolean", color: "#E2E8F0" },
      { text: "): Promise<UserResponseDto> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 50,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.setStatus(id, isActive);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 51,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 52, indent: 1, tokens: [] },
  {
    lineNum: 53,
    indent: 1,
    tokens: [
      { text: "/** DELETE /api/v1/users/:id - Soft delete entity **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 54,
    indent: 1,
    tokens: [
      { text: "@Delete", color: "#FBBF24" },
      { text: "(':id')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 55,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Remove or archive user data'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 56,
    indent: 1,
    tokens: [
      { text: "@ApiResponse", color: "#FBBF24" },
      { text: "({ status: HttpStatus.NO_CONTENT })", color: "#A78BFA" },
    ],
  },
  {
    lineNum: 57,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " remove(", color: "#60A5FA" },
      { text: "@Param('id')", color: "#FBBF24" },
      { text: " id: string", color: "#E2E8F0" },
      { text: "): Promise<void> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 58,
    indent: 2,
    tokens: [
      { text: "await this", color: "#F43F5E" },
      { text: ".usersService.remove(id);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 59,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  { lineNum: 60, indent: 1, tokens: [] },
  {
    lineNum: 61,
    indent: 1,
    tokens: [
      { text: "/** POST /api/v1/users/batch - Bulk data ingestion **/", color: "#64748B" },
    ],
  },
  {
    lineNum: 62,
    indent: 1,
    tokens: [
      { text: "@Post", color: "#FBBF24" },
      { text: "('batch')", color: "#38BDF8" },
    ],
  },
  {
    lineNum: 63,
    indent: 1,
    tokens: [
      { text: "@ApiOperation", color: "#FBBF24" },
      { text: "({ summary: ", color: "#E2E8F0" },
      { text: "'Batch import multiple users in an atomic transaction'", color: "#34D399" },
      { text: " })", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 64,
    indent: 1,
    tokens: [
      { text: "async", color: "#F43F5E" },
      { text: " bulkCreate(", color: "#60A5FA" },
      { text: "@Body()", color: "#FBBF24" },
      { text: " items: CreateUserDto[]", color: "#E2E8F0" },
      { text: "): Promise<{ count: number }> {", color: "#93C5FD" },
    ],
  },
  {
    lineNum: 65,
    indent: 2,
    tokens: [
      { text: "return this", color: "#F43F5E" },
      { text: ".usersService.bulkCreate(items);", color: "#E2E8F0" },
    ],
  },
  {
    lineNum: 66,
    indent: 1,
    tokens: [{ text: "}", color: "#93C5FD" }],
  },
  {
    lineNum: 67,
    indent: 0,
    tokens: [{ text: "}", color: "#60A5FA" }],
  },
];

export interface BRollApiDocumentationProps {
  scrollSpeed?: number;
}

export const BRollApiDocumentation: React.FC<BRollApiDocumentationProps> = ({
  scrollSpeed = 1.6,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const isLandscape = width > height;

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 90 },
  });
  const windowScale = interpolate(enterSpring, [0, 1], [0.96, 1.0]);
  const windowOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fast AI streaming code generation speed:
  // Rapidly types out lines like an AI model generating at 90+ tokens/sec
  const visibleLinesCount = Math.min(
    BOILERPLATE_CODE_LINES.length,
    Math.floor(
      interpolate(frame, [0, durationInFrames - 15], [16, BOILERPLATE_CODE_LINES.length + 1], {
        extrapolateRight: "clamp",
      })
    )
  );

  // Fast continuous vertical scrolling as code streams down
  const maxScroll = Math.max(0, (visibleLinesCount - 28) * 38 + 120);
  const scrollOffset = interpolate(
    frame,
    [10, durationInFrames],
    [0, maxScroll * scrollSpeed],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fast blinking cyan cursor at the active streaming token
  const cursorBlink = Math.floor(frame / 4) % 2 === 0;

  // Exit transition in last 12 frames
  const exitDuration = 12;
  const exitStart = durationInFrames - exitDuration;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07080B",
        opacity: exitOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isLandscape ? "24px 32px" : "36px 24px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: uiFont,
      }}
    >
      {/* Background Ambient Glow: Neon Emerald & Deep Cyber Cyan */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Full-Width IDE Code Window */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0D1117",
          borderRadius: 26,
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 30px 80px -15px rgba(0, 0, 0, 0.85), 0 0 50px rgba(16, 185, 129, 0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${windowScale})`,
          opacity: windowOpacity,
          zIndex: 20,
        }}
      >
        {/* IDE Header Bar: Only Mac buttons & clean users.controller.ts tab */}
        <div
          style={{
            height: 64,
            backgroundColor: "#161B22",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 24px",
            boxSizing: "border-box",
            gap: 28,
          }}
        >
          {/* Window Control Mac Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 8px rgba(239, 68, 68, 0.4)",
              }}
            />
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
                boxShadow: "0 0 8px rgba(245, 158, 11, 0.4)",
              }}
            />
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)",
              }}
            />
          </div>

          {/* Single Active IDE Tab */}
          <div
            style={{
              backgroundColor: "#0D1117",
              padding: "10px 24px",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              border: "1px solid rgba(255, 255, 255, 0.09)",
              borderBottom: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 17,
              fontWeight: 600,
              color: "#38BDF8",
              fontFamily: monoFont,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#38BDF8", fontWeight: 800 }}>TS</span>
            <span>users.controller.ts</span>
          </div>
        </div>

        {/* Clean Breadcrumb Path Bar */}
        <div
          style={{
            height: 40,
            backgroundColor: "#0F141C",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 26px",
            fontSize: 14,
            color: "#64748B",
            fontFamily: monoFont,
            gap: 8,
          }}
        >
          <span>src</span>
          <span>›</span>
          <span>modules</span>
          <span>›</span>
          <span>users</span>
          <span>›</span>
          <span style={{ color: "#E2E8F0", fontWeight: 600 }}>users.controller.ts</span>
        </div>

        {/* IDE Code Editor Body (Fast Streaming & Fast Scrolling View) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: "20px 0",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              transform: `translateY(-${scrollOffset}px)`,
              display: "flex",
              flexDirection: "column",
              fontFamily: monoFont,
              fontSize: 20,
              lineHeight: "38px",
            }}
          >
            {BOILERPLATE_CODE_LINES.slice(0, visibleLinesCount).map((line, idx) => {
              const isLastStreamedLine = idx === visibleLinesCount - 1;

              return (
                <div
                  key={line.lineNum}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 28px",
                    height: 38,
                    backgroundColor: isLastStreamedLine
                      ? "rgba(56, 189, 248, 0.08)"
                      : "transparent",
                  }}
                >
                  {/* Line Number */}
                  <div
                    style={{
                      width: 58,
                      textAlign: "right",
                      marginRight: 28,
                      color: isLastStreamedLine ? "#38BDF8" : "#475569",
                      fontWeight: isLastStreamedLine ? 700 : 400,
                      userSelect: "none",
                      fontSize: 17,
                    }}
                  >
                    {line.lineNum}
                  </div>

                  {/* Code Content */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: line.indent * 32,
                      whiteSpace: "pre",
                    }}
                  >
                    {line.tokens.map((token, i) => (
                      <span key={i} style={{ color: token.color }}>
                        {token.text}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Glowing Neon Cursor at current AI generation point */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                height: 38,
                backgroundColor: "rgba(56, 189, 248, 0.06)",
              }}
            >
              <div
                style={{
                  width: 58,
                  textAlign: "right",
                  marginRight: 28,
                  color: "#38BDF8",
                  fontSize: 17,
                  fontWeight: 700,
                }}
              >
                {visibleLinesCount + 1}
              </div>
              <div
                style={{
                  width: 12,
                  height: 28,
                  backgroundColor: cursorBlink ? "#38BDF8" : "transparent",
                  boxShadow: cursorBlink ? "0 0 14px #38BDF8" : "none",
                  marginLeft: 32,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
