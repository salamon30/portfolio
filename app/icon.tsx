import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          borderRadius: 6,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        R
      </div>
    ),
    size
  );
}
