#!/usr/bin/env python3
"""Add GMB property photos + licensed region shots to the web pipeline.
Sources: Google Maps listing (owner-controlled GMB, Oct 2026) + Pexels (free licence)."""
from PIL import Image, ImageOps, ImageEnhance
import os

SRC_GMB = '/home/z/my-project/scripts/tangison/gmb'
SRC_STK = '/home/z/my-project/scripts/tangison/stock'
OUT = '/home/z/my-project/public/images'
os.makedirs(OUT, exist_ok=True)

def save(im, name, width, q=76):
    im = ImageOps.exif_transpose(im).convert('RGB')
    if im.width > width:
        im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    im = ImageEnhance.Sharpness(im).enhance(1.06)
    im.save(f'{OUT}/{name}', quality=q, optimize=True, progressive=True)
    print(f'{name}: {im.width}x{im.height} {os.path.getsize(f"{OUT}/{name}")//1024}KB')

# Google Maps listing photos (the property itself)
save(Image.open(f'{SRC_GMB}/gmb-01.jpg'), 'property-lapa.jpg', 1400, 76)       # lapa + garden + pool
save(Image.open(f'{SRC_GMB}/gmb-02.jpg'), 'property-pool.jpg', 1200, 76)       # pool + thatch bar (portrait)
save(Image.open(f'{SRC_GMB}/gmb-03.jpg'), 'property-front.jpg', 1400, 74)      # main building + carport
save(Image.open(f'{SRC_GMB}/gmb-04.jpg'), 'property-rooms.jpg', 1400, 76)      # rooms block + driveway
save(Image.open(f'{SRC_GMB}/gmb-05.jpg'), 'property-pool-wide.jpg', 1600, 78)  # pool + lapa panorama

# Region context (Pexels licence, captioned as region not property)
save(Image.open(f'{SRC_STK}/road-a.jpg'), 'region-road.jpg', 1600, 74)
save(Image.open(f'{SRC_STK}/erongo-1.jpg'), 'region-spitzkoppe.jpg', 1100, 74)
print('DONE')
