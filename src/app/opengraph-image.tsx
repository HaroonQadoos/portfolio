import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
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
          padding: 72,
          background: "#f3f3f3",
          color: "#111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#10b981" }} />
          <span>Available for new projects</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 36, color: "#666", marginTop: 24 }}>
            {`${profile.role} · Shopify · Webflow · Next.js`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
