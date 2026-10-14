#!/usr/bin/env python3
"""Locate the orange date stamp in stamped camera frames and report crop lines.

The stamp is bright orange text (R>190, 90<G<200, B<110) with dark outline,
always in the bottom half, right-weighted. For each file we find the topmost
row (in the bottom 30%) whose orange-pixel count exceeds a threshold, then
report the safe cut line (stamp top - 2.5% margin). Outputs JSON mapping.
"""
import json
import os
import numpy as np
from PIL import Image

SRC = "/home/z/my-project/originals/gofile"

files = [f for f in os.listdir(SRC) if f.startswith("IMG_") and f.upper().endswith(".JPG")]
out = {}
for f in sorted(files):
    im = Image.open(os.path.join(SRC, f)).convert("RGB")
    w, h = im.size
    top_frac = None
    # scan bottom 30%
    y0 = int(h * 0.70)
    arr = np.asarray(im.crop((0, y0, w, h)), dtype=np.int16)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    mask = (r > 190) & (g > 90) & (g < 200) & (b < 110)
    rows = mask.sum(axis=1)
    thr = max(40, int(w * 0.01))  # a stamp line spans several percent of width
    hits = np.where(rows > thr)[0]
    if len(hits) > 0:
        top_frac = (y0 + int(hits[0])) / h
    out[f] = {
        "w": w,
        "h": h,
        "stamp_top": round(top_frac, 4) if top_frac is not None else None,
    }
    print(f, f"{w}x{h}", "stamp_top:", top_frac)

json.dump(out, open("/home/z/my-project/originals/stamp_lines.json", "w"), indent=1)
print("done", len(files), "files")
