import { ImageResponse } from "next/og";

// Generated Open Graph card for the restaurant menu (/restaurant/menu):
// lime brand accent on ink, the exact page promise, no external assets.
export const alt = "Big Brothers Restaurant menu: every price from the printed restaurant menu, from kapana to the seafood platter";
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
          background: "linear-gradient(135deg, #10160f 0%, #1a2418 60%, #23331f 100%)",
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
              background: "linear-gradient(135deg, #9ae600, #7bc400)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#10160f",
            }}
          >
            BR
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#9ae600" }}>
            Big Brothers Restaurant · Est. 2023
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Good food, great vibes.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#d6d3d1" }}>
            Kapana, grills, pizza and seafood in Usakos town centre. From N$23 to the N$400 platter.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a8a29e" }}>
          <div style={{ display: "flex" }}>www.bigbrotherguesthouse.com/restaurant/menu</div>
          <div style={{ display: "flex" }}>Corner of Theo-Ben Gurirab &amp; Bismarck</div>
        </div>
      </div>
    ),
    size
  );
}
