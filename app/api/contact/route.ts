import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "ulasch_uzun@hotmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // No API key configured: surface a clear error so the client falls back to mailto.
      return NextResponse.json({ ok: false, error: "resend_not_configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    const subject = `Portfolio message from ${name}`;
    const text = `${message}\n\n—\n${name}\n${email}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;color:#111;padding:24px">
        <h2 style="margin:0 0 12px;font-size:18px">New portfolio message</h2>
        <p style="white-space:pre-wrap;line-height:1.6;font-size:15px;margin:0 0 24px">${escapeHtml(message)}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <p style="margin:0;font-size:14px"><strong>From:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0;font-size:14px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      </div>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: "send_failed", detail: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "server_error", detail: String(err) },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
