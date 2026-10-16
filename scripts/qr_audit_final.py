#!/usr/bin/env python3
"""Final QR audit before deploy: decode every QR in both printed menu PDFs,
at multiple DPIs, and dump every URL found in each PDF's text layer.
Precision requirement: know EXACTLY which URL each printed QR carries."""
import fitz  # PyMuPDF
import cv2
import numpy as np

PDFS = [
    ("GUESTHOUSE", "/home/z/my-project/menus/Big-Brother-Guesthouse-Menu.pdf"),
    ("RESTAURANT", "/home/z/my-project/menus/Big-Brothers-Restaurant-Menu.pdf"),
]
DPIs = [150, 300]
DET = cv2.QRCodeDetector()


def try_decode(img):
    out = set()
    data, pts, _ = DET.detectAndDecode(img)
    if data and data.strip():
        out.add(data.strip())
    # quadrant crops catch QRs that fail on the full page
    h, w = img.shape[:2]
    quads = [
        (0, h // 2, 0, w // 2), (0, h // 2, w // 2, w),
        (h // 2, h, 0, w // 2), (h // 2, h, w // 2, w),
        (0, h // 3, 0, w // 3), (0, h // 3, w // 3, 2 * w // 3), (0, h // 3, 2 * w // 3, w),
        (h // 3, 2 * h // 3, 0, w // 3), (h // 3, 2 * h // 3, w // 3, 2 * w // 3), (h // 3, 2 * h // 3, 2 * w // 3, w),
        (2 * h // 3, h, 0, w // 3), (2 * h // 3, h, w // 3, 2 * w // 3), (2 * h // 3, h, 2 * w // 3, w),
    ]
    for y0, y1, x0, x1 in quads:
        crop = img[y0:y1, x0:x1]
        d, _, _ = DET.detectAndDecode(crop)
        if d and d.strip():
            out.add(d.strip())
        gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY) if crop.ndim == 3 else crop
        _, th = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        d, _, _ = DET.detectAndDecode(th)
        if d and d.strip():
            out.add(d.strip())
        del crop, gray, th
    return out


for label, path in PDFS:
    print(f"\n=== {label}: {path.split('/')[-1]} ===")
    doc = fitz.open(path)
    all_urls = set()
    for pno in range(len(doc)):
        page = doc[pno]
        # text layer URLs (visible + hidden)
        text = page.get_text("text")
        for tok in text.split():
            if tok.lower().startswith(("http://", "https://", "www.")):
                all_urls.add(("text", tok.strip()))
        for dpi in DPIs:
            pm = page.get_pixmap(dpi=dpi)
            arr = np.frombuffer(pm.samples, dtype=np.uint8).reshape(pm.height, pm.width, pm.n)
            if pm.n == 4:
                arr = cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
            else:
                arr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
            for decoded in try_decode(arr):
                all_urls.add((f"qr-p{pno + 1}@{dpi}dpi", decoded))
    doc.close()
    for how, val in sorted(all_urls):
        print(f"  [{how}] {val}")
