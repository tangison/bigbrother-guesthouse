import { ImageResponse } from "next/og";

// Generated Open Graph card for the guesthouse menu (/menu): ember brand
// colours, the exact page promise, no external assets (build-safe).
export const alt = "Big Brother Guesthouse menu: every price from the printed guesthouse menu, from breakfast to the full bar list";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #3f2d1d 100%)",
          padding: "72px",
          color: "#faf8f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #c85a17, #d97724)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#1c1917",
            }}
          >
            BB
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#d97724" }}>
            Big Brother Guesthouse · Usakos
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Home cooking at Plot 7.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#d6d3d1" }}>
            Every price from our printed menu: breakfast from N$80, grills to the N$400 seafood platter.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a8a29e" }}>
          <div style={{ display: "flex" }}>www.bigbrotherguesthouse.com/menu</div>
          <div style={{ display: "flex" }}>Scan the card · eat at Plot 7</div>
        </div>
      </div>
    ),
    size
  );
}
