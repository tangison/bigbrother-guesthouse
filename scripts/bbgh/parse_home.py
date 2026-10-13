#!/usr/bin/env python3
"""Parse bigbrotherguesthouse.com homepage HTML for SEO elements."""
import re, json, sys
from html.parser import HTMLParser
from html import unescape

html = open('/home/z/my-project/scripts/bbgh/home.html', encoding='utf-8', errors='replace').read()
print(f"HTML size: {len(html)} bytes")

# --- Title ---
m = re.search(r'<title[^>]*>(.*?)</title>', html, re.S|re.I)
title = unescape(m.group(1)).strip() if m else '(MISSING)'
print(f"\n=== TITLE ({len(title)} chars) ===\n{title}")

# --- Meta tags ---
print("\n=== META TAGS ===")
for m in re.finditer(r'<meta\s+([^>]*?)>', html, re.I):
    attrs = m.group(1)
    name = re.search(r'name=["\']([^"\']+)', attrs, re.I)
    prop = re.search(r'property=["\']([^"\']+)', attrs, re.I)
    content = re.search(r'content=["\']([^"\']*)', attrs, re.I)
    http_equiv = re.search(r'http-equiv=["\']([^"\']+)["\']', attrs, re.I)
    key = (name.group(1) if name else (prop.group(1) if prop else (http_equiv.group(1) if http_equiv else '?')))
    val = unescape(content.group(1)) if content else ''
    if key not in ('?',) or content:
        if len(val) > 220: val = val[:220] + '...[truncated]'
        print(f"  {key}: {val}")

# --- Canonical / hreflang ---
print("\n=== LINK TAGS (canonical/hreflang/alternate) ===")
for m in re.finditer(r'<link\s+([^>]*?)>', html, re.I):
    attrs = m.group(1)
    rel = re.search(r'rel=["\']([^"\']+)["\']', attrs, re.I)
    if not rel: continue
    relv = rel.group(1).lower()
    if any(k in relv for k in ('canonical', 'alternate', 'icon', 'manifest')):
        href = re.search(r'href=["\']([^"\']+)["\']', attrs, re.I)
        hreflang = re.search(r'hreflang=["\']([^"\']+)["\']', attrs, re.I)
        print(f"  rel={relv} href={href.group(1)[:120] if href else '?'} hreflang={hreflang.group(1) if hreflang else '-'}")

# --- Headings ---
class HParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.headings = []; self.cur = None; self.buf = []
    def handle_starttag(self, tag, attrs):
        if tag in ('h1','h2','h3','h4','h5','h6'): self.cur = tag; self.buf = []
    def handle_endtag(self, tag):
        if tag in ('h1','h2','h3','h4','h5','h6') and self.cur == tag:
            txt = ' '.join(''.join(self.buf).split())
            if txt: self.headings.append((tag, txt[:130]))
            self.cur = None
    def handle_data(self, data):
        if self.cur: self.buf.append(data)
hp = HParser(); hp.feed(html)
print("\n=== HEADINGS ===")
h1_count = sum(1 for t,_ in hp.headings if t=='h1')
print(f"(H1 count: {h1_count})")
for t, txt in hp.headings[:40]:
    print(f"  <{t}> {txt}")

# --- JSON-LD ---
print("\n=== JSON-LD BLOCKS ===")
ld = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.S|re.I)
print(f"(found {len(ld)} blocks)")
for i, block in enumerate(ld):
    try:
        data = json.loads(block)
        print(f"  [{i}] {json.dumps(data, ensure_ascii=False)[:400]}")
    except Exception as e:
        print(f"  [{i}] parse error: {e} | raw: {block[:200]}")

# --- Images ---
imgs = re.findall(r'<img\s+([^>]*?)>', html, re.I)
alt_missing = 0; alt_empty = 0; total = 0
srcs = []
for tag in imgs:
    total += 1
    alt = re.search(r'alt=["\']([^"\']*)["\']', tag, re.I)
    if not alt: alt_missing += 1
    elif not alt.group(1).strip(): alt_empty += 1
    src = re.search(r'src=["\']([^"\']+)["\']', tag, re.I)
    if src: srcs.append(src.group(1)[:100])
print(f"\n=== IMAGES === total={total}, missing alt={alt_missing}, empty alt={alt_empty}")
for s in srcs[:12]: print(f"  {s}")

# --- Links ---
hrefs = re.findall(r'<a\s+([^>]*?)>', html, re.I)
internal, external = [], []
for tag in hrefs:
    href = re.search(r'href=["\']([^"\']+)["\']', tag, re.I)
    if not href: continue
    u = href.group(1)
    if u.startswith('#') or u.startswith('javascript'): continue
    if 'bigbrotherguesthouse.com' in u or u.startswith('/') or (not u.startswith('http')):
        internal.append(u)
    else:
        external.append(u)
print(f"\n=== LINKS === internal={len(internal)}, external={len(external)}")
uniq_int = sorted(set(internal))
print("--- unique internal (first 30) ---")
for u in uniq_int[:30]: print(f"  {u[:130]}")
print("--- unique external (first 20) ---")
for u in sorted(set(external))[:20]: print(f"  {u[:130]}")

# --- Word count of visible text ---
body = re.sub(r'<script.*?</script>|<style.*?</style>|<!--.*?-->', ' ', html, flags=re.S|re.I)
text = re.sub(r'<[^>]+>', ' ', body)
words = len(re.findall(r'\S+', unescape(text)))
print(f"\n=== VISIBLE WORD COUNT (raw html text) === ~{words} words")

# --- lang attribute, viewport ---
lang = re.search(r'<html[^>]*\slang=["\']([^"\']+)["\']', html, re.I)
print(f"lang attr: {lang.group(1) if lang else '(MISSING)'}")
vp = re.search(r'name=["\']viewport["\'][^>]*content=["\']([^"\']+)', html, re.I)
print(f"viewport: {vp.group(1)[:100] if vp else '(MISSING)'}")
