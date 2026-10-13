#!/usr/bin/env python3
"""Bulk SEO analysis of all crawled bigbrotherguesthouse.com pages."""
import re, json, html as htmllib, os

OUT = '/home/z/my-project/scripts/bbgh'
pages = ['home','bed-breakfast','contact','facilities-functions','gallery','guesthouse','past-events','rates','restaurant','specials']

summary = []
all_internal = set()
for p in pages:
    fp = f'{OUT}/page_{p}.html'
    if not os.path.exists(fp): continue
    h = open(fp, encoding='utf-8', errors='replace').read()
    t = re.search(r'<title[^>]*>(.*?)</title>', h, re.S|re.I)
    title = htmllib.unescape(t.group(1)).strip() if t else '(MISSING)'
    # canonical
    can = re.search(r'rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', h, re.I) or \
          re.search(r'href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', h, re.I)
    # headings
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', h, re.S|re.I)
    h1_texts = [' '.join(re.sub(r'<[^>]+>',' ',x).split())[:80] for x in h1s]
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', h, re.S|re.I)
    h2_texts = [' '.join(re.sub(r'<[^>]+>',' ',x).split())[:60] for x in h2s]
    # word count
    body = re.sub(r'<script.*?</script>|<style.*?</style>|<!--.*?-->', ' ', h, flags=re.S|re.I)
    text = re.sub(r'<[^>]+>', ' ', body)
    words = len(re.findall(r'\S+', htmllib.unescape(text)))
    # images
    imgs = re.findall(r'<img\s+([^>]*?)>', h, re.I)
    noalt = sum(1 for tg in imgs if not re.search(r'alt=["\'][^"\']+\S', tg, re.I))
    # links
    hrefs = re.findall(r'<a\s[^>]*?href=["\']([^"\']+)["\']', h, re.I)
    for u in hrefs:
        if 'bigbrotherguesthouse.com' in u or u.startswith('/'):
            all_internal.add(u)
    summary.append({
        'page': p, 'title': title, 'title_len': len(title),
        'canonical': can.group(1)[:90] if can else '(NONE)',
        'h1_count': len(h1s), 'h1s': h1_texts[:3],
        'h2_count': len(h2s), 'h2s': h2_texts[:6],
        'words': words, 'imgs': len(imgs), 'imgs_no_alt': noalt
    })

print(f"{'PAGE':<22} {'WORDS':>6} {'H1':>3} {'H2':>3} {'IMG':>4} {'NOALT':>5}  TITLE")
for s in summary:
    print(f"{s['page']:<22} {s['words']:>6} {s['h1_count']:>3} {s['h2_count']:>3} {s['imgs']:>4} {s['imgs_no_alt']:>5}  {s['title'][:60]}")

print("\n--- DETAIL PER PAGE ---")
for s in summary:
    print(f"\n## {s['page']}  (canonical: {s['canonical']})")
    print(f"  H1({s['h1_count']}): {s['h1s']}")
    if s['h2s']: print(f"  H2: {s['h2s']}")

print("\n--- ALL UNIQUE INTERNAL LINKS FOUND SITE-WIDE ---")
for u in sorted(all_internal):
    print(f"  {u[:120]}")

# check for any JSON-LD across pages
print("\n--- JSON-LD blocks per page ---")
for p in pages:
    fp = f'{OUT}/page_{p}.html'
    if not os.path.exists(fp): continue
    h = open(fp, encoding='utf-8', errors='replace').read()
    ld = re.findall(r'application/ld\+json', h, re.I)
    itemscope = len(re.findall(r'itemscope', h))
    print(f"  {p}: JSON-LD={len(ld)}, itemscope attrs={itemscope}")
