/**
 * Canonical site URL, used for metadata, sitemap, robots and JSON-LD.
 *
 * Order of precedence:
 *   1) NEXT_PUBLIC_SITE_URL  → set this once a custom domain is live
 *   2) VERCEL_PROJECT_PRODUCTION_URL → injected by Vercel at build time
 *   3) the current production deployment on vercel.app
 *
 * Do not point the fallback at a domain that is not registered yet:
 * search engines and link previews follow the canonical URL.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (
  fromEnv ?? fromVercel ?? "https://portfolio-lemon-nu-ba4w5tqwof.vercel.app"
).replace(/\/+$/, "");
