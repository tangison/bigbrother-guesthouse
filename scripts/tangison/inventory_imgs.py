#!/usr/bin/env python3
"""Inventory every available real image source: dimensions, size, aspect, duplicates."""
from PIL import Image
import os, glob, hashlib

def inv(pattern, label):
    print(f"=== {label} ===")
    files = sorted(glob.glob(pattern))
    hashes = {}
    rows = []
    for f in files:
        try:
            im = Image.open(f)
            w, h = im.size
            kb = os.path.getsize(f) // 1024
            md5 = hashlib.md5(open(f, 'rb').read()).hexdigest()[:10]
            rows.append((os.path.basename(f), w, h, kb, md5))
        except Exception as e:
            rows.append((os.path.basename(f), 0, 0, 0, f"ERR {e}"))
    dupes = {}
    for name, w, h, kb, md5 in rows:
        dupes.setdefault(md5, []).append(name)
    small = [r for r in rows if r[1] < 500]
    print(f"total={len(rows)} small<500px={len(small)}")
    for name, w, h, kb, md5 in rows:
        d = " DUP" if len(dupes.get(md5, [])) > 1 else ""
        print(f"{name:36s} {w:5d}x{h:<5d} {kb:5d}KB {md5}{d}")
    if len(dupes):
        multi = {k: v for k, v in dupes.items() if len(v) > 1}
        if multi:
            print("DUPLICATE GROUPS:")
            for k, v in multi.items():
                print(f"  {k}: {v}")

inv('/home/z/my-project/scripts/bbgh/siteimgs/*.jpg', 'LIVE SITE images (old google site)')
inv('/home/z/my-project/scripts/tangison/assets/IMG-*.jpg', 'OWNER WhatsApp images (filebin)')
