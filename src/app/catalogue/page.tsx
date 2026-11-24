import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Download } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import LeadForm from "@/components/lead/LeadForm";
import { hasAccess } from "@/lib/access";

export const metadata: Metadata = {
  title: "Company Catalogue",
  description:
    "Download the Blumark Industries catalogue: diesel and lithium-ion forklifts, side loaders and warehouse equipment with full technical parameters.",
};

const inside = [
  "Diesel forklifts, 1.5 to 20 tons",
  "Lithium-ion electric forklifts, 3 to 12 tons",
  "Side loader forklifts",
  "Warehouse equipment: pallet trucks, scissor lift trucks and stackers",
  "Full technical parameters and mast tables for every range",
];

async function Access() {
  if (await hasAccess()) {
    return (
      <div className="rounded-lg bg-soft p-7">
        <p className="eyebrow">Ready to download</p>
        <h2 className="mt-3 text-4xl leading-none text-ink">Your catalogue is unlocked.</h2>
        <p className="mt-3 text-muted">21 pages · PDF · about 5 MB</p>
        <a href="/api/downloads/blumark-company-catalogue.pdf" className="btn-dark mt-6">
          <Download className="size-4" /> Download catalogue
        </a>
      </div>
    );
  }
  return (
    <LeadForm
      source="catalogue"
      title="Get the catalogue"
      text="Share your details and the download starts right here. Our team may follow up to help with your requirement."
      cta="Unlock download"
    />
  );
}

export default function CataloguePage() {
  return (
    <>
      <PageHero
        crumb="Catalogue"
        eyebrow="Free PDF download"
        title={<>Company <span className="text-brand">catalogue</span></>}
        text="Every Blumark machine in one place, with full technical parameters."
        facts={[
          { value: "21", label: "Pages" },
          { value: "~5 MB", label: "PDF" },
          { value: "4", label: "Ranges inside" },
        ]}
      />

      <section className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <div className="relative mx-auto aspect-[900/1278] max-w-sm overflow-hidden rounded-lg shadow-xl ring-1 ring-line">
            <Image
              src="/brochures/catalogue-cover.jpg"
              alt="Blumark Industries company catalogue cover"
              fill
              sizes="384px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-4xl leading-none text-ink sm:text-5xl">What&apos;s inside</h2>
          <ul className="mt-5 space-y-2.5">
            {inside.map((i) => (
              <li key={i} className="flex gap-3 text-ink/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-ink text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            Prefer to browse online?{" "}
            <Link href="/services" className="font-medium text-ink underline underline-offset-4">
              See all products
            </Link>
          </p>

          <div className="mt-8">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-soft" />}>
              <Access />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
