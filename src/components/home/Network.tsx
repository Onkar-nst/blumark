import { Headset, MapPin, PackageCheck, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import NetworkMap from "./NetworkMap";

// From the "Our network" page of the company catalogue
export const network = [
  "Maharashtra",
  "Gujarat",
  "Goa",
  "Madhya Pradesh",
  "Chhattisgarh",
  "Odisha",
  "Uttar Pradesh",
  "Assam",
  "Hyderabad",
  "Bengaluru",
];

const promises = [
  { icon: Wrench, title: "Experienced service engineers", text: "On-site servicing and repairs for your fleet." },
  { icon: Headset, title: "Prompt technical help", text: "Talk to someone who knows the machine." },
  { icon: PackageCheck, title: "Genuine spare parts", text: "Readily available, so downtime stays short." },
];

export default function Network() {
  return (
    <section className="container-x py-8 sm:py-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-lg bg-soft lg:grid-cols-[1fr_1.15fr]">
        <div className="relative aspect-square w-full bg-[#dcdcdc] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
          <NetworkMap />
        </div>

        <div className="px-6 pb-8 sm:px-10 lg:py-10 lg:pr-12 lg:pl-0">
          <SectionHeading eyebrow="PAN India service" title="We stay with you after delivery." />
          <p className="mt-4 text-muted">
            Headquartered in Mumbai, with a network that reaches customers across these regions:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li className="flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white">
              <MapPin className="size-3.5 text-signal" /> Mumbai HQ
            </li>
            {network.map((n) => (
              <li key={n} className="rounded-md bg-white px-3 py-1.5 text-sm text-ink/80 ring-1 ring-line">
                {n}
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {promises.map((p) => (
              <li key={p.title}>
                <span className="grid size-10 place-items-center rounded-md bg-signal text-ink">
                  <p.icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-3 font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
