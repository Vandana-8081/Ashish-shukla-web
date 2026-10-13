import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const enquiryTypes = new Set(['general', 'media', 'programme', 'meeting', 'other']);

function readText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

function isRateLimited(ip: string, now: number): { limited: boolean; retryAfter: number } {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
  const current = rateLimitBuckets.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { limited: true, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { limited: false, retryAfter: 0 };
}

function getClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp.slice(0, 100);
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedFor ? forwardedFor.slice(0, 100) : 'unknown';
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_000) return NextResponse.json({ error: 'invalid_request' }, { status: 413 });

  const limit = isRateLimited(getClientIp(request), Date.now());
  if (limit.limited) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } });
  }

  let payload: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    payload = body as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const name = readText(payload.name, 120);
  const phone = readText(payload.phone, 30);
  const email = readText(payload.email, 254);
  const panchayat = readText(payload.panchayat, 120);
  const subject = readText(payload.subject, 160).replace(/[\r\n]+/gu, ' ');
  const enquiryType = readText(payload.enquiryType, 30);
  const message = readText(payload.message, 4000);
  const locale = payload.locale === 'hi' ? 'hi' : 'en';

  if (!name || !subject || !enquiryTypes.has(enquiryType) || message.length < 10) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  if (email && !emailPattern.test(email)) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });

  const phoneDigits = phone.replace(/\D/gu, '');
  if (!/^[+\d\s().-]+$/u.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });
  }

  const receiver = process.env.CONTACT_RECEIVER_EMAIL?.trim() ?? '';
  const sender = process.env.CONTACT_SENDER_EMAIL?.trim() ?? '';
  const gmailUser = process.env.GMAIL_USER?.trim() ?? '';
  // Google shows app passwords in groups of four separated by spaces; strip them.
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? '').replace(/\s+/gu, '');
  if (!emailPattern.test(receiver) || !emailPattern.test(sender) || /[\r\n]/u.test(sender)
    || !emailPattern.test(gmailUser) || !gmailAppPassword) {
    return NextResponse.json({ error: 'email_not_configured' }, { status: 503 });
  }

  const labels = locale === 'hi'
    ? { name: 'पूरा नाम', phone: 'मोबाइल नंबर', email: 'ईमेल पता', panchayat: 'ग्राम पंचायत / मजरा', subject: 'विषय', type: 'पूछताछ का प्रकार', message: 'समस्या या संदेश' }
    : { name: 'Full name', phone: 'Mobile number', email: 'Email address', panchayat: 'Village Panchayat / Hamlet', subject: 'Subject', type: 'Enquiry type', message: 'Problem or message description' };
  const types: Record<string, { en: string; hi: string }> = {
    general: { en: 'General enquiry', hi: 'सामान्य पूछताछ' },
    media: { en: 'Media', hi: 'मीडिया' },
    programme: { en: 'Public programme', hi: 'सार्वजनिक कार्यक्रम' },
    meeting: { en: 'Meeting request', hi: 'मुलाक़ात का अनुरोध' },
    other: { en: 'Other', hi: 'अन्य' },
  };
  const notProvided = locale === 'hi' ? 'प्रदान नहीं किया गया' : 'Not provided';
  const values: [string, string][] = [
    [labels.name, name], [labels.phone, phone], [labels.email, email || notProvided],
    [labels.panchayat, panchayat || notProvided], [labels.subject, subject],
    [labels.type, types[enquiryType][locale]], [labels.message, message],
  ];
  const text = values.map(([label, value]) => `${label}:\n${value}`).join('\n\n');
  const htmlRows = values.map(([label, value]) => `<tr><th align="left" valign="top" style="padding:10px;border:1px solid #e8e2d8;background:#faf7f2;white-space:nowrap">${escapeHtml(label)}</th><td valign="top" style="padding:10px;border:1px solid #e8e2d8;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailAppPassword },
    });
    await transporter.sendMail({
      from: sender,
      to: receiver,
      ...(email ? { replyTo: email } : {}),
      subject: `New Public Enquiry - Ashish Shukla Website: ${subject}`,
      text,
      html: `<div style="font-family:Arial,sans-serif;color:#171717"><h2>New public enquiry</h2><table style="border-collapse:collapse;width:100%;max-width:760px">${htmlRows}</table></div>`,
      messageId: `<${randomUUID()}@${gmailUser.split('@')[1]}>`,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const smtpError = error as { code?: unknown; responseCode?: unknown };
    const authenticationFailed = smtpError.code === 'EAUTH' || smtpError.responseCode === 535;
    // Log only safe delivery diagnostics. Never log credentials or message content.
    console.error('Contact email delivery failed', {
      code: typeof smtpError.code === 'string' ? smtpError.code : 'UNKNOWN',
      responseCode: typeof smtpError.responseCode === 'number' ? smtpError.responseCode : undefined,
    });
    return NextResponse.json(
      { error: authenticationFailed ? 'email_auth_failed' : 'delivery_failed' },
      { status: 502 },
    );
  }
}
