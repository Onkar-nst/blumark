export type CategoryId =
  | "forklifts"
  | "pallet-trucks"
  | "stackers"
  | "order-pickers"
  | "scissor-platforms";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  features: string[];
  cover: string;
  cutout: string;
};

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  category: CategoryId;
  name: string;
  type: string;
  model?: string;
  description: string;
  images: { src: string; caption?: string }[];
  highlights: [Spec, Spec];
  specs: Spec[];
  features?: string[];
  /** Product shown on the old site without a published spec sheet. */
  onRequest?: boolean;
  /** The first image is a real photo in a scene (fill the frame) rather than a cut-out. */
  photo?: boolean;
  /** Technical-parameter pages from the company catalogue. */
  sheets?: { src: string; caption: string }[];
  /** Product brochure: `pages` are public, `locked` pages unlock after the enquiry form. */
  brochure?: {
    pages: { src: string; caption: string }[];
    locked: { file: string; preview: string; caption: string }[];
    pdf: string;
  };
};

const img = (name: string) => `/images/products/${name}.webp`;

const fk = (name: string) => `/images/forklifts/${name}.jpg`;
const sheet = (name: string) => `/images/forklifts/sheets/${name}.jpg`;

export const categories: Category[] = [
  {
    id: "forklifts",
    name: "Forklifts",
    short: "Forklifts",
    description:
      "Diesel and lithium-ion electric forklifts from 1.5 to 20 tons, plus side loaders for long, heavy and bulky loads.",
    features: [],
    cover: fk("diesel-forklift-1-5-5t"),
    cutout: fk("diesel-forklift-1-5-5t"),
  },
  {
    id: "pallet-trucks",
    name: "Pallet Truck & High Lift",
    short: "Pallet Trucks",
    description:
      "Heavy-duty pallet trucks with high lift capabilities designed for superior maneuverability and robust performance.",
    features: ["Heavy-duty build", "Smooth steering", "High load capacity"],
    cover: img("hand-pallet-1"),
    cutout: img("cut-highlift-pallet"),
  },
  {
    id: "stackers",
    name: "Manual & Electric Stacker",
    short: "Stackers",
    description:
      "From manual to fully electric solutions, they are designed to improve operator productivity with minimal effort.",
    features: [
      "Ergonomic controls for easy operation",
      "Heavy-duty lifting across variable heights",
      "Available in manual, semi-electric, and full electric models",
    ],
    cover: img("stacker-home"),
    cutout: img("cut-power-stacker"),
  },
  {
    id: "order-pickers",
    name: "Order Pickers",
    short: "Order Pickers",
    description:
      "Ideal for repair bays, inspection lines, and mezzanine-level access, these platforms are built with precision safety features and robust hydraulic performance.",
    features: [
      "Versatile platform sizes & elevation ranges",
      "Hydraulic and electric models",
      "Anti-slip design with guardrails",
    ],
    cover: img("electric-order-picker"),
    cutout: img("cut-order-picker"),
  },
  {
    id: "scissor-platforms",
    name: "Scissor Type Work Platform",
    short: "Scissor Platforms",
    description:
      "Our scissor lifts are built for aerial efficiency, offering stable, vertical elevation for indoor maintenance, inventory handling, and construction tasks.",
    features: [
      "High-stability scissor structure",
      "Self-propelled and manual push models",
      "Maximum platform heights up to 10m+",
    ],
    cover: img("mini-scissor-2"),
    cutout: img("cut-mini-scissor"),
  },
];

const CUSTOM = "Customized specifications are acceptable.";
const PUMP = "High quality pump";

export const products: Product[] = [
  // ───────────── Forklifts (from the 2026 company catalogue) ─────────────
  {
    slug: "blu-fe30",
    category: "forklifts",
    name: "BLU-FE30 Electric Forklift",
    type: "3.0 T · Lithium-ion",
    model: "BLU-FE30",
    description:
      "A 3-ton electric forklift with an industrial lithium-ion battery (BYD cells). It charges fully in about 2 hours, works up to 8 hours on a single charge and is IP65 rated for dusty and wet workplaces.",
    images: [{ src: fk("blu-fe30") }, { src: "/brochures/blu-fe30-p2.jpg", caption: "Salient features" }],
    photo: true,
    highlights: [
      { label: "Rated capacity", value: "3,000 kg" },
      { label: "Max lift height", value: "4,500 mm" },
    ],
    specs: [
      { label: "Power type", value: "Electric (lithium-ion)" },
      { label: "Rated capacity", value: "3000 kg" },
      { label: "Load centre", value: "500 mm" },
      { label: "Max lifting height", value: "4500 mm" },
      { label: "Free lifting height", value: "1500 mm" },
      { label: "Battery", value: "80 V / 450 Ah (BYD cells)" },
      { label: "Charger", value: "80 V 200 Ah fast charge" },
      { label: "IP rating", value: "IP65 (works in all weather)" },
      { label: "Max height after lifting", value: "5350 mm" },
      { label: "Retracted mast height", value: "2200 mm" },
      { label: "Overall guard height", value: "2150 mm" },
      { label: "Fork size (L × W × T)", value: "1220 × 120 × 45 mm" },
      { label: "Wheel base", value: "1850 mm" },
      { label: "Turning radius", value: "2600 mm" },
      { label: "Overall length (excluding fork)", value: "2800 mm" },
      { label: "Overall width", value: "1200 mm" },
      { label: "Travel speed (loaded / unloaded)", value: "15 / 16 km/h" },
      { label: "Lift speed (loaded / unloaded)", value: "350 / 300 mm/s" },
      { label: "Gradeability (loaded)", value: "18%" },
      { label: "Driving motor power", value: "18 kW" },
      { label: "Lifting motor power", value: "21 kW" },
      { label: "Service brake", value: "Oil brake" },
      { label: "Self-weight", value: "4650 kg" },
      { label: "Sound level at driver's seat", value: "60 dB" },
    ],
    features: [
      "Permanent magnet synchronous motor (PMSM): instant torque, smooth acceleration and better energy efficiency",
      "Industrial lithium-ion battery with BYD cells and a smart BMS: maintenance-free, full charge in about 2 hours",
      "Up to 8 hours of work on a single charge",
      "IP65 protection for dusty, wet and demanding workplaces",
      "Spacious operator area with easy-to-reach controls and front & rear cameras",
      "Heavy-duty steer axle and reinforced chassis for stability and long life",
    ],
    brochure: {
      pages: [
        { src: "/brochures/blu-fe30-p1.jpg", caption: "Overview" },
        { src: "/brochures/blu-fe30-p2.jpg", caption: "Salient features" },
      ],
      locked: [
        { file: "blu-fe30-p3.jpg", preview: "/brochures/blu-fe30-p3-locked.jpg", caption: "Technical parameters & drawings" },
        { file: "blu-fe30-p4.jpg", preview: "/brochures/blu-fe30-p4-locked.jpg", caption: "Product range & service network" },
      ],
      pdf: "blumark-blu-fe30-brochure.pdf",
    },
  },
  {
    slug: "lithium-forklift-3-4-5t",
    category: "forklifts",
    name: "Lithium-ion Forklift 3 to 4.5\u00a0T",
    type: "Electric · Lithium battery",
    description:
      "Battery forklifts for clean, quiet work indoors and out. The lithium battery comes with a 5-year warranty and charges fully in 2 to 2.5 hours, which suits multi-shift operations.",
    images: [
      { src: fk("lithium-forklift-3-4-5t") },
      { src: fk("lithium-forklift-3-4-5t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "3 to 4.5 T" },
      { label: "Power", value: "Lithium-ion" },
    ],
    specs: [],
    features: [
      "Compact, powerful AC motor with faster start-up; no carbon brushes to replace, which saves maintenance cost",
      "Dynamic load-sensing priority steering for quicker response and a smoother drive",
      "Imported Inmotion (ZAPI group) electric control with ACS series AC motor drive",
      "Lithium battery with long service life, 5-year warranty and zero pollution",
    ],
    sheets: [{ src: sheet("lithium-forklift-3-4-5t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "lithium-forklift-5-8t",
    category: "forklifts",
    name: "Lithium-ion Forklift 5 to 8\u00a0T",
    type: "Electric · LiFePO₄ battery",
    description:
      "Heavy-capacity electric forklifts for 5 to 8 ton loads, with zero emissions and dual-gun fast charging.",
    images: [
      { src: fk("lithium-forklift-5-8t") },
      { src: fk("lithium-forklift-5-8t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "5 to 8 T" },
      { label: "Power", value: "Lithium-ion" },
    ],
    specs: [],
    features: [
      "High-quality lithium iron phosphate (LiFePO₄) battery with zero emissions",
      "Dual-gun fast charging at up to 400 Ah per hour, extending single-shift operating time",
      "Dynamic load-sensing steering for quicker response and smoother driving",
      "Drive and steering axles proven on internal-combustion forklifts, for stable performance and easy maintenance",
      "Standard wide-view 3-stage free-lift mast that improves operator vision by 12%",
    ],
    sheets: [{ src: sheet("lithium-forklift-5-8t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "lithium-forklift-10-12t",
    category: "forklifts",
    name: "Lithium-ion Forklift 10 to 12\u00a0T",
    type: "Electric · LiFePO₄ battery",
    description:
      "Electric power for very heavy loads: 10 to 12 ton capacity with a lithium iron phosphate battery and fast charging.",
    images: [
      { src: fk("lithium-forklift-10-12t") },
      { src: fk("lithium-forklift-10-12t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "10 to 12 T" },
      { label: "Power", value: "Lithium-ion" },
    ],
    specs: [],
    features: [
      "Proven internal-combustion forklift architecture, validated by over 30 years of market use",
      "Drive and steering axles from internal-combustion forklifts for stable performance and easy maintenance",
      "Dual-gun fast charging at up to 400 Ah per hour",
      "Lithium iron phosphate (LiFePO₄) battery with zero emissions",
    ],
    sheets: [{ src: sheet("lithium-forklift-10-12t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "diesel-forklift-1-5-5t",
    category: "forklifts",
    name: "Diesel Forklift 1.5 to 5\u00a0T",
    type: "Diesel",
    description:
      "Dependable everyday diesel forklifts for 1.5 to 5 ton loads, for yards, factories and loading bays.",
    images: [
      { src: fk("diesel-forklift-1-5-5t") },
      { src: fk("diesel-forklift-1-5-5t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "1.5 to 5 T" },
      { label: "Power", value: "Diesel" },
    ],
    specs: [],
    features: [
      "High-strength cast steel axle and wide-base tyres",
      "Central electric box inside the engine hood, waterproof and dustproof",
      "Full hydraulic load-sensing steering: faster and easier to steer",
      "Real-time system monitoring with fault alarms",
      "Large non-slip pedals and a small, adjustable steering wheel",
    ],
    sheets: [
      { src: sheet("diesel-forklift-1-5-5t-1"), caption: "Technical parameters · 1.5 to 3 T" },
      { src: sheet("diesel-forklift-1-5-5t-2"), caption: "Technical parameters · 3.5 to 5 T" },
    ],
  },
  {
    slug: "diesel-forklift-6-10t",
    category: "forklifts",
    name: "Diesel Forklift 6 to 10\u00a0T",
    type: "Diesel",
    description: "Heavy-duty diesel forklifts for 6 to 10 ton loads, with operator safety built in.",
    images: [
      { src: fk("diesel-forklift-6-10t") },
      { src: fk("diesel-forklift-6-10t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "6 to 10 T" },
      { label: "Power", value: "Diesel" },
    ],
    specs: [],
    features: [
      "Overhead guard made from a single high-strength steel plate for operator protection",
      "Intelligent start system with gear lock: the forklift won't start while in gear",
      "Push-button parking brake that protects against accidental release",
      "Simplified exhaust with secondary silencing for lower noise",
      "High-brightness lighting for safer night operation",
    ],
    sheets: [{ src: sheet("diesel-forklift-6-10t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "diesel-forklift-12-16t",
    category: "forklifts",
    name: "Diesel Forklift 12 to 16\u00a0T",
    type: "Diesel",
    description: "Big-capacity diesel forklifts for 12 to 16 ton loads, designed for easy operation and servicing.",
    images: [
      { src: fk("diesel-forklift-12-16t") },
      { src: fk("diesel-forklift-12-16t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "12 to 16 T" },
      { label: "Power", value: "Diesel" },
    ],
    specs: [],
    features: [
      "Electric one-button parking brake and hydraulic power drive",
      "Multifunction colour-screen instruments with clear graphics",
      "Full-view mast with optimised design and external pipeline layout",
      "Ergonomic design with a wider view and more space for the driver",
      "Radiator cover opens to 80° for easy servicing",
    ],
    sheets: [{ src: sheet("diesel-forklift-12-16t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "diesel-forklift-16-20t",
    category: "forklifts",
    name: "Diesel Forklift 16 to 20\u00a0T",
    type: "Diesel",
    description:
      "Our largest diesel forklifts, for 16 to 20 ton loads, with a factory-integrated hydraulic fork positioner.",
    images: [
      { src: fk("diesel-forklift-16-20t") },
      { src: fk("diesel-forklift-16-20t-features"), caption: "Key features" },
    ],
    photo: true,
    highlights: [
      { label: "Capacity", value: "16 to 20 T" },
      { label: "Power", value: "Diesel" },
    ],
    specs: [],
    features: [
      "Box-type internal and external mast with all-round roller bearings for strength and stability",
      "Hydraulic fork positioner, adjustable from the operator's seat",
      "Low oil consumption turbocharged engine with high torque reserves",
      "Transverse oil-cylinder steering axle with full-hydraulic steering",
    ],
    sheets: [{ src: sheet("diesel-forklift-16-20t-1"), caption: "Technical parameters" }],
  },
  {
    slug: "side-loader-forklift",
    category: "forklifts",
    name: "Side Loader Forklift",
    type: "Electric & diesel",
    description:
      "Electric and diesel side loader forklifts from 3 to 20 tons, engineered for long, heavy and bulky loads.",
    images: [{ src: fk("side-loader-forklift") }, { src: fk("side-loader-forklift-2") }],
    highlights: [
      { label: "Capacity", value: "3 to 20 T" },
      { label: "Power", value: "Electric & diesel" },
    ],
    specs: [],
    features: ["Built for long, heavy and bulky loads", "Available in electric and diesel versions"],
    sheets: [{ src: sheet("side-loader-forklift-1"), caption: "Technical parameters" }],
  },

  // ───────────── Pallet Truck & High Lift ─────────────
  {
    slug: "manual-hand-pallet",
    category: "pallet-trucks",
    name: "Manual Hand Pallet",
    type: "Manual Pallet Truck",
    model: "BLU_HP20/25/30",
    description:
      "Everyday workhorse pallet truck with a high quality pump, ø80 fork wheels and nylon/PU wheels. Available in 1150/1210 mm fork lengths.",
    images: [
      { src: img("hand-pallet-1") },
      { src: img("hand-pallet-2") },
      { src: img("hand-pallet-3") },
    ],
    highlights: [
      { label: "Capacity", value: "2.0 to 3.0 T" },
      { label: "Max Lift", value: "185 to 200 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_HP20/25/30" },
      { label: "Capacity", value: "2.0T, 2.5T, 3.0T" },
      { label: "Max Lifting Height (mm)", value: "185/195/200" },
      { label: "Min Fork Height (mm)", value: "85" },
      { label: "Fork Length (mm)", value: "1150/1210" },
      { label: "Fork Width (mm)", value: "550/685" },
      { label: "Single Fork Width (mm)", value: "160" },
      { label: "Fork Wheel", value: "ø 80" },
      { label: "Wheel", value: "Nylon/PU" },
    ],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "stainless-steel-hand-pallet",
    category: "pallet-trucks",
    name: "Stainless Steel Hand Pallet",
    type: "Manual · Stainless Steel",
    model: "BLU_SSHP20/25/30",
    description:
      "Stainless steel pallet trucks in ACS and HPS series, fitted with a high quality pump and nylon/PU wheels.",
    images: [
      { src: img("ss-pallet-acs"), caption: "Stainless Steel Pallet Jack (ACS Series)" },
      { src: img("ss-pallet-hps"), caption: "Stainless Pallet Truck (HPS Series)" },
    ],
    highlights: [
      { label: "Capacity", value: "2.0 to 3.0 T" },
      { label: "Max Lift", value: "185/195 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_SSHP20/25/30" },
      { label: "Capacity", value: "2.0T, 2.5T, 3.0T" },
      { label: "Max Lifting Height (mm)", value: "185/195" },
      { label: "Min Fork Height (mm)", value: "85" },
      { label: "Fork Length (mm)", value: "1150/1210" },
      { label: "Fork Width (mm)", value: "550/685" },
      { label: "Single Fork Width (mm)", value: "160" },
      { label: "Fork Wheel", value: "ø 80" },
      { label: "Wheel", value: "Nylon/PU" },
    ],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "low-profile-hand-pallet",
    category: "pallet-trucks",
    name: "Low Profile Hand Pallet",
    type: "Manual · Low Profile",
    model: "BLU_LHP10/20",
    description:
      "Low profile forks with a minimum fork height of just 55 mm for pallets and skids with very little ground clearance.",
    images: [{ src: img("low-profile-pallet") }],
    highlights: [
      { label: "Capacity", value: "1.0 / 2.0 T" },
      { label: "Min Fork Height", value: "55 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_LHP10/20" },
      { label: "Capacity", value: "1.0T and 2.0T" },
      { label: "Min Fork Height (mm)", value: "55" },
      { label: "Fork Length (mm)", value: "1150/1210" },
      { label: "Fork Width (mm)", value: "550/680" },
      { label: "Single Fork Width (mm)", value: "160" },
      { label: "Wheel", value: "Nylon/PU" },
    ],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "roll-pallet-truck",
    category: "pallet-trucks",
    name: "Roll Pallet Truck",
    type: "Manual · Roll Handling",
    model: "BLU_RHP15",
    description:
      "Built for moving rolls with diameters from 500 mm up to 1300 mm, on a 1350 mm fork with ø200 rear wheels.",
    images: [{ src: img("pallet-truck") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Roll Diameter", value: "500 to 1300 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_RHP15" },
      { label: "Capacity", value: "1.5T" },
      { label: "Min Roll Diameter (mm)", value: "500/700" },
      { label: "Max Roll Diameter (mm)", value: "800/1300" },
      { label: "Fork Length (mm)", value: "1350" },
      { label: "Fork Width (mm)", value: "860/990" },
      { label: "Rear Wheel", value: "ø 200" },
      { label: "Wheel", value: "Nylon/PU" },
    ],
  },
  {
    slug: "heavy-duty-hand-pallet-truck",
    category: "pallet-trucks",
    name: "Heavy Duty Hand Pallet Truck",
    type: "Manual · Heavy Duty",
    model: "BLU_HP50",
    description:
      "A 5-tonne capacity pallet truck with 210 mm wide forks and nylon/steel wheels for the heaviest loads.",
    images: [{ src: img("heavy-duty-pallet") }],
    highlights: [
      { label: "Capacity", value: "5.0 T" },
      { label: "Max Lift", value: "200 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_HP50" },
      { label: "Capacity", value: "5.0T" },
      { label: "Max Lifting Height (mm)", value: "200" },
      { label: "Min Fork Height (mm)", value: "90" },
      { label: "Fork Length (mm)", value: "1150" },
      { label: "Fork Width (mm)", value: "580/685" },
      { label: "Single Fork Width (mm)", value: "210" },
      { label: "Fork Wheel", value: "ø 80" },
      { label: "Wheel", value: "Nylon/Steel" },
    ],
  },
  {
    slug: "rough-terrain-truck",
    category: "pallet-trucks",
    name: "Rough Terrain Truck",
    type: "Manual · All Terrain",
    model: "BLU_RTHP12",
    description:
      "Adjustable 265 to 685 mm fork width and solid or pneumatic tyres to move loads across uneven, outdoor ground.",
    images: [{ src: img("pallet-truck") }],
    highlights: [
      { label: "Capacity", value: "1.2 T" },
      { label: "Turning Radius", value: "1500 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_RTHP12" },
      { label: "Capacity", value: "1.2T" },
      { label: "Min Fork Height (mm)", value: "70" },
      { label: "Fork Length (mm)", value: "800" },
      { label: "Adjustable Fork Width (mm)", value: "265-685" },
      { label: "Single Fork Width (mm)", value: "120" },
      { label: "Distance inside front wheels (mm)", value: "1230" },
      { label: "Turning Radius (mm)", value: "1500" },
      { label: "Overall Size (L×B×H)", value: "1406×1670×1280" },
      { label: "Wheel", value: "Solid/Pneumatic tyre" },
    ],
  },
  {
    slug: "single-fork-lifter",
    category: "pallet-trucks",
    name: "Single Fork Lifter",
    type: "Manual · Single Fork",
    model: "BLU_SFL/5",
    description:
      "Compact single-fork lifter with PU wheels, lifting from 85 mm up to 250 mm for tight spaces.",
    images: [{ src: img("single-fork-lifter") }],
    highlights: [
      { label: "Capacity", value: "500 kg" },
      { label: "Max Fork Height", value: "250 mm" },
    ],
    specs: [
      { label: "Model", value: "BLU_SFL/5" },
      { label: "Capacity", value: "500 kg" },
      { label: "Min Fork Height (mm)", value: "85" },
      { label: "Max Fork Height (mm)", value: "250" },
      { label: "Fork Width (mm)", value: "160" },
      { label: "Fork Length (mm)", value: "650" },
      { label: "Wheel", value: "PU" },
    ],
  },
  {
    slug: "mechanic-lifter-sr200",
    category: "pallet-trucks",
    name: "Hand Pallet Mechanic Lifter (SR200)",
    type: "Manual · Roll Handling",
    model: "BLU/RP20",
    description:
      "For handling rolls of paper, carpet and textile, with a high quality pump.",
    images: [{ src: img("mechanic-lifter-sr200") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Handles", value: "Paper, carpet, textile" },
    ],
    specs: [
      { label: "Model", value: "BLU/RP20" },
      { label: "Application", value: "Roll of paper, carpet, textile" },
      { label: "Capacity", value: "1.5T" },
    ],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "semi-electric-hand-pallet",
    category: "pallet-trucks",
    name: "Semi Electric Hand Pallet",
    type: "Semi Electric",
    model: "BLU_EHP15/20",
    description:
      "Electric drive with a 0.7 kW motor and 24V/20Ah battery, reaching 4.5 km/h unladen with a 1350 mm turning radius.",
    images: [
      { src: img("semi-electric-pallet-1"), caption: "Electric Pallet Truck" },
      { src: img("semi-electric-pallet-2"), caption: "Motorized Pallet Jack" },
    ],
    highlights: [
      { label: "Capacity", value: "1.5 / 2.0 T" },
      { label: "Battery", value: "24V / 20Ah" },
    ],
    specs: [
      { label: "Model", value: "BLU_EHP15/20" },
      { label: "Capacity", value: "1.5T and 2.0T" },
      { label: "Min Fork Height (mm)", value: "85" },
      { label: "Max Lifting Height (mm)", value: "195" },
      { label: "Overall Fork Width (mm)", value: "550/680" },
      { label: "Fork Length (mm)", value: "1150" },
      { label: "Drive", value: "Semi Electric" },
      { label: "Drive Motor", value: "0.7 kW" },
      { label: "Battery Capacity", value: "24V/20Ah" },
      { label: "Turning Radius (mm)", value: "1350" },
      { label: "Speed Laden/Unladen (km/h)", value: "4.2/4.5" },
      { label: "Wheel", value: "PU" },
    ],
  },
  {
    slug: "full-electric-pallet-truck",
    category: "pallet-trucks",
    name: "Full Electric Pallet Truck",
    type: "Full Electric",
    model: "BLU_FEHP15",
    description:
      "Fully electric drive and lift: 0.75 kW drive motor and 0.5 kW lift motor on a 24V/20Ah battery.",
    images: [{ src: img("full-electric-pallet") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Drive Motor", value: "0.75 kW" },
    ],
    specs: [
      { label: "Model", value: "BLU_FEHP15" },
      { label: "Capacity", value: "1.5T" },
      { label: "Min Fork Height (mm)", value: "85" },
      { label: "Max Lifting Height (mm)", value: "185" },
      { label: "Overall Fork Width (mm)", value: "560/685" },
      { label: "Fork Length (mm)", value: "1150" },
      { label: "Drive", value: "Full Electric" },
      { label: "Drive Motor", value: "0.75 kW" },
      { label: "Lift Motor", value: "0.5 kW" },
      { label: "Battery Capacity", value: "24V/20Ah" },
      { label: "Turning Radius (mm)", value: "1350" },
      { label: "Speed Laden/Unladen (km/h)", value: "4.2/4.5" },
      { label: "Wheel", value: "PU" },
    ],
  },
  {
    slug: "high-lift-pallet-truck",
    category: "pallet-trucks",
    name: "High-Lift Pallet Truck",
    type: "Manual · High Lift",
    description:
      "Heavy-duty pallet truck with high lift capability, designed for superior maneuverability and robust performance.",
    images: [{ src: img("cut-highlift-pallet") }],
    highlights: [
      { label: "Lift", value: "High Lift" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },
  {
    slug: "stainless-steel-digital-weighing-truck",
    category: "pallet-trucks",
    name: "Stainless Steel Digital Weighing Truck",
    type: "Manual · Weighing",
    description:
      "Stainless steel pallet truck with an integrated digital weighing display. Move and weigh in one step.",
    images: [{ src: img("cut-ss-weighing") }],
    highlights: [
      { label: "Build", value: "Stainless Steel" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },

  // ───────────── Manual & Electric Stacker ─────────────
  {
    slug: "full-electric-stacker",
    category: "stackers",
    name: "Full Electric Stacker",
    type: "Full Electric",
    description:
      "A fully electric stacker designed to improve operator productivity with minimal effort.",
    images: [{ src: img("full-electric-stacker") }],
    highlights: [
      { label: "Capacity", value: "1500 / 2000 kg" },
      { label: "Lift Height", value: "3500 / 3900 mm" },
    ],
    specs: [
      { label: "Capacity", value: "1500 kg and 2000 kg" },
      { label: "Lifting Heights", value: "3500 mm, 3900 mm" },
      { label: "Load Centre", value: "600 mm" },
      { label: "Fork Width", value: "550 mm" },
      { label: "Battery", value: "24/100" },
      { label: "Service Brake", value: "Electromagnetic" },
    ],
    features: [
      "Extended tiller arm ensures smoother steering and maintains a safe operating distance for the user",
      "Built-in safety elements include a horn, belly reverse switch, and electromagnetic brake",
      "Comes with an automatic charger and a battery level display",
    ],
  },
  {
    slug: "electric-stacker-stand-on",
    category: "stackers",
    name: "Electric Stacker (Stand on Platform)",
    type: "Full Electric · Stand On",
    description:
      "Stand-on platform stacker lifting 1500 kg up to 2900 mm, with an electromagnetic service brake.",
    images: [{ src: img("stand-on-stacker") }],
    highlights: [
      { label: "Capacity", value: "1500 kg" },
      { label: "Lift Height", value: "2900 mm" },
    ],
    specs: [
      { label: "Capacity", value: "1500 kg" },
      { label: "Load Centre", value: "600 mm" },
      { label: "Lowered Height", value: "85 mm" },
      { label: "Lifting Height", value: "2900 mm" },
      { label: "Lowered Mast Height", value: "1930 mm" },
      { label: "Lift", value: "2815 mm" },
      { label: "Fork Length", value: "1150 mm" },
      { label: "Fork Width", value: "560 mm" },
      { label: "Battery Voltage", value: "24/100" },
      { label: "Service Brake", value: "Electromagnetic" },
    ],
  },
  {
    slug: "semi-electric-stacker",
    category: "stackers",
    name: "Semi-Electric Stacker",
    type: "Semi Electric",
    description:
      "Electric lifting with manual travel, a cost-effective step up from manual stacking.",
    images: [{ src: img("semi-electric-stacker") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Drive", value: "Semi Electric" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "semi-electric-stacker-epm",
    category: "stackers",
    name: "Semi-Electric Stacker (EPM Series)",
    type: "Semi Electric",
    description:
      "EPM series semi-electric stacker for repetitive lifting with minimal operator effort.",
    images: [{ src: img("semi-electric-epm") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Series", value: "EPM" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "semi-electric-stacker-spn-fw",
    category: "stackers",
    name: "Semi-Electric Stacker with Straddle Leg (SPN.FW)",
    type: "Semi Electric · Straddle",
    description:
      "Straddle-leg semi-electric stacker (SPN.FW series) for handling closed and open pallets.",
    images: [{ src: img("semi-electric-spn") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Series", value: "SPN.FW" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "straddle-legs-stacker-gt",
    category: "stackers",
    name: "Straddle Legs Stacker (GT Series)",
    type: "Manual · Straddle",
    description:
      "Manual GT series stacker with straddle legs for stable lifting across variable heights.",
    images: [{ src: img("straddle-gt") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Series", value: "GT" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "heavy-duty-hand-stacker-pa",
    category: "stackers",
    name: "Heavy Duty Hand Stacker (PA Series)",
    type: "Manual · Heavy Duty",
    description:
      "Heavy duty PA series hand stacker with a high quality hydraulic pump.",
    images: [{ src: img("hand-stacker-pa") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Series", value: "PA" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "hydraulic-pallet-tilter-lt0892",
    category: "stackers",
    name: "Hydraulic Pallet Tilter (LT0892)",
    type: "Manual · Hydraulic",
    description:
      "Hydraulic pallet tilter that lifts and tilts loads to an ergonomic working position.",
    images: [{ src: img("pallet-tilter") }],
    highlights: [
      { label: "Capacity", value: "1.5 T" },
      { label: "Model", value: "LT0892" },
    ],
    specs: [{ label: "Capacity", value: "1.5T" }],
    features: [CUSTOM, PUMP],
  },
  {
    slug: "electric-counter-balance",
    category: "stackers",
    name: "Electric Counter Balance",
    type: "Electric · Counterbalance",
    description:
      "Counterbalanced electric stacker with no straddle legs, so it can handle pallets of any base design.",
    images: [{ src: img("cut-counter-balance") }],
    highlights: [
      { label: "Drive", value: "Electric" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },
  {
    slug: "power-stacker-straddle-leg",
    category: "stackers",
    name: "Power Stacker with Straddle Leg",
    type: "Electric · Straddle",
    description:
      "Powered stacker with straddle legs for stable lifting of wide loads.",
    images: [{ src: img("cut-power-stacker-straddle") }],
    highlights: [
      { label: "Drive", value: "Electric" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },
  {
    slug: "power-stacker",
    category: "stackers",
    name: "Power Stacker",
    type: "Electric",
    description:
      "Fully powered stacker designed to improve operator productivity with minimal effort.",
    images: [{ src: img("cut-power-stacker") }],
    highlights: [
      { label: "Drive", value: "Electric" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },

  // ───────────── Order Pickers ─────────────
  {
    slug: "electric-order-picker",
    category: "order-pickers",
    name: "Electric Order Picker",
    type: "Battery Lift · Hand Pushed",
    description:
      "Dramatically reduces strain, increases safety and productivity in repeat picking applications.",
    images: [{ src: img("electric-order-picker") }],
    highlights: [
      { label: "Capacity", value: "200 kg" },
      { label: "Raised Height", value: "1500 mm" },
    ],
    specs: [
      { label: "Capacity", value: "200 kg (including operator)" },
      { label: "Lowered Table Height", value: "670 mm" },
      { label: "Raised Table Height", value: "1500 mm" },
      { label: "Platform Size (L×W)", value: "600 × 550 mm" },
      { label: "Power Pack", value: "DC, 700W" },
      { label: "Battery", value: "12V/45Ah" },
      { label: "Overall Size", value: "1210 × 630 × 1040 mm" },
    ],
    features: [
      "Mandatory two handed controls safety bar",
      "Hand pushed unit which is easy to maneuver",
      "Two parking brakes ensure safety rest",
      "Quick battery operated lift to desired height",
    ],
  },
  {
    slug: "high-lift-order-picker",
    category: "order-pickers",
    name: "High Lift Order Picker",
    type: "High Lift",
    description:
      "Used in repeat picking applications. Extra stabilizer and floor brake improve stability at height.",
    images: [{ src: img("high-lift-order-picker") }],
    highlights: [
      { label: "Capacity", value: "200 kg" },
      { label: "Max Height", value: "2700 mm" },
    ],
    specs: [
      { label: "Capacity (including operator)", value: "200 kg" },
      { label: "Lowered Table Height (mm)", value: "480" },
      { label: "Max Table Height (mm)", value: "2700" },
      { label: "Platform Size (mm)", value: "640 × 600" },
    ],
    features: [
      "Used in repeat picking applications",
      "Extra stabilizer and floor brake improve stability",
    ],
  },
  {
    slug: "self-propelled-order-picker",
    category: "order-pickers",
    name: "Self Propelled Order Picker",
    type: "Electric Lift & Drive",
    description:
      "Electric lifting and electric moving with CAN bus technology and proportional controls.",
    images: [{ src: img("self-propelled-order-picker") }],
    highlights: [
      { label: "Capacity", value: "300 kg" },
      { label: "Platform Height", value: "2.7 to 4.5 m" },
    ],
    specs: [
      { label: "Capacity", value: "300 kg" },
      { label: "Platform Floor Height", value: "2700, 3300, 4000, 4500 mm" },
      { label: "Lifting / Moving", value: "Electric / Electric" },
    ],
    features: [
      "CAN bus technology",
      "Proportional controls",
      "Battery charge indicator",
      "Forklift pockets",
      "Safety brackets",
      "Low voltage alarm",
      "Emergency down button",
      "Charger protection",
      "Controller temperature protection",
    ],
  },
  {
    slug: "semi-electric-order-picker",
    category: "order-pickers",
    name: "Semi Electric Order Picker",
    type: "Electric Lift · Manual Move",
    description:
      "Electric lifting with manual moving, proportional controls and a full set of safety protections.",
    images: [{ src: img("semi-electric-order-picker") }],
    highlights: [
      { label: "Capacity", value: "200 kg" },
      { label: "Lift Height", value: "2.72 to 4.5 m" },
    ],
    specs: [
      { label: "Capacity", value: "200 kg" },
      { label: "Lifting Height", value: "2720, 3300, 4000, 4500 mm" },
      { label: "Lifting / Moving", value: "Electric / Manual" },
    ],
    features: [
      "Proportional controls",
      "Battery charge indicator",
      "Forklift pockets",
      "Safety brackets",
      "Low voltage alarm",
      "Emergency down button",
      "Charger protection",
      "Controller temperature protection",
    ],
  },

  // ───────────── Scissor Type Work Platform ─────────────
  {
    slug: "mini-scissor-work-platform",
    category: "scissor-platforms",
    name: "Mini Scissor Work Platform",
    type: "Electric Lift · Manual Move",
    description:
      "Compact design provides access in and around confined work areas, with a built-in charger and emergency stop.",
    images: [{ src: img("mini-scissor-1") }, { src: img("mini-scissor-2") }],
    highlights: [
      { label: "Capacity", value: "300 kg" },
      { label: "Max Height", value: "1.7 to 4.8 m" },
    ],
    specs: [
      { label: "Capacity", value: "300 kg (with support leg)" },
      { label: "Max. Platform Height", value: "1700, 3000, 3900, 4800 mm" },
      { label: "Lifting / Moving", value: "Electric / Manual" },
    ],
    features: [
      "With built-in charger",
      "Battery charge indicator",
      "Safety brackets",
      "Emergency stop button",
      "Compact design provides access in and around confined work areas",
    ],
  },
  {
    slug: "scissor-type-elevating-platform",
    category: "scissor-platforms",
    name: "Scissor Type Elevating Platform",
    type: "Electric Lift",
    description:
      "Electric lifting up to 10 m with the option of a drive wheel for electric moving or manual moving.",
    images: [
      { src: img("scissor-elevating-1") },
      { src: img("scissor-elevating-2") },
      { src: img("scissor-elevating-3") },
    ],
    highlights: [
      { label: "Capacity", value: "500 kg" },
      { label: "Max Height", value: "6 / 8 / 10 m" },
    ],
    specs: [
      { label: "Capacity", value: "500 kg" },
      { label: "Max. Platform Height", value: "6000, 8000, 10000 mm" },
      { label: "Lifting", value: "Electric" },
      { label: "Moving Option", value: "Drive wheel (electric) or manual" },
    ],
    features: ["Standard equipment"],
  },
  {
    slug: "self-propelled-scissor-platform",
    category: "scissor-platforms",
    name: "Self Propelled Scissor Platform",
    type: "Electric Lift & Drive",
    description:
      "Self-propelled scissor lift offering stable, vertical elevation for indoor maintenance, inventory handling and construction tasks.",
    images: [{ src: img("cut-self-propelled-scissor") }],
    highlights: [
      { label: "Drive", value: "Self Propelled" },
      { label: "Specs", value: "On request" },
    ],
    specs: [],
    onRequest: true,
  },
];

export const productsBy = (id: CategoryId) =>
  products.filter((p) => p.category === id);

export const isCategoryId = (v: unknown): v is CategoryId =>
  categories.some((c) => c.id === v);
