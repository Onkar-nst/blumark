"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { categories, products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  product: string;
  message: string;
};

const field =
  "mt-1.5 w-full rounded-md border border-line bg-white px-4 py-2.5 text-[15px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "block text-sm font-medium text-ink";

function compose(f: Fields) {
  const name = `${f.firstName} ${f.lastName}`.trim();
  const details = [
    name && `Name: ${name}`,
    f.email && `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`,
    f.product && `Interested in: ${f.product}`,
  ].filter(Boolean);
  return [details.join("\n"), f.message.trim()].filter(Boolean).join("\n\n");
}

export default function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [f, setF] = useState<Fields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    product: defaultProduct,
    message: defaultProduct ? `I'd like a quote for the ${defaultProduct}.` : "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Enquiry${f.product ? ` – ${f.product}` : ""} from ${f.firstName}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose(f))}`;
    setSent(true);
  };

  const productOptions = [
    ...categories.map((c) => c.name),
    ...products.map((p) => p.name),
  ];

  return (
    <div className="rounded-lg bg-surface p-6 sm:p-8">
        {sent ? (
          <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
            <CheckCircle2 className="size-12 text-brand" />
            <h3 className="mt-4 text-2xl font-semibold text-ink">Thanks for getting in touch</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Your email app should have opened with your enquiry ready to send to{" "}
              <span className="font-medium text-ink">{site.email}</span>. Prefer chat? Send the same message on
              WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(compose(f))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25d366] text-white hover:bg-[#1ebe5a]"
              >
                <WhatsAppIcon className="size-4" /> Send on WhatsApp
              </a>
              <button type="button" onClick={() => setSent(false)} className="btn-outline">
                Edit message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Send us a message</h2>
            <p className="mt-1 text-sm text-muted">Tell us what you need and we&apos;ll get back to you.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={label}>First name *</label>
                <input id="firstName" required autoComplete="given-name" value={f.firstName} onChange={set("firstName")} className={field} />
              </div>
              <div>
                <label htmlFor="lastName" className={label}>Last name</label>
                <input id="lastName" autoComplete="family-name" value={f.lastName} onChange={set("lastName")} className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>Email *</label>
                <input id="email" type="email" required autoComplete="email" value={f.email} onChange={set("email")} className={field} />
              </div>
              <div>
                <label htmlFor="phone" className={label}>Phone</label>
                <input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="product" className={label}>Product of interest</label>
                <input id="product" list="product-options" value={f.product} onChange={set("product")} className={field} />
                <datalist id="product-options">
                  {productOptions.map((o) => (
                    <option key={o} value={o} />
                  ))}
                </datalist>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>Write a message</label>
                <textarea id="message" rows={5} value={f.message} onChange={set("message")} className={`${field} resize-none`} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn-dark">
                Send message
              </button>
              <a
                href={whatsappLink(compose(f) || "Hi Blumark Industries, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp instead
              </a>
            </div>
          </form>
        )}
    </div>
  );
}
