/**
 * Proves the mailbox credentials work, before trusting them in production.
 *
 *   node --env-file=.env scripts/check-smtp.mjs           # verify login only
 *   node --env-file=.env scripts/check-smtp.mjs --send    # also send one real email
 *
 * Reads SMTP_USER / SMTP_PASS / CONTACT_TO from the environment. Copy
 * .env.example to .env and fill it in — .env is gitignored and the password
 * never leaves this machine.
 *
 * Without --send this only opens an authenticated session and hangs up, so it
 * is safe to run as often as you like. It answers the question the deployed
 * form cannot: is this a credentials problem, a DNS problem, or neither.
 */
import nodemailer from 'nodemailer';

const HOST = process.env.SMTP_HOST ?? 'smtp.porkbun.com';
const PORT = Number(process.env.SMTP_PORT ?? 465);
const { SMTP_USER, SMTP_PASS } = process.env;
const TO = process.env.CONTACT_TO ?? SMTP_USER;

const ok = (m) => console.log(`  \x1b[32mOK\x1b[0m    ${m}`);
const bad = (m) => console.log(`  \x1b[31mFAIL\x1b[0m  ${m}`);
const info = (m) => console.log(`        ${m}`);

console.log(`\nMail preflight — ${HOST}:${PORT}\n`);

if (!SMTP_USER || !SMTP_PASS) {
  bad('SMTP_USER / SMTP_PASS are not set.');
  info('Copy .env.example to .env, fill it in, then re-run with:');
  info('  node --env-file=.env scripts/check-smtp.mjs');
  process.exit(1);
}
ok(`credentials present for ${SMTP_USER}`);
info(`enquiries would be delivered to ${TO}`);

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  secure: PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();
  ok('connected and authenticated');
} catch (err) {
  const e = /** @type {{code?: string, responseCode?: number, message?: string}} */ (err);
  bad(`could not authenticate — ${e.code ?? ''} ${e.message ?? ''}`.trim());

  // The three failures worth telling apart, because the fix differs entirely.
  if (e.code === 'EAUTH' || e.responseCode === 535) {
    info('The server answered but rejected the login.');
    info('Usually: the mailbox does not exist yet, or this is an Email');
    info('Forwarding domain rather than Email Hosting. Forwarding has no');
    info('mailbox to authenticate against.');
  } else if (e.code === 'ENOTFOUND' || e.code === 'EDNS') {
    info(`${HOST} did not resolve. Check SMTP_HOST.`);
  } else if (e.code === 'ETIMEDOUT' || e.code === 'ECONNECTION') {
    info(`Could not reach ${HOST}:${PORT}. A local firewall or network`);
    info('blocking outbound 465 will do this — it does not mean the');
    info('credentials are wrong.');
  }
  process.exit(1);
}

if (!process.argv.includes('--send')) {
  console.log('\nLogin works. Re-run with --send to deliver one real test email.\n');
  process.exit(0);
}

console.log('\n  sending one test email…');
try {
  const stamp = new Date().toISOString();
  const inf = await transporter.sendMail({
    from: `"HTT website" <${SMTP_USER}>`,
    to: TO,
    replyTo: `"Preflight test" <${SMTP_USER}>`,
    subject: `Preflight test — ${stamp}`,
    text:
      'If you are reading this in your inbox, the contact form can deliver.\n\n' +
      `Sent ${stamp} by scripts/check-smtp.mjs.`,
  });
  ok(`accepted by the server (id ${inf.messageId})`);
  info(`accepted: ${JSON.stringify(inf.accepted)}`);
  if (inf.rejected?.length) bad(`rejected: ${JSON.stringify(inf.rejected)}`);
  console.log(`\nNow check ${TO}. If it is not there within a minute, check spam —`);
  console.log('a brand new mailbox with no sending history often lands there once.\n');
} catch (err) {
  const e = /** @type {{code?: string, message?: string}} */ (err);
  bad(`send failed — ${e.code ?? ''} ${e.message ?? ''}`.trim());
  process.exit(1);
}
