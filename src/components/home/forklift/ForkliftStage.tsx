"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

// three.js is only loaded in the browser, after the page has painted.
const ForkliftScene = dynamic(() => import("./ForkliftScene"), { ssr: false });

/** Types `text` out one letter at a time, with a blinking caret. Remount (via key) to restart. */
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setN(text.length), 0);
      return () => clearTimeout(id);
    }
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) clearInterval(id);
        return Math.min(v + 1, text.length);
      });
    }, 45);
    return () => clearInterval(id);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, n)}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-brand" />
      </span>
    </>
  );
}

// Returns two grid items: the live job status (placed by the hero next to its eyebrow) and the 3D stage.
export default function ForkliftStage({
  className = "",
  statusClassName = "",
}: {
  className?: string;
  statusClassName?: string;
}) {
  const [step, setStep] = useState("");
  const [failed, setFailed] = useState(false);
  const label = step || "Starting up";

  return (
    <>
      {/* Live status, like a job ticket */}
      {!failed && (
        <div
          aria-live="off"
          className={`flex items-center gap-3 text-ink ${statusClassName}`}
        >
          <span className="relative flex size-2.5 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-70 motion-reduce:hidden" />
            <span className="relative size-2.5 rounded-full bg-signal" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold tracking-[0.16em] text-ink/60 uppercase">On the job</span>
            {/* The invisible longest label keeps the chip one width while the text types */}
            <span className="grid text-sm font-semibold sm:text-base">
              <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
                Retrieving from the rack_
              </span>
              <span className="col-start-1 row-start-1 whitespace-nowrap">
                <Typed key={label} text={label} />
              </span>
            </span>
          </span>
        </div>
      )}

      <div className={`relative ${className}`}>
        {failed ? (
          // No WebGL: fall back to the fleet photo
          <Image
            src="/images/hero/fleet.jpg"
            alt="The Blumark range of forklifts"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-bottom"
          />
        ) : (
          <ForkliftScene
            className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,transparent,black_14%)]"
            onStep={setStep}
            onFail={() => setFailed(true)}
          />
        )}
      </div>
    </>
  );
}
