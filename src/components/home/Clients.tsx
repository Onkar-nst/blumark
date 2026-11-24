import Image from "next/image";

const clients = [
  ["tata-motors", "Tata Motors"],
  ["aditya-birla", "Aditya Birla Group"],
  ["bhel", "BHEL"],
  ["jindal", "Jindal Steel & Power"],
  ["apar", "APAR"],
  ["beml", "BEML"],
  ["heg", "HEG"],
  ["shyam-metalics", "Shyam Metalics"],
  ["kiocl", "KIOCL Limited"],
  ["rail-wheel-factory", "Rail Wheel Factory"],
  ["dae", "Department of Atomic Energy"],
] as const;

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {clients.map(([file, name]) => (
        <li key={file} className="grid h-24 w-44 shrink-0 place-items-center rounded-lg bg-white px-6 ring-1 ring-line sm:h-28 sm:w-52">
          <Image
            src={`/images/logos/clients/${file}.png`}
            alt={hidden ? "" : name}
            width={240}
            height={140}
            className="max-h-14 w-auto object-contain mix-blend-multiply sm:max-h-16"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-x flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <p className="eyebrow">Trusted by industry leaders</p>
        <p className="text-sm text-muted">
          Clients served by Blumark and our associate company, Jay Engineering Company (JEC)
        </p>
      </div>

      {/* Running carousel: the list is rendered twice and slides by half its width, so it loops seamlessly.
          It pauses on hover, and the global reduced-motion rule stops it for users who prefer less motion. */}
      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
