// Conversion event helper (round v3 plan: analytics events). Pushes a
// dataLayer event so a tag manager (GTM etc.) can pick it up the day the
// owner adds one, and logs nothing anywhere else. No provider, no cookies,
// no network call of its own: with no dataLayer present it is a no-op.
//
// Usage: track("whatsapp_book_click", { brand: "guesthouse", path: "/rooms" })

type EventPayload = {
  brand?: "guesthouse" | "restaurant";
  path?: string;
  label?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload, ts: Date.now() });
}
