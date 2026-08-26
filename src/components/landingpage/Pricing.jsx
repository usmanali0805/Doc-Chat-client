import { Link } from "react-router-dom";

const freeFeatures = [
  "5 documents",
  "50 questions / month",
  "Source citations",
  "Standard processing speed",
];

const proFeatures = [
  "Unlimited documents",
  "Unlimited questions",
  "Source citations",
  "Priority processing",
  "Chat history across devices",
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-xl mx-auto mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
          Simple pricing, start free
        </h2>
        <p className="text-[var(--ink-soft)] text-lg">
          Upgrade only when you're reading enough to need it.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="card p-8">
          <h3 className="font-display text-xl mb-1">Free</h3>
          <p className="text-sm text-[var(--ink-soft)] mb-6">For getting started</p>
          <p className="text-4xl font-display mb-6">
            $0<span className="text-base text-[var(--ink-soft)] font-sans">/month</span>
          </p>
          <ul className="space-y-3 text-sm mb-8">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-[var(--brand)]">✓</span> {f}
              </li>
            ))}
          </ul>
          <Link to="chat" className="btn-secondary block text-center text-sm font-medium px-6 py-3 rounded-full">
            Get started
          </Link>
        </div>

        <div className="card p-8 relative" style={{ borderColor: "var(--ink)", borderWidth: "2px" }}>
          <span className="absolute -top-3 left-8 bg-[var(--highlight)] text-[var(--ink)] text-xs font-medium px-3 py-1 rounded-full">
            Most popular
          </span>
          <h3 className="font-display text-xl mb-1">Pro</h3>
          <p className="text-sm text-[var(--ink-soft)] mb-6">For daily reading</p>
          <p className="text-4xl font-display mb-6">
            $12<span className="text-base text-[var(--ink-soft)] font-sans">/month</span>
          </p>
          <ul className="space-y-3 text-sm mb-8">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-[var(--brand)]">✓</span> {f}
              </li>
            ))}
          </ul>
          <a href="#" className="btn-primary block text-center text-sm font-medium px-6 py-3 rounded-full">
            Start free trial
          </a>
        </div>
      </div>
    </section>
  );
}
