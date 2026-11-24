import Link from "next/link";
import { ArrowRight, CalendarClock, ShoppingCart, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: ShoppingCart,
    title: "Buy",
    text: "New forklifts and warehouse equipment, built to your specifications when you need them.",
    href: "/services",
    link: "See products",
  },
  {
    icon: CalendarClock,
    title: "Rent",
    text: "Short and long-term rental of forklifts and warehouse equipment.",
    href: "/contact?product=Rental",
    link: "Ask about rental",
  },
  {
    icon: Wrench,
    title: "Service & spares",
    text: "Experienced service engineers, prompt technical help and genuine spare parts, across India.",
    href: "/contact?product=Service%20%26%20spare%20parts",
    link: "Book a service",
  },
];

export default function WhatWeDo() {
  return (
    <section className="container-x py-8 sm:py-12">
      <SectionHeading eyebrow="What we do" title="Buy, rent or get it serviced." />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          // On hover the card warms to a light amber tint and the arrow turns yellow.
          <Link
            key={s.title}
            href={s.href}
            className="group relative isolate flex flex-col overflow-hidden rounded-lg bg-soft p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff8e1] hover:shadow-xl hover:shadow-signal/15 hover:ring-signal/60 sm:p-7"
          >
            {/* Oversized step number as a quiet watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-6 -z-10 font-display text-[9rem] leading-none font-bold text-ink/[0.04] transition-colors duration-300 group-hover:text-signal/15"
            >
              0{i + 1}
            </span>

            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-signal text-ink transition-transform duration-300 group-hover:-rotate-6">
                <s.icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="font-display text-3xl leading-none font-bold text-ink uppercase sm:text-4xl">
                {s.title}
              </h3>
            </div>

            <p className="mt-5 mb-7 leading-relaxed text-muted">
              {s.text}
            </p>

            <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 font-medium text-ink transition-colors duration-300 group-hover:border-signal/30">
              {s.link}
              <span className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-line transition-all duration-300 group-hover:bg-signal group-hover:text-ink group-hover:ring-signal">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
