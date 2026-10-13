#!/usr/bin/env bash
# Capture site images via headless browser (Google CDN blocks curl)
set -u
cd /home/z/my-project/scripts/bbgh
OUT=siteimgs; mkdir -p $OUT
python3 - << 'EOF' > /tmp/capture_list.txt
import re
pages = {'home':'home.html','guesthouse':'page_guesthouse.html','bed-breakfast':'page_bed-breakfast.html','gallery':'page_gallery.html','facilities':'page_facilities-functions.html','past-events':'page_past-events.html','contact':'page_contact.html'}
for label, f in pages.items():
    h = open(f, encoding='utf-8', errors='replace').read()
    seen = []
    for m in re.finditer(r'https://lh7-us\.googleusercontent\.com/[^\s"\'<>\\)]+', h):
        u = m.group(0)
        if '=w' in u: u = u[:u.index('=w')]
        u = u.rstrip('\\.,;)')
        if u not in seen: seen.append(u)
    for i, u in enumerate(seen):
        print(f'{label}_{i}\t{u}')
EOF
wc -l /tmp/capture_list.txt
while IFS=$'\t' read -r name url; do
  agent-browser open "${url}=w1600" > /dev/null 2>&1
  sleep 1.2
  agent-browser screenshot "$OUT/${name}.png" > /dev/null 2>&1
  echo "captured $name"
done < /tmp/capture_list.txt
agent-browser close > /dev/null 2>&1
echo "--- dedupe + convert ---"
python3 << 'EOF'
from PIL import Image
import glob, hashlib, os
seen = {}
kept = []
for f in sorted(glob.glob('siteimgs/*.png')):
    try:
        im = Image.open(f).convert('RGB')
        # crop viewport chrome? screenshots are raw image renders; hash content
        h = hashlib.md5(im.tobytes()).hexdigest()[:10]
        if h in seen: os.remove(f); continue
        seen[h] = f
        jpg = f.replace('.png','.jpg')
        im.save(jpg, quality=88)
        os.remove(f)
        kept.append((jpg, im.size))
    except Exception as e:
        print('skip', f, e)
print(f'kept {len(kept)} unique images')
for f, s in kept: print(f, s)
EOF