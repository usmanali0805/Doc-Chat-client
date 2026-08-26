const features = [
  {
    title: "Instant answers",
    description:
      "Ask a question in plain language and get a direct answer in seconds — no scrolling through pages to find it yourself.",
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    ),
  },
  {
    title: "Source citations",
    description:
      "Every answer links back to the exact page it was drawn from, so you can verify it in one click.",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
  },
  {
    title: "Multiple documents",
    description:
      "Keep a library of documents, switch between them freely, and pick up each conversation where you left off.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-xl mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
          Built so you can trust the answer
        </h2>
        <p className="text-[var(--ink-soft)] text-lg leading-relaxed">
          Most AI chat tools make things up with total confidence. DocChat is grounded in your
          document, and shows its work.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="card p-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--highlight-soft)] flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                {feature.icon}
              </svg>
            </div>
            <h3 className="font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
