#!/usr/bin/env python3
"""Labeled contact sheets of the NEW masters so every slug can be verified
against its real content. Fixed tile box: thumbnail on top, slug on a label
strip below, so a label can never be read against the wrong tile."""
import glob
import json
import os
from PIL import Image, ImageDraw, ImageFont

SRC = "/home/z/my-project/public/images"
OUT = "/tmp/msheets"
TILE_W, TILE_H, LABEL_H = 460, 300, 30
COLS = 4
os.makedirs(OUT, exist_ok=True)
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)

report = json.load(open("/home/z/my-project/originals/masters_report.json"))
slugs = [r["slug"] for r in report]

page, batch = [], 0
for i, slug in enumerate(slugs):
    p = os.path.join(SRC, slug + ".jpg")
    im = Image.open(p).convert("RGB")
    im.thumbnail((TILE_W, TILE_H))
    tile = Image.new("RGB", (TILE_W, TILE_H + LABEL_H), (24, 24, 24))
    tile.paste(im, ((TILE_W - im.width) // 2, 0))
    d = ImageDraw.Draw(tile)
    d.text((8, TILE_H + 6), slug, fill=(120, 255, 140), font=font)
    page.append(tile)
    if len(page) == COLS * 5 or i == len(slugs) - 1:
        rows = (len(page) + COLS - 1) // COLS
        sheet = Image.new("RGB", (COLS * TILE_W, rows * (TILE_H + LABEL_H)), (10, 10, 10))
        for j, t in enumerate(page):
            sheet.paste(t, ((j % COLS) * TILE_W, (j // COLS) * (TILE_H + LABEL_H)))
        sheet.save(f"{OUT}/m_{batch:02d}.jpg", quality=74)
        batch += 1
        page = []
print("sheets:", batch, "for", len(slugs), "masters in", OUT)
