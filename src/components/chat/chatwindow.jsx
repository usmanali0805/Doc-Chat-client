import { useState } from 'react';

export default function ChatWindow({ messages, onSend, isTyping }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="m-auto text-center max-w-sm">
            <p className="font-display text-lg mb-1">Ask this document anything</p>
            <p className="text-sm text-[var(--ink-soft)]">
              Answers are grounded in the document, with the page they came from.
            </p>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === 'user' ? (
            <div
              key={msg.id}
              className="self-end max-w-[75%] bg-[var(--fill-primary,var(--ink))] text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm"
            >
              {msg.text}
            </div>
          ) : (
            <div key={msg.id} className="self-start max-w-[80%] flex flex-col gap-1.5">
              <div className="card px-4 py-2.5 text-sm leading-relaxed rounded-2xl rounded-bl-md">
                {msg.text}
              </div>
              {msg.sources?.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {msg.sources.map((page) => (
                    <span key={page} className="citation-chip">
                      p. {page}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {isTyping && (
          <div className="self-start flex gap-1 px-4 py-3 card rounded-2xl rounded-bl-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-soft)] animate-bounce [animation-delay:-0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-soft)] animate-bounce [animation-delay:-0.1s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-soft)] animate-bounce" />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-6 py-4 border-t border-[var(--line)] bg-[var(--paper-raised)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this document…"
          className="flex-1 px-4 py-2.5 text-sm rounded-full border border-[var(--line)] bg-[var(--paper)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
        />
        <button
          type="submit"
          aria-label="Send"
          className="btn-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}