import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/*
 * A stylised Blumark lithium-ion forklift doing a put-away job, built from simple
 * shapes (no model files to download).
 *
 * World units are metres. x runs left → right, y is up, z points at the camera.
 * The forklift always faces +x, so the forks point at the racking on the right.
 */

const COLORS = {
  body: "#f2a516", // BLU-FE30 orange-yellow
  chassis: "#2a2d34",
  black: "#16181c",
  mast: "#1f2228",
  steel: "#8b929c",
  tyre: "#141414",
  hub: "#b8bec7",
  wood: "#c08a4f",
  rackUpright: "#31479e", // Blumark blue
  rackBeam: "#ef6c22",
  lane: "#f5b800",
};

/* ---------- small helpers ---------- */

const mat = (color: string, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...extra });

function box(w: number, h: number, d: number, m: THREE.Material, r = 0) {
  const g = r > 0 ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d);
  return new THREE.Mesh(g, m);
}

function at<T extends THREE.Object3D>(o: T, x: number, y: number, z: number) {
  o.position.set(x, y, z);
  return o;
}

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function decal(tex: THREE.Texture, w: number, h: number) {
  const m = new THREE.MeshStandardMaterial({
    map: tex,
    transparent: true,
    roughness: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
  mesh.userData.noShadow = true;
  return mesh;
}

/* ---------- parts ---------- */

function wheel(radius: number, width: number) {
  const g = new THREE.Group();
  const tyre = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 28).rotateX(Math.PI / 2), mat(COLORS.tyre, { roughness: 0.9 }));
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, width + 0.02, 18).rotateX(Math.PI / 2),
    mat(COLORS.hub, { metalness: 0.4, roughness: 0.4 }),
  );
  // Bolts make the rotation visible
  const boltMat = mat(COLORS.black);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, width + 0.04, 8).rotateX(Math.PI / 2), boltMat);
    bolt.position.set(Math.cos(a) * radius * 0.32, Math.sin(a) * radius * 0.32, 0);
    g.add(bolt);
  }
  g.add(tyre, hub);
  return g;
}

function cardboardTexture() {
  return canvasTexture(128, 128, (g) => {
    g.fillStyle = "#c99a61";
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = "rgba(110,72,36,0.22)";
    g.fillRect(56, 0, 18, 128); // packing tape
    g.fillStyle = "#f4f0e6";
    g.fillRect(14, 84, 34, 26); // shipping label
    g.fillStyle = "#8a6a45";
    for (let i = 0; i < 3; i++) g.fillRect(18, 89 + i * 6, 26 - i * 6, 2);
    g.strokeStyle = "rgba(90,60,30,0.35)";
    g.lineWidth = 3;
    g.strokeRect(1, 1, 126, 126);
  });
}

/** A wooden pallet with two layers of cartons. Origin is the bottom centre. */
function loadedPallet(cardboard: THREE.Texture, seed = 1) {
  const g = new THREE.Group();
  const wood = mat(COLORS.wood, { roughness: 0.85 });
  // Stringers run along x, leaving gaps for the forks at z = ±0.22
  for (const z of [-0.45, 0, 0.45]) g.add(at(box(1.0, 0.1, 0.1, wood), 0, 0.05, z));
  for (const x of [-0.43, -0.215, 0, 0.215, 0.43]) g.add(at(box(0.15, 0.03, 1.0, wood), x, 0.115, 0));

  const carton = mat("#ffffff", { map: cardboard, roughness: 0.8 });
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280) - 0.5;
  for (let layer = 0; layer < 2; layer++)
    for (const x of [-0.245, 0.245])
      for (const z of [-0.245, 0.245]) {
        const b = box(0.46, 0.39, 0.46, carton, 0.015);
        b.position.set(x + rnd() * 0.02, 0.13 + 0.195 + layer * 0.395, z + rnd() * 0.02);
        b.rotation.y = rnd() * 0.05;
        g.add(b);
      }
  return g;
}

function forklift(fontFamily: string) {
  const root = new THREE.Group();
  const body = mat(COLORS.body, { roughness: 0.45, metalness: 0.1 });
  const chassis = mat(COLORS.chassis);
  const black = mat(COLORS.black, { roughness: 0.5 });
  const mastMat = mat(COLORS.mast, { roughness: 0.5, metalness: 0.3 });

  // Chassis, battery hood, dash and counterweight
  root.add(at(box(1.95, 0.32, 1.0, chassis, 0.04), -0.2, 0.34, 0));
  root.add(at(box(1.15, 0.42, 1.02, body, 0.06), -0.1, 0.71, 0));
  root.add(at(box(0.36, 0.56, 0.9, body, 0.06), 0.6, 0.78, 0));
  root.add(at(box(0.6, 0.95, 1.06, body, 0.12), -0.95, 0.62, 0));
  root.add(at(box(0.62, 0.07, 1.08, chassis, 0.03), -0.95, 1.1, 0));

  // Side graphics, like the BLU-FE30 livery
  const brand = canvasTexture(512, 160, (g) => {
    g.fillStyle = "#16181c";
    g.font = `800 118px ${fontFamily}`;
    g.textBaseline = "middle";
    g.fillText("BLUMARK", 14, 86);
  });
  const band = canvasTexture(640, 120, (g) => {
    g.fillStyle = "#16181c";
    g.beginPath();
    g.moveTo(40, 0);
    g.lineTo(640, 0);
    g.lineTo(600, 120);
    g.lineTo(0, 120);
    g.closePath();
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = `italic 800 74px ${fontFamily}`;
    g.textBaseline = "middle";
    g.fillText("BLU-FE30", 70, 64);
    g.fillStyle = "#f2a516";
    g.fillText("///", 420, 64);
  });
  for (const side of [1, -1]) {
    const b = at(decal(brand, 0.52, 0.16), -0.95, 0.78, side * 0.535);
    const s = at(decal(band, 0.86, 0.16), -0.08, 0.64, side * 0.516);
    if (side < 0) b.rotation.y = s.rotation.y = Math.PI;
    root.add(b, s);
  }

  // Wheels (kept so the animation can spin them)
  const wheels: { mesh: THREE.Group; r: number }[] = [];
  for (const z of [0.5, -0.5]) {
    const w = at(wheel(0.33, 0.26), 0.55, 0.33, z);
    wheels.push({ mesh: w, r: 0.33 });
    root.add(w);
  }
  for (const z of [0.47, -0.47]) {
    const w = at(wheel(0.28, 0.24), -0.78, 0.28, z);
    wheels.push({ mesh: w, r: 0.28 });
    root.add(w);
  }

  // Seat and steering
  root.add(at(box(0.44, 0.12, 0.52, black, 0.05), -0.3, 0.98, 0));
  const back = at(box(0.12, 0.46, 0.52, black, 0.05), -0.53, 1.22, 0);
  back.rotation.z = -0.15;
  root.add(back);
  const steer = new THREE.Group();
  steer.position.set(0.5, 1.04, 0);
  steer.rotation.z = 0.55;
  steer.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.42, 10), black), 0, 0.21, 0));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.022, 10, 28), black);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.42;
  steer.add(ring);
  root.add(steer);

  // Overhead guard
  for (const x of [0.52, -0.86])
    for (const z of [0.46, -0.46]) root.add(at(box(0.07, 1.25, 0.07, black), x, 1.575, z));
  for (const z of [0.46, -0.46]) root.add(at(box(1.45, 0.07, 0.07, black), -0.17, 2.2, z));
  for (const x of [0.52, -0.86]) root.add(at(box(0.07, 0.07, 0.99, black), x, 2.2, 0));
  for (let i = 1; i < 6; i++) root.add(at(box(0.04, 0.04, 0.92, black), 0.52 - i * (1.38 / 6), 2.21, 0));

  // Warning beacon
  const beaconMat = new THREE.MeshStandardMaterial({ color: "#ff6a1a", emissive: "#ff5a00", emissiveIntensity: 1.5 });
  root.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.05, 14), black), -0.76, 2.26, 0.3));
  root.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.1, 14), beaconMat), -0.76, 2.33, 0.3));

  // Mast: the outer channels are fixed; the inner channels rise once the carriage runs out of free lift
  root.add(at(box(0.09, 2.15, 0.1, mastMat), 0.86, 1.2, 0.33));
  root.add(at(box(0.09, 2.15, 0.1, mastMat), 0.86, 1.2, -0.33));
  root.add(at(box(0.09, 0.1, 0.76, mastMat), 0.86, 2.22, 0));
  root.add(at(box(0.09, 0.1, 0.76, mastMat), 0.86, 0.36, 0));
  root.add(
    at(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.9, 12), mat(COLORS.steel, { metalness: 0.7, roughness: 0.3 })), 0.83, 1.12, 0),
  );

  const inner = new THREE.Group();
  inner.add(at(box(0.07, 2.0, 0.08, mastMat), 0.93, 1.15, 0.25));
  inner.add(at(box(0.07, 2.0, 0.08, mastMat), 0.93, 1.15, -0.25));
  inner.add(at(box(0.07, 0.09, 0.58, mastMat), 0.93, 2.12, 0));
  root.add(inner);

  // Carriage, load backrest and forks. y = 0 is the underside of the fork blades.
  const carriage = new THREE.Group();
  carriage.add(at(box(0.06, 0.3, 0.86, black), 1.0, 0.2, 0));
  for (let i = 0; i < 5; i++) carriage.add(at(box(0.03, 0.75, 0.03, black), 1.0, 0.72, -0.36 + i * 0.18));
  carriage.add(at(box(0.04, 0.04, 0.86, black), 1.0, 1.08, 0));
  const forkMat = mat("#2b2e33", { metalness: 0.5, roughness: 0.4 });
  for (const z of [0.22, -0.22]) {
    carriage.add(at(box(0.06, 0.45, 0.11, forkMat), 1.06, 0.225, z));
    carriage.add(at(box(1.05, 0.05, 0.11, forkMat, 0.01), 1.6, 0.025, z));
  }
  root.add(carriage);

  return { root, wheels, inner, carriage, beaconMat };
}

function rack(cardboard: THREE.Texture) {
  const g = new THREE.Group();
  const upright = mat(COLORS.rackUpright, { metalness: 0.3, roughness: 0.5 });
  const beam = mat(COLORS.rackBeam, { metalness: 0.2, roughness: 0.5 });
  const X0 = 3.25;
  const X1 = 4.35;
  for (const x of [X0, X1]) for (const z of [0.62, -0.62]) g.add(at(box(0.08, 3.6, 0.08, upright), x, 1.8, z));
  // Side bracing
  for (const z of [0.62, -0.62])
    for (let i = 0; i < 4; i++) {
      const y0 = 0.25 + i * 0.8;
      const brace = box(Math.hypot(X1 - X0, 0.8), 0.035, 0.03, upright);
      brace.position.set((X0 + X1) / 2, y0 + 0.4, z);
      brace.rotation.z = (i % 2 ? -1 : 1) * Math.atan2(0.8, X1 - X0);
      g.add(brace);
    }
  for (const level of [LEVEL, 2.55]) for (const x of [X0, X1]) g.add(at(box(0.07, 0.12, 1.32, beam), x, level - 0.06, 0));
  // Stock already in the rack
  g.add(at(loadedPallet(cardboard, 7), RACK_X, 0, 0));
  g.add(at(loadedPallet(cardboard, 13), RACK_X, 2.55, 0));
  return g;
}

function floorMarkings() {
  const g = new THREE.Group();
  const paint = new THREE.MeshBasicMaterial({ color: COLORS.lane });
  const dash = new THREE.PlaneGeometry(0.42, 0.06).rotateX(-Math.PI / 2);
  for (let x = -16; x < 3.0; x += 0.7) {
    g.add(at(new THREE.Mesh(dash, paint), x, 0.002, 0.95));
    g.add(at(new THREE.Mesh(dash, paint), x, 0.002, -0.95));
  }
  // Pick-up bay outline
  const edge = (w: number, d: number, x: number, z: number) =>
    g.add(at(new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), paint), x, 0.002, z));
  edge(1.4, 0.05, PICK_X, 0.7);
  edge(1.4, 0.05, PICK_X, -0.7);
  edge(0.05, 1.4, PICK_X - 0.7, 0);
  edge(0.05, 1.4, PICK_X + 0.7, 0);
  g.traverse((o) => (o.userData.noShadow = true));
  return g;
}

/* ---------- the job: a timeline of simple moves ---------- */

const FORK_CENTER = 1.6; // fork centre, measured from the forklift origin
const PICK_X = -1.0; // pallet spot on the floor
const RACK_X = 3.8; // pallet spot inside the rack
const LEVEL = 1.3; // top of the first rack beam
const START_X = -4.7;
const APPROACH_X = 0.9; // waiting in front of the rack
const IN_RACK_X = RACK_X - FORK_CENTER;
const AT_PICK_X = PICK_X - FORK_CENTER;
const DOWN = 0.03;
const CARRY = 0.28;
const HIGH = LEVEL + 0.2;

type Step = { label: string; d: number; x?: number; h?: number; carry?: boolean; surface?: number };

const STEPS: Step[] = [
  { label: "Heading to the pallet", d: 2.4, x: AT_PICK_X },
  { label: "Picking up the pallet", d: 0.9, h: CARRY, carry: true, surface: 0 },
  { label: "Moving the load", d: 3.0, x: APPROACH_X, carry: true },
  { label: "Lifting to rack level", d: 1.7, h: HIGH, carry: true },
  { label: "Placing on the rack", d: 1.3, x: IN_RACK_X, carry: true },
  { label: "Placing on the rack", d: 0.8, h: LEVEL + 0.01, carry: true, surface: LEVEL },
  { label: "Backing out", d: 1.2, x: APPROACH_X },
  { label: "Lowering forks", d: 1.4, h: DOWN },
  { label: "Next job", d: 2.6, x: START_X },
  { label: "Next job", d: 0.8 },
  { label: "Retrieving from the rack", d: 2.8, x: APPROACH_X },
  { label: "Retrieving from the rack", d: 1.5, h: LEVEL + 0.01 },
  { label: "Retrieving from the rack", d: 1.2, x: IN_RACK_X },
  { label: "Retrieving from the rack", d: 0.7, h: HIGH, carry: true, surface: LEVEL },
  { label: "Bringing it down", d: 1.2, x: APPROACH_X, carry: true },
  { label: "Bringing it down", d: 1.6, h: CARRY, carry: true },
  { label: "Delivering to the bay", d: 3.0, x: AT_PICK_X, carry: true },
  { label: "Setting down", d: 0.8, h: DOWN, carry: true, surface: 0 },
  { label: "Next job", d: 2.2, x: START_X },
  { label: "Next job", d: 0.8 },
];

type Seg = Step & { t0: number; x0: number; x1: number; h0: number; h1: number; rest: [number, number] };

function compile(): { segs: Seg[]; total: number } {
  const segs: Seg[] = [];
  let t = 0;
  let x = START_X;
  let h = DOWN;
  let rest: [number, number] = [PICK_X, 0];
  for (const s of STEPS) {
    const x1 = s.x ?? x;
    const h1 = s.h ?? h;
    segs.push({ ...s, t0: t, x0: x, x1, h0: h, h1, rest });
    if (s.carry) rest = [x1 + FORK_CENTER, s.surface !== undefined ? Math.max(s.surface, h1 - 0.05) : h1 - 0.05];
    t += s.d;
    x = x1;
    h = h1;
  }
  return { segs, total: t };
}

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

export type Pose = { x: number; h: number; px: number; py: number; label: string; moving: boolean };

export function createTimeline() {
  const { segs, total } = compile();
  return {
    total,
    at(time: number): Pose {
      const t = ((time % total) + total) % total;
      let s = segs[segs.length - 1];
      for (const seg of segs) if (t < seg.t0 + seg.d) { s = seg; break; }
      const p = easeInOut(Math.min(1, (t - s.t0) / s.d));
      const x = s.x0 + (s.x1 - s.x0) * p;
      const h = s.h0 + (s.h1 - s.h0) * p;
      let px = s.rest[0];
      let py = s.rest[1];
      if (s.carry) {
        px = x + FORK_CENTER;
        py = s.surface !== undefined ? Math.max(s.surface, h - 0.05) : h - 0.05;
      }
      return { x, h, px, py, label: s.label, moving: s.x1 !== s.x0 || s.h1 !== s.h0 };
    },
  };
}

/* ---------- scene ---------- */

export function buildScene(fontFamily: string) {
  const scene = new THREE.Scene();

  scene.add(new THREE.HemisphereLight("#ffffff", "#aab4c3", 1.4));
  const sun = new THREE.DirectionalLight("#ffffff", 2.4);
  sun.position.set(4, 9, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 7, top: 6, bottom: -6, near: 1, far: 30 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#dfe6f2", 0.6);
  fill.position.set(-6, 4, 5);
  scene.add(fill);

  // Transparent floor that only shows shadows, so the hero's grid background reads as the warehouse floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 30).rotateX(-Math.PI / 2), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.receiveShadow = true;
  floor.userData.noShadow = true;
  scene.add(floor);
  scene.add(floorMarkings());

  const cardboard = cardboardTexture();
  scene.add(rack(cardboard));
  const pallet = loadedPallet(cardboard, 3);
  scene.add(pallet);

  const truck = forklift(fontFamily);
  scene.add(truck.root);

  scene.traverse((o) => {
    if ((o as THREE.Mesh).isMesh && !o.userData.noShadow) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  let lastX: number | null = null;
  function apply(pose: Pose, time: number) {
    truck.root.position.x = pose.x;
    truck.carriage.position.y = pose.h;
    truck.inner.position.y = Math.max(0, pose.h - 0.85);
    pallet.position.set(pose.px, pose.py, 0);
    if (lastX !== null) for (const w of truck.wheels) w.mesh.rotation.z -= (pose.x - lastX) / w.r;
    lastX = pose.x;
    truck.beaconMat.emissiveIntensity = pose.moving && Math.sin(time * 7) > 0 ? 2.2 : 0.35;
  }

  function dispose() {
    const seen = new Set<unknown>();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      if (!seen.has(m.geometry)) {
        seen.add(m.geometry);
        m.geometry.dispose();
      }
      for (const mt of ([] as THREE.Material[]).concat(m.material)) {
        if (seen.has(mt)) continue;
        seen.add(mt);
        const map = (mt as THREE.MeshStandardMaterial).map;
        if (map && !seen.has(map)) {
          seen.add(map);
          map.dispose();
        }
        mt.dispose();
      }
    });
  }

  return { scene, apply, dispose };
}
