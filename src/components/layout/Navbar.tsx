"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change (adjust state during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) || (href === "/services" && pathname.startsWith("/products"));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-md bg-soft p-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-md px-4 py-2 text-[14px] font-medium transition-colors ${
                isActive(l.href) ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 px-3 text-[14px] font-medium text-ink/80 hover:text-ink xl:flex"
          >
            <Phone className="size-4" /> {site.phone}
          </a>
          <Link href="/contact" className="btn-dark hidden !px-5 !py-2.5 !text-[14px] sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-md bg-soft text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-x py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-md px-3 py-3 text-lg font-medium ${
                  isActive(l.href) ? "bg-soft text-ink" : "text-ink/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2 pb-2">
              <Link href="/contact" className="btn-dark">Get a quote</Link>
              <a href={site.phoneHref} className="btn-outline">
                <Phone className="size-4" /> {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
