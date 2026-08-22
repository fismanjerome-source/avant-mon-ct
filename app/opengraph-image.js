import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1B3A5C 0%, #2E5077 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "4px solid #D9A62E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D9A62E",
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 28,
          }}
        >
          ✓
        </div>
        <div style={{ color: "white", fontSize: 62, fontWeight: 700 }}>Avant Mon CT</div>
        <div style={{ color: "#D9A62E", fontSize: 28, marginTop: 18, fontWeight: 600 }}>
          Checklist, rappels et centres agréés — gratuit
        </div>
      </div>
    ),
    { ...size }
  );
}
