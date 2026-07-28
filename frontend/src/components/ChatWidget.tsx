import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PortfolioData } from '../types';
import { askAboutCv, type ChatMessage } from '../chat/chatEngine';
import { useLanguage } from '../i18n/LanguageContext';
import { interpolate } from '../i18n/ui';

interface ChatWidgetProps {
  data: PortfolioData;
}

export function ChatWidget({ data }: ChatWidgetProps) {
  const { locale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: interpolate(t.chat.welcome, { name: data.profile.name }),
      },
    ]);
  }, [locale, t.chat.welcome, data.profile.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (raw: string) => {
    const question = raw.trim();
    if (question === '' || busy) {
      return;
    }

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setBusy(true);

    const answer = await askAboutCv(question, data, locale);
    setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    setBusy(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? t.chat.close : t.chat.open}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-5 z-[60] min-w-14 h-14 px-2 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] shadow-[5px_5px_0_#ff4d3a] font-display font-extrabold text-xs tracking-wide"
      >
        {open ? 'X' : 'CHAT'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-5 sm:w-[380px] z-[60] bg-white border-[3px] border-[#141414] shadow-[8px_8px_0_#141414] flex flex-col max-h-[70vh]"
            aria-label={t.chat.title}
          >
            <header className="bg-[#141414] text-[#f5c518] px-4 py-3 border-b-[3px] border-[#141414]">
              <p className="font-display font-extrabold text-sm">{t.chat.title}</p>
              <p className="font-mono text-[11px] text-white/70 mt-1">{t.chat.subtitle}</p>
            </header>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#eef6f3]">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] px-3 py-2 border-[2px] border-[#141414] text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto bg-[#3aa0ff] text-[#141414]'
                      : 'mr-auto bg-white text-[#141414]'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {busy && (
                <div className="mr-auto bg-[#f5c518] border-[2px] border-[#141414] px-3 py-2 text-xs font-mono">
                  {t.chat.thinking}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 pt-2 flex flex-wrap gap-2 border-t-[2px] border-[#141414] bg-white">
              {t.chat.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="text-[11px] font-semibold border-2 border-[#141414] px-2 py-1 bg-[#fff3c4] hover:bg-[#f5c518]"
                  onClick={() => void send(suggestion)}
                  disabled={busy}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="p-3 border-t-[3px] border-[#141414] bg-white flex gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder={t.chat.placeholder}
                className="flex-1 resize-none border-[2px] border-[#141414] px-2 py-2 text-sm outline-none focus:bg-[#eef6f3]"
                disabled={busy}
              />
              <button
                type="submit"
                className="btn-primary !w-auto !px-3 self-end"
                disabled={busy || input.trim() === ''}
              >
                {t.chat.send}
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
