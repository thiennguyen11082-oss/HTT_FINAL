/**
 * Runs the real api/contact.ts handler against the real mailbox.
 *
 *   node --env-file=.env scripts/check-contact-endpoint.mjs          # dry run
 *   node --env-file=.env scripts/check-contact-endpoint.mjs --send   # deliver one
 *
 * check-smtp.mjs proves the mailbox accepts a login. This proves the thing
 * Vercel will actually execute: the same handler, the same validation, the same
 * message construction, the same envelope. The only difference in production is
 * where the environment variables come from.
 *
 * Dry run exercises every path that does not put mail on the wire — rejects,
 * honeypot, method guard — and stops short of sending.
 */
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const SEND = process.argv.includes('--send');

const ok = (m) => console.log(`  \x1b[32mOK\x1b[0m    ${m}`);
const bad = (m) => console.log(`  \x1b[31mFAIL\x1b[0m  ${m}`);
const info = (m) => console.log(`        ${m}`);

console.log(`\nContact endpoint check — ${SEND ? 'LIVE SEND' : 'dry run'}\n`);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  bad('SMTP_USER / SMTP_PASS are not set.');
  info('Run with:  node --env-file=.env scripts/check-contact-endpoint.mjs');
  process.exit(1);
}

const { default: handler } = await import(
  pathToFileURL(resolve(process.cwd(), 'api/contact.ts')).href
);

/**
 * Invokes the handler the way Vercel's Node runtime does: (req, res), and it is
 * only finished when res.end() is called.
 *
 * The timeout is the point. A handler that returns a value but never ends the
 * response looks fine to a test that inspects its return value, and hangs
 * forever in production. That is exactly how the Web-signature version passed
 * every local check while timing out on every real request.
 */
function post(body, method = 'POST', timeoutMs = 20000) {
  const req = {
    method,
    headers: { 'content-type': 'application/json' },
    body: method === 'POST' ? body : undefined,
    on(event, cb) {
      if (event === 'data' && method === 'POST') cb(JSON.stringify(body));
      if (event === 'end') cb();
    },
  };

  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`handler never called res.end() within ${timeoutMs}ms`)),
      timeoutMs
    );

    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) {
        this.headers[k.toLowerCase()] = v;
      },
      end(chunk) {
        clearTimeout(timer);
        let parsed = null;
        try {
          parsed = chunk ? JSON.parse(chunk) : null;
        } catch {
          parsed = chunk ?? null;
        }
        resolve({ status: this.statusCode, body: parsed, headers: this.headers });
      },
    };

    Promise.resolve(handler(req, res)).catch((err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

let failures = 0;
const expect = (label, cond, detail = '') => {
  if (cond) ok(label);
  else {
    bad(`${label}${detail ? ` — ${detail}` : ''}`);
    failures++;
  }
};

// --- paths that must never put mail on the wire ---------------------------
const bare = { name: 'Preflight', email: 'preflight@example.com', message: 'x' };

let r = await post({ ...bare, email: 'not-an-email' });
expect('malformed email rejected', r.status === 400, `got ${r.status}`);

r = await post({ ...bare, message: '' });
expect('missing message rejected', r.status === 400, `got ${r.status}`);

r = await post({ ...bare, company_fax: 'bot' });
expect('honeypot accepted silently', r.status === 200, `got ${r.status}`);

r = await post(null, 'GET');
expect('GET rejected', r.status === 405, `got ${r.status}`);

if (!failures) ok('handler behaves correctly before any send');

if (!SEND) {
  console.log('\nDry run only — nothing was sent.');
  console.log('Re-run with --send to deliver one enquiry to the real inbox.\n');
  process.exit(failures ? 1 : 0);
}

// --- the real thing --------------------------------------------------------
console.log('\n  submitting a realistic enquiry…');

const stamp = new Date().toISOString();
const res = await post({
  name: 'Preflight Test',
  business: 'Endpoint Check',
  email: 'preflight@example.com',
  phone: '(623) 999-6330',
  type: 'Car Detailing',
  budget: '$999',
  website: 'example.com',
  message:
    'This is the contact form endpoint check.\n\n' +
    `If this is in your inbox, the deployed form will work. Sent ${stamp}.`,
});

const body = res.body;

if (res.status === 200 && body?.ok) {
  ok('handler returned 200 {ok:true}');
  info(`delivered to ${process.env.CONTACT_TO ?? process.env.SMTP_USER}`);
  console.log('\nCheck the inbox. Reply-To will be preflight@example.com, so');
  console.log('hitting reply proves the reply path too.\n');
} else {
  bad(`handler returned ${res.status} ${JSON.stringify(body)}`);
  if (res.status === 503) info('Credentials missing — check .env is being loaded.');
  if (res.status === 502) info('SMTP refused the message. See the logged code/message above.');
  failures++;
}

process.exit(failures ? 1 : 0);
