# Generates favicon.ico (real ICO format, 16/32/48px) and apple-icon.png (180px)
# from the BB monogram design used across the site: ink square, leaf ring, ember BB.
# Run: python3 scripts/gen_icons.py
from PIL import Image, ImageDraw, ImageFont

INK = (27, 23, 18, 255)
LEAF = (140, 198, 63, 255)
EMBER = (238, 114, 3, 255)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

OUT_ICO = "/home/z/my-project/src/app/favicon.ico"
OUT_APPLE = "/home/z/my-project/src/app/apple-icon.png"


def render(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = max(2, size // 5)  # corner radius matches the 14/64 ratio
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=INK)
    ring = max(1, size // 32)
    d.rounded_rectangle(
        [ring, ring, size - 1 - ring, size - 1 - ring],
        radius=max(1, r - ring),
        outline=(*LEAF[:3], 140),
        width=ring,
    )
    font = ImageFont.truetype(FONT, int(size * 0.44))
    bbox = d.textbbox((0, 0), "BB", font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1]), "BB", font=font, fill=EMBER)
    return img


render(180).save(OUT_APPLE, format="PNG")
render(48).save(OUT_ICO, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("written:", OUT_APPLE, "and", OUT_ICO)
