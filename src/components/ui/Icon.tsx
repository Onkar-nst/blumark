import {
  Award, BadgeCheck, Car, Cpu, Factory, FlaskConical, Handshake, HardHat, Headset, Layers,
  Lightbulb, Package, Pickaxe, Pill, Plane, Settings, Shield, Ship, Shirt, ShoppingCart,
  Target, Warehouse, Wheat, Zap, Forklift, Boxes, MoveVertical, Truck, type LucideProps,
} from "lucide-react";

const map = {
  award: Award, badge: BadgeCheck, car: Car, cpu: Cpu, factory: Factory, flask: FlaskConical,
  handshake: Handshake, hardhat: HardHat, headset: Headset, layers: Layers, lightbulb: Lightbulb,
  package: Package, pickaxe: Pickaxe, pill: Pill, plane: Plane, settings: Settings, shield: Shield,
  ship: Ship, shirt: Shirt, cart: ShoppingCart, target: Target, warehouse: Warehouse, wheat: Wheat,
  zap: Zap, forklift: Forklift, boxes: Boxes, vertical: MoveVertical, truck: Truck,
};

export type IconName = keyof typeof map;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C {...props} />;
}

export const categoryIcon: Record<string, IconName> = {
  forklifts: "forklift",
  "pallet-trucks": "truck",
  stackers: "forklift",
  "order-pickers": "boxes",
  "scissor-platforms": "vertical",
};
