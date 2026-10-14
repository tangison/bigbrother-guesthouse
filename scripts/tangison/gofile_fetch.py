#!/usr/bin/env python3
"""Download every file in a Gofile folder via the official Gofile REST API.

Flow (no scraping, first tier per tangison-scraping):
  1. POST /accounts        -> guest account token
  2. GET  /contents/{id}   -> folder listing (requires Bearer token)
  3. GET  each file link   -> raw bytes, Cookie: accountToken=<token>

Files land UNTOUCHED in originals/gofile/ (never overwritten: skipped if present).
Prints a manifest (name, size, mimetype) as JSON to stdout.
"""
import json
import os
import sys
import urllib.request

FOLDER_ID = "wVwKJfg7"
API = "https://api.gofile.io"
DEST = "/home/z/my-project/originals/gofile"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"


def api(path: str, token: str | None = None, method: str = "GET") -> dict:
    req = urllib.request.Request(f"{API}{path}", method=method)
    req.add_header("User-Agent", UA)
    req.add_header("Accept", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def main() -> int:
    os.makedirs(DEST, exist_ok=True)

    # 1. guest account
    try:
        acct = api("/accounts", method="POST")
    except Exception as e:
        print(json.dumps({"error": f"account creation failed: {e}"}))
        return 1
    if acct.get("status") != "ok":
        print(json.dumps({"error": f"account creation status={acct.get('status')}", "raw": acct}))
        return 1
    token = acct["data"]["token"]

    # 2. folder content
    try:
        content = api(f"/contents/{FOLDER_ID}?wt=website", token=token)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:500]
        print(json.dumps({"error": f"content fetch HTTP {e.code}", "body": body}))
        return 1
    except Exception as e:
        print(json.dumps({"error": f"content fetch failed: {e}"}))
        return 1
    if content.get("status") != "ok":
        print(json.dumps({"error": f"content status={content.get('status')}", "raw": content}))
        return 1

    data = content["data"]
    if data.get("type") != "folder":
        print(json.dumps({"error": f"content is not a folder: {data.get('type')}"}))
        return 1

    children = data.get("children", {})
    files = [c for c in children.values() if c.get("type") == "file"]
    subfolders = [c for c in children.values() if c.get("type") == "folder"]

    manifest = {
        "folder": FOLDER_ID,
        "folder_name": data.get("name"),
        "total_children": len(children),
        "files": [],
        "subfolders": [s.get("name") for s in subfolders],
        "downloaded": [],
        "skipped_existing": [],
        "failed": [],
    }

    for f in files:
        entry = {
            "name": f.get("name"),
            "size": f.get("size"),
            "mimetype": f.get("mimetype"),
            "link": f.get("link"),
        }
        manifest["files"].append(entry)

        safe = (f.get("name") or "unnamed").replace("/", "_")
        out = os.path.join(DEST, safe)
        if os.path.exists(out) and os.path.getsize(out) > 0:
            manifest["skipped_existing"].append(safe)
            continue

        link = f.get("link")
        if not link:
            manifest["failed"].append({"name": safe, "reason": "no download link"})
            continue
        try:
            req = urllib.request.Request(link)
            req.add_header("User-Agent", UA)
            req.add_header("Cookie", f"accountToken={token}")
            with urllib.request.urlopen(req, timeout=120) as r, open(out, "wb") as fh:
                fh.write(r.read())
            manifest["downloaded"].append({"name": safe, "bytes": os.path.getsize(out)})
        except Exception as e:
            manifest["failed"].append({"name": safe, "reason": str(e)[:200]})

    print(json.dumps(manifest, indent=2))
    return 0 if not manifest["failed"] else 2


if __name__ == "__main__":
    sys.exit(main())
