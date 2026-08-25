export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-14 items-center">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[var(--ink-soft)] border border-[var(--line)] rounded-full px-3 py-1 mb-6">
          Retrieval-augmented AI
        </span>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.1] font-medium mb-6">
          Ask your documents anything.
          <br />
          Get an answer with the <span className="mark">exact page</span> it came from.
        </h1>
        <p className="text-[var(--ink-soft)] text-lg leading-relaxed mb-8 max-w-md">
          Upload a PDF and DocChat reads it, understands it, and answers your questions in
          plain language — every answer traced back to the source, so you never have to take
          its word for it.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#pricing" className="btn-primary text-sm font-medium px-6 py-3 rounded-full">
            Try it free
          </a>
          <a href="#how-it-works" className="btn-secondary text-sm font-medium px-6 py-3 rounded-full">
            See how it works
          </a>
        </div>
        <p className="text-xs text-[var(--ink-soft)] mt-4">
          No credit card required · 5 documents free
        </p>
      </div>

      <div className="relative float-doc">
        <div className="card p-5 shadow-sm max-w-sm ml-auto">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--line)]">
            <div className="w-7 h-7 rounded-md bg-[var(--highlight-soft)] flex items-center justify-center text-xs font-mono">
              PDF
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Operating_Systems_Notes.pdf</p>
              <p className="text-xs text-[var(--ink-soft)] mt-1">18 pages · 42 chunks indexed</p>
            </div>
          </div>

          <p className="text-sm text-[var(--ink-soft)] mb-2">
            What problem does the producer-consumer setup solve?
          </p>

          <div className="bg-[var(--paper)] rounded-xl p-3 text-sm leading-relaxed mb-2">
            It solves the synchronization problem that comes up when two processes share a
            fixed-size buffer — <span className="mark">one writing data in, one reading it out</span> —
            without stepping on each other.
          </div>
          <div className="flex gap-2">
            <span className="citation-chip">p. 4</span>
            <span className="citation-chip">p. 5</span>
          </div>
        </div>
      </div>
    </section>
  );
}
