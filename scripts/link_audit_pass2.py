#!/usr/bin/env python3
"""Pass 2: deeper checks for the questionable links from the audit."""
import urllib.request, urllib.error, ssl, re

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
ctx = ssl.create_default_context()

def get(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return r.status, r.geturl(), r.read(200000).decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        try:
            body = e.read(200000).decode("utf-8", "ignore")
        except Exception:
            body = ""
        return e.code, e.geturl(), body
    except Exception as e:
        return None, url, f"{type(e).__name__}: {e}"

# 1. Agoda search variants
for u in [
    "https://www.agoda.com/search?textToSearch=Big+Brother+Guesthouse+Usakos",
    "https://www.agoda.com/Search?textToSearch=Big%20Brother%20Guesthouse%20Usakos",
    "https://www.agoda.com/en/search?textToSearch=Big%20Brother%20Guesthouse",
]:
    s, f, b = get(u)
    title = re.search(r"<title[^>]*>([^<]{0,90})", b)
    print(f"AGODA {s} -> {f[:95]} | title: {title.group(1) if title else 'n/a'}")

# 2. TikTok profile: does @bigbrotherguest exist?
for handle in ["bigbrotherguest", "bigbrotherguesthouse"]:
    s, f, b = get(f"https://www.tiktok.com/@{handle}")
    title = re.search(r"<title[^>]*>([^<]{0,100})", b)
    print(f"TIKTOK @{handle} {s} -> {f[:80]} | title: {title.group(1) if title else 'n/a'}")

# 3. Ameib retry (ssl handshake timed out once)
s, f, b = get("https://www.ameib.com/site/home.html", timeout=35)
t = re.search(r"<title[^>]*>([^<]{0,80})", b)
print(f"AMEIB retry {s} -> {f[:80]} | title: {t.group(1) if t else 'n/a'}")

# 4. TripAdvisor: try www with different casing + .co.za mirror to confirm property id lives
s, f, b = get("https://www.tripadvisor.com/Hotel_Review-g1182990-d11826846-Reviews-Big_Brother_Guesthouse_Usakos-Usakos_Erongo_Region.html")
t = re.search(r"<title[^>]*>([^<]{0,110})", b)
print(f"TRIPADVISOR {s} -> {f[:80]} | title: {t.group(1) if t else 'n/a'}")
