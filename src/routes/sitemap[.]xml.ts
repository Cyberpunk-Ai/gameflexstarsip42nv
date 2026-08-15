import { createFileRoute } from "@tanstack/react-router";

/** Public, crawlable marketing/content routes (auth-gated pages are excluded). */
const PATHS = [
  "/",
  "/about",
  "/how-it-works",
  "/tournaments",
  "/leaderboard",
  "/game-rooms",
  "/marketplace",
  "/achievements",
  "/explore",
  "/flex",
  "/faqs",
  "/help",
  "/contact",
  "/fair-play",
  "/terms",
  "/privacy",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin =
          process.env["SITE_URL"] ??
          process.env["VITE_SITE_URL"] ??
          new URL(request.url).origin;
        const base = origin.replace(/\/$/, "");
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = PATHS.map(
          (p) =>
            `  <url><loc>${base}${p}</loc><lastmod>${lastmod}</lastmod><changefreq>${
              p === "/" ? "daily" : "weekly"
            }</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
        ).join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
          {
            status: 200,
            headers: {
              "content-type": "application/xml; charset=utf-8",
              "cache-control": "public, max-age=3600",
            },
          },
        );
      },
    },
  },
});
