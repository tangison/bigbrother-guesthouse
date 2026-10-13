#!/usr/bin/env bash
# Crawl all discovered pages of bigbrotherguesthouse.com, extract SEO basics per page
BASE="https://www.bigbrotherguesthouse.com"
OUT="/home/z/my-project/scripts/bbgh"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
for path in home bed-breakfast contact facilities-functions gallery guesthouse past-events rates restaurant specials; do
  f="$OUT/page_$path.html"
  curl -sL -o "$f" -w "$path -> HTTP %{http_code}, %{size_download}B, TTFB %{time_starttransfer}s\n" "$BASE/$path" --max-time 45 -A "$UA"
done
