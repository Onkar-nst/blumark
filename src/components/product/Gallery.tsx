"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";

export default function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const img = product.images[active];
  // Real photos fill the frame; cut-outs and brochure pages sit inside it.
  const fill = (i: number) => product.photo && i === 0;

  return (
    <div>
      <div className={`relative w-full overflow-hidden rounded-lg bg-surface ${product.photo ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image
          key={img.src}
          src={img.src}
          alt={img.caption ?? product.name}
          fill
          preload
          sizes="(min-width: 1024px) 620px, 100vw"
          className={`animate-swap ${fill(active) ? "object-cover" : "object-contain p-6 mix-blend-multiply sm:p-10"}`}
        />
        {product.images.length > 1 && (
          <span className="absolute top-4 right-4 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-ink/70">
            {active + 1} / {product.images.length}
          </span>
        )}
      </div>
      {img.caption && <p className="mt-3 text-sm text-muted">{img.caption}</p>}

      {product.images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {product.images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === active}
              className={`relative aspect-square overflow-hidden rounded-md bg-surface ring-2 transition ${
                i === active ? "ring-ink" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={im.src} alt="" fill sizes="120px" className={fill(i) ? "object-cover" : "object-contain p-2 mix-blend-multiply"} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
