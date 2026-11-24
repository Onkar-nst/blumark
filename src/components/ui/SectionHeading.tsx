export default function SectionHeading({
  eyebrow,
  title,
  sub,
  text,
  align = "left",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Second half of the heading, shown in a lighter shade. */
  sub?: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <p className={light ? "eyebrow !text-white/60" : "eyebrow"}>{eyebrow}</p>
      )}
      <h2
        className={`mt-4 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
        {sub && <span className={light ? " text-white/45" : " text-ink/35"}> {sub}</span>}
      </h2>
      {text && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/65" : "text-muted"}`}>{text}</p>
      )}
    </div>
  );
}
