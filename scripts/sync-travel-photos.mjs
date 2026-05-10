#!/usr/bin/env node
/**
 * scripts/sync-travel-photos.mjs
 *
 * Walks `public/` and rewrites three things automatically:
 *   1. `lib/travel.ts`  — photos: [...] of every Country
 *   2. `lib/media.ts`   — TENNIS_PHOTOS array
 *   3. `lib/media.ts`   — PROFILE_AVATAR (first file in public/me/)
 *
 * Allowed extensions: .jpg .jpeg .png .webp .avif
 * .gitkeep, README.md and hidden files are ignored.
 *
 * Run from project root:
 *   npm run sync:photos
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const PUBLIC_DIR = join(ROOT, "public");
const TRAVEL_DIR = join(PUBLIC_DIR, "travel");
const TENNIS_DIR = join(PUBLIC_DIR, "tennis");
const ME_DIR = join(PUBLIC_DIR, "me");
const TRAVEL_TS = join(ROOT, "lib", "travel.ts");
const MEDIA_TS = join(ROOT, "lib", "media.ts");

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;

function log(...args) {
  // eslint-disable-next-line no-console
  console.log("[sync]", ...args);
}

async function listImages(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && !e.name.startsWith(".") && IMG_RE.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

async function syncTravel() {
  if (!existsSync(TRAVEL_TS)) throw new Error(`Cannot find ${TRAVEL_TS}`);

  let src = await readFile(TRAVEL_TS, "utf8");
  const countryRe = /slug:\s*"([\w-]+)"[\s\S]*?photos:\s*\[[^\]]*\]/g;

  let totalCountries = 0;
  let totalPhotos = 0;

  src = await replaceAsync(src, countryRe, async (match, slug) => {
    totalCountries += 1;
    const files = await listImages(join(TRAVEL_DIR, slug));
    const paths = files.map((f) => `/travel/${slug}/${f}`);
    totalPhotos += paths.length;

    const list = paths.map((p) => `      "${p}"`).join(",\n");
    const replacement = paths.length
      ? `photos: [\n${list},\n    ]`
      : `photos: []`;

    log(
      `travel/${slug.padEnd(16)} → ${paths.length} photo${paths.length === 1 ? "" : "s"}`
    );

    return match.replace(/photos:\s*\[[^\]]*\]/, replacement);
  });

  await writeFile(TRAVEL_TS, src, "utf8");
  log(`travel: ${totalCountries} countries, ${totalPhotos} photos\n`);
}

async function syncMedia() {
  if (!existsSync(MEDIA_TS)) throw new Error(`Cannot find ${MEDIA_TS}`);

  // Tennis
  const tennisFiles = await listImages(TENNIS_DIR);
  const tennisPaths = tennisFiles.map((f) => `/tennis/${f}`);
  log(`tennis            → ${tennisPaths.length} photos`);

  // Profile avatar (first image in public/me/)
  const meFiles = await listImages(ME_DIR);
  const avatar = meFiles.length ? `/me/${meFiles[0]}` : null;
  log(`me/avatar         → ${avatar ?? "(missing)"}`);

  let src = await readFile(MEDIA_TS, "utf8");

  // Replace PROFILE_AVATAR
  src = src.replace(
    /export const PROFILE_AVATAR:\s*[^\n]+\n/,
    avatar
      ? `export const PROFILE_AVATAR: string | null = "${avatar}";\n`
      : `export const PROFILE_AVATAR: string | null = null;\n`
  );

  // Replace TENNIS_PHOTOS
  const tennisList = tennisPaths.length
    ? tennisPaths.map((p) => `  "${p}"`).join(",\n")
    : "";
  const tennisBlock = tennisPaths.length
    ? `export const TENNIS_PHOTOS: string[] = [\n${tennisList},\n];`
    : `export const TENNIS_PHOTOS: string[] = [];`;
  src = src.replace(
    /export const TENNIS_PHOTOS:\s*string\[\]\s*=\s*\[[^\]]*\];?/,
    tennisBlock
  );

  await writeFile(MEDIA_TS, src, "utf8");
}

async function main() {
  log("Scanning public/ for media…");
  await syncTravel();
  await syncMedia();
  log("Done. Restart `npm run dev` to see changes.");
}

async function replaceAsync(str, regex, replacer) {
  const matches = [];
  str.replace(regex, (...args) => {
    matches.push(args);
    return "";
  });
  if (matches.length === 0) return str;
  const replaced = await Promise.all(matches.map((args) => replacer(...args)));
  let i = 0;
  return str.replace(regex, () => replaced[i++]);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[sync] failed:", err);
  process.exit(1);
});
