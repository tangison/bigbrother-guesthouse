#!/usr/bin/env python3
"""QR audit part B: scan BOTH pages of both PDFs at 600 DPI with quadrant
crops, and pdftotext the full documents for any route-like string."""
import json
import re
import subprocess

import cv2
import fitz
import numpy as np

PDFS = {
    "guesthouse": "/home/z/my-project/scripts/tangison/assets/Big_Brother_Guesthouse_Menu_A3_v3.pdf",
    "restaurant": "/home/z/my-project/scripts/tangison/assets/Big_Brothers_Restaurant_Menu_A3.pdf",
}
DET = cv2.QRCodeDetector()


def scan_img(img):
    found = []

    def one(im):
        try:
            data, _, _ = DET.detectAndDecode(im)
            if data:
                found.append(data)
        except cv2.error:
            pass

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    one(gray)
    h, w = gray.shape
    quads = {
        "tl": gray[: h // 2, : w // 2],
        "tr": gray[: h // 2, w // 2 :],
        "bl": gray[h // 2 :, : w // 2],
        "br": gray[h // 2 :, w // 2 :],
        "center": gray[h // 4 : 3 * h // 4, w // 4 : 3 * w // 4],
    }
    for name, q in quads.items():
        big = cv2.resize(q, None, fx=1.6, fy=1.6, interpolation=cv2.INTER_CUBIC)
        one(big)
    return list(dict.fromkeys(found))


def audit(key, path):
    doc = fitz.open(path)
    out = {"pdf": path.split("/")[-1], "pages": {}}
    for pno in range(doc.page_count):
        page = doc[pno]
        pix = page.get_pixmap(dpi=600)
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR) if pix.n == 4 else cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        out["pages"][pno + 1] = scan_img(img)
    return out


def fulltext(path):
    txt = subprocess.run(["pdftotext", path, "-"], capture_output=True, text=True, timeout=90).stdout
    hits = sorted(
        set(
            line.strip()[:200]
            for line in txt.splitlines()
            if re.search(r"restaurant-menu|/menu|https?://|www\.", line, re.I)
        )
    )
    return hits


report = {k: {"qr": audit(k, v), "url_text_hits": fulltext(v)} for k, v in PDFS.items()}
print(json.dumps(report, indent=2))
