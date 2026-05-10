/**
 * Optional media files. The build / runtime is resilient if these
 * folders are empty — components fall back to placeholders.
 *
 * `npm run sync:photos` rewrites the arrays below from disk so you don't
 * have to edit this file by hand.
 *
 * Profile photo:  public/me/avatar.jpg
 * Tennis photos:  public/tennis/*.{jpg,png,webp}
 */

/** Path to your profile photo, or null if missing. */
export const PROFILE_AVATAR: string | null = "/me/avatar.png";

/** Tennis photos, in display order. */
export const TENNIS_PHOTOS: string[] = [
  "/tennis/IMG_0849.JPG",
  "/tennis/IMG_3591.JPG",
  "/tennis/IMG_4581.JPG",
  "/tennis/IMG_8500.jpeg",
];
