/**
 * Canonical site URL, used for metadata, sitemap, robots and JSON-LD.
 *
 * Order of precedence:
 *   1) VERCEL_PROJECT_PRODUCTION_URL → injected by Vercel at build time.
 *      It always holds the live production domain, and switches to a
 *      custom domain automatically once one is added in Vercel.
 *   2) NEXT_PUBLIC_SITE_URL → for local builds or hosting outside Vercel.
 *   3) the current production deployment on vercel.app.
 *
 * Vercel's own value wins so a stale NEXT_PUBLIC_SITE_URL in the dashboard
 * can never point canonical URLs and link previews at a dead domain.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = (
  fromVercel ?? fromEnv ?? "https://portfolio-lemon-nu-ba4w5tqwof.vercel.app"
).replace(/\/+$/, "");
