import React from "react";

export type ModelBrand =
  | "anthropic"
  | "openai"
  | "deepseek"
  | "google"
  | "meta"
  | "xai"
  | "kimi"
  | "zhipu";

export const BrandLogo: React.FC<{
  brand: ModelBrand;
  size?: number;
  color?: string;
}> = ({ brand, size = 18, color }) => {
  switch (brand) {
    case "anthropic":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          {/* Anthropic geometric A\ logo */}
          <path
            d="M13.8 3.5h3.6l6.6 17h-3.6l-1.6-4.2h-6.4l-1.6 4.2h-3.6l6.6-17zm-1.8 9.8h4.4l-2.2-5.8-2.2 5.8zM2.8 20.5h3.6L10.2 11h-3.6l-3.8 9.5z"
            fill={color || "#111827"}
          />
        </svg>
      );

    case "openai":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color || "#111827"}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          {/* OpenAI swirl logo */}
          <path d="M12 2a10 10 0 0 0-7.07 17.07l1.42-1.42A8 8 0 1 1 12 4V2z" fill={color || "#111827"} stroke="none" />
          <circle cx="12" cy="12" r="3" fill={color || "#111827"} stroke="none" />
          <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07l1.42-1.42a8 8 0 1 1 11.3-11.3l1.42-1.42z" fill="none" />
        </svg>
      );

    case "deepseek":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          {/* DeepSeek whale tail / dolphin logo */}
          <path
            d="M4.5 14.5c2.2-4.5 6.8-6.2 11.2-5 1.5.4 3.2 1.3 4.3 2.4-1.2.5-2.6.7-4 .4-2.8-.7-5.5.3-7.2 2.5-1.1 1.4-2.8 2.2-4.3-.3z"
            fill={color || "#1D4ED8"}
          />
          <path
            d="M17.5 7.5c1.8-1.5 4.2-1.8 5.5-1.2-.5 1.5-1.5 3.5-3.2 4.2-1.2.5-2.2-.2-2.3-3z"
            fill={color || "#1D4ED8"}
          />
        </svg>
      );

    case "google":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      );

    case "meta":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color || "#0284C7"}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          {/* Meta infinity ribbon loop */}
          <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17c2.5 0 4.5-1.5 6.5-5 2 3.5 4 5 6.5 5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5c-2.5 0-4.5 1.5-6.5 4z" />
        </svg>
      );

    case "xai":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color || "#111827"}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case "kimi":
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: "#111827",
            borderRadius: 3,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 800,
            fontSize: size * 0.65,
            lineHeight: 1,
          }}
        >
          K
        </div>
      );

    case "zhipu":
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: "#1F2937",
            borderRadius: 3,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 800,
            fontSize: size * 0.65,
            lineHeight: 1,
          }}
        >
          Z
        </div>
      );

    default:
      return null;
  }
};

export const MouseCursor: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
      display: "inline-block",
    }}
  >
    <path
      d="M3 3l7 18 3-7 7-3L3 3z"
      fill="#111827"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
