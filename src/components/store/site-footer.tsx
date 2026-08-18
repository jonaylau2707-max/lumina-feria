import Link from "next/link";

import { Logo } from "@/components/shared/logo";

export function SiteFooter() {
  return <footer className="mt-24 bg-secondary text-white"><div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]"><div><Logo inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-white/70">Una feria digital de objetos bonitos, cuidado y detalles para regalar. Tú eliges; nosotros verificamos disponibilidad y te acompañamos.</p></div><div><p className="eyebrow mb-4 text-accent">Explora</p><div className="grid gap-3 text-sm text-white/80"><Link href="/products">Todos los productos</Link><Link href="/products?sort=price-asc">Precios bajos primero</Link><Link href="/cart">Tu carrito</Link></div></div><div><p className="eyebrow mb-4 text-accent">Importante</p><p className="text-sm leading-6 text-white/70">Los pedidos son solicitudes sujetas a confirmación de disponibilidad. No realizamos cobros en este sitio.</p></div></div><div className="border-t border-white/10 py-5 text-center text-xs text-white/55">© {new Date().getFullYear()} ESENCIAS VIP · Hecho con cuidado en Colombia</div></footer>;
}
