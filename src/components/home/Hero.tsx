import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data/site";
import { products } from "@/data/products";

const warehouseModels = products.filter((p) => p.category !== "forklifts").length;

const ranges = [
  { label: "Diesel forklifts", value: "1.5 – 20 T", href: "/services?category=forklifts" },
  { label: "Lithium-ion forklifts", value: "3 – 12 T", href: "/services?category=forklifts" },
  { label: "Side loaders", value: "3 – 20 T", href: "/products/side-loader-forklift" },
  { label: "Warehouse equipment", value: `${warehouseModels} models`, href: "/services?category=pallet-trucks" },
];

// The section background is the sky colour at the top of the photo, so the text
// sits on the same "stage" the forklift lineup stands on — one seamless image.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#98a6bc]">
      <div className="relative z-10 container-x pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="eyebrow animate-rise !text-ink/70">Manufacturer · Sales · Rental · PAN India service</p>
            <h1 className="mt-4 animate-rise text-[2.9rem] leading-[0.9] text-ink [animation-delay:80ms] sm:text-7xl lg:text-[5.4rem]">
              Your trusted partner in <span className="text-brand">industrial lifting</span> solutions.
            </h1>
          </div>
          <div className="animate-rise [animation-delay:160ms] lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink/80">
              Forklifts and warehouse equipment for factories, warehouses and yards across India. We sell, rent and
              service them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/services" className="btn-dark group !px-6 !py-3.5">
                Explore products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href={site.phoneHref} className="btn !bg-white !px-6 !py-3.5 text-ink hover:!bg-white/85">
                <Phone className="size-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The Blumark fleet (company catalogue), rising out of the same sky */}
      <div className="relative -mt-[2vw] animate-rise [animation-delay:200ms] sm:-mt-[8vw] lg:-mt-[17vw]">
        <Image
          src="/images/hero/fleet-stage.jpg"
          alt="The Blumark range of diesel and lithium-ion forklifts"
          width={2400}
          height={1704}
          preload
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="bg-ink text-white">
        <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
          {ranges.map((r, i) => (
            <li
              key={r.label}
              className={`border-white/10 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <Link href={r.href} className="group block py-4 transition-colors hover:bg-white/5 sm:px-6 sm:py-5 max-sm:px-3">
                <span className="block text-xs font-medium tracking-[0.12em] text-white/55 uppercase">{r.label}</span>
                <span className="mt-1 flex items-center justify-between gap-2 font-display text-2xl leading-tight font-bold uppercase sm:text-3xl">
                  {r.value}
                  <ArrowRight className="size-4 shrink-0 text-signal transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
