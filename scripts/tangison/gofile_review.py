#!/usr/bin/env python3
"""Inventory + technical quality stats for every downloaded Gofile image.

Outputs originals_manifest.json (name, bytes, format, WxH, sharpness, brightness)
and contact sheets (20 tiles each, labeled) for visual review of every image.
Sharpness = stddev of FIND_EDGES luminance (higher = sharper).
Brightness = mean luminance 0-255 (under 60 = dark).
"""
import json
import os

from PIL import Image, ImageDraw, ImageFilter, ImageStat, ImageOps

SRC = "/home/z/my-project/originals/gofile"
OUT = "/home/z/my-project/originals"
SHEETS = "/tmp/sheets"
TILE_W, TILE_H, LABEL_H = 460, 300, 26
COLS = 4

Image.MAX_IMAGE_PIXELS = 200_000_000
os.makedirs(SHEETS, exist_ok=True)


def stats(im: Image.Image) -> dict:
    g = im.convert("L")
    edges = g.filter(ImageFilter.FIND_EDGES)
    sharp = ImageStat.Stat(edges).stddev[0]
    bright = ImageStat.Stat(g).mean[0]
    return {"sharp": round(sharp, 1), "bright": round(bright, 1)}


def main() -> None:
    files = sorted(f for f in os.listdir(SRC) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif")))
    manifest = []
    for f in files:
        p = os.path.join(SRC, f)
        try:
            im = Image.open(p)
            im.load()
            fmt = im.format
            w, h = im.size
            s = stats(im)
            manifest.append({
                "name": f, "bytes": os.path.getsize(p), "format": fmt,
                "w": w, "h": h, **s,
            })
        except Exception as e:
            manifest.append({"name": f, "bytes": os.path.getsize(p), "error": str(e)[:120]})

    json.dump(manifest, open(os.path.join(OUT, "gofile_manifest.json"), "w"), indent=1)

    # contact sheets: every image, thumbnail tiles, labeled with short name + stats
    batch, page = 0, []
    tiles_per_sheet = COLS * 5
    for idx, m in enumerate(manifest):
        if "error" in m:
            continue
        p = os.path.join(SRC, m["name"])
        try:
            im = Image.open(p)
            im = ImageOps.exif_transpose(im).convert("RGB")
        except Exception:
            continue
        im.thumbnail((TILE_W, TILE_H))
        tile = Image.new("RGB", (TILE_W, TILE_H + LABEL_H), (24, 24, 24))
        tile.paste(im, ((TILE_W - im.width) // 2, 0))
        d = ImageDraw.Draw(tile)
        short = m["name"][:38]
        d.text((6, TILE_H + 4), f"{short}", fill=(255, 220, 120))
        d.text((6, TILE_H + 15), f"{m['w']}x{m['h']} {round(m['bytes']/1024)}KB sh={m['sharp']} br={m['bright']}", fill=(160, 220, 255))
        page.append(tile)
        if len(page) == tiles_per_sheet or idx == len(manifest) - 1:
            rows = (len(page) + COLS - 1) // COLS
            sheet = Image.new("RGB", (COLS * TILE_W, rows * (TILE_H + LABEL_H)), (12, 12, 12))
            for i, t in enumerate(page):
                sheet.paste(t, ((i % COLS) * TILE_W, (i // COLS) * (TILE_H + LABEL_H)))
            sheet.save(f"{SHEETS}/sheet_{batch:02d}.jpg", quality=72)
            batch += 1
            page = []

    print(f"inventory: {len(manifest)} files, {batch} contact sheets in {SHEETS}")
    good = [m for m in manifest if "error" not in m]
    small = [m for m in good if m["w"] < 1200 and m["w"] >= 800]
    tiny = [m for m in good if m["w"] < 800]
    print(f"under 1200w: {len(small)}, under 800w: {len(tiny)}")
    dark = [m for m in good if m["bright"] < 60]
    print("dark (br<60):", [m["name"][:30] for m in dark])


if __name__ == "__main__":
    main()
