export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[var(--paper)]">
      {/* Form side */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <a href="/" className="font-display text-xl font-medium tracking-tight mb-10">
          DocChat
        </a>
        <div className="w-full max-w-sm">{children}</div>
      </div>

      {/* Branding side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[var(--ink)] text-white px-12 relative overflow-hidden">
        <div className="max-w-sm">
          <p className="text-xs font-mono uppercase tracking-wide text-white/50 mb-4">
            Retrieval-augmented AI
          </p>
          <h2 className="font-display text-3xl leading-tight mb-6">
            Every answer, traced back to the exact page it came from.
          </h2>

          <div className="card bg-white/[0.06] border-white/10 p-4 mt-8">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
              <div className="w-7 h-7 rounded-md bg-[var(--highlight-soft)] flex items-center justify-center text-xs font-mono text-[var(--ink)]">
                PDF
              </div>
              <div>
                <p className="text-sm text-slate-900 font-medium leading-none">SPM_Chapter4.pdf</p>
                <p className="text-xs text-slate-700 mt-1">Ready to chat</p>
              </div>
            </div>
            <p className="text-sm text-black/70 mb-2">What's on the critical path?</p>
            <div className="bg-white/[0.08] text-slate-500 rounded-xl p-3 text-sm leading-relaxed mb-2">
              The critical path is the longest sequence of dependent tasks — any delay here
              delays the whole project.
            </div>
            <span className="citation-chip">p. 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}