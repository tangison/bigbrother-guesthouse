#!/usr/bin/env python3
"""Optimize real brand photos for the web. Sources: filebin (client-owned)."""
from PIL import Image, ImageOps, ImageEnhance
import os, glob

SRC = '/home/z/my-project/scripts/tangison/assets'
OUT = '/home/z/my-project/public/images'
os.makedirs(OUT, exist_ok=True)

def save(im, name, width, q=78, sharpen=True):
    im = ImageOps.exif_transpose(im).convert('RGB')
    if im.width > width:
        im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    if sharpen:
        im = ImageEnhance.Sharpness(im).enhance(1.08)
    im.save(f'{OUT}/{name}', quality=q, optimize=True, progressive=True)
    kb = os.path.getsize(f'{OUT}/{name}') // 1024
    print(f'{name}: {im.width}x{im.height} {kb}KB')

# logos (keep native bg)
save(Image.open(f'{SRC}/IMG-20261005-WA0119.jpg'), 'logo-restaurant.jpg', 720, 82)
save(Image.open(f'{SRC}/IMG-20261005-WA0120.jpg'), 'logo-guesthouse.jpg', 1100, 85)

# heroes
save(Image.open(f'{SRC}/IMG-20261006-WA0069.jpg'), 'hero-platter.jpg', 1600, 80)   # grand platter
save(Image.open(f'{SRC}/IMG-20261006-WA0056.jpg'), 'hero-braise.jpg', 1400, 79)
save(Image.open(f'{SRC}/IMG-20261006-WA0070.jpg'), 'hero-wings.jpg', 1400, 79)
save(Image.open(f'{SRC}/IMG-20261006-WA0091.jpg'), 'cocktail-blue.jpg', 900, 78)
save(Image.open(f'{SRC}/IMG-20261006-WA0093.jpg'), 'cocktail-sunrise.jpg', 900, 78)

# dish cards (curated from contact sheets)
cards = {
 'dish-breakfast': 'IMG-20261006-WA0071.jpg',  # eggs bacon toast tray
 'dish-english': 'IMG-20261006-WA0055.jpg',    # english breakfast
 'dish-traditional': 'IMG-20261006-WA0060.jpg',# pap & matangara
 'dish-feast': 'IMG-20261006-WA0069.jpg',      # family platter
 'dish-steak': 'IMG-20261006-WA0058.jpg',      # t-bone & chips
 'dish-wings': 'IMG-20261006-WA0070.jpg',
 'dish-pizza': 'IMG-20261006-WA0112.jpg',
 'dish-schnitzel': 'IMG-20261006-WA0108.jpg',  # crumbed & mash
 'dish-fish': 'IMG-20261006-WA0113.jpg',       # fish & rice
 'dish-wrap': 'IMG-20261006-WA0078.jpg',       # wraps
 'dish-ribs': 'IMG-20261006-WA0081.jpg',       # ribs steak mash
 'dish-braise': 'IMG-20261006-WA0056.jpg',
 'dish-chips': 'IMG-20261006-WA0042.jpg',      # welcome chips
 'dish-salad': 'IMG-20261006-WA0068.jpg',
 'dish-pancake': 'IMG-20261006-WA0057.jpg',
 'dish-chicken': 'IMG-20261006-WA0073.jpg',
}
for name, f in cards.items():
    save(Image.open(f'{SRC}/{f}'), f'{name}.jpg', 900, 76)

# gallery: all 30 originals at 900px
i = 0
for f in sorted(glob.glob(f'{SRC}/IMG-*.jpg')):
    i += 1
    save(Image.open(f), f'gallery-{i:02d}.jpg', 900, 74, sharpen=False)
print('DONE', len(os.listdir(OUT)), 'files')
