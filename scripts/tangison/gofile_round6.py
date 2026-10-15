#!/usr/bin/env python3
"""Round 6: download the 13 restaurant Gofile files via the verified store pattern.

Pattern (verified round 4-a + this round): GET {file.link} with Cookie
accountToken=<page guest token>; -L follows the store redirect. Originals land
untouched in originals/gofile-restaurant/ (never overwrites). PIL-validates each.
"""
import concurrent.futures
import json
import os
import subprocess
import time
import urllib.parse

ITEMS = "/tmp/rest_items_full.json"
DEST = "/home/z/my-project/originals/gofile-restaurant"
COOKIE = "accountToken=L1PynyUBknAvtoJFzQVfhdYRBccQeHjq"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
FALLBACKS = [
    "store4.gofile.io", "store-eu-par-5.gofile.io", "store1.gofile.io",
    "store-eu-par-4.gofile.io", "store-eu-par-2.gofile.io",
    "store-eu-par-3.gofile.io", "store-eu-par-6.gofile.io",
    "store5.gofile.io", "store10.gofile.io",
]


def valid_image(path: str) -> bool:
    try:
        from PIL import Image
        with Image.open(path) as im:
            im.load()
        return True
    except Exception:
        return False


def fetch(item: dict) -> dict:
    name = item["name"]
    out = os.path.join(DEST, name)
    if os.path.exists(out) and os.path.getsize(out) > 0 and valid_image(out):
        return {"name": name, "status": "kept-existing"}
    link = item.get("link") or ""
    m = link.split("//")[1].split("/")[0] if "//" in link else ""
    hosts = [m] + [h for h in FALLBACKS if h != m] if m else list(FALLBACKS)
    for host in hosts:
        url = f"https://{host}/download/web/{item['uuid']}/{urllib.parse.quote(name)}"
        for attempt in (1, 2):
            r = subprocess.run(
                ["curl", "-sL", "-m", "120", "-H", f"Cookie: {COOKIE}",
                 "-H", f"User-Agent: {UA}", url, "-o", out],
                capture_output=True, text=True, timeout=150,
            )
            if r.returncode == 0 and os.path.exists(out) and os.path.getsize(out) > 1000 and valid_image(out):
                return {"name": name, "status": "ok", "bytes": os.path.getsize(out)}
            time.sleep(2 * attempt)
        time.sleep(1)
    if os.path.exists(out):
        os.remove(out)
    return {"name": name, "status": "failed"}


def main() -> None:
    os.makedirs(DEST, exist_ok=True)
    items = json.load(open(ITEMS))
    print(f"downloading {len(items)} files ...")
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
        for res in ex.map(fetch, items):
            results.append(res)
            print(res["status"], res["name"])
    ok = [r for r in results if r["status"] == "ok"]
    kept = [r for r in results if r["status"] == "kept-existing"]
    failed = [r for r in results if r["status"] == "failed"]
    print(f"ok={len(ok)} kept={len(kept)} failed={len(failed)}")
    if failed:
        json.dump(failed, open("/tmp/gofile_round6_retry.json", "w"), indent=1)


if __name__ == "__main__":
    main()
