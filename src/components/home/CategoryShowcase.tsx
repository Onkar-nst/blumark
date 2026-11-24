import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories, productsBy, type CategoryId } from "@/data/products";

const cat = (id: CategoryId) => categories.find((c) => c.id === id)!;

// Cut-out product shots for the smaller cards
const small: { id: CategoryId; image: string }[] = [
  { id: "pallet-trucks", image: "/images/products/cut-highlift-pallet.webp" },
  { id: "stackers", image: "/images/products/cut-power-stacker.webp" },
  { id: "order-pickers", image: "/images/products/cut-order-picker.webp" },
  { id: "scissor-platforms", image: "/images/products/cut-mini-scissor.webp" },
];

function Arrow({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`grid size-10 shrink-0 place-items-center rounded-md transition-colors ${
        light ? "bg-white text-ink group-hover:bg-signal" : "bg-ink text-white group-hover:bg-brand"
      }`}
    >
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
    </span>
  );
}

export default function CategoryShowcase() {
  const forklifts = cat("forklifts");

  return (
    <section className="container-x py-8 sm:py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Products" title="Explore our core product range." />
        <Link href="/services" className="btn-outline shrink-0">
          All products
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:auto-rows-[17rem] lg:grid-cols-4">
        {/* Forklifts: the main range, shown with a real photo */}
        <Link
          href={`/services?category=${forklifts.id}`}
          className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-lg bg-ink text-white lg:col-span-2 lg:row-span-2"
        >
          <div className="relative flex-1 overflow-hidden">
            <Image
              src="/images/forklifts/diesel-forklift-1-5-5t.jpg"
              alt="Blumark diesel forklift"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 rounded-md bg-signal px-2.5 py-1 text-xs font-semibold text-ink">
              {productsBy(forklifts.id).length} models
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 p-6 sm:p-7">
            <div>
              <h3 className="font-display text-5xl leading-none font-bold uppercase">{forklifts.name}</h3>
              <p className="mt-2 text-white/65">Diesel 1.5 to 20 T · Lithium-ion 3 to 12 T · Side loaders</p>
            </div>
            <Arrow light />
          </div>
        </Link>

        {small.map(({ id, image }) => {
          const c = cat(id);
          return (
            <Link key={id} href={`/services?category=${id}`} className="group relative flex min-h-64 flex-col overflow-hidden rounded-lg bg-surface p-5">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-3xl leading-none font-bold text-ink uppercase">{c.short}</h3>
                  <p className="mt-1 text-sm text-muted">{productsBy(id).length} models</p>
                </div>
                <Arrow />
              </div>
              <div className="relative mt-2 flex-1">
                <Image
                  src={image}
                  alt={c.name}
                  fill
                  sizes="280px"
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
