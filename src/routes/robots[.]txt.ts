import { createFileRoute } from "@tanstack/react-router";

/**
 * robots.txt is served dynamically so the Sitemap directive is an absolute URL
 * (required by crawlers) on every environment: set SITE_URL in production,
 * otherwise the request origin is used.
 */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin =
          process.env["SITE_URL"] ?? process.env["VITE_SITE_URL"] ?? new URL(request.url).origin;
        const base = origin.replace(/\/$/, "");

        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /admin",
          "Disallow: /settings",
          "Disallow: /wallet",
          "Disallow: /messages",
          "Disallow: /notifications",
          "",
          `Sitemap: ${base}/sitemap.xml`,
          "",
        ].join("\n");

        return new Response(body, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
