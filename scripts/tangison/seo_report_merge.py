#!/usr/bin/env python3
"""Merge cover (page 0) + body into the final audit report PDF."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

COVER = "/home/z/my-project/download/bbgh_seo_cover.pdf"
BODY = "/home/z/my-project/download/bbgh_seo_audit_body.pdf"
OUT = "/home/z/my-project/download/Big-Brother-Guesthouse-SEO-Audit-October-2026.pdf"


def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    # Strict: Playwright px-to-pt rounding leaves ~0.6pt drift; force exact A4.
    if abs(w - A4_W) > 0.1 or abs(h - A4_H) > 0.1:
        page.scale_to(A4_W, A4_H)
    return page


writer = PdfWriter()
cover_page = PdfReader(COVER).pages[0]
writer.add_page(normalize_page_to_a4(cover_page))
for page in PdfReader(BODY).pages:
    writer.add_page(normalize_page_to_a4(page))
writer.add_metadata({
    "/Title": "Big Brother Guesthouse, Usakos: SEO Audit and Local Search Report",
    "/Author": "Tangison Studio",
    "/Creator": "Z.ai",
    "/Subject": "SEO audit, listings inventory and owner action plan for Big Brother Guesthouse, Usakos",
})
with open(OUT, "wb") as f:
    writer.write(f)
print("merged:", OUT, "pages:", len(writer.pages))
