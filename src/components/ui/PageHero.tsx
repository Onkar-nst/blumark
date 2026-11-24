// Inner-page hero (the same on every page except Home): a short band with everything centred —
// the page name as a small label, one big heading, a short yellow rule and a line of intro text.
// Same blue-grey sky as the home hero (sampled from the company catalogue's fleet photo).
export default function PageHero({
  label,
  title,
  text,
}: {
  /** Small upper-case label above the heading, usually the page name. */
  label: string;
  title: React.ReactNode;
  text?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#96a5ba] via-[#a7b6c9] to-[#bcc6d6] text-ink">
      {/* Faint light grid, fading out towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_50%_45%,black_25%,transparent_72%)]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-x relative py-12 text-center sm:py-14 lg:py-16">
        <p className="animate-rise text-sm font-semibold tracking-[0.18em] text-ink/70 uppercase">{label}</p>
        <h1 className="mx-auto mt-4 max-w-5xl animate-rise text-5xl leading-[0.95] lg:text-6xl">{title}</h1>
        <span aria-hidden className="mx-auto mt-6 block h-1 w-20 animate-rise rounded-full bg-signal [animation-delay:60ms]" />
        {text && (
          <p className="mx-auto mt-6 max-w-3xl animate-rise text-lg leading-relaxed text-ink/80 [animation-delay:100ms] sm:text-xl">
            {text}
          </p>
        )}
      </div>
    </section>
  );
}
