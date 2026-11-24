import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Blumark Industries — Home" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/images/site/logo-mark.webp" alt="" width={36} height={38} />
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-wide ${light ? "text-white" : "text-ink"}`}>
          BLUMARK
        </span>
        <span className={`mt-0.5 block text-[10px] font-semibold tracking-[0.3em] ${light ? "text-white/60" : "text-muted"}`}>
          INDUSTRIES
        </span>
      </span>
    </Link>
  );
}
