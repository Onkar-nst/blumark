import { Suspense } from "react";
import { Download, Phone } from "lucide-react";
import type { Product } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { hasAccess } from "@/lib/access";
import LeadForm from "@/components/lead/LeadForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

// The enquiry form that sits in the left half of the bottom band on every product page.
// With a brochure it unlocks the gated pages; without one it asks for a quote.

function Form({ product }: { product: Product }) {
  const b = product.brochure;
  if (b) {
    const start = b.pages.length;
    return (
      <LeadForm
        source={product.slug}
        title="See the full brochure"
        text={`Pages ${start + 1}–${start + b.locked.length} have the full technical parameters and drawings. Share your details to unlock them and download the PDF.`}
        cta="Unlock brochure"
        className="h-full"
      />
    );
  }
  return (
    <LeadForm
      source={product.slug}
      title={`Get a quote for the ${product.model ?? product.name}`}
      text="Share your details and our team will call you back with pricing, availability and the right configuration for your site."
      cta="Request a quote"
      pendingText="Sending…"
      doneText={`We've received your enquiry for the ${product.name}. Our team will get back to you shortly.`}
      className="h-full"
    />
  );
}

async function Gated({ product }: { product: Product }) {
  const b = product.brochure!;
  if (!(await hasAccess())) return <Form product={product} />;

  // Already unlocked: offer the PDF and a quick way to ask for a quote.
  return (
    <div className="flex h-full flex-col justify-center rounded-lg bg-soft p-6 sm:p-10">
      <p className="text-sm font-medium text-ink/60">Brochure unlocked</p>
      <h3 className="mt-2 font-display text-4xl leading-none font-bold text-ink uppercase">
        {product.model ?? product.name} brochure
      </h3>
      <p className="mt-3 max-w-lg leading-relaxed text-muted">
        All pages are open above. Download the PDF, or talk to us for a quote on this machine.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`/api/downloads/${b.pdf}`} className="btn-dark">
          <Download className="size-4" /> Download PDF
        </a>
        <a href={site.phoneHref} className="btn-outline">
          <Phone className="size-4" /> {site.phone}
        </a>
        <a
          href={whatsappLink(`Hi Blumark Industries, I'd like a quote for the ${product.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#25d366] text-white hover:bg-[#1ebe5a]"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ProductEnquiry({ product }: { product: Product }) {
  return (
    <div id="enquire" className="h-full scroll-mt-24">
      {product.brochure ? (
        <Suspense fallback={<Form product={product} />}>
          <Gated product={product} />
        </Suspense>
      ) : (
        <Form product={product} />
      )}
    </div>
  );
}
