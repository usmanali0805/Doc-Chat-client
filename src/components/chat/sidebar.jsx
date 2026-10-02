import { useState } from 'react';
import { Link } from 'react-router-dom';

const documents = [
  { id: 1, name: 'OS_Notes.pdf', status: 'ready' },
  { id: 2, name: 'SPM_Ch4.pdf', status: 'ready' },
  { id: 3, name: 'Thesis_draft.pdf', status: 'processing' },
];

export default function Sidebar({ activeDocumentId, onSelectDocument, onNewChat, user }) {
  const [query, setQuery] = useState('');

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-64 h-screen shrink-0 bg-[var(--paper)] border-r border-[var(--line)] flex flex-col">
      <div className="p-4">
        <Link to="/" className="font-display text-lg font-medium tracking-tight">
          DocChat
        </Link>
      </div>

      <div className="px-4 pb-3">
        <button
          type="button"
          onClick={onNewChat}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New chat
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink-soft)"
            strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-xs font-mono uppercase text-[var(--ink-soft)] mb-2 px-1">
          Documents
        </p>

        <div className="flex flex-col gap-1 pb-4">
          {filteredDocs.length === 0 && (
            <p className="text-xs text-[var(--ink-soft)] px-1 py-2">No documents found.</p>
          )}

          {filteredDocs.map((doc) => {
            const active = doc?.id === activeDocumentId;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => onSelectDocument(doc.id)}
                className={
                  'flex items-center gap-2 text-left px-2.5 py-2 rounded-lg text-sm transition ' +
                  (active
                    ? 'bg-[var(--highlight-soft)] text-[var(--brand-dark)]'
                    : 'hover:bg-[var(--paper-raised)] text-[var(--ink)]')
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                </svg>
                <span className="truncate flex-1">{doc.name}</span>
                {doc.status === 'processing' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[var(--line)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-xs font-medium shrink-0">
          {(user?.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-[var(--ink-soft)] truncate">{user?.plan || 'Free plan'}</p>
        </div>
        <button
          type="button"
          aria-label="Account menu"
          className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </aside>
  );
}