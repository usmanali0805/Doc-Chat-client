const steps = [
  {
    title: "Upload your document",
    description: "Drop in a PDF — lecture notes, a report, a contract, anything.",
  },
  {
    title: "DocChat reads and indexes it",
    description: "It's broken into pieces and understood, so any part can be found instantly later.",
  },
  {
    title: "Start asking questions",
    description: "Chat naturally — every reply points back to where it came from.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--paper-raised)] border-y border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-14 text-center">
          From PDF to conversation in under a minute
        </h2>
        <div className="grid md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-[var(--line)]" />

          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-display mx-auto mb-4 relative z-10">
                {i + 1}
              </div>
              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
