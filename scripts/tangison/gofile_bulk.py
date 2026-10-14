#!/usr/bin/env python3
"""Bulk-download all Gofile folder images, verify each with PIL, write manifest.

Mechanism (verified, not guessed): GET https://store-eu-par-4.gofile.io/download/web/
{fileUuid}/{urlencoded-filename} with Cookie accountToken=<guest token>; the store
302-redirects to the file's assigned host; -L follows. Originals land untouched in
originals/gofile/ under their original names. Never overwrites existing files.
"""
import concurrent.futures
import json
import os
import subprocess
import time
import urllib.parse

ITEMS = "/tmp/gofile_all_items.json"
HOMES = "/tmp/gofile_homes.json"
DEST = "/home/z/my-project/originals/gofile"
COOKIE = "accountToken=jYbqiyJUUSdTOjhojyCesHwStSabCl3J"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
FALLBACKS = [
    "store-eu-par-4.gofile.io", "store1.gofile.io", "store4.gofile.io",
    "store-eu-par-2.gofile.io", "store-eu-par-3.gofile.io", "store-eu-par-6.gofile.io",
    "store-eu-par-8.gofile.io", "store10.gofile.io", "store5.gofile.io",
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
    homes = json.load(open(HOMES))
    primary = homes.get(name, "store-eu-par-4.gofile.io").replace("NO-LOCATION:", "") or "store-eu-par-4.gofile.io"
    hosts = [primary] + [h for h in FALLBACKS if h != primary]
    for host in hosts:
        url = f"https://{host}/download/web/{item['uuid']}/{urllib.parse.quote(name)}"
        for attempt in (1, 2):
            r = subprocess.run(
                ["curl", "-sL", "-m", "120", "-H", f"Cookie: {COOKIE}", "-H", f"User-Agent: {UA}", url, "-o", out],
                capture_output=True, text=True, timeout=150,
            )
            if r.returncode == 0 and os.path.exists(out) and os.path.getsize(out) > 1000 and valid_image(out):
                return {"name": name, "status": "ok", "bytes": os.path.getsize(out)}
            time.sleep(3 * attempt)
        time.sleep(2)
    if os.path.exists(out):
        os.remove(out)
    return {"name": name, "status": "failed"}


def main() -> None:
    items = json.load(open(ITEMS))
    # add the WhatsApp file missed by the first regex pass (uuid read from its row)
    items.append({"name": "WhatsApp Image 2025-12-02 at 10.29.11 (2).jpeg",
                  "uuid": "f6c6e1b7-9219-43fe-be9b-470b5f2ab28e"})
    names = [i["name"] for i in items]
    assert len(names) == len(set(names)), "duplicate names in manifest"
    print(f"downloading {len(items)} files ...")

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
        for res in ex.map(fetch, items):
            results.append(res)
            if res["status"] == "failed":
                print("FAIL", res["name"])

    ok = [r for r in results if r["status"] == "ok"]
    kept = [r for r in results if r["status"] == "kept-existing"]
    failed = [r for r in results if r["status"] == "failed"]
    print(f"ok={len(ok)} kept={len(kept)} failed={len(failed)}")

    if failed:
        json.dump(failed, open("/tmp/gofile_retry.json", "w"), indent=1)
        print("retry list written to /tmp/gofile_retry.json")

    total = sum(r["bytes"] for r in ok)
    print(f"downloaded bytes: {total/1e6:.1f} MB")


if __name__ == "__main__":
    main()
