#!/usr/bin/env python3
"""Link audit for bigbrotherguesthouse.com (owner: 'make sure that all
links redirect to our stuff'). GETs every external URL that ships in
src/ + data/, reports final URL + status. SafariNow is included to
document the wrong redirect the owner reported."""

import urllib.request, urllib.error, ssl

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
ctx = ssl.create_default_context()

LINKS = [
    # The reported offender
    ("SafariNow listing", "https://www.safarinow.com/go/big-brother-guest-house"),
    # LISTINGS that stay
    ("Booking.com search", "https://www.booking.com/searchresults.html?ss=Big+Brother+Guesthouse+Usakos+Namibia"),
    ("Google Maps pin", "https://www.google.com/maps/search/?api=1&query=Big+Brother+Guesthouse+Usakos"),
    ("Agoda search", "https://www.agoda.com/search?textToSearch=Big+Brother+Guesthouse+Usakos"),
    ("Our website", "https://www.bigbrotherguesthouse.com"),
    ("TripAdvisor property", "https://www.tripadvisor.com/Hotel_Review-g1182990-d11826846-Reviews-Big_Brother_Guesthouse_Usakos-Usakos_Erongo_Region.html"),
    # Social + NTB (site-data.ts)
    ("Facebook", "https://www.facebook.com/bigbrotherguesthouse/"),
    ("Instagram", "https://www.instagram.com/bigbrotherguesthouse/"),
    ("TikTok", "https://www.tiktok.com/@bigbrotherguest"),
    ("NTB directory", "https://visitnamibia.com.na/directory/big_brother_guesthouse/"),
    # stay-nearby competitor list
    ("Bahnhof Booking", "https://www.booking.com/hotel/na/bahnhof-usakos.html"),
    ("Nubeb", "http://www.nubeb.biz"),
    ("Issa NTB", "https://visitnamibia.com.na/directory/issa_guesthouse"),
    ("Uitkyk", "https://www.uitkykguestfarm.com"),
    ("Carlo's", "https://www.mountainlodgenamibia.com"),
    ("Achab", "https://www.achabcamp.com"),
    ("Hohenstein", "https://www.ondili.com/lodges/hohenstein-lodge"),
    ("Ameib", "https://www.ameib.com/site/home.html"),
    ("Spitzkoppe", "https://www.spitzkoppecabincamp.com"),
    # Developer credit
    ("Tangison Studio", "https://studio.tangison.com"),
]

for name, url in LINKS:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    try:
        with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
            final = r.geturl()
            print(f"OK   {r.status:3} | {name:22} | {final[:110]}")
    except urllib.error.HTTPError as e:
        final = e.geturl() if hasattr(e, "geturl") else url
        print(f"HTTP {e.code:3} | {name:22} | {final[:110]}")
    except Exception as e:
        print(f"ERR  ??  | {name:22} | {type(e).__name__}: {str(e)[:80]}")
