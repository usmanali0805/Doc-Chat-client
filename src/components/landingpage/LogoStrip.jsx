export default function LogoStrip() {
  const logos = ["Northwind Labs", "Kestrel Analytics", "Anchorpoint", "Fieldstone Legal", "Merit & Co"];

  return (
    <section className="border-y border-[var(--line)] bg-[var(--paper-raised)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-center text-xs uppercase tracking-wide text-[var(--ink-soft)] mb-6">
          Built for people who read a lot
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[var(--ink-soft)] font-display text-lg opacity-60">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
