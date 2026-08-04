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
    .filter(([k, v]) => v && k !== 'company_fax')
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

    if (res.ok) return 'sent';

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
