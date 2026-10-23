'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  /** Heading level: h1 on the Contact page, h2 when embedded in the Home page. */
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

export function ContactSection({ as = 'h2', id, className = '' }: ContactSectionProps) {
  const { dict, locale } = useLanguage();
  const hi = locale === 'hi';
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    panchayat: '',
    subject: '',
    enquiryType: 'general',
    message: '',
  });

  const updateFormField = (field: keyof typeof formData, value: string) => {
    idempotencyKeyRef.current = null;
    setSubmitError(null);
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify({ ...formData, locale }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };

      if (!response.ok) {
        setSubmitError(result.error ?? 'delivery_failed');
        return;
      }

      idempotencyKeyRef.current = null;
      setFormData({ name: '', phone: '', email: '', panchayat: '', subject: '', enquiryType: 'general', message: '' });
      setSubmitted(true);
    } catch {
      setSubmitError('delivery_failed');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const submitErrorMessage = submitError === 'rate_limited'
    ? (hi ? 'कृपया कुछ मिनट बाद पुनः प्रयास करें।' : 'Please wait a few minutes before trying again.')
    : submitError === 'invalid_email'
      ? (hi ? 'कृपया सही ईमेल पता दर्ज करें।' : 'Please enter a valid email address.')
      : submitError === 'invalid_phone'
        ? (hi ? 'कृपया सही मोबाइल नंबर दर्ज करें।' : 'Please enter a valid mobile number.')
        : submitError === 'email_not_configured'
          ? (hi ? 'संदेश सेवा अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।' : 'The message service is not available yet. Please try again later.')
          : submitError === 'email_auth_failed'
            ? (hi ? 'ईमेल सेवा का प्रमाणीकरण विफल हुआ। कृपया सर्वर पर नया Gmail App Password सेट करें।' : 'Gmail rejected the SMTP credentials. Set a valid Google App Password in the server environment, then try again.')
          : submitError
            ? (hi ? 'संदेश भेजा नहीं जा सका। कृपया पुनः प्रयास करें।' : 'Your message could not be sent. Please try again.')
            : null;

  const enquiryTypes = hi
    ? [
        { value: 'general', label: 'सामान्य पूछताछ' },
        { value: 'media', label: 'मीडिया' },
        { value: 'programme', label: 'सार्वजनिक कार्यक्रम' },
        { value: 'meeting', label: 'मुलाक़ात का अनुरोध' },
        { value: 'other', label: 'अन्य' },
      ]
    : [
        { value: 'general', label: 'General enquiry' },
        { value: 'media', label: 'Media' },
        { value: 'programme', label: 'Public programme' },
        { value: 'meeting', label: 'Meeting request' },
        { value: 'other', label: 'Other' },
      ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <FacebookIcon size={18} />;
      case 'instagram': return <InstagramIcon size={18} />;
      case 'x': return <XIcon size={16} />;
      default: return null;
    }
  };

  const inputClass = 'mt-2 block w-full rounded-xl border border-[#E8E2D8] bg-white px-4 py-3 text-sm text-[#151210] placeholder:text-[#8A8178] focus:border-[#F5660A] focus:outline-none focus:ring-2 focus:ring-[#F5660A]/15';
  const labelClass = 'text-sm font-semibold text-[#151210]';

  return (
    <section id={id} aria-label={hi ? 'संपर्क करें' : 'Contact'} className={`bg-[var(--navy-deep)] py-12 md:py-20 scroll-mt-24 ${className}`}>
      <Container size="wide">
        <SectionHeading
          eyebrow={dict.contactSection.eyebrow}
          title={hi ? 'संपर्क करें' : 'Get in touch'}
          as={as}
          light
          description={hi
            ? 'सार्वजनिक सहभागिता, मीडिया, कार्यक्रमों या मुलाक़ात के लिए अपना संदेश भेजें।'
            : 'Get in touch about public engagement, media, programmes, or a meeting.'}
        />

        <div className="mx-auto max-w-3xl">
          {submitted ? (
            <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 text-center shadow-xl sm:p-12">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
              <h2 className="mt-5 font-editorial text-xl font-bold text-[#151210]">
                {hi ? 'आपका संदेश सफलतापूर्वक भेजा गया' : 'Your enquiry was sent successfully'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6B625A]">
                {hi
                  ? 'आपका संदेश प्राप्त हो गया है।'
                  : 'Your message has been received.'}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSubmitted(false);
                  setSubmitError(null);
                  setFormData({ name: '', phone: '', email: '', panchayat: '', subject: '', enquiryType: 'general', message: '' });
                }}
              >
                {hi ? 'एक और संदेश लिखें' : 'Write another message'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border border-[#E8E2D8] border-t-4 border-t-[var(--saffron)] bg-white p-5 shadow-xl sm:grid-cols-2 sm:p-8">
              <div>
                <label htmlFor="contact-name" className={labelClass}>{dict.contactSection.nameLabel}</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} value={formData.name} onChange={(event) => updateFormField('name', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelClass}>{dict.contactSection.phoneLabel}</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} value={formData.phone} onChange={(event) => updateFormField('phone', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>{dict.contactSection.emailLabel}</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} value={formData.email} onChange={(event) => updateFormField('email', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-panchayat" className={labelClass}>{dict.contactSection.panchayatLabel}</label>
                <input id="contact-panchayat" name="panchayat" type="text" maxLength={120} value={formData.panchayat} onChange={(event) => updateFormField('panchayat', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-subject" className={labelClass}>{hi ? 'विषय *' : 'Subject *'}</label>
                <input id="contact-subject" name="subject" type="text" required maxLength={160} value={formData.subject} onChange={(event) => updateFormField('subject', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-type" className={labelClass}>{hi ? 'पूछताछ का प्रकार' : 'Enquiry type'}</label>
                <select id="contact-type" name="enquiryType" value={formData.enquiryType} onChange={(event) => updateFormField('enquiryType', event.target.value)} className={inputClass}>
                  {enquiryTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={labelClass}>{dict.contactSection.messageLabel}</label>
                <textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={4000} value={formData.message} onChange={(event) => updateFormField('message', event.target.value)} className={`${inputClass} resize-y`} />
              </div>
              <div className="flex justify-end border-t border-[#E8E2D8] pt-5 sm:col-span-2">
                {submitErrorMessage && (
                  <p role="alert" className="mr-auto self-center text-sm text-red-700">
                    {submitErrorMessage}
                  </p>
                )}
                <Button type="submit" variant="primary" size="lg" icon={isSubmitting ? 'none' : 'arrow'} disabled={isSubmitting}>
                  {isSubmitting
                    ? (hi ? 'भेजा जा रहा है…' : 'Sending…')
                    : (hi ? 'ईमेल से भेजें' : 'Send enquiry')}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#DCD4C8] pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#6B625A]">{dict.contactSection.socialTitle}</p>
            <div className="flex gap-2">
              {socialLinks.map((item) => (
                <a key={item.platform} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E2D8] bg-white text-[#151210] transition-colors hover:border-[#F5660A] hover:text-[#F5660A]">
                  {getSocialIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
