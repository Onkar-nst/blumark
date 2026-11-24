import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { coreValues, industries } from "@/data/content";
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
        crumb="About Us"
        eyebrow="Who we are"
        title={<>Engineering excellence for a <span className="text-brand">stronger tomorrow.</span></>}
        text="Discover who we are, what drives us and how we are shaping the future of material handling across India."
        facts={[
          { value: "Mumbai", label: "Headquarters" },
          { value: "10+", label: "Regions served" },
          { value: products.length, label: "Models" },
          { value: "1.5–20 T", label: "Forklift range" },
        ]}
      />

      {/* Story */}
      <section className="container-x grid gap-10 py-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="Our story" title="Premium material handling, built to last." />
          <p className="mt-5 text-lg leading-relaxed text-muted">
            <strong className="font-semibold text-ink">Blumark Industries</strong> specializes in premium material
            handling and warehousing solutions. Our focus on quality engineering and durability ensures reliable
            machinery for various industries.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:self-start">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface">
            <Image src="/images/products/full-electric-stacker.webp" alt="Full electric stacker" fill sizes="(min-width:1024px) 280px, 50vw" className="object-contain p-4" />
          </div>
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-lg bg-surface">
            <Image src="/images/products/scissor-elevating-3.webp" alt="Scissor type elevating platform" fill sizes="(min-width:1024px) 280px, 50vw" className="object-contain p-4" />
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

      {/* Industries */}
      <section className="container-x py-8 sm:py-10">
        <SectionHeading eyebrow="Industries" title="Industries we serve." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.name} className="flex gap-3 rounded-lg bg-surface p-5">
              <Icon name={ind.icon} className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.8} />
              <div>
                <h3 className="font-semibold text-ink">{ind.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{ind.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">
          Don&apos;t see your industry?{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  );
}
