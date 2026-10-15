# Round 8: restaurant menu QR code (owner request, 15 Oct 2026).
# Target: the EXACT menu page, verified live HTTP 200:
#   https://www.bigbrotherguesthouse.com/restaurant/menu
# Deliverables:
#   1. public/images/qr-restaurant-menu.png   - web card on /restaurant
#   2. download/BB-Restaurant-Menu-QR-print.png - 2400px+, quiet margin, print
#   3. download/BB-Restaurant-Menu-QR-card.pdf  - A6 landscape table card
# Verification: every artifact is decoded back with OpenCV and the payload
# must equal the target URL byte-for-byte. No scan, no ship.
import sys
from pathlib import Path

import cv2
import numpy as np
import qrcode
from PIL import Image, ImageDraw, ImageFont
from qrcode.constants import ERROR_CORRECT_Q

URL = "https://www.bigbrotherguesthouse.com/restaurant/menu"
ROOT = Path("/home/z/my-project")
WEB_OUT = ROOT / "public/images/qr-restaurant-menu.png"
PRINT_OUT = ROOT / "download/BB-Restaurant-Menu-QR-print.png"
CARD_OUT = ROOT / "download/BB-Restaurant-Menu-QR-card.pdf"
FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")


def make_qr(box: int, border: int) -> "qrcode.QRCode":
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_Q, box_size=box, border=border)
    qr.add_data(URL)
    qr.make(fit=True)
    return qr


def decode(path: Path) -> str:
    img = cv2.imread(str(path))
    if img is None:
        raise SystemExit(f"cannot read {path}")
    # OpenCV's detector misses QRs with very large modules (2400px print
    # file); normalize every artifact to ~700px before detection. The
    # payload is unchanged by scaling.
    h, w = img.shape[:2]
    scale = 700.0 / max(h, w)
    if scale < 1:
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    det = cv2.QRCodeDetector()
    payload, _, _ = det.detectAndDecode(img)
    return payload


print("QR version/modules:")
qr_web = make_qr(box=16, border=4)
print(f"  web:   version {qr_web.version}, {qr_web.modules_count} modules, border 4")
qr_print = make_qr(box=60, border=6)
print(f"  print: version {qr_print.version}, {qr_print.modules_count} modules, border 6")

# 1. web PNG (crisp, ~660px, standard 4-module quiet zone)
qr_web.make_image(fill_color="#111111", back_color="white").save(WEB_OUT)
# 2. print PNG (pure black on pure white, ~2400px, extra quiet margin)
qr_print.make_image(fill_color="black", back_color="white").save(PRINT_OUT)

# 3. A6 landscape table card (148x105 mm @ 300 dpi = 1748x1240 px)
W, H = 1748, 1240
card = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(card)
# thin brand frame
m = 44
d.rectangle([m, m, W - m, H - m], outline=(17, 17, 17), width=6)
f_bold = ImageFont.truetype(str(FONT_DIR / "DejaVuSans-Bold.ttf"), 64)
f_med = ImageFont.truetype(str(FONT_DIR / "DejaVuSans-Bold.ttf"), 46)
f_small = ImageFont.truetype(str(FONT_DIR / "DejaVuSans.ttf"), 38)

def center_text(y, text, font, fill=(17, 17, 17)):
    w = d.textlength(text, font=font)
    d.text(((W - w) / 2, y), text, font=font, fill=fill)

center_text(96, "BIG BROTHERS RESTAURANT", f_bold)
center_text(178, "Usakos town centre", f_small, fill=(90, 90, 90))
# QR: paste the ~2400px print image scaled to 680px, centered
qr_img = Image.open(PRINT_OUT)
qr_img.thumbnail((680, 680), Image.LANCZOS)
card.paste(qr_img, ((W - qr_img.width) // 2, 268))
center_text(268 + qr_img.height + 34, "Scan for our full menu", f_med)
center_text(268 + qr_img.height + 104, "bigbrotherguesthouse.com/restaurant/menu", f_small)
center_text(268 + qr_img.height + 160, "Bookings: +264 81 302 9522", f_small, fill=(90, 90, 90))
card.save(CARD_OUT, "PDF", resolution=300.0)

# 4. Verify every artifact decodes to the exact URL
fail = False
for name, path in [("web png", WEB_OUT), ("print png", PRINT_OUT)]:
    got = decode(path)
    ok = got == URL
    fail |= not ok
    print(f"decode {name}: {'OK' if ok else 'MISMATCH'} -> {got!r}")
# rasterize the PDF and decode that too
import subprocess
subprocess.run(
    ["pdftoppm", "-png", "-r", "150", "-singlefile", str(CARD_OUT), "/tmp/qr_card"],
    check=True,
)
got = decode(Path("/tmp/qr_card.png"))
ok = got == URL
fail |= not ok
print(f"decode pdf card (150dpi raster): {'OK' if ok else 'MISMATCH'} -> {got!r}")

for p in (WEB_OUT, PRINT_OUT, CARD_OUT):
    print(f"{p}: {p.stat().st_size / 1024:.0f}KB")
sys.exit(1 if fail else 0)
