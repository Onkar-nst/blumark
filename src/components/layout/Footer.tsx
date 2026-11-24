import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navLinks, site } from "@/data/site";
import { categories } from "@/data/products";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await currentYear();
  return (
    <footer className="bg-navy-950 text-[15px] text-white/60">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed">
            Pallet trucks, stackers, order pickers and scissor lifts. Based in Mumbai, supplying across India.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Products</h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/services?category=${c.id}`} className="hover:text-white">{c.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Contact</h3>
          <ul className="mt-4 space-y-2.5">
            <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
            <li><a href={site.emailHref} className="break-all hover:text-white">{site.email}</a></li>
            <li>{site.address.line1}, {site.address.line2}, {site.address.city}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container-x overflow-hidden" aria-hidden>
        <p className="-mb-[0.18em] text-[22vw] leading-[0.8] font-bold tracking-tighter text-white/[0.06] select-none lg:text-[17rem]">
          BLUMARK
        </p>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row">
        <p>© {year} Blumark Industries</p>
        <p>Engineered for excellence · Built to last</p>
      </div>
    </footer>
  );
}
