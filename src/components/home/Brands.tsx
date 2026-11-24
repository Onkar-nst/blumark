import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const brands = [
  ["toyota", "Toyota Material Handling"],
  ["linde", "Linde Material Handling"],
  ["jungheinrich", "Jungheinrich"],
  ["kion", "KION Group"],
  ["still", "STILL"],
  ["doosan", "Doosan"],
  ["mitsubishi", "Mitsubishi"],
  ["hyundai", "Hyundai Material Handling"],
  ["heli", "HELI"],
  ["clark", "CLARK"],
  ["godrej", "Godrej Material Handling"],
  ["ace", "ACE"],
] as const;

export default function Brands() {
  return (
    <section className="bg-ink py-10 text-white sm:py-14">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow !text-white/60">Multi-brand service</p>
          <h2 className="mt-4 text-4xl leading-[0.95] sm:text-5xl">Already run other brands? We look after those too.</h2>
          <p className="mt-4 text-white/65">
            Through our associate company JEC, we stock spare parts and service forklifts from all the major
            manufacturers.
          </p>
          <Link href="/contact?product=Service%20%26%20spare%20parts" className="btn-primary group mt-6">
            Ask about service
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {brands.map(([file, name]) => (
            <li key={file} className="grid h-20 place-items-center rounded-md bg-white px-4 sm:h-24">
              <Image
                src={`/images/logos/brands/${file}.png`}
                alt={name}
                width={300}
                height={120}
                className="max-h-10 w-auto object-contain mix-blend-multiply sm:max-h-12"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
