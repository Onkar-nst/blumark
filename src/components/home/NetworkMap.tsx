"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Coordinates are in the map image's own pixels (1100 × 1129), so the SVG overlay
// lines up with the photo at any size when both use the same "cover" fit.
const W = 1100;
const H = 1129;
const HQ = { x: 240, y: 695 }; // Mumbai

// Each route is a curve from Mumbai out to a service point.
const routes = [
  { to: [296, 235], c: "195 520, 200 300" },
  { to: [316, 400], c: "240 560, 250 420" },
  { to: [158, 528], c: "160 690, 90 560" },
  { to: [448, 502], c: "330 690, 330 500" },
  { to: [900, 407], c: "560 620, 560 330" },
  { to: [660, 607], c: "420 700, 560 670" },
  { to: [438, 727], c: "260 790, 420 800" },
  { to: [340, 860], c: "255 780, 280 860" },
  { to: [325, 944], c: "150 720, 170 930" },
].map((r) => `M${HQ.x} ${HQ.y} C${r.c}, ${r.to[0]} ${r.to[1]}`);

const DURATION = 1800;
const STAGGER = 140;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Five-point star for the headquarters
const star = Array.from({ length: 10 }, (_, i) => {
  const a = (Math.PI / 5) * i - Math.PI / 2;
  const r = i % 2 ? 11 : 24;
  return `${(HQ.x + r * Math.cos(a)).toFixed(1)},${(HQ.y + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

export default function NetworkMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const revealRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const paths = pathRefs.current.filter((p): p is SVGPathElement => !!p);
    const lengths = paths.map((p) => p.getTotalLength());

    // t = 0 → every dot sits on Mumbai with no line; t = 1 → dot at its destination.
    const draw = (i: number, t: number) => {
      const p = paths[i].getPointAtLength(lengths[i] * t);
      dotRefs.current[i]?.setAttribute("transform", `translate(${p.x - HQ.x} ${p.y - HQ.y})`);
      revealRefs.current[i]?.setAttribute("stroke-dashoffset", `${1 - t}`);
    };

    paths.forEach((_, i) => draw(i, 0));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paths.forEach((_, i) => draw(i, 1));
      root.dataset.done = "";
      return;
    }

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        let finished = true;
        paths.forEach((_, i) => {
          const t = Math.min(Math.max((now - start - i * STAGGER) / DURATION, 0), 1);
          if (t < 1) finished = false;
          draw(i, ease(t));
        });
        if (finished) root.dataset.done = "";
        else frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.45 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="group/map absolute inset-0">
      <Image
        src="/images/site/network-map-clean.webp"
        alt="Map of India showing the Blumark service network, with its headquarters in Mumbai"
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          {routes.map((d, i) => (
            <mask key={d} id={`route-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <path
                ref={(el) => {
                  revealRefs.current[i] = el;
                }}
                d={d}
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset="1"
                fill="none"
                stroke="white"
                strokeWidth="8"
              />
            </mask>
          ))}
        </defs>

        {/* Dashed routes, revealed by their mask as each dot travels */}
        {routes.map((d, i) => (
          <path
            key={d}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="var(--color-brand-400)"
            strokeWidth="3"
            strokeDasharray="14 9"
            strokeLinecap="round"
            mask={`url(#route-${i})`}
          />
        ))}

        {/* Service points start stacked on Mumbai, then fly out */}
        {routes.map((d, i) => (
          <g
            key={d}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
          >
            <circle
              cx={HQ.x}
              cy={HQ.y}
              r="14"
              fill="var(--color-brand-400)"
              className="origin-center opacity-0 [transform-box:fill-box] group-data-done/map:animate-ping-once"
            />
            <circle cx={HQ.x} cy={HQ.y} r="13" fill="var(--color-brand-400)" stroke="var(--color-brand)" strokeWidth="3" />
          </g>
        ))}

        {/* Headquarters */}
        <circle
          cx={HQ.x}
          cy={HQ.y}
          r="26"
          fill="var(--color-brand)"
          className="origin-center animate-pulse-ring [transform-box:fill-box]"
        />
        <polygon points={star} fill="var(--color-brand)" stroke="white" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
