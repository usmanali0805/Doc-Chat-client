import { useRef, useState, useEffect } from "react";

export default function ChatWindow({
  messages,
  onSend,
  isTyping,
  onDocumentUploaded,
}) {
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); // { name, documentId }
  const fileInputRef = useRef(null);



  // Error khud 3 second baad gayab ho jayega
  useEffect(() => {
    if (!uploadError) return;
    const timer = setTimeout(() => setUploadError(""), 3000);
    return () => clearTimeout(timer);
  }, [uploadError]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Sirf PDF files allowed hain");
      e.target.value = "";
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setUploadError("File 1MB se chhoti honi chahiye");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    setUploading(true);
    setUploadError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}documents/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || data.message || "Upload failed");

      setUploadedFile({ name: file.name, documentId: data.documentId });
      onDocumentUploaded(data);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeUploadedFile() {
    setUploadedFile(null);
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Error Toast — top-right pe float karega */}
      {uploadError && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm shadow-lg animate-in fade-in slide-in-from-top-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {uploadError}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="m-auto text-center max-w-sm">
            <p className="font-display text-lg mb-1">
              Ask this document anything
            </p>
            <p className="text-sm text-[var(--ink-soft)]">
              Answers are grounded in the document, with the page they came
              from.
            </p>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div
              key={msg.id}
              className="self-end max-w-[75%] bg-[var(--fill-primary,var(--ink))] text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm"
            >
              {msg.text}
            </div>
          ) : (
            <div
              key={msg.id}
              className="self-start max-w-[80%] flex flex-col gap-1.5"
            >
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
          ),
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
        className="flex flex-col gap-2 px-6 py-4 border-t border-[var(--line)] bg-[var(--paper-raised)]"
      >
        {/* Uploaded file chip — filename + PDF icon */}
        {uploadedFile && (
          <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] text-xs">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e53935"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            <span className="truncate max-w-[180px]">{uploadedFile.name}</span>
            <button
              type="button"
              onClick={removeUploadedFile}
              aria-label="Remove document"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            aria-label="Add document"
            title="Add PDF"
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-raised)] disabled:opacity-50"
          >
            {uploading ? (
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            )}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              uploading
                ? "Document process ho raha hai…"
                : "Ask about this document…"
            }
            disabled={uploading}
            className="flex-1 px-4 py-2.5 text-sm rounded-full border border-[var(--line)] bg-[var(--paper)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
          />

          <button
            type="submit"
            aria-label="Send"
            className="btn-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
