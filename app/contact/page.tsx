"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { SOCIALS, SOCIAL_DISPLAY, socialHref, type SocialKey } from "@/lib/socials";

/* --------------------------- PAGE --------------------------- */

export default function ContactPage() {
  const { t, locale } = useT();

  return (
    <>
      <Hero />

      <section className="border-t border-default">
        <div className="container-page grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 md:py-28">
          {/* LEFT — Let's connect + socials */}
          <motion.div
            key={`left-${locale}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.contact.leftHeading}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {t.contact.leftBody}
            </p>

            <ul className="mt-10 flex flex-col gap-3">
              <SocialRow
                kind="email"
                label={t.contact.socials.email}
                display={SOCIAL_DISPLAY.email}
                delay={0.05}
              />
              <SocialRow
                kind="linkedin"
                label={t.contact.socials.linkedin}
                display={SOCIAL_DISPLAY.linkedin}
                delay={0.1}
              />
              <SocialRow
                kind="github"
                label={t.contact.socials.github}
                display={SOCIAL_DISPLAY.github}
                delay={0.15}
              />
              <SocialRow
                kind="instagram"
                label={t.contact.socials.instagram}
                display={SOCIAL_DISPLAY.instagram}
                delay={0.2}
              />
              <SocialRow
                kind="facebook"
                label={t.contact.socials.facebook}
                display={SOCIAL_DISPLAY.facebook}
                delay={0.25}
              />
            </ul>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            key={`form-${locale}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* --------------------------- HERO --------------------------- */

function Hero() {
  const { t, locale } = useT();
  return (
    <section className="relative overflow-hidden border-b border-default bg-grid">
      <div className="container-page py-20 md:py-28">
        <motion.p
          key={`k-${locale}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.18em] text-faint"
        >
          {t.contact.kicker}
        </motion.p>
        <motion.h1
          key={`t-${locale}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-4xl font-semibold tracking-tight md:text-display"
        >
          {t.contact.title}
        </motion.h1>
        <motion.p
          key={`d-${locale}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {t.contact.description}
        </motion.p>
      </div>
    </section>
  );
}

/* --------------------------- SOCIAL ROW --------------------------- */

function SocialRow({
  kind,
  label,
  display,
  delay,
}: {
  kind: SocialKey;
  label: string;
  display: string;
  delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        href={socialHref(kind)}
        target={kind === "email" ? undefined : "_blank"}
        rel={kind === "email" ? undefined : "noreferrer"}
        className="group flex items-center gap-4 rounded-xl border border-default bg-[var(--bg)] px-4 py-3.5 transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-default text-[var(--fg-muted)] transition-colors group-hover:text-[var(--fg)]">
          <SocialIcon kind={kind} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-medium text-[var(--fg)]">{label}</span>
          <span className="truncate text-xs text-faint">{display}</span>
        </span>
        <span className="ml-auto text-[var(--fg-muted)] opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight />
        </span>
      </Link>
    </motion.li>
  );
}

/* --------------------------- FORM --------------------------- */

type FormState = "idle" | "submitting" | "done" | "error";

function ContactForm() {
  const { t } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return t.contact.form.errorRequired;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) return t.contact.form.errorEmail;
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMsg(err);
      setState("error");
      return;
    }
    setErrorMsg(null);
    setState("submitting");

    // Try the server-side API (Resend) first.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setState("done");
        return;
      }
    } catch {
      // Swallow — fall through to mailto fallback below.
    }

    // Fallback: open the user's mail app with the message pre-filled.
    const subject = `Portfolio message from ${name.trim()}`;
    const body = `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`;
    const href = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setTimeout(() => setState("done"), 400);
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-default bg-subtle p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-default bg-[var(--bg)]">
          <CheckIcon />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          {t.contact.form.success}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t.contact.form.successBody}
        </p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setMessage("");
            setState("idle");
          }}
          className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← {t.contact.form.submit}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-default bg-[var(--bg)] p-6 md:p-8"
    >
      <Field
        id="name"
        label={t.contact.form.nameLabel}
        value={name}
        onChange={setName}
        placeholder={t.contact.form.namePlaceholder}
        autoComplete="name"
      />
      <Field
        id="email"
        label={t.contact.form.emailLabel}
        value={email}
        onChange={setEmail}
        placeholder={t.contact.form.emailPlaceholder}
        type="email"
        autoComplete="email"
      />
      <Field
        id="message"
        label={t.contact.form.messageLabel}
        value={message}
        onChange={setMessage}
        placeholder={t.contact.form.messagePlaceholder}
        multiline
      />

      {errorMsg && (
        <p className="text-sm text-[color:var(--accent)]" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary mt-2 w-full justify-center disabled:opacity-60"
      >
        {state === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
        {state !== "submitting" && <ArrowRight />}
      </button>
    </form>
  );
}

/* --------------------------- FIELD --------------------------- */

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "w-full rounded-lg border border-default bg-subtle px-3.5 py-2.5 text-sm text-[var(--fg)] placeholder:text-faint transition-colors focus:border-[var(--fg)]/40 focus:bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium text-[var(--fg-muted)]">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={shared}
        />
      )}
    </div>
  );
}

/* --------------------------- ICONS --------------------------- */

function SocialIcon({ kind }: { kind: SocialKey }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7" />
          <path d="M8 7.5v.01" />
          <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
          <path d="M12 10v7" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-4 1.3-4-2-6-2" />
          <path d="M15 22v-3.3a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.8 4.8 4.8 0 0 0 18.9 2s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.6 0C6.2 1.7 5.1 2 5.1 2a4.8 4.8 0 0 0-.1 3.8 5.2 5.2 0 0 0-1.4 3.6c0 5.1 3.1 6.4 6.1 6.7a3.3 3.3 0 0 0-.9 2.6V22" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
        </svg>
      );
  }
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M4 10 10 4m0 0H5m5 0v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}
