import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function CtaBand({
  title = "Ready to elevate your operations?",
  text = "Get in touch with us for a customized quote tailored to your requirements.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-8 sm:py-12">
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Quote */}
        <div className="relative overflow-hidden rounded-lg bg-ink text-white">
          <div className="hazard h-2" aria-hidden />
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="eyebrow !text-white/60">Get a quote</p>
            <h2 className="mt-4 text-5xl leading-[0.92] sm:text-6xl">{title}</h2>
            <p className="mt-4 max-w-lg text-lg text-white/65">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary group !px-6 !py-3.5">
                Request a quote
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href={site.phoneHref} className="btn-ghost-light !px-5 !py-3.5">
                <Phone className="size-4" /> {site.phone}
              </a>
              <a
                href={whatsappLink("Hi Blumark Industries, I'd like a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light !px-5 !py-3.5"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Catalogue */}
        <Link href="/catalogue" className="group relative flex overflow-hidden rounded-lg bg-signal p-6 sm:p-8">
          <div className="relative z-10 flex max-w-[60%] flex-col">
            <p className="text-xs font-semibold tracking-[0.16em] text-ink/60 uppercase">Company catalogue</p>
            <h3 className="mt-3 font-display text-4xl leading-[0.95] font-bold text-ink uppercase">
              Every machine, every spec.
            </h3>
            <p className="mt-2 text-sm text-ink/70">21 pages · PDF</p>
            <span className="btn-dark mt-auto self-start !px-4 !py-2.5 !text-sm">
              <Download className="size-4" /> Get the catalogue
            </span>
          </div>
          <div className="absolute top-6 -right-6 bottom-0 w-[48%] rotate-3 transition-transform duration-500 group-hover:rotate-0">
            <Image
              src="/brochures/catalogue-cover.jpg"
              alt=""
              fill
              sizes="240px"
              className="rounded-md object-cover object-left shadow-2xl"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
