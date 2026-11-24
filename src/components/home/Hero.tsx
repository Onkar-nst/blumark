import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data/site";
import ForkliftStage from "./forklift/ForkliftStage";

// Pitch on the left; on the right a Blumark forklift works a put-away job in 3D, in front of a
// giant pale BLUMARK wordmark (the same look as the company catalogue's fleet photo).
export default function Hero() {
  return (
    // Same blue-grey sky as the company catalogue's fleet photo (sampled from it), lightening
    // towards the horizon where the forklift works.
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#96a5ba] via-[#a7b6c9] to-[#bcc6d6]">
      {/* Faint light grid, fading out towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_65%_45%,black_25%,transparent_72%)]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Horizon glow the forklift works on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[35%] bg-gradient-to-b from-transparent to-white/25"
      />

      {/* Row 1: the eyebrow and the live job status, on one line. Row 2: the pitch and the 3D stage. */}
      <div className="container-x grid pt-8 sm:pt-10 lg:grid-cols-[0.95fr_1.25fr] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:pt-10">
        <p className="eyebrow relative z-10 animate-rise !text-ink/75 lg:col-start-1 lg:row-start-1 lg:self-center">
          Manufacturer · Sales · Rental · Service
        </p>
        <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-center lg:pb-14">
          <h1 className="mt-4 animate-rise text-[2.6rem] leading-[0.9] text-ink [animation-delay:80ms] sm:text-6xl xl:text-[4.4rem]">
            Your trusted partner in <span className="text-brand">industrial lifting</span> solutions.
          </h1>
          <p className="mt-5 max-w-md animate-rise leading-relaxed text-ink/80 [animation-delay:140ms] sm:text-lg">
            Forklifts and warehouse equipment for factories, warehouses and yards. Sales, rental and service
            across India.
          </p>
          <div className="mt-7 flex animate-rise flex-wrap gap-3 [animation-delay:200ms]">
            <Link href="/services" className="btn-dark group !px-5 !py-3">
              Explore products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={site.phoneHref} className="btn !bg-white !px-5 !py-3 text-ink ring-1 ring-line hover:!bg-white/85">
              <Phone className="size-4" /> {site.phone}
            </a>
          </div>
        </div>

        {/* Brand wordmark, centred behind the forklift (same grid cell as the 3D stage, painted underneath) */}
        <div aria-hidden className="pointer-events-none relative -z-10 hidden lg:col-start-2 lg:row-start-2 lg:block">
          <span className="absolute bottom-[24%] left-1/2 -translate-x-1/2 font-display text-[12.5vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-white/35 uppercase select-none 2xl:text-[11rem]">
            Blumark
          </span>
        </div>

        <ForkliftStage
          statusClassName="relative z-10 mt-7 animate-rise justify-self-start [animation-delay:220ms] lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-center lg:justify-self-end"
          className="h-[290px] animate-rise [animation-delay:220ms] sm:h-[400px] lg:col-start-2 lg:row-start-2 lg:h-[520px] lg:self-end xl:h-[560px]"
        />
      </div>
      <div className="hazard h-1.5" aria-hidden />
    </section>
  );
}
