'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AssistantWidget() {
  const { getHref, locale } = useLanguage();
  const hi = locale === 'hi';
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const sendMessage = async (value: string) => {
    const text = value.trim();
    if (!text || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8), locale }),
      });
      const result = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !result.reply) {
        if (response.status === 503) {
          setError(hi
            ? 'AI सहायक अभी सेट नहीं है। कृपया संपर्क फ़ॉर्म का उपयोग करें।'
            : 'The AI assistant is not configured yet. Please use the contact form.');
        } else {
          setError(hi
            ? 'अभी जवाब नहीं मिल पाया। कृपया थोड़ी देर बाद फिर कोशिश करें।'
            : 'I could not get a reply right now. Please try again shortly.');
        }
        return;
      }
      setMessages((current) => [...current, { role: 'assistant', content: result.reply! }]);
    } catch {
      setError(hi
        ? 'कनेक्शन नहीं हो पाया। कृपया फिर कोशिश करें।'
        : 'I could not connect just now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(message);
  };

  const suggestions = hi
    ? ['आशीष शुक्ला के बारे में बताएं', 'विकास कार्य देखें', 'कार्यालय से संपर्क कैसे करें?']
    : ['Tell me about Ashish Shukla', 'Explore development work', 'How can I contact the office?'];

  return (
    <>
      {open && (
        <section
          aria-label={hi ? 'आशीष सहायक चैट' : 'Ashish assistant chat'}
          className="fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100dvh-8rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[#d9d1c5] bg-[var(--paper)] shadow-[var(--shadow-deep)] sm:bottom-24 sm:right-6"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-[var(--navy-deep)] px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--saffron)] text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-semibold">{hi ? 'आशीष सहायक' : 'Ashish Assistant'}</h2>
                <p className="text-xs text-white/70">{hi ? 'हिंदी और English में पूछें' : 'Ask in Hindi or English'}</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={hi ? 'चैट बंद करें' : 'Close chat'} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--paper)] p-4" aria-live="polite">
            {messages.length === 0 && (
              <>
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-[#e5ddd1] bg-white p-3.5 text-sm leading-relaxed text-[#302922] shadow-sm">
                  {hi
                    ? 'नमस्ते! मैं आशीष शुक्ला की वेबसाइट और सार्वजनिक जानकारी खोजने में आपकी मदद कर सकता हूँ।'
                    : 'Hello! I can help you explore Ashish Shukla’s website and public information.'}
                </div>
                <div className="flex flex-col items-start gap-2 pt-1">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="rounded-full border border-[#e5ddd1] bg-[#fffdf8] px-3 py-2 text-left text-xs text-[#51483F] transition-colors hover:border-[var(--saffron)] hover:text-[var(--saffron-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </>
            )}
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`max-w-[90%] whitespace-pre-wrap rounded-2xl p-3.5 text-sm leading-relaxed ${item.role === 'user' ? 'ml-auto rounded-tr-sm bg-[var(--navy)] text-white' : 'rounded-tl-sm border border-[#e5ddd1] bg-white text-[#302922] shadow-sm'}`}>
                {item.content}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-xs text-[#6B625A]"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />{hi ? 'जवाब तैयार हो रहा है…' : 'Preparing a reply…'}</div>}
            {error && (
              <div className="rounded-xl border border-[#e5ddd1] bg-white p-3 text-xs leading-relaxed text-[#6B625A]">
                {error}{' '}
                <Link href={getHref('/contact')} onClick={() => setOpen(false)} className="font-semibold text-[#F5660A] underline underline-offset-2">
                  {hi ? 'संपर्क करें' : 'Contact the office'}
                </Link>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#e5ddd1] bg-[#fffdf8] p-3">
            <input
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1200}
              aria-label={hi ? 'अपना संदेश लिखें' : 'Write your message'}
              placeholder={hi ? 'अपना सवाल लिखें…' : 'Type your question…'}
              className="min-w-0 flex-1 rounded-full border border-[#ded5c8] bg-white px-4 py-3 text-sm text-[#151210] outline-none placeholder:text-[#8A8178] focus:border-[var(--saffron)] focus:ring-2 focus:ring-[var(--saffron)]/15"
            />
            <button type="submit" disabled={loading || !message.trim()} aria-label={hi ? 'संदेश भेजें' : 'Send message'} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--saffron)] text-white transition-colors hover:bg-[var(--saffron-dark)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--saffron)]">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
            window.setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        aria-label={open ? (hi ? 'चैट बंद करें' : 'Close assistant') : (hi ? 'AI सहायक खोलें' : 'Open AI assistant')}
        aria-expanded={open}
        className={`fixed bottom-4 right-4 z-50 group flex h-12 items-center justify-center rounded-full bg-[#F5660A] px-3 text-white shadow-xl transition-[transform,opacity,background-color] duration-300 hover:scale-105 hover:bg-[#D45300] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A] sm:bottom-6 sm:right-6 sm:h-14 sm:px-4`}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
        {!open && (
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:ml-2 group-hover:max-w-[11rem] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[11rem] group-focus-visible:opacity-100 sm:text-base">
            {hi ? 'सहायक से पूछें' : 'Ask Assistant'}
          </span>
        )}
      </button>
    </>
  );
}
