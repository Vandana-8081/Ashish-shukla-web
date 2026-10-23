'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';

type Mode = 'issue' | 'meeting';

const issueCategories = [
  ['Road', 'सड़क'], ['Electricity', 'बिजली'], ['Water', 'पानी'], ['Drainage', 'नाली'],
  ['Healthcare', 'स्वास्थ्य'], ['Education', 'शिक्षा'], ['Government Scheme', 'सरकारी योजना'],
  ['Agriculture', 'कृषि'], ['Public Safety', 'सार्वजनिक सुरक्षा'], ['Other', 'अन्य'],
] as const;

const empty = {
  name: '', phone: '', organisation: '', village: '', block: '', category: 'Road',
  location: '', preferredDate: '', message: '',
};

export function PublicForms() {
  const { locale } = useLanguage();
  const hi = locale === 'hi';
  const [mode, setMode] = useState<Mode>('issue');
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const set = (k: keyof typeof empty, v: string) => {
    setError(false);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(false);
    const subject =
      mode === 'issue'
        ? `${hi ? 'जन समस्या' : 'Public issue'}: ${form.category} - ${form.village || form.name}`
        : `${hi ? 'मुलाक़ात अनुरोध' : 'Meeting request'}: ${form.organisation || form.name}`;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject, enquiryType: mode, locale }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      setForm(empty);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  const input =
    'mt-2 block w-full rounded-xl border border-[#E8E2D8] bg-white px-4 py-3 text-sm text-[#151210] focus:border-[#F5660A] focus:outline-none focus:ring-2 focus:ring-[#F5660A]/15';
  const label = 'text-sm font-semibold text-[#151210]';

  const tabs: [Mode, string][] = [
    ['issue', hi ? 'जन समस्या दर्ज करें' : 'Public Issue'],
    ['meeting', hi ? 'मुलाक़ात / कार्यक्रम अनुरोध' : 'Meeting / Invitation'],
  ];

  return (
    <section id="public-issue" className="scroll-mt-24 bg-[#151210] py-14 md:py-20 text-white">
      <Container size="narrow">
        <div className="text-center">
          <h2 className="font-editorial text-3xl md:text-4xl font-bold">
            {hi ? 'आपका क्षेत्र। आपकी समस्या। आपकी आवाज़।' : 'Your Area. Your Issue. Your Voice.'}
          </h2>
          <div className="mt-6 inline-flex rounded-full bg-white/10 p-1">
            {tabs.map(([id, text]) => (
              <button
                key={id}
                type="button"
                onClick={() => { setMode(id); setDone(false); setError(false); }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${mode === id ? 'bg-[#F5660A] text-white' : 'text-white/70 hover:text-white'}`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {done ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center text-[#151210]">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
            <p className="mt-4 font-semibold">
              {mode === 'issue'
                ? hi ? 'धन्यवाद। आपकी समस्या समीक्षा और उचित फ़ॉलो-अप के लिए दर्ज कर ली गई है।' : 'Thank you. Your issue has been recorded for review and appropriate follow-up.'
                : hi ? 'धन्यवाद। आपका अनुरोध प्राप्त हो गया है।' : 'Thank you. Your request has been received.'}
            </p>
            <button type="button" onClick={() => setDone(false)} className="mt-5 text-sm font-semibold text-[#D45300] underline">
              {hi ? 'एक और भेजें' : 'Submit another'}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 grid gap-5 rounded-3xl bg-white p-6 text-[#151210] sm:grid-cols-2 sm:p-8">
            <div>
              <label className={label}>{hi ? 'नाम *' : 'Name *'}</label>
              <input required maxLength={120} className={input} value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div>
              <label className={label}>{hi ? 'मोबाइल नंबर *' : 'Mobile number *'}</label>
              <input required type="tel" maxLength={30} className={input} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
            {mode === 'issue' ? (
              <>
                <div>
                  <label className={label}>{hi ? 'गाँव / वार्ड' : 'Village / Ward'}</label>
                  <input maxLength={120} className={input} value={form.village} onChange={(e) => set('village', e.target.value)} />
                </div>
                <div>
                  <label className={label}>{hi ? 'ब्लॉक' : 'Block'}</label>
                  <input maxLength={120} className={input} value={form.block} onChange={(e) => set('block', e.target.value)} />
                </div>
                <div>
                  <label className={label}>{hi ? 'समस्या की श्रेणी' : 'Issue category'}</label>
                  <select className={input} value={form.category} onChange={(e) => set('category', e.target.value)}>
                    {issueCategories.map(([en, h]) => <option key={en} value={en}>{hi ? h : en}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>{hi ? 'स्थान / लैंडमार्क' : 'Location / landmark'}</label>
                  <input maxLength={200} className={input} value={form.location} onChange={(e) => set('location', e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className={label}>{hi ? 'संस्था / संगठन' : 'Organisation'}</label>
                  <input maxLength={120} className={input} value={form.organisation} onChange={(e) => set('organisation', e.target.value)} />
                </div>
                <div>
                  <label className={label}>{hi ? 'क्षेत्र' : 'Area'}</label>
                  <input maxLength={120} className={input} value={form.village} onChange={(e) => set('village', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>{hi ? 'पसंदीदा तिथि' : 'Preferred date'}</label>
                  <input type="date" className={input} value={form.preferredDate} onChange={(e) => set('preferredDate', e.target.value)} />
                </div>
              </>
            )}
            <div className="sm:col-span-2">
              <label className={label}>
                {mode === 'issue' ? (hi ? 'समस्या का विवरण *' : 'Describe the issue *') : (hi ? 'उद्देश्य / संदेश *' : 'Purpose / message *')}
              </label>
              <textarea required minLength={10} maxLength={4000} rows={5} className={`${input} resize-y`} value={form.message} onChange={(e) => set('message', e.target.value)} />
            </div>
            <div className="flex items-center justify-end gap-4 sm:col-span-2">
              {error && (
                <p role="alert" className="mr-auto text-sm text-red-700">
                  {hi ? 'भेजा नहीं जा सका। कृपया पुनः प्रयास करें।' : 'Could not be sent. Please try again.'}
                </p>
              )}
              <button type="submit" disabled={busy} className="rounded-full bg-[#F5660A] px-7 py-3 font-semibold text-white hover:bg-[#D45300] disabled:opacity-60">
                {busy ? (hi ? 'भेजा जा रहा है…' : 'Sending…') : (hi ? 'भेजें' : 'Submit')}
              </button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
