import { NextRequest, NextResponse } from "next/server";

// Single canonical host: www.bigbrotherguesthouse.com.
// The apex (bigbrotherguesthouse.com, no www) 308-redirects here,
// path and query preserved. The guesthouse's printed QR encodes the
// apex host (https://bigbrotherguesthouse.com/menu), so scans still
// land on the right page: the scanner follows the redirect.
// www and localhost previews pass through untouched.
const CANONICAL = "www.bigbrotherguesthouse.com";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host === CANONICAL) return NextResponse.next();

  const url = req.nextUrl.clone();
  // Only redirect our own apex. Anything else (custom previews,
  // IP hosts, localhost) passes through so local checks keep working.
  if (host.split(":")[0] === CANONICAL.replace("www.", "")) {
    url.host = CANONICAL;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Static assets and the image optimizer never need the redirect.
  matcher: ["/((?!_next/image|_next/static|favicon.ico|apple-icon.png|icon.png|robots.txt|sitemap.xml|manifest.webmanifest).*)"],
};
