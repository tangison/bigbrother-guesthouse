/* Round 6 weight audit: cold-load transfer per route via the performance API. */
const routes = ["/", "/restaurant", "/rooms", "/facilities", "/gallery", "/contact", "/book"];
const out = [];
for (const r of routes) {
  await new Promise((res) => {
    const w = window.open("http://localhost:3000" + r, "_blank");
    setTimeout(() => {
      try {
        const nav = w.performance.getEntriesByType("navigation")[0];
        const res = w.performance.getEntriesByType("resource");
        const total =
          (nav?.transferSize || 0) +
          res.reduce((a, x) => a + (x.transferSize || 0), 0);
        const reqs = 1 + res.length;
        out.push({ route: r, KB: Math.round(total / 1024), reqs });
      } catch (e) {
        out.push({ route: r, error: String(e).slice(0, 60) });
      }
      w.close();
      res();
    }, 4500);
  });
}
return JSON.stringify(out);
