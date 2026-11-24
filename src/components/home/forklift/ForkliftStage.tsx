"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// three.js is only loaded in the browser, after the page has painted.
const ForkliftScene = dynamic(() => import("./ForkliftScene"), { ssr: false });

export default function ForkliftStage({ className = "" }: { className?: string }) {
  const [step, setStep] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {failed ? (
        // No WebGL: fall back to the fleet photo
        <Image
          src="/images/hero/fleet.jpg"
          alt="The Blumark range of forklifts"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      ) : (
        <ForkliftScene className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,transparent,black_14%)]" onStep={setStep} onFail={() => setFailed(true)} />
      )}

      {/* Live status, like a job ticket */}
      {!failed && (
        <div className="pointer-events-none absolute inset-x-0 top-2 sm:top-auto sm:bottom-6">
          <div className="flex items-end justify-between gap-3">
            <div
              aria-live="off"
              className="flex items-center gap-3 rounded-md bg-ink px-3.5 py-2.5 text-white shadow-lg shadow-ink/20 sm:px-4 sm:py-3"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-70 motion-reduce:hidden" />
                <span className="relative size-2.5 rounded-full bg-signal" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.16em] text-white/50 uppercase">On the job</span>
                <span key={step} className="block animate-swap text-sm font-semibold sm:text-base">
                  {step || "Starting up"}
                </span>
              </span>
            </div>

            <Link
              href="/products/blu-fe30"
              className="pointer-events-auto group hidden items-center gap-2 rounded-md bg-white/85 px-3.5 py-2.5 text-sm font-medium text-ink ring-1 ring-ink/10 backdrop-blur transition-colors hover:bg-white sm:flex"
            >
              BLU-FE30 · 3.0 T lithium-ion
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
