"use client";

import { useEffect, useRef } from "react";

// Curtain / underlay reveal: the footer sits pinned behind the page (main is z-10 with a
// white background), so reaching the end lifts the page off it like a sheet. The footer's
// content also moves at half the scroll speed: it starts tucked up by half its height and
// settles into place as you hit the bottom.
//
// Only used when the whole footer fits in the viewport. A taller footer (phones) would have
// its top hidden under the page forever, so it falls back to a normal footer.
export default function FooterReveal({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let height = 0;
    let enabled = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!enabled || reduceMotion) {
        inner.style.transform = "";
        return;
      }
      const doc = document.documentElement;
      const remaining = doc.scrollHeight - (window.scrollY + window.innerHeight);
      const progress = Math.min(Math.max((height - remaining) / height, 0), 1);
      inner.style.transform = `translate3d(0, ${(-(1 - progress) * height * 0.5).toFixed(1)}px, 0)`;
    };

    const measure = () => {
      height = inner.offsetHeight;
      enabled = height > 0 && height <= window.innerHeight * 0.9;
      outer.dataset.reveal = enabled ? "on" : "off";
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={outerRef} data-reveal="off" className="z-0 overflow-hidden bg-navy-950 data-[reveal=on]:sticky data-[reveal=on]:bottom-0">
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
