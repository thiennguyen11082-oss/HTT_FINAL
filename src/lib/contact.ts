/**
 * Submits an enquiry to the serverless mail endpoint.
 *
 * Falls back to opening the visitor's mail client if the endpoint is missing or
 * unconfigured — during local dev, or before the SMTP environment variables are
 * set in production. An enquiry should never be silently lost because the mail
 * plumbing is not finished.
 */
export type SendState = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const TO = 'contact@httmarketing.com';

function mailtoFallback(data: Record<string, string>, subject: string) {
  const body = Object.entries(data)
    .filter(([k, v]) => v && k !== 'contact_ref' && k !== 'company_fax')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export async function sendEnquiry(
  data: Record<string, string>,
  subject: string
): Promise<SendState> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      /*
       * A 200 is not on its own proof the function ran. If the SPA rewrite ever
       * matches /api/contact — which is exactly what a catch-all rewrite does
       * when it is not filesystem-aware — the request resolves to index.html
       * with a 200, res.ok is true, and every enquiry is reported as sent while
       * silently going nowhere. So the body has to actually be our JSON.
       */
      const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
      if (isJson) {
        const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
        if (body?.ok) return 'sent';
      }

      // Reached the server but not the function. Never claim this was sent.
      mailtoFallback(data, subject);
      return 'fallback';
    }

    // 503 means the mailbox credentials are not set yet; 404 means the function
    // is not deployed. Both are our problem, not the visitor's — hand them a
    // working route instead of an error.
    if (res.status === 503 || res.status === 404) {
      mailtoFallback(data, subject);
      return 'fallback';
    }

    return 'error';
  } catch {
    mailtoFallback(data, subject);
    return 'fallback';
  }
}
