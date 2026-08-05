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

/**
 * Minimal shapes for Vercel's Node.js request and response.
 *
 * Typed structurally rather than importing @vercel/node, which is not a
 * dependency here. `body` is pre-parsed by the platform when the request
 * carries a JSON content-type; readBody covers the case where it is not.
 */
type Req = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  on(event: string, cb: (chunk?: unknown) => void): void;
};

type Res = {
  statusCode: number;
  setHeader(k: string, v: string): void;
  end(chunk?: string): void;
};

const send = (res: Res, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

/** Falls back to reading the stream when the platform has not parsed a body. */
function readBody(req: Req): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += String(chunk);
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

/*
 * Node signature, not the Web `(Request) => Response` one.
 *
 * nodemailer speaks SMTP over a TCP socket, so this has to run on the Node
 * runtime rather than Edge — and the Node runtime invokes the handler with
 * (req, res) and waits for res.end(). Returning a Response object there
 * satisfies nothing: the request hangs until the function times out, which
 * looks from the browser exactly like a form that does nothing.
 */
export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Method not allowed');
    return;
  }

  let body: Payload;
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body as Payload;
    } else {
      const raw = typeof req.body === 'string' ? req.body : await readBody(req);
      body = JSON.parse(raw) as Payload;
    }
  } catch {
    return send(res, 400, { ok: false, error: 'Invalid body' });
  }

  // Honeypot: real people never fill a hidden field. Return success so bots
  // cannot tell they were caught.
  if (body.company_fax) return send(res, 200, { ok: true });

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return send(res, 400, { ok: false, error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(res, 400, { ok: false, error: 'Invalid email' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    // Surfaced so the front end can fall back to a mailto: rather than
    // silently swallowing the enquiry.
    return send(res, 503, { ok: false, error: 'Mail not configured' });
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

    return send(res, 200, { ok: true });
  } catch (err) {
    // Message and code only. A full nodemailer error carries the SMTP
    // conversation, which on an auth failure echoes the mailbox back into logs.
    const e = err as { message?: string; code?: string };
    console.error('contact send failed', { code: e.code, message: e.message });
    return send(res, 502, { ok: false, error: 'Send failed' });
  }
}
