/**
 * Central list of social + contact links.
 * Update any URL here and it will propagate across NavBar, footer and contact page.
 */

export const SOCIALS = {
  email: "recepulas.uzun@gmail.com",
  linkedin: "https://www.linkedin.com/in/recep-ulas-uzun/",
  github: "https://github.com/salamon30",
  instagram: "https://www.instagram.com/ulas__uzun/",
  facebook: "https://www.facebook.com/Ulas53/",
} as const;

export type SocialKey = keyof typeof SOCIALS;

/** Pretty display value for a given social key. */
export const SOCIAL_DISPLAY: Record<SocialKey, string> = {
  email: "recepulas.uzun@gmail.com",
  linkedin: "linkedin.com/in/recep-ulas-uzun",
  github: "github.com/salamon30",
  instagram: "@ulas__uzun",
  facebook: "facebook.com/Ulas53",
};

/** href builder — email turns into a mailto: link. */
export function socialHref(key: SocialKey): string {
  return key === "email" ? `mailto:${SOCIALS.email}` : SOCIALS[key];
}
