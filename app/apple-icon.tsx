import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — IA sigil on canvas, generous padding for iOS mask rounding.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* gold top-line signature */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "#C9A352",
          }}
        />
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none" role="img">
          <title>Iqbal Attila</title>
          <rect x="34" y="34" width="132" height="132" stroke="#C9A352" strokeWidth="4" />
          <g stroke="#C9A352" strokeWidth="3">
            <path d="M34 46 V34 H46" />
            <path d="M154 34 H166 V46" />
            <path d="M166 154 V166 H154" />
            <path d="M46 166 H34 V154" />
          </g>
          <rect x="62" y="66" width="8" height="68" fill="#C9A352" />
          <rect x="52" y="66" width="28" height="6" fill="#C9A352" />
          <rect x="52" y="128" width="28" height="6" fill="#C9A352" />
          <path
            d="M 99 134 L 117 66 L 135 134"
            stroke="#C9A352"
            strokeWidth="6"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <line x1="106" y1="106" x2="128" y2="106" stroke="#C9A352" strokeWidth="6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
