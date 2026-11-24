import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { industries } from "@/data/content";

// Free photos from Pexels (pexels.com/license), cropped to portrait cards.
const photo: Record<(typeof industries)[number]["name"], string> = {
  "Warehousing & Logistics": "warehousing",
  Manufacturing: "manufacturing",
  "Retail & E-commerce": "retail",
  Automotive: "automotive",
  "FMCG & Food Processing": "fmcg",
  "Pharmaceuticals & Healthcare": "pharma",
  "Construction & Infrastructure": "construction",
  "Ports & Shipping": "ports",
  "Agriculture & Agro Processing": "agriculture",
  "Aviation & Aerospace": "aviation",
  "Energy & Utilities": "energy",
  "Textile & Apparel": "textile",
  Electronics: "electronics",
  "Chemicals & Petrochemicals": "chemicals",
  "Mining & Metals": "mining",
};

function Card({ ind, copy }: { ind: (typeof industries)[number]; copy: boolean }) {
  return (
    <li className="group/card relative h-[400px] w-[280px] shrink-0 overflow-hidden rounded-xl bg-navy-950 ring-1 ring-white/10 transition-shadow duration-300 hover:ring-2 hover:ring-brand-400 sm:h-[440px] sm:w-[320px]">
      <Image
        src={`/images/industries/${photo[ind.name]}.jpg`}
        alt={copy ? "" : ind.name}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
      />
      {/* Shade so the white text always reads; it deepens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      <div className="absolute inset-0 bg-ink/55 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 [@media(hover:none)]:opacity-60" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="grid size-12 place-items-center rounded-lg bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors duration-300 group-hover/card:bg-brand group-hover/card:ring-brand">
          <Icon name={ind.icon} className="size-5" strokeWidth={1.8} />
        </span>
        <h3 className="mt-4 font-display text-[1.7rem] leading-[1.02] font-bold text-white uppercase">{ind.name}</h3>

        {/* Description: collapsed until hover (always open on touch screens) */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-focus-within/card:grid-rows-[1fr] group-hover/card:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 text-[15px] leading-relaxed text-white/80">{ind.text}</p>
            <Link
              href="/services"
              tabIndex={copy ? -1 : undefined}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-signal uppercase hover:text-white"
            >
              See equipment <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function IndustriesCarousel() {
  return (
    <section className="overflow-hidden bg-ink py-10 sm:py-14">
      <div className="container-x flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          light
          eyebrow="Industries"
          title="Industries we serve."
          text="Material handling for every kind of operation. Hover a card to learn more."
        />
        <p className="shrink-0 text-white/60">
          Don&apos;t see your industry?{" "}
          <Link href="/contact" className="font-semibold text-white underline-offset-4 hover:underline">
            Get in touch
          </Link>
        </p>
      </div>

      {/* Running cards: the list is rendered twice and slides by half its width, so it loops.
          Hovering (or tabbing into) the row pauses it. With reduced motion it becomes a scrollable row. */}
      <div className="group mt-8 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto">
        <div
          className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "90s" }}
        >
          {[false, true].map((copy) => (
            <ul key={String(copy)} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy || undefined}>
              {industries.map((ind) => (
                <Card key={ind.name} ind={ind} copy={copy} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
