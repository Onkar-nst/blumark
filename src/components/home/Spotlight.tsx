import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

const figures = [
  { value: "3,000 kg", label: "Rated capacity" },
  { value: "4,500 mm", label: "Max lift height" },
  { value: "~2 hrs", label: "Full charge" },
  { value: "8 hrs", label: "Work per charge" },
];

export default function Spotlight() {
  return (
    <section className="container-x py-8 sm:py-12">
      <div className="grid overflow-hidden rounded-lg bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[20rem] bg-white">
          <Image
            src="/images/forklifts/blu-fe30.jpg"
            alt="BLU-FE30 3.0 ton lithium-ion electric forklift"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 rounded-md bg-signal px-2.5 py-1 text-xs font-semibold text-ink">
            Featured · Lithium-ion
          </span>
        </div>

        <div className="flex flex-col p-7 sm:p-10">
          <p className="eyebrow !text-white/60">BLU-FE30</p>
          <h2 className="mt-3 text-5xl leading-[0.92] sm:text-6xl">3.0 ton electric forklift.</h2>
          <p className="mt-4 max-w-md text-white/65">
            Lithium-ion battery with BYD cells and a smart BMS, IP65 protection, and front &amp; rear cameras for
            the operator.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-1 bg-ink p-4">
                <dt className="text-sm text-white/55">{f.label}</dt>
                <dd className="font-display text-4xl leading-none font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link href="/products/blu-fe30" className="btn-primary group">
              View details
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/products/blu-fe30#brochure" className="btn-ghost-light">
              <FileText className="size-4" /> See brochure
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
