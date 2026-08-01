"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { business } from "@/lib/business";
import { PhoneIcon, DropletIcon } from "./Icons";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

const GREETING =
  `Hi — ${business.owner} is usually out on a job, so I pick up for him. ` +
  `Ask me anything about what we do, or tell me what's going on and I'll take a message so he can call you back. ` +
  `If it's an emergency, call ${business.phone} right now instead.`;

const QUICK_REPLIES = [
  "No hot water",
  "I have a leak",
  "Do you serve my area?",
  "Leave a message",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the transcript pinned to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      const next: Message[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setInput("");
      setSending(true);
      setFailed(false);

      try {
        const res = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });

        if (!res.ok) throw new Error(`intake responded ${res.status}`);

        const data = await res.json();
        if (!data.reply) throw new Error("intake returned no reply");

        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } catch {
        // The whole point of this widget is to route work to a human, so a
        // failure falls back to the phone number rather than an error code.
        setFailed(true);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `Sorry — I can't reach the office system right now. Please call ${business.phone} and we'll take care of you directly.`,
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [messages, sending]
  );

  return (
    <>
      {/* Launcher — sits above the sticky mobile call bar. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="intake-panel"
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-24 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-navy-900 text-white shadow-2xl shadow-navy-950/40 transition-transform hover:scale-105 md:bottom-6 md:right-6"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <DropletIcon className="h-6 w-6" />
        )}
      </button>

      {open && (
        <div
          id="intake-panel"
          role="dialog"
          aria-label="Plumbing intake chat"
          className="fixed bottom-40 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-2xl md:bottom-24 md:right-6"
        >
          <div className="flex items-center gap-3 bg-navy-950 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-copper-500 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-bold uppercase tracking-wide text-white">
                Ask {business.shortName}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-navy-300">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                Usually replies in seconds
              </p>
            </div>
            <a
              href={business.phoneHref}
              className="shrink-0 rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label={`Call ${business.phone}`}
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-navy-50 p-4">
            <Bubble role="assistant">{GREETING}</Bubble>

            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}

            {sending && (
              <div className="flex gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 w-fit">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="pulse-dot h-2 w-2 rounded-full bg-navy-300"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            )}

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 transition-colors hover:border-copper-400 hover:text-copper-600"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {failed ? (
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2 bg-copper-600 py-4 font-bold text-white"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {business.phone}
            </a>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-navy-100 bg-white p-3"
            >
              <label htmlFor="intake-input" className="sr-only">
                Describe your plumbing issue
              </label>
              <input
                id="intake-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the problem…"
                disabled={sending}
                className="min-w-0 flex-1 rounded-full border border-navy-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-copper-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper-500 text-white transition-colors hover:bg-copper-600 disabled:opacity-40"
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: Role; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <p
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-navy-900 text-white"
            : "rounded-bl-sm bg-white text-navy-800"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
