"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import * as THREE from "three";
import { buildScene, createTimeline } from "./scene";

type Props = {
  onStep?: (label: string) => void;
  onFail?: () => void;
  className?: string;
};

// Renders the forklift job into a transparent canvas. It only animates while it is
// on screen, and shows a single still frame for visitors who prefer reduced motion.
export default function ForkliftScene({ onStep, onFail, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const emitStep = useEffectEvent((label: string) => onStep?.(label));
  const emitFail = useEffectEvent(() => onFail?.());

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      emitFail();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const font =
      getComputedStyle(document.documentElement).getPropertyValue("--font-condensed").trim() ||
      getComputedStyle(document.body).getPropertyValue("--font-condensed").trim() ||
      "'Arial Narrow', Arial, sans-serif";
    const world = buildScene(font);
    const timeline = createTimeline();

    const camera = new THREE.PerspectiveCamera(19, 1, 0.1, 200);
    const target = new THREE.Vector3(-0.6, 1.5, 0);
    const view = { aspect: 1, dist: 12, follow: false };
    const pointer = { x: 0, y: 0, cx: 0, cy: 0 };

    // Fit the whole job (x ≈ -6.2 … 4.6, y ≈ 0 … 3.6) into the canvas. On narrow screens
    // fit a smaller window instead and let the camera follow the forklift.
    function resize() {
      const w = el!.clientWidth;
      const h = el!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const tanH = tanV * camera.aspect;
      view.follow = camera.aspect < 1.9;
      const halfW = view.follow ? 3.3 : 5.6;
      view.dist = Math.max(halfW / tanH, 2.55 / tanV);
      view.aspect = camera.aspect;
    }

    const dir = new THREE.Vector3(0.14, 0.2, 1).normalize();
    function place(dt: number, x: number) {
      if (view.follow) {
        const want = THREE.MathUtils.clamp(x + 0.7, -4.2, 2.2);
        target.x += (want - target.x) * Math.min(1, dt * 2.5);
      } else target.x = -0.6;
      pointer.cx += (pointer.x - pointer.cx) * Math.min(1, dt * 3);
      pointer.cy += (pointer.y - pointer.cy) * Math.min(1, dt * 3);
      camera.position
        .copy(dir)
        .multiplyScalar(view.dist)
        .add(target)
        .add(new THREE.Vector3(pointer.cx * 0.8, pointer.cy * 0.35, 0));
      camera.lookAt(target);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let time = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let lastLabel = "";

    function frame(now: number) {
      // rAF timestamps can be slightly older than `last`, so never step backwards
      const dt = THREE.MathUtils.clamp((now - last) / 1000, 0, 0.05);
      last = now;
      time += dt;
      const pose = timeline.at(time);
      world.apply(pose, time);
      place(dt, pose.x);
      renderer.render(world.scene, camera);
      if (pose.label !== lastLabel) {
        lastLabel = pose.label;
        emitStep(pose.label);
      }
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    function still() {
      // Mid-job pose: carrying the pallet up to the rack
      const t = 7.2;
      world.apply(timeline.at(t), t);
      place(1, timeline.at(t).x);
      renderer.render(world.scene, camera);
      emitStep(timeline.at(t).label);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) still();
    });
    ro.observe(el);
    resize();

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && document.visibilityState === "visible";
      if (visible && !was && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(el);

    const onVis = () => {
      cancelAnimationFrame(raf);
      visible = document.visibilityState === "visible";
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const section = el.closest("section") ?? el;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * -2;
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    if (!reduce) {
      section.addEventListener("pointermove", onMove as EventListener);
      section.addEventListener("pointerleave", onLeave);
    }

    if (reduce) still();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
      world.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={className} />;
}
