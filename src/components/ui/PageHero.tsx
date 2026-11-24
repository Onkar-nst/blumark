import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type HeroFact = { value: React.ReactNode; label: string };

// Inner-page hero (the same on every page except Home): a full-width steel-grey band with a technical-drawing grid, with the text on the left and one
// warehouse photo running to the right edge of the screen. A safety stripe closes it off.
export default function PageHero({
  title,
  text,
  crumb,
  eyebrow,
  facts,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  crumb: string;
  facts?: HeroFact[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#e6eaf0] text-ink">
      {/* Engineering grid: fine 24px lines with a stronger line every 120px, like drawing paper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(#cfd6e0 1px, transparent 1px), linear-gradient(90deg, #cfd6e0 1px, transparent 1px), linear-gradient(#dbe0e8 1px, transparent 1px), linear-gradient(90deg, #dbe0e8 1px, transparent 1px)",
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        }}
      />
      <div className="container-x grid lg:grid-cols-2">
        <div className="relative z-10 py-9 sm:py-12 lg:py-14 lg:pr-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-ink/50">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-ink/85">{crumb}</span>
          </nav>
          {eyebrow && <p className="eyebrow mt-6 !text-ink/60">{eyebrow}</p>}
          <h1
            className={`${eyebrow ? "mt-3" : "mt-6"} animate-rise text-5xl leading-[0.92] sm:text-6xl lg:text-[4.4rem]`}
          >
            {title}
          </h1>
          {text && (
            <p className="mt-5 max-w-xl animate-rise text-lg leading-relaxed text-ink/70 [animation-delay:80ms]">
              {text}
            </p>
          )}
          {children && <div className="mt-7 animate-rise [animation-delay:120ms]">{children}</div>}

          {facts && (
            <dl className="mt-9 grid animate-rise grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-5 [animation-delay:160ms] sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-xs tracking-[0.1em] text-ink/55 uppercase">{f.label}</dt>
                  <dd className="font-display text-2xl leading-none font-bold uppercase lg:text-[1.75rem]">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Photo: below the text on phones, bleeding to the right edge on large screens */}
        <div className="relative -mx-4 aspect-[16/10] bg-ink sm:-mx-6 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:aspect-auto lg:w-[47vw]">
          <Image
            src="/images/hero/warehouse.jpg"
            alt="A forklift moving pallets of stock through a warehouse"
            fill
            preload
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="animate-swap object-cover"
            style={{ objectPosition: "35% center" }}
          />
        </div>
      </div>
      <div className="hazard relative z-10 h-1.5" aria-hidden />
    </section>
  );
}
