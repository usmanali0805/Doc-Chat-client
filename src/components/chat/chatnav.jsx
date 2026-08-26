import { Link, Links } from 'react-router-dom';

export default function ChatNavbar({ activeDocument }) {
  return (
    <header className="h-16 border-b border-[var(--line)] bg-[var(--paper-raised)] flex items-center justify-between px-6">
      <div className="flex items-center gap-2 min-w-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </svg>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">
            {activeDocument?.name || 'Select a document'}
          </p>
          {activeDocument && (
            <p className="text-xs text-[var(--ink-soft)]">
              {activeDocument.pages} pages · {activeDocument.chunks} chunks indexed
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Link
          to="/pricing"
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-[var(--highlight-soft)] text-[var(--brand-dark)] hover:brightness-95 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
          </svg>
          Upgrade
        </Link>

        <button
          type="button"
          aria-label="Document options"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ink-soft)] hover:bg-[var(--paper)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}