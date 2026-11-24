import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Download, Phone, Ruler, ShieldCheck, Truck } from "lucide-react";
import Gallery from "@/components/product/Gallery";
import ProductCard from "@/components/services/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import Brochure from "@/components/lead/Brochure";
import { categories, products, productsBy } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const find = (slug: string) => products.find((p) => p.slug === slug);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: { images: [p.images[0].src] },
  };
}

const assurances = [
  { icon: Ruler, text: "Custom specifications available" },
  { icon: ShieldCheck, text: "Inspected before dispatch" },
  { icon: Truck, text: "Delivery across India" },
];

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();

  const cat = categories.find((c) => c.id === p.category)!;
  const siblings = productsBy(p.category);
  const idx = siblings.findIndex((x) => x.slug === p.slug);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const related = siblings.filter((x) => x.slug !== p.slug).slice(0, 3);

  const SHOWN = 8;
  const quoteText = `Hi Blumark Industries, I'd like a quote for the ${p.name}${p.model ? ` (${p.model})` : ""}.`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line">
        <nav aria-label="Breadcrumb" className="container-x flex flex-wrap items-center gap-1 py-4 text-sm text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/services" className="hover:text-ink">Products</Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/services?category=${cat.id}`} className="hover:text-ink">{cat.short}</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-ink">{p.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="container-x grid gap-10 py-8 sm:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Gallery product={p} />
        </div>

        <div>
          <p className="eyebrow">{cat.name}</p>
          <h1 className="mt-2 text-5xl leading-[0.92] text-ink sm:text-6xl">{p.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md bg-signal/20 px-2.5 py-1 text-sm font-medium text-ink">{p.type}</span>
            {p.model && (
              <span className="rounded-md bg-soft px-2.5 py-1 font-mono text-sm text-ink/80">{p.model}</span>
            )}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-muted">{p.description}</p>

          {/* Key figures */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line ring-1 ring-line">
            {p.highlights.map((h) => (
              <div key={h.label} className="bg-white p-5">
                <dt className="text-sm text-muted">{h.label}</dt>
                <dd className="mt-1 font-display text-4xl leading-none font-bold text-ink">{h.value}</dd>
              </div>
            ))}
          </dl>

          {/* Actions */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href={`/contact?product=${encodeURIComponent(p.name)}`} className="btn-dark group sm:col-span-2 !py-3.5">
              Get a quote for this machine
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappLink(quoteText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25d366] text-white hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-outline">
              <Phone className="size-4" /> {site.phone}
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {assurances.map((a) => (
              <li key={a.text} className="flex items-center gap-2">
                <a.icon className="size-4 text-ink/60" /> {a.text}
              </li>
            ))}
          </ul>

          {/* Specifications: the key rows first, the rest on demand */}
          {(p.specs.length > 0 || p.onRequest) && (
            <div className="mt-10">
              <h2 className="text-3xl text-ink">Specifications</h2>
              {p.specs.length > 0 && (
                <dl className="mt-4 divide-y divide-line overflow-hidden rounded-lg ring-1 ring-line">
                  {p.specs.slice(0, SHOWN).map((s) => (
                    <SpecRow key={s.label} label={s.label} value={s.value} />
                  ))}
                </dl>
              )}
              {p.specs.length > SHOWN && (
                <details className="group mt-2">
                  <summary className="flex cursor-pointer list-none items-center gap-2 py-2 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Show all {p.specs.length} specifications</span>
                    <span className="hidden group-open:inline">Show fewer</span>
                    <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <dl className="mt-1 divide-y divide-line overflow-hidden rounded-lg ring-1 ring-line">
                    {p.specs.slice(SHOWN).map((s) => (
                      <SpecRow key={s.label} label={s.label} value={s.value} />
                    ))}
                  </dl>
                </details>
              )}
              {p.onRequest && (
                <p className="mt-4 rounded-lg bg-soft p-5 leading-relaxed text-ink/80">
                  Full specifications for this model are shared on request. Tell us your load, lift height and
                  application, and we&apos;ll recommend the right configuration.
                </p>
              )}
            </div>
          )}

          {p.features && p.features.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl text-ink">Features</h2>
              <ul className="mt-4 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-ink/80">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-ink text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev / next in this range */}
          {siblings.length > 1 && (
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-line pt-6">
              <Link href={`/products/${prev.slug}`} className="group rounded-lg p-3 hover:bg-soft">
                <span className="text-xs text-muted">← Previous</span>
                <span className="mt-0.5 block truncate font-medium text-ink">{prev.name}</span>
              </Link>
              <Link href={`/products/${next.slug}`} className="group rounded-lg p-3 text-right hover:bg-soft">
                <span className="text-xs text-muted">Next →</span>
                <span className="mt-0.5 block truncate font-medium text-ink">{next.name}</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Brochure: first pages public, the rest after the enquiry form */}
      {p.brochure && (
        <section id="brochure" className="scroll-mt-24 border-t border-line py-8 sm:py-12">
          <div className="container-x">
            <SectionHeading eyebrow="Brochure" title={`${p.model ?? p.name} brochure.`} />
            <div className="mt-8">
              <Brochure brochure={p.brochure} slug={p.slug} />
            </div>
          </div>
        </section>
      )}

      {/* Technical parameter pages from the company catalogue */}
      {p.sheets && p.sheets.length > 0 && (
        <section id="technical" className="scroll-mt-24 border-t border-line py-8 sm:py-12">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Technical parameters"
                title="Full spec sheet."
                text="Every model in this range, with dimensions and mast options. Click a sheet to open it full size."
              />
              <Link href="/catalogue" className="btn-outline shrink-0">
                <Download className="size-4" /> Full catalogue
              </Link>
            </div>
            <div className={`mt-8 grid gap-4 ${p.sheets.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {p.sheets.map((sh) => (
                <a
                  key={sh.src}
                  href={sh.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-lg ring-1 ring-line"
                >
                  <div className="relative aspect-[3000/2130] bg-soft">
                    <Image
                      src={sh.src}
                      alt={`${p.name}: ${sh.caption}`}
                      fill
                      sizes={p.sheets!.length > 1 ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1280px) 1216px, 100vw"}
                      className="object-contain"
                    />
                  </div>
                  <span className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5 font-medium text-ink">
                    {sh.caption}
                    <span className="flex items-center gap-1 text-sm text-muted group-hover:text-ink">
                      Open full size <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-white py-8 sm:py-12">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow={cat.short} title="More in this range." />
              <Link href={`/services?category=${cat.id}`} className="btn-outline shrink-0">
                View all {siblings.length}
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-[15px] even:bg-soft">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
