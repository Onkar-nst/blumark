import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import Catalog from "@/components/services/Catalog";
import { redirect } from "next/navigation";
import { categories, isCategoryId, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Pallet trucks, manual & electric stackers, order pickers and scissor type work platforms from Blumark Industries.",
};

async function CatalogFromParams({ searchParams }: { searchParams: PageProps<"/services">["searchParams"] }) {
  const sp = await searchParams;
  const category = isCategoryId(sp.category) ? sp.category : "forklifts";
  // Old links opened a product popup via ?product=slug; send them to the product page instead.
  if (typeof sp.product === "string" && products.some((p) => p.slug === sp.product)) {
    redirect(`/products/${sp.product}`);
  }
  return <Catalog key={category} initialCategory={category} />;
}

export default function ServicesPage({ searchParams }: PageProps<"/services">) {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Sales · Rental · Service"
        title={<>Our <span className="text-brand">products</span></>}
        text="Pick a category to see the models we offer. Open any machine for photos and full specifications, or ask us for a quote."
        facts={[
          { value: categories.length, label: "Categories" },
          { value: products.length, label: "Models" },
          { value: "20 T", label: "Max capacity" },
          { value: "Custom", label: "Builds" },
        ]}
      />

      <Suspense fallback={<Catalog initialCategory="forklifts" />}>
        <CatalogFromParams searchParams={searchParams} />
      </Suspense>

    </>
  );
}
