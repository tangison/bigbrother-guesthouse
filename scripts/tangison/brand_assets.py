#!/usr/bin/env python3
"""Brand asset pipeline: supplied logos -> public assets.

- Copies the owner's supplied logo files (untouched originals live in
  originals/logos/) into public/logos/.
- Builds favicon.ico (16/32/48), icon-192, icon-512 and apple-icon from the
  supplied guesthouse logo PNG. No redrawing: straight resamples.
- Builds two Open Graph share images (1200x630) from the on-dark logos on the
  brand ink colours, with plain tagline text.
"""
import os
import shutil

from PIL import Image, ImageDraw, ImageFont

SRC = "/home/z/my-project/originals/logos/logos"
PUB = "/home/z/my-project/public/logos"
IMG = "/home/z/my-project/public/images"
APP = "/home/z/my-project/src/app"
FONT = "/usr/share/fonts/truetype/chinese/NotoSansSC-Bold.ttf"

os.makedirs(PUB, exist_ok=True)

# 1. copy supplied files verbatim
for f in os.listdir(SRC):
    shutil.copy2(os.path.join(SRC, f), os.path.join(PUB, f))
print("copied", len(os.listdir(SRC)), "logo files to public/logos")

# 2. favicons from the supplied guesthouse logo (site brand = registered name)
gh = Image.open(os.path.join(PUB, "logo-guesthouse-512.png")).convert("RGBA")
# square canvas: the logo is 880x820-ish; pad to square, slight margin
side = 512
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
m = Image.open(os.path.join(PUB, "logo-guesthouse-512.png"))
m.thumbnail((side - 24, side - 24))
canvas.paste(m, ((side - m.width) // 2, (side - m.height) // 2), m)

ico_path = os.path.join(APP, "favicon.ico")
canvas.save(ico_path, sizes=[(16, 16), (32, 32), (48, 48)])
for size, name in [(192, "icon-192.png"), (512, "icon-512.png")]:
    canvas.resize((size, size), Image.LANCZOS).save(os.path.join(PUB, name))
canvas.resize((180, 180), Image.LANCZOS).save(os.path.join(APP, "apple-icon.png"))
# replace the old monogram svg icon with the supplied-logo png
svg_icon = os.path.join(APP, "icon.svg")
if os.path.exists(svg_icon):
    os.remove(svg_icon)
canvas.resize((192, 192), Image.LANCZOS).save(os.path.join(APP, "icon.png"))
print("favicons + icons written")

# 3. Open Graph share images, one per brand, 1200x630
def og(bg_hex, logo_file, logo_h, title, sub, out):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), bg_hex)
    d = ImageDraw.Draw(im)
    logo = Image.open(os.path.join(PUB, logo_file)).convert("RGBA")
    ratio = logo_h / logo.height
    logo = logo.resize((int(logo.width * ratio), logo_h), Image.LANCZOS)
    im.paste(logo, ((W - logo.width) // 2, 90), logo)
    try:
        f1 = ImageFont.truetype(FONT, 52)
        f2 = ImageFont.truetype(FONT, 26)
    except Exception:
        f1 = f2 = ImageFont.load_default()
    tw = d.textlength(title, font=f1)
    d.text(((W - tw) / 2, 90 + logo_h + 60), title, font=f1, fill=(250, 245, 232))
    tw2 = d.textlength(sub, font=f2)
    d.text(((W - tw2) / 2, 90 + logo_h + 140), sub, font=f2, fill=(237, 109, 10) if bg_hex != "#080c06" else (166, 228, 6))
    im.save(os.path.join(IMG, out), quality=82)
    print("og:", out)

og("#131512", "logo-guesthouse-on-dark.png", 260, "Home away from home, halfway to everywhere",
   "Plot 7, Laaste Begin, Usakos  ·  +264 81 264 7606", "og-guesthouse.jpg")
og("#080c06", "logo-restaurant.png", 340, "Big Brothers Restaurant, est. 2023",
   "Theo-Ben Gurirab & Bismarck Street, Usakos  ·  +264 81 302 9522", "og-restaurant.jpg")
print("done")
