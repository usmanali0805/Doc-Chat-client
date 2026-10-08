import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../utils/apiFetch";

export default function Sidebar({
  activeDocumentId,
  onSelectDocument,
  onNewChat,
  user,
}) {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await apiFetch("documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const token = localStorage.getItem("token");

        const data = await res.json();

        const formatted = (data.data || []).map((doc) => ({
          id: doc.documentId,
          name: doc.filename,
          pages: doc.totalpages,
          status: doc.status,
        }));
        setDocuments(formatted);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    }

    fetchDocuments();
  }, []);
  const menuRef = useRef(null);

useEffect(() => {
  function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const filteredDocs =
    documents &&
    documents.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase()),
    );

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  async function handleDeleteDocument(e, docId) {
  e.stopPropagation(); // taake delete click karne se document select na ho jaye

  const confirmed = window.confirm("Yeh document delete karna hai?");
  if (!confirmed) return;

  try {
    const res = await apiFetch(`documents/${docId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    }
  } catch (err) {
    console.error("Failed to delete document:", err);
  }
}

  return (
    <aside className="w-64 h-screen shrink-0 bg-[var(--paper)] border-r border-[var(--line)] flex flex-col">
      <div className="p-4">
        <Link
          to="/"
          className="font-display text-lg font-medium tracking-tight"
        >
          DocChat
        </Link>
      </div>

      <div className="px-4 pb-3">
        <button
          type="button"
          onClick={onNewChat}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
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
            <p className="text-xs text-[var(--ink-soft)] px-1 py-2">
              No documents found.
            </p>
          )}

          {filteredDocs.map((doc) => {
  const active = doc?.id === activeDocumentId;
  return (
    <div
      key={doc.id}
      className={
        "group flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition cursor-pointer " +
        (active
          ? "bg-[var(--highlight-soft)] text-[var(--brand-dark)]"
          : "hover:bg-[var(--paper-raised)] text-[var(--ink)]")
      }
      onClick={() => onSelectDocument(doc.id)}
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

      {doc.status === "processing" && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
      )}

      <button
        type="button"
        onClick={(e) => handleDeleteDocument(e, doc.id)}
        className="opacity-0 group-hover:opacity-100 transition shrink-0 text-[var(--ink-soft)] hover:text-red-600"
        aria-label="Delete document"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
})}
        </div>
      </div>

      <div className="p-4 border-t border-[var(--line)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-xs font-medium shrink-0">
          {(user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
          <p className="text-xs text-[var(--ink-soft)] truncate">
            {user?.plan || "Free plan"}
          </p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="Account menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute bottom-8 right-0 w-36 bg-[var(--paper)] border border-[var(--line)] rounded-lg shadow-lg py-1 z-10 ">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-[var(--paper-raised)] flex items-center gap-2 cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
