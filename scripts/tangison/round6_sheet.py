#!/usr/bin/env python3
"""Round 6 review sheet: 13 Gofile restaurant images + uploaded WA0151, labeled tiles."""
import os
from PIL import Image, ImageDraw, ImageFont

SRC = "/home/z/my-project/originals/gofile-restaurant"
EXTRA = ["/home/z/my-project/upload/IMG-20261014-WA0151.jpg"]
OUT = "/tmp/round6_sheet.jpg"

files = sorted(os.listdir(SRC))
files = [os.path.join(SRC, f) for f in files if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))] + EXTRA

COLS, TW, TH, LABEL = 4, 420, 300, 34
rows = (len(files) + COLS - 1) // COLS
sheet = Image.new("RGB", (COLS * TW, rows * (TH + LABEL)), (24, 24, 28))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
except Exception:
    font = ImageFont.load_default()

for idx, path in enumerate(files):
    r, c = divmod(idx, COLS)
    try:
        im = Image.open(path).convert("RGB")
        im.thumbnail((TW - 8, TH - 8))
        x = c * TW + (TW - im.width) // 2
        y = r * (TH + LABEL) + (TH - im.height) // 2
        sheet.paste(im, (x, y))
    except Exception as e:
        draw.text((c * TW + 10, r * (TH + LABEL) + 10), f"ERR {e}", fill=(255, 80, 80), font=font)
    label = os.path.basename(path)[:38]
    draw.text((c * TW + 10, r * (TH + LABEL) + TH + 4), label, fill=(255, 220, 120), font=font)

sheet.save(OUT, quality=82)
print(OUT, sheet.size, f"{len(files)} tiles")
