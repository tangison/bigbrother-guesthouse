#!/usr/bin/env python3
"""Contact sheets: look at the live-site image pool before using it."""
from PIL import Image, ImageDraw, ImageFont
import glob, os

def sheet(pattern, out, cols=6, thumb=(210, 94), label=True):
    files = sorted(glob.glob(pattern), key=lambda f: (len(f), f))
    rows = (len(files) + cols - 1) // cols
    W = cols * (thumb[0] + 8) + 8
    H = rows * (thumb[1] + 24) + 8
    canvas = Image.new('RGB', (W, H), (24, 24, 24))
    d = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 11)
    except Exception:
        font = ImageFont.load_default()
    for i, f in enumerate(files):
        try:
            im = Image.open(f).convert('RGB')
            im.thumbnail((thumb[0], thumb[1]))
        except Exception:
            continue
        x = 8 + (i % cols) * (thumb[0] + 8)
        y = 8 + (i // cols) * (thumb[1] + 24)
        canvas.paste(im, (x, y))
        d.text((x, y + thumb[1] + 3), os.path.basename(f), fill=(255, 255, 100), font=font)
    canvas.save(out, quality=80)
    print(out, canvas.size, len(files), 'tiles')

sheet('/home/z/my-project/scripts/bbgh/siteimgs/gallery_[0-9].jpg', '/tmp/sheet_live_1.jpg')
sheet('/home/z/my-project/scripts/bbgh/siteimgs/gallery_1[0-9].jpg', '/tmp/sheet_live_2.jpg')
sheet('/home/z/my-project/scripts/bbgh/siteimgs/gallery_2*.jpg', '/tmp/sheet_live_3.jpg')
sheet('/home/z/my-project/scripts/bbgh/siteimgs/gallery_[3-5]*.jpg', '/tmp/sheet_live_4.jpg')
sheet('/home/z/my-project/scripts/bbgh/siteimgs/gallery_[6-9]*.jpg', '/tmp/sheet_live_5.jpg')
sheet('/home/z/my-project/scripts/bbgh/siteimgs/*_*.jpg', '/tmp/sheet_live_pages.jpg')
sheet('/home/z/my-project/scripts/tangison/assets/IMG-*.jpg', '/tmp/sheet_owner.jpg', cols=6, thumb=(210, 140))
