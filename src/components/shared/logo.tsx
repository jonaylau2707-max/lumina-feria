import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`focus-ring inline-flex items-center gap-2 rounded-md ${inverse ? "text-white" : "text-secondary"}`} aria-label="Lúmina Feria, ir al inicio">
      <span className={`grid size-9 place-items-center rounded-full border ${inverse ? "border-white/50" : "border-secondary/40"}`} aria-hidden="true">✦</span>
      <span className="leading-none"><span className="display block text-[1.65rem] font-bold tracking-tight">Lúmina</span><span className="block text-[.55rem] font-extrabold uppercase tracking-[.3em]">Feria</span></span>
    </Link>
  );
}
