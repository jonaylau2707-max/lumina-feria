import Image from "next/image";
import { Sparkles } from "lucide-react";

export function ProductImage({ src, alt, priority = false, className = "", artIndex = 0 }: { src: string | null; alt: string; priority?: boolean; className?: string; artIndex?: number }) {
  if (src) return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 50vw, 25vw" className={`bg-[#f6f1e7] object-contain p-3 ${className}`} />;
  return <div role="img" aria-label={`Presentación ilustrada de ${alt}`} className={`product-art product-art-${artIndex % 5} absolute inset-0 ${className}`}><Sparkles className="absolute left-1/2 top-1/2 z-10 size-12 -translate-x-1/2 -translate-y-1/2 text-white/80" strokeWidth={1.2} /></div>;
}