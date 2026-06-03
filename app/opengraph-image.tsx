import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Iqbal Attila — Web Dev Commission";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          color: "#F0EDE7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            fontSize: "20px",
            color: "#C9A352",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#C9A352" }} />
          <span>Web Dev · Frontend · Animation</span>
        </div>
        <div
          style={{
            fontSize: "80px",
            lineHeight: 1.05,
            fontWeight: 400,
            marginBottom: "24px",
          }}
        >
          Membangun web yang{" "}
          <em style={{ color: "#C9A352", fontWeight: 300 }}>tajam</em>.
        </div>
        <div style={{ fontSize: "24px", color: "#A39F97", maxWidth: "800px" }}>
          Rate card untuk jasa web development & frontend oleh Iqbal Attila.
        </div>
      </div>
    ),
    { ...size }
  );
}
