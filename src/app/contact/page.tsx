import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Blumark Industries — Kandivli (W), Mumbai. Call +91 7304935736 or email sales@blumarkindustries.in for quotes on material handling equipment.",
};

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

async function FormFromParams({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const sp = await searchParams;
  const product = typeof sp.product === "string" ? sp.product.slice(0, 120) : "";
  return <ContactForm key={product} defaultProduct={product} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        label="Contact"
        title={<>Contact <span className="text-brand">us</span></>}
        text="We’re always open to connect. Whether you have a question, need support, or are looking for industrial solutions — we’re just a message away."
      />

      <section className="container-x grid gap-10 py-8 sm:py-10 lg:grid-cols-[1.3fr_1fr]">
        <Suspense fallback={<ContactForm />}>
          <FormFromParams searchParams={searchParams} />
        </Suspense>

        <div className="space-y-6">
          <ul className="space-y-5 rounded-lg bg-surface p-6">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold text-ink">Phone</p>
                <a href={site.phoneHref} className="text-muted hover:text-brand">{site.phone}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold text-ink">Email</p>
                <a href={site.emailHref} className="break-all text-muted hover:text-brand">{site.email}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold text-ink">Address</p>
                <p className="text-muted">
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.city}
                </p>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-brand hover:underline">
                  Open in Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold text-ink">Hours</p>
                <p className="text-muted">{site.hours}</p>
              </div>
            </li>
          </ul>

          <div className="relative h-72 overflow-hidden rounded-lg bg-surface">
            <iframe
              title="Blumark Industries location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              className="absolute inset-0 size-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
