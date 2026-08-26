const useCases = [
  {
    tag: "Students",
    title: "Study from your own notes",
    description:
      "Turn dense lecture slides or textbook chapters into a study partner you can question directly.",
  },
  {
    tag: "Researchers",
    title: "Get through papers faster",
    description:
      "Pull out methodology, findings, or citations from a paper without rereading it end to end.",
  },
  {
    tag: "Professionals",
    title: "Find what matters in a report",
    description:
      "Ask a contract or report a direct question instead of hunting through it clause by clause.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl md:text-4xl font-medium mb-14 text-center">
        Made for anyone buried in reading
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {useCases.map((item) => (
          <div key={item.tag} className="card p-6">
            <p className="text-xs font-mono uppercase text-[var(--ink-soft)] mb-3">{item.tag}</p>
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
