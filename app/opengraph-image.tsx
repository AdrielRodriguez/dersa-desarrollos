import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const runtime = "edge";
export const alt = content.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#F5F5F7",
          padding: "72px 80px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.32em", fontWeight: 600 }}>DERSA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            {content.hero.title}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#A1A1A6", maxWidth: 900 }}>
            Estudio de arquitectura
          </div>
        </div>
        <div style={{ width: 120, height: 4, background: "#B8A99A" }} />
      </div>
    ),
    size
  );
}
