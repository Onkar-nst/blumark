import Link from "next/link";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Can you change the specifications of a machine?",
    a: "Yes. Customized specifications are accepted on most models, for example fork length, fork width, lift height or capacity. Tell us your requirement and we'll confirm what's possible.",
  },
  {
    q: "Do you rent forklifts and equipment?",
    a: "Yes. Along with sales, we offer short and long-term rental of forklifts and warehouse equipment. Tell us the machine and the period you need it for.",
  },
  {
    q: "Do you deliver outside Mumbai?",
    a: "Yes. We're based in Kandivli (W), Mumbai and supply customers across India.",
  },
  {
    q: "Some products say “specs on request”. Why?",
    a: "For those models the final specification depends on your load, lift height and application, so we share the exact details once we know what you need.",
  },
  {
    q: "Manual, semi-electric or full electric: which should I choose?",
    a: "It depends on how often the machine is used, how heavy the loads are and how high you lift. Light, occasional use usually suits manual; frequent or high lifting suits electric. We're happy to advise.",
  },
];

export default function Faq() {
  return (
    <section className="container-x grid gap-8 py-8 sm:py-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      {/* Heading stays in view (below the sticky navbar) while the questions scroll past */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow="FAQ" title="Questions we hear often." />
        <p className="mt-4 text-muted">
          Something else?{" "}
          <Link href="/contact" className="font-medium text-ink underline underline-offset-4">
            Ask us directly
          </Link>
          .
        </p>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f, i) => (
          <details key={f.q} className="group py-2" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-soft">
                <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
              </span>
            </summary>
            <p className="pr-14 pb-4 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
