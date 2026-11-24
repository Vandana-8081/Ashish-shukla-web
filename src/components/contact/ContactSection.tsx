'use client';

import { useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  UserRound,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';

interface ContactSectionProps {
  /** Heading level: h1 on the Contact page, h2 when embedded elsewhere. */
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

export function ContactSection({ as = 'h1', id, className = '' }: ContactSectionProps) {
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
    website: '', // honeypot
  });

  const updateFormField = (field: keyof typeof formData, value: string) => {
    idempotencyKeyRef.current = null;
    setSubmitError(null);
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot check for bots
    if (formData.website) {
      setSubmitted(true);
      return;
    }

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
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          panchayat: formData.panchayat,
          subject: formData.subject,
          enquiryType: formData.enquiryType,
          message: formData.message,
          locale,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setSubmitError(result.error ?? 'delivery_failed');
        return;
      }

      idempotencyKeyRef.current = null;
      setFormData({
        name: '',
        phone: '',
        email: '',
        panchayat: '',
        subject: '',
        enquiryType: 'general',
        message: '',
        website: '',
      });
      setSubmitted(true);
    } catch {
      setSubmitError('delivery_failed');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const submitErrorMessage =
    submitError === 'rate_limited'
      ? hi
        ? 'कृपया कुछ मिनट बाद पुनः प्रयास करें।'
        : 'Please wait a few minutes before trying again.'
      : submitError === 'invalid_email'
      ? hi
        ? 'कृपया सही ईमेल पता दर्ज करें।'
        : 'Please enter a valid email address.'
      : submitError === 'invalid_phone'
      ? hi
        ? 'कृपया सही मोबाइल नंबर दर्ज करें (7 से 15 अंक)।'
        : 'Please enter a valid mobile number (7 to 15 digits).'
      : submitError === 'email_not_configured'
      ? hi
        ? 'संदेश सेवा अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।'
        : 'The message service is not configured yet. Please try again later.'
      : submitError === 'email_auth_failed'
      ? hi
        ? 'ईमेल सेवा का प्रमाणीकरण विफल हुआ।'
        : 'Email authentication failed.'
      : submitError
      ? hi
        ? 'संदेश भेजा नहीं जा सका। कृपया पुनः प्रयास करें।'
        : 'Your message could not be sent. Please try again.'
      : null;

  const enquiryTypes = hi
    ? [
        { value: 'general', label: 'सामान्य पूछताछ (General Enquiry)' },
        { value: 'issue', label: 'जनसमस्या / जनसुनवाई (Public Issue)' },
        { value: 'media', label: 'मीडिया संवाद (Media Enquiry)' },
        { value: 'programme', label: 'सार्वजनिक कार्यक्रम (Event Invitation)' },
        { value: 'meeting', label: 'मुलाक़ात का अनुरोध (Meeting Request)' },
        { value: 'other', label: 'अन्य (Other)' },
      ]
    : [
        { value: 'general', label: 'General Enquiry' },
        { value: 'issue', label: 'Public Issue' },
        { value: 'media', label: 'Media Enquiry' },
        { value: 'programme', label: 'Event Invitation' },
        { value: 'meeting', label: 'Meeting Request' },
        { value: 'other', label: 'Other' },
      ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      case 'x':
        return <XIcon size={16} />;
      default:
        return null;
    }
  };

  const inputClass =
    'w-full rounded-[16px] border border-black/[0.09] bg-[#FBFAF7] px-4 py-3.5 text-[15px] text-[#151210] outline-none transition-all duration-200 placeholder:text-black/30 hover:border-black/[0.18] focus:border-[#F5660A] focus:bg-white focus:ring-4 focus:ring-[#F5660A]/10';

  const HeadingTag = as;

  return (
    <div id={id} className={`w-full ${className}`}>
      {/* =====================================================================
          1. HERO SECTION - Editorial Split Dark Navy with Glowing Ambient Orbs
      ====================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0A1927] text-white">
        {/* Subtle grid background texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        {/* Ambient Saffron and Green Glow Orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-16 -z-20 h-[450px] w-[450px] rounded-full bg-[#F5660A]/14 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 -z-20 h-[450px] w-[450px] rounded-full bg-[#138808]/14 blur-[130px]"
        />

        <Container size="wide">
          <div className="grid gap-6 pt-6 sm:pt-8 lg:grid-cols-12 lg:items-end lg:gap-8">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center py-4 sm:py-6 lg:col-span-6 lg:py-6"
            >
              <div className="max-w-[580px]">
                <HeadingTag className="font-editorial text-[clamp(44px,6vw,76px)] font-bold leading-[0.92] tracking-[-0.045em] text-white">
                  {hi ? 'संपर्क' : 'Connect'}
                </HeadingTag>

                <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-white/70 sm:text-[16px]">
                  {hi
                    ? 'जनसंवाद, कार्यक्रम निमंत्रण, मीडिया संवाद या अन्य आधिकारिक संवाद के लिए नीचे दिए गए माध्यमों का उपयोग करें।'
                    : 'For public matters, event invitations, media enquiries or other official communication, use the available contact channels.'}
                </p>

                {/* Send a message smooth scroll link button */}
                <a
                  href="#contact-main"
                  className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-[#F5660A] sm:mt-7"
                >
                  <span>{hi ? 'संदेश भेजें' : 'Send a message'}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-transform duration-300 group-hover:translate-y-1">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right Cutout Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:col-span-6 lg:justify-end"
            >
              <div className="relative aspect-[4/3] w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px]">
                <Image
                  src="/images/contact/ashish-contact.png"
                  alt="Ashish Shukla"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Bottom Tricolor Divider Strip */}
        <div
          aria-hidden="true"
          className="h-[4px] w-full bg-[linear-gradient(90deg,#F5660A_0_33%,#F8F4ED_33%_66%,#138808_66%)]"
        />
      </section>

      {/* =====================================================================
          2. MAIN SECTION (#contact-main) - Warm Cream Background with 2 Columns
      ====================================================================== */}
      <section id="contact-main" className="bg-[#F8F4ED] py-14 md:py-18 lg:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* -------------------------------------------------------------
                LEFT COLUMN - Direct & Official Contact Sticky Sidebar
            -------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-[120px]"
            >
              <h2 className="font-editorial text-[clamp(32px,3.8vw,48px)] font-bold leading-[1.04] tracking-[-0.035em] text-[#151210]">
                {hi ? (
                  <>
                    सीधा एवं
                    <br />
                    <span className="text-[#F5660A]">आधिकारिक संपर्क</span>
                  </>
                ) : (
                  <>
                    Direct and
                    <br />
                    <span className="text-[#F5660A]">official contact</span>
                  </>
                )}
              </h2>

              <p className="mt-4 max-w-[420px] text-[14px] leading-relaxed text-[#4A433D] md:text-[15px]">
                {hi
                  ? 'सार्वजनिक विषयों, कार्यक्रमों और औपचारिक संवाद के लिए नीचे दिए गए माध्यमों का उपयोग करें।'
                  : 'Use the contact channels below for public matters, programmes and formal communication.'}
              </p>

              {/* Contact Channels List */}
              <div className="mt-8 border-y border-black/[0.08]">
                {/* Email */}
                <div className="flex items-start gap-4 border-b border-black/[0.08] py-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EADFCE] text-[#0E1B2E]">
                    <Mail className="h-5 w-5 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href="mailto:ashishshuklaoffice@gmail.com"
                      className="group mt-1.5 inline-flex max-w-full items-center gap-1.5 break-all text-[14px] font-semibold text-[#151210] transition-colors hover:text-[#F5660A]"
                    >
                      <span>ashishshuklaoffice@gmail.com</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-black/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F5660A]" />
                    </a>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="flex items-start gap-4 py-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EADFCE] text-[#0E1B2E]">
                    <UserRound className="h-5 w-5 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {socialLinks.map((item) => (
                        <a
                          key={item.platform}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[#151210] shadow-sm transition-all hover:border-[#F5660A] hover:bg-[#F5660A] hover:text-white hover:-translate-y-0.5"
                        >
                          {getSocialIcon(item.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN - Form Card Container
            -------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-[0_24px_70px_rgba(15,28,40,0.06)] sm:p-7 md:p-9 lg:p-10">
                {submitted ? (
                  /* Success Feedback Card */
                  <div className="py-8 text-center sm:py-12">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="mt-5 font-editorial text-2xl font-bold text-[#151210] sm:text-3xl">
                      {hi ? 'संदेश सफलतापूर्वक प्राप्त हुआ' : 'Message Sent Successfully'}
                    </h3>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6E665E] sm:text-base">
                      {hi
                        ? 'धन्यवाद। आपका विवरण जनसेवा कार्यालय द्वारा दर्ज कर लिया गया है। आवश्यकतानुसार हमारे प्रतिनिधि आपसे संपर्क करेंगे।'
                        : 'Thank you. Your message and details have been recorded. Our team will follow up if required.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          panchayat: '',
                          subject: '',
                          enquiryType: 'general',
                          message: '',
                          website: '',
                        });
                      }}
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E1B2E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#F5660A] hover:-translate-y-0.5"
                    >
                      {hi ? 'एक और संदेश लिखें' : 'Write another message'}
                    </button>
                  </div>
                ) : (
                  /* Contact Form */
                  <form onSubmit={handleSubmit}>
                    {/* Honeypot field for bot protection */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={formData.website}
                      onChange={(e) => updateFormField('website', e.target.value)}
                      className="hidden"
                    />

                    {/* Form Card Header */}
                    <div className="grid gap-4 border-b border-black/[0.08] pb-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-5 md:pb-7">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EEE2D2] text-[#F5660A]">
                        <MessageSquare className="h-6 w-6 stroke-[1.6]" />
                      </div>
                      <div>
                        <h3 className="font-editorial text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#151210]">
                          {hi ? 'संदेश भेजें' : 'Send a message'}
                        </h3>
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="mt-7 grid gap-5">
                      {/* Name & Phone */}
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            <UserRound className="h-3.5 w-3.5 text-[#F5660A]" />
                            {dict.contactSection.nameLabel}
                          </span>
                          <input
                            type="text"
                            name="name"
                            required
                            maxLength={100}
                            autoComplete="name"
                            placeholder={dict.contactSection.namePlaceholder}
                            value={formData.name}
                            onChange={(e) => updateFormField('name', e.target.value)}
                            className={inputClass}
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            <Phone className="h-3.5 w-3.5 text-[#F5660A]" />
                            {dict.contactSection.phoneLabel}
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            maxLength={24}
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder={dict.contactSection.phonePlaceholder}
                            value={formData.phone}
                            onChange={(e) => updateFormField('phone', e.target.value)}
                            className={inputClass}
                          />
                        </label>
                      </div>

                      {/* Email & Panchayat */}
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            <Mail className="h-3.5 w-3.5 text-[#F5660A]" />
                            {dict.contactSection.emailLabel}
                          </span>
                          <input
                            type="email"
                            name="email"
                            maxLength={160}
                            inputMode="email"
                            autoComplete="email"
                            placeholder={hi ? 'उदा. name@example.com' : 'e.g. name@example.com'}
                            value={formData.email}
                            onChange={(e) => updateFormField('email', e.target.value)}
                            className={inputClass}
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            <MapPin className="h-3.5 w-3.5 text-[#F5660A]" />
                            {dict.contactSection.panchayatLabel}
                          </span>
                          <input
                            type="text"
                            name="panchayat"
                            maxLength={120}
                            placeholder={dict.contactSection.panchayatPlaceholder}
                            value={formData.panchayat}
                            onChange={(e) => updateFormField('panchayat', e.target.value)}
                            className={inputClass}
                          />
                        </label>
                      </div>

                      {/* Enquiry Type & Subject */}
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            <ChevronDown className="h-3.5 w-3.5 text-[#F5660A]" />
                            {hi ? 'पूछताछ का प्रकार *' : 'Enquiry Type *'}
                          </span>
                          <div className="relative">
                            <select
                              name="enquiryType"
                              value={formData.enquiryType}
                              onChange={(e) => updateFormField('enquiryType', e.target.value)}
                              className={`${inputClass} appearance-none pr-10`}
                            >
                              {enquiryTypes.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                          </div>
                        </label>

                        <label className="grid gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                            {hi ? 'विषय *' : 'Subject *'}
                          </span>
                          <input
                            type="text"
                            name="subject"
                            required
                            maxLength={160}
                            placeholder={hi ? 'उदा. सड़क निर्माण / जनसमस्या' : 'e.g. Road repair / Public issue'}
                            value={formData.subject}
                            onChange={(e) => updateFormField('subject', e.target.value)}
                            className={inputClass}
                          />
                        </label>
                      </div>

                      {/* Message Textarea */}
                      <label className="grid gap-2">
                        <span className="flex items-center gap-2 text-xs font-bold text-[#3F3B36]">
                          <MessageSquare className="h-3.5 w-3.5 text-[#F5660A]" />
                          {dict.contactSection.messageLabel}
                        </span>
                        <textarea
                          name="message"
                          required
                          minLength={10}
                          maxLength={4000}
                          rows={6}
                          placeholder={dict.contactSection.messagePlaceholder}
                          value={formData.message}
                          onChange={(e) => updateFormField('message', e.target.value)}
                          className={`${inputClass} min-h-[140px] resize-y leading-relaxed`}
                        />
                      </label>
                    </div>

                    {/* Bottom Actions & Privacy Note */}
                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black/[0.08] pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-[15px] bg-[#0E1B2E] px-7 py-3.5 text-sm font-bold text-white shadow-[0_9px_25px_rgba(14,27,46,0.18)] transition-all duration-300 hover:bg-[#F5660A] hover:-translate-y-0.5 hover:shadow-[0_13px_32px_rgba(245,102,10,0.25)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        <span>
                          {isSubmitting
                            ? hi
                              ? 'भेजा जा रहा है…'
                              : 'Sending…'
                            : hi
                            ? 'संदेश भेजें'
                            : 'Send message'}
                        </span>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>

                      <div className="text-[11px] leading-5 text-[#7A736A] max-w-sm">
                        {hi
                          ? 'कृपया केवल अपने संदेश से संबंधित प्रासंगिक जानकारी ही साझा करें।'
                          : 'Please share only the information relevant to your message.'}
                      </div>
                    </div>

                    {/* Error Banner */}
                    {submitErrorMessage && (
                      <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {submitErrorMessage}
                      </div>
                    )}
                  </form>
                )}

                {/* Subtle Tricolor Accent Line at bottom of the card */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,#F5660A_0_33%,transparent_33%_66%,#138808_66%)]"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
