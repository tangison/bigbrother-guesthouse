#!/usr/bin/env python3
"""Prompt v3 QR audit, asset-pack edition (authoritative).
Scans page 1 (and page 2 as a safety net) of BOTH compressed menu PDFs in
menus/ at 300 and 600 DPI with quadrant crops, and dumps every route-like
string from the pdftotext layer of both pages.
"""
import json
import re
import subprocess
import sys

import cv2
import fitz
import numpy as np

PDFS = {
    "guesthouse": "/home/z/my-project/menus/Big-Brother-Guesthouse-Menu.pdf",
    "restaurant": "/home/z/my-project/menus/Big-Brothers-Restaurant-Menu.pdf",
}
DET = cv2.QRCodeDetector()


def scan_img(img):
    found = []

    def one(im):
        try:
            data, _, _ = DET.detectAndDecode(im)
            if data:
                found.append(data)
        except cv2.error as e:
            print(f"  [cv2 warn] {e}", flush=True)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    one(gray)
    h, w = gray.shape
    for name, q in {
        "tl": gray[: h // 2, : w // 2],
        "tr": gray[: h // 2, w // 2 :],
        "bl": gray[h // 2 :, : w // 2],
        "br": gray[h // 2 :, w // 2 :],
        "center": gray[h // 4 : 3 * h // 4, w // 4 : 3 * w // 4],
    }.items():
        big = cv2.resize(q, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)
        one(big)
    return list(dict.fromkeys(found))


def audit(key, path):
    doc = fitz.open(path)
    out = {"pdf": path.split("/")[-1], "pages": {}}
    for pno in range(doc.page_count):
        page = doc[pno]
        entry = {"qr": [], "text_layer_hits": []}
        for dpi in (300, 600):
            pix = page.get_pixmap(dpi=dpi)
            img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
            img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR) if pix.n == 4 else cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            for d in scan_img(img):
                if {"dpi": dpi, "decoded": d} not in entry["qr"]:
                    entry["qr"].append({"dpi": dpi, "decoded": d})
        text = page.get_text()
        for line in text.splitlines():
            if re.search(r"/restaurant-menu|/restaurant/menu|/menu|https?://|www\.", line, re.I):
                entry["text_layer_hits"].append(line.strip()[:250])
        out["pages"][pno + 1] = entry
        print(f"[{key}] page {pno+1}: {len(entry['qr'])} QR, {len(entry['text_layer_hits'])} text hits", flush=True)
    return out


report = {k: audit(k, v) for k, v in PDFS.items()}
print(json.dumps(report, indent=2))
