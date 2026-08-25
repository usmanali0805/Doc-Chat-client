const faqs = [
  {
    q: "What file types are supported?",
    a: "Currently PDF, with Word and plain text documents coming soon.",
  },
  {
    q: "Is my data secure?",
    a: "Your documents are encrypted at rest and never used to train any model. Only you can access your uploads.",
  },
  {
    q: "How accurate are the answers?",
    a: "Answers are grounded directly in your document's content and cite the page they came from, so you can always verify them yourself.",
  },
  {
    q: "Can I use this with multiple documents at once?",
    a: "Yes — upload as many as your plan allows and switch between them freely from your dashboard.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, there's no lock-in. Cancel your Pro plan whenever you like and keep access until the period ends.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-[var(--paper-raised)] border-y border-[var(--line)]">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-10 text-center">
          Questions, answered
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <details key={item.q} className="card p-5" open={i === 0}>
              <summary className="flex items-center justify-between cursor-pointer font-medium text-sm">
                {item.q}
                <span className="plus-icon text-lg text-[var(--ink-soft)]">+</span>
              </summary>
              <p className="text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
