import { Suspense } from "react";
import Image from "next/image";
import { Download, Lock } from "lucide-react";
import type { Product } from "@/data/products";
import { hasAccess } from "@/lib/access";
import LeadForm from "./LeadForm";

type B = NonNullable<Product["brochure"]>;

function Page({ src, caption, n, unoptimized = false }: { src: string; caption: string; n: number; unoptimized?: boolean }) {
  return (
    <figure>
      <a href={src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-lg ring-1 ring-line">
        <Image
          src={src}
          alt={caption}
          width={1241}
          height={1755}
          unoptimized={unoptimized}
          sizes="(min-width: 1024px) 300px, 50vw"
          className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>
      <figcaption className="mt-2 text-sm text-muted">
        <span className="font-medium text-ink">Page {n}</span> · {caption}
      </figcaption>
    </figure>
  );
}

function LockedPage({ preview, caption, n }: { preview: string; caption: string; n: number }) {
  return (
    <figure>
      <div className="relative overflow-hidden rounded-lg ring-1 ring-line">
        <Image src={preview} alt="" width={310} height={438} sizes="300px" className="w-full scale-105 opacity-80" />
        <div className="absolute inset-0 grid place-items-center bg-white/30">
          <span className="grid size-12 place-items-center rounded-md bg-ink text-white">
            <Lock className="size-5" />
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-sm text-muted">
        <span className="font-medium text-ink">Page {n}</span> · {caption}
      </figcaption>
    </figure>
  );
}

async function Gated({ brochure, slug }: { brochure: B; slug: string }) {
  const unlocked = await hasAccess();
  const start = brochure.pages.length;

  if (unlocked) {
    return (
      <>
        {brochure.locked.map((p, i) => (
          <Page key={p.file} src={`/api/downloads/${p.file}`} caption={p.caption} n={start + i + 1} unoptimized />
        ))}
        <div className="col-span-2 flex flex-wrap items-center gap-3 rounded-lg bg-soft p-5 lg:col-span-4">
          <p className="mr-auto font-medium text-ink">Full brochure unlocked. Thanks!</p>
          <a href={`/api/downloads/${brochure.pdf}`} className="btn-dark">
            <Download className="size-4" /> Download PDF
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      {brochure.locked.map((p, i) => (
        <LockedPage key={p.file} preview={p.preview} caption={p.caption} n={start + i + 1} />
      ))}
      <div className="col-span-2 lg:col-span-4 lg:max-w-3xl">
        <LeadForm
          source={slug}
          title="See the full brochure"
          text={`Pages ${start + 1}–${start + brochure.locked.length} have the full technical parameters and drawings. Share your details to unlock them and download the PDF.`}
          cta="Unlock brochure"
        />
      </div>
    </>
  );
}

export default function Brochure({ brochure, slug }: { brochure: B; slug: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {brochure.pages.map((p, i) => (
        <Page key={p.src} src={p.src} caption={p.caption} n={i + 1} />
      ))}
      <Suspense
        fallback={brochure.locked.map((p, i) => (
          <LockedPage key={p.file} preview={p.preview} caption={p.caption} n={brochure.pages.length + i + 1} />
        ))}
      >
        <Gated brochure={brochure} slug={slug} />
      </Suspense>
    </div>
  );
}
