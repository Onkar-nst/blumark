"use client";

import { useEffect, useRef, useState } from "react";

// Opening "aperture" preloader:
//   1. a hairline slit draws across the middle of the screen from the left, showing the page through it;
//   2. the slit fans open from a point on the right edge, as curved wedges in navy → brand blue → yellow
//      (the machines' colours), until the page is fully uncovered.
// Everything is one full-screen SVG with three even-odd paths, so each layer is "screen minus a wedge".
// The server renders it fully closed, so the page never flashes before the animation starts.

const LINE_MS = 850;
const HOLD_MS = 120;
const OPEN_MS = 1050;

// Half-heights (in % of the screen) of the three nested wedges: outer → inner.
const SLIT = [0.55, 0.38, 0.2];
const OPEN = [135, 112, 92];

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (t: number) => Math.min(Math.max(t, 0), 1);
const f = (n: number) => n.toFixed(3);

// Phase 1: a thin tapered bar from the left edge to x
const slit = (h: number, x: number) =>
  `M0 ${f(50 - h)} L${f(x)} ${f(50 - h * 0.5)} L${f(x)} ${f(50 + h * 0.5)} L0 ${f(50 + h)} Z`;

// Phase 2: a wedge with curved sides, from the left edge to the right edge
const wedge = (hL: number, hR: number, bow: number) => {
  const c = (hL + hR) / 2 + bow;
  return `M0 ${f(50 - hL)} Q50 ${f(50 - c)} 100 ${f(50 - hR)} L100 ${f(50 + hR)} Q50 ${f(50 + c)} 0 ${f(50 + hL)} Z`;
};

const SCREEN = "M-1 -1 H101 V101 H-1 Z ";
const closed = SLIT.map((h) => slit(h, 0));

export default function Preloader() {
  const [done, setDone] = useState(false);
  const layers = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      html.style.overflow = "";
      setDone(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }

    html.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;

    const draw = (shapes: string[]) => {
      const [outer, middle, inner] = shapes;
      layers.current[0]?.setAttribute("d", SCREEN + outer);
      layers.current[1]?.setAttribute("d", outer + " " + middle);
      layers.current[2]?.setAttribute("d", middle + " " + inner);
    };

    const tick = (now: number) => {
      const ms = now - start;
      if (ms < LINE_MS + HOLD_MS) {
        const x = 100 * easeOut(clamp(ms / LINE_MS));
        draw(SLIT.map((h) => slit(h, x)));
      } else {
        const t = clamp((ms - LINE_MS - HOLD_MS) / OPEN_MS);
        const left = easeInOut(t);
        const right = easeInOut(clamp((t - 0.3) / 0.7));
        draw(
          OPEN.map((end, i) => {
            const hL = Math.max(SLIT[i], end * left);
            return wedge(hL, end * right, hL * 0.12 * (1 - right));
          }),
        );
        if (t >= 1) return finish();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className="preloader pointer-events-none fixed inset-0 z-[100]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
        {[
          { fill: "var(--color-navy-950)", d: SCREEN + closed[0] },
          { fill: "var(--color-brand)", d: closed[0] + " " + closed[1] },
          { fill: "var(--color-signal)", d: closed[1] + " " + closed[2] },
        ].map((l, i) => (
          <path
            key={l.fill}
            ref={(el) => {
              layers.current[i] = el;
            }}
            d={l.d}
            fill={l.fill}
            fillRule="evenodd"
          />
        ))}
      </svg>
    </div>
  );
}
