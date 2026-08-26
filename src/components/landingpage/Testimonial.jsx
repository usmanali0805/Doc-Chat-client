export default function Testimonial() {
  return (
    <section className="bg-[var(--ink)] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl md:text-3xl leading-snug mb-8">
          "I stopped dreading 40-page reports. I just ask DocChat what changed since last
          quarter and it tells me — with the page number, so I can trust it."
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-mono text-sm">
            SA
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">Sana Ahmed</p>
            <p className="text-xs text-white/60">Operations lead, Fieldstone Legal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
