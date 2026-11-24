import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Target } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import SectionHeading from "@/components/ui/SectionHeading";
import { coreValues } from "@/data/content";
import IndustriesCarousel from "@/components/about/IndustriesCarousel";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover who we are, what drives us and how Blumark Industries is shaping the future of material handling across India.",
};

// Mission and vision, word for word from the company profile: two quiet, matching cards.
const missionVision = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To provide intelligent, efficient, and customizable material handling solutions that enhance operational productivity across industries. We are committed to delivering unmatched quality, exceptional customer service, and continuous innovation, empowering businesses to move smarter, safer, and faster.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be a global leader in the material handling industry by redefining standards in quality, customization, and customer satisfaction.",
  },
];

function MissionVision() {
  return (
    <section className="container-x py-10 sm:py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {missionVision.map((m) => (
          <article
            key={m.title}
            className="rounded-2xl border border-line bg-gradient-to-br from-white to-[#f7f8fc] p-8 shadow-[0_8px_30px_-12px_rgba(12,17,29,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(49,71,158,0.25)] sm:p-10"
          >
            <span className="grid size-14 place-items-center rounded-full border border-brand/15 bg-[#f3f5fb] text-brand">
              <m.icon className="size-6" strokeWidth={1.8} />
            </span>
            <h2 className="mt-6 font-sans text-3xl font-medium tracking-tight text-ink normal-case sm:text-[2rem]">
              {m.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title={<>Blumark <span className="text-brand">Industries</span></>}
        text="Engineering excellence for a stronger tomorrow — premium material handling and warehousing solutions, sold, rented and serviced across India."
      />

      {/* Story */}
      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="Our story" title="Premium material handling, built to last." />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              <strong className="font-semibold text-ink">Blumark Industries</strong> specializes in premium material
              handling and warehousing solutions. Our focus on quality engineering and durability ensures reliable
              machinery for various industries.
            </p>
            <p>
              From our headquarters in Mumbai, we supply forklifts, pallet trucks, stackers, order pickers and scissor
              platforms to warehouses, factories and distribution centres across India — from a 1.5 T diesel forklift
              to a 20 T heavy-duty machine.
            </p>
            <p>
              We don&apos;t stop at the sale. Every machine is backed by rental options, experienced service engineers and genuine
              spares, and we look after other leading brands in your fleet too — so you deal with one team for all of
              your material handling.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            {[
              { value: "Mumbai", label: "Headquarters" },
              { value: "10+", label: "Regions served" },
              { value: products.length, label: "Models" },
              { value: "1.5–20 T", label: "Forklift range" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-xs tracking-[0.1em] text-muted uppercase">{f.label}</dt>
                <dd className="font-display text-2xl leading-none font-bold text-ink uppercase lg:text-[1.75rem]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photos: the forklift fleet, with the Blumark warehouse range overlapping its corner */}
        <div className="relative pb-16 sm:pb-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/images/site/about-hero.webp"
              alt="A fleet of forklifts and stackers in a warehouse"
              fill
              sizes="(min-width:1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-4 aspect-[16/9] w-[62%] overflow-hidden rounded-xl border-4 border-white bg-surface shadow-[0_20px_40px_-16px_rgba(12,17,29,0.35)] sm:-left-6">
            <Image
              src="/images/site/products-hero.webp"
              alt="Blumark pallet trucks, stackers, order pickers and a scissor platform"
              fill
              sizes="(min-width:1024px) 380px, 62vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <MissionVision />

      {/* Core values */}
      <section className="bg-surface py-8 sm:py-10">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="Our core values." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v, i) => (
              <li key={v.title} className="rounded-lg bg-white p-6">
                <span className="text-sm font-semibold text-brand">0{i + 1}</span>
                <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <IndustriesCarousel />

      <CtaBand />
    </>
  );
}
