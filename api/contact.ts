import nodemailer from 'nodemailer';

/**
 * Contact form → Porkbun-hosted inbox.
 *
 * A browser cannot speak SMTP, and putting mailbox credentials in client code
 * would publish them. So the form POSTs here, this function authenticates
 * against Porkbun's SMTP server, and the enquiry lands in the business inbox.
 *
 * Credentials come from environment variables only — never from the repo:
 *   SMTP_USER   full mailbox address used to send, e.g. noreply@httmarketing.com
 *   SMTP_PASS   that mailbox's password
 *   CONTACT_TO  destination inbox (defaults to contact@httmarketing.com)
 *
 * Porkbun's outgoing server is smtp.porkbun.com on 465 (implicit TLS).
 */

const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.porkbun.com';
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const TO = process.env.CONTACT_TO ?? 'contact@httmarketing.com';

type Payload = Record<string, string>;

/** Fields we accept. Anything else in the body is ignored. */
const FIELDS = [
  'name',
  'business',
  'email',
  'phone',
  'type',
  'budget',
  'website',
  'message',
  'purpose',
  'status',
  'urgency',
] as const;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!
  );

/**
 * Strips anything that could break out of a mail header.
 *
 * A newline in a submitted value would let an attacker inject extra headers —
 * a Bcc, a different Reply-To — so nothing reaches a header field untreated.
 */
const headerSafe = (s: string) =>
  s.replace(/[\r\n]+/g, ' ').replace(/["<>]/g, '').trim().slice(0, 120);

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  // Honeypot: real people never fill a hidden field. Return success so bots
  // cannot tell they were caught.
  if (body.company_fax) return Response.json({ ok: true });

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    // Surfaced so the front end can fall back to a mailto: rather than
    // silently swallowing the enquiry.
    return Response.json({ ok: false, error: 'Mail not configured' }, { status: 503 });
  }

  const rows = FIELDS.filter((k) => body[k]).map(
    (k) => `<tr><td style="padding:4px 14px 4px 0;color:#6B6E78">${k}</td>` +
      `<td style="padding:4px 0;color:#111">${escapeHtml(body[k])}</td></tr>`
  );

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      // From must be the authenticated mailbox or Porkbun will reject it.
      from: `"HTT website" <${process.env.SMTP_USER}>`,
      to: TO,
      // So hitting reply in the inbox goes straight to the enquirer.
      replyTo: `"${headerSafe(name)}" <${headerSafe(email)}>`,
      subject: headerSafe(`New enquiry — ${body.business || name}`),
      text: FIELDS.filter((k) => body[k]).map((k) => `${k}: ${body[k]}`).join('\n'),
      html:
        `<div style="font-family:system-ui,sans-serif;font-size:14px">` +
        `<h2 style="margin:0 0 14px">New enquiry</h2>` +
        `<table style="border-collapse:collapse">${rows.join('')}</table>` +
        `</div>`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // Message and code only. A full nodemailer error carries the SMTP
    // conversation, which on an auth failure echoes the mailbox back into logs.
    const e = err as { message?: string; code?: string };
    console.error('contact send failed', { code: e.code, message: e.message });
    return Response.json({ ok: false, error: 'Send failed' }, { status: 502 });
  }
}
