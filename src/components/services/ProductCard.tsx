import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [h1, h2] = product.highlights;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-lg bg-surface p-3 text-left"
    >
      <div className="relative aspect-[4/3.6] w-full overflow-hidden rounded-md">
        <Image
          src={product.images[0].src}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          className={`transition-transform duration-500 group-hover:scale-105 ${
            product.photo ? "object-cover" : "object-contain p-4 mix-blend-multiply"
          }`}
        />
        {product.images.length > 1 && (
          <span className="absolute top-2 left-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-ink/70">
            {product.images.length} photos
          </span>
        )}
      </div>

      <div className="flex w-full flex-1 flex-col rounded-md bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg leading-snug font-semibold text-ink">{product.name}</h3>
            <p className="mt-0.5 text-sm text-muted">{product.type}</p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-soft text-ink transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
          {[h1, h2].map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className="text-muted">{s.label}</dt>
              <dd className="truncate font-semibold text-ink" title={s.value}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
