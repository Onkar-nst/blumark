"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { categories, productsBy, type CategoryId } from "@/data/products";
import ProductCard from "./ProductCard";

function setUrl(category: CategoryId) {
  window.history.replaceState(null, "", `?${new URLSearchParams({ category })}`);
}

// `compact` is the home-page version: no category heading, no URL changes,
// and at most `limit` models with a link to the full list.
export default function Catalog({
  initialCategory,
  compact = false,
  limit = 6,
}: {
  initialCategory: CategoryId;
  compact?: boolean;
  limit?: number;
}) {
  const [active, setActive] = useState<CategoryId>(initialCategory);
  const cat = categories.find((c) => c.id === active)!;
  const all = productsBy(active);
  const list = compact ? all.slice(0, limit) : all;

  const select = (id: CategoryId) => {
    setActive(id);
    if (!compact) setUrl(id);
    const top = document.getElementById("catalog")?.getBoundingClientRect().top ?? 0;
    if (top < 0) document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="catalog" className="container-x scroll-mt-20 py-8 lg:py-10">
      <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium text-muted">Categories</p>

          <nav className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" aria-label="Equipment categories">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => select(c.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex shrink-0 items-center justify-between gap-3 rounded-md px-4 py-2.5 text-left text-[15px] font-medium transition-colors ${
                    isActive ? "bg-ink text-white" : "bg-soft text-ink/75 hover:text-ink"
                  }`}
                >
                  <span className="lg:hidden">{c.short}</span>
                  <span className="hidden lg:inline">{c.name}</span>
                  <span className={`text-sm ${isActive ? "text-white/80" : "text-muted"}`}>{productsBy(c.id).length}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg bg-signal p-6 lg:block">
            <p className="font-semibold text-ink">Can&apos;t find what you need?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              We can build to custom specifications. Tell us your requirement.
            </p>
            <Link href="/contact" className="btn-dark mt-4 !px-4 !py-2 !text-sm">
              Contact us
            </Link>
          </div>
        </aside>

        {/* Products */}
        <div className="min-w-0">
          {!compact && (
          <header>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h2 className="text-4xl leading-none text-ink sm:text-5xl">{cat.name}</h2>
              <Link
                href={`/contact?product=${encodeURIComponent(cat.name)}`}
                className="btn-outline shrink-0 !py-2 !text-sm"
              >
                Ask for a quote
              </Link>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{cat.description}</p>
          </header>
          )}

          <div className={`flex items-baseline justify-between gap-4 ${compact ? "" : "mt-10"}`}>
            <p className="text-sm text-muted">
              {compact ? `${cat.name} · ` : ""}
              {all.length} models
            </p>
            {compact && all.length > list.length && (
              <Link
                href={`/services?category=${cat.id}`}
                className="group flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink"
              >
                See all {all.length}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
