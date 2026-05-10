import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Recep Ulaş Uzun — Data, AI & Smart Sensors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(55, 138, 221, 0.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(55, 138, 221, 0.12), transparent 40%)",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#111",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9ca3af" }}>
            recep.uzun
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#378ADD",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.03,
            }}
          >
            <span>Data, AI, and</span>
            <span style={{ color: "#9ca3af" }}>smart sensor systems.</span>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#6b7280",
          }}
        >
          <div style={{ display: "flex" }}>Recep Ulaş Uzun</div>
          <div style={{ display: "flex" }}>Munich, Germany</div>
        </div>
      </div>
    ),
    size
  );
}
