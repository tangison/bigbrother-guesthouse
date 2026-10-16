#!/usr/bin/env python3
"""Prompt v3 QR audit: decode every QR code on page 1 of both menu print PDFs.
Reports the exact URL each QR encodes, plus the printed/hidden text near it.
No invented URLs: only what the decoders actually return.
"""
import json
import subprocess
import sys

import cv2
import fitz  # PyMuPDF
import numpy as np

PDFS = {
    "guesthouse": "/home/z/my-project/scripts/tangison/assets/Big_Brother_Guesthouse_Menu_A3_v3.pdf",
    "restaurant": "/home/z/my-project/scripts/tangison/assets/Big_Brothers_Restaurant_Menu_A3.pdf",
}


def decode_best(img):
    """Try several decodes, return list of unique non-empty strings."""
    found = []

    def try_decode(im):
        det = cv2.QRCodeDetector()
        # single
        data, _, _ = det.detectAndDecode(im)
        if data:
            found.append(data)
        # multi
        ok, datas, _, _ = det.detectAndDecodeMulti(im)
        if ok and datas:
            for d in datas:
                if d:
                    found.append(d)

    variants = [img]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    variants.append(gray)
    big = cv2.resize(gray, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    variants.append(big)
    _, otsu = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    variants.append(otsu)
    for v in variants:
        try_decode(v)
        if found:
            break
    return list(dict.fromkeys(found))


def audit(key, path):
    doc = fitz.open(path)
    page = doc[0]
    result = {"pdf": path.split("/")[-1], "page": 1, "qr_codes": [], "hidden_text_hits": []}

    # 1) vector/text layer: look for URLs and route-like strings in the PDF text
    text = page.get_text()
    for needle in ["/restaurant-menu", "/restaurant/menu", "/menu", "bigbrotherguesthouse.com", "http"]:
        for line in text.splitlines():
            if needle in line:
                result["hidden_text_hits"].append(line.strip()[:300])

    # 2) raster decode at two DPIs
    seen = set()
    for dpi in (200, 400):
        pix = page.get_pixmap(dpi=dpi)
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
        if pix.n == 4:
            img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
        else:
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        for decoded in decode_best(img):
            if decoded not in seen:
                seen.add(decoded)
                result["qr_codes"].append({"dpi": dpi, "decoded": decoded})

    # 3) pdftotext full-doc pass (captures text PyMuPDF may miss)
    try:
        out = subprocess.run(
            ["pdftotext", "-f", "1", "-l", "1", path, "-"],
            capture_output=True, text=True, timeout=60,
        ).stdout
        for line in out.splitlines():
            if any(n in line for n in ["/restaurant-menu", "/restaurant/menu", "/menu", "http"]):
                result["hidden_text_hits"].append("[pdftotext] " + line.strip()[:300])
    except Exception as e:  # pragma: no cover
        result["hidden_text_hits"].append(f"[pdftotext error] {e}")

    return result


def main():
    report = {k: audit(k, v) for k, v in PDFS.items()}
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    sys.exit(main())
