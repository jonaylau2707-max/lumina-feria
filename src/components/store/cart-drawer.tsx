"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";

import { useCart } from "@/components/store/cart-provider";
import { ProductImage } from "@/components/store/product-image";
import { QuantitySelector } from "@/components/store/quantity-selector";
import { formatMoney, getProductSellingPrice } from "@/lib/utils/pricing";

export function CartDrawer() {
  const { items, count, total, drawerOpen, setDrawerOpen, updateQuantity, removeItem } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
      <button type="button" aria-label="Cerrar carrito" onClick={() => setDrawerOpen(false)} className={`absolute inset-0 bg-black/35 backdrop-blur-[2px] transition ${drawerOpen ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className={`absolute bottom-0 right-0 flex max-h-[92vh] w-full flex-col rounded-t-[2rem] bg-background shadow-2xl transition duration-300 md:bottom-auto md:top-0 md:h-full md:max-h-none md:max-w-md md:rounded-none ${drawerOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"}`}>
        <div className="flex items-center justify-between border-b border-border px-5 py-5"><div><p className="eyebrow text-primary">Tu selección</p><h2 id="cart-title" className="display text-3xl font-bold">Carrito <span className="text-base text-muted">({count})</span></h2></div><button type="button" className="focus-ring grid size-11 place-items-center rounded-full border border-border" onClick={() => setDrawerOpen(false)} aria-label="Cerrar"><X className="size-5" /></button></div>
        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[#eee8dc]"><ShoppingBag className="size-7 text-primary" /></span><h3 className="display text-2xl font-bold">Tu carrito espera hallazgos</h3><p className="mt-2 text-sm leading-6 text-muted">Explora la feria y guarda aquí todo lo que te guste.</p><Link href="/products" onClick={() => setDrawerOpen(false)} className="button-primary mt-5">Ver productos</Link></div></div>
        ) : (
          <><div className="flex-1 space-y-5 overflow-y-auto p-5">{items.map((item, index) => <div key={item.product.id} className="grid grid-cols-[74px_1fr] gap-3"><div className="relative aspect-square overflow-hidden rounded-xl"><ProductImage src={item.product.image_url} alt="" artIndex={index} /></div><div><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-bold text-muted">{item.product.brand.name}</p><p className="display text-lg font-bold leading-tight">{item.product.name}</p></div><button type="button" onClick={() => removeItem(item.product.id)} className="focus-ring rounded p-1 text-muted hover:text-destructive" aria-label={`Eliminar ${item.product.name}`}><Trash2 className="size-4" /></button></div><div className="mt-3 flex items-center justify-between gap-2"><QuantitySelector value={item.quantity} onChange={(quantity) => updateQuantity(item.product.id, quantity)} /><strong className="text-sm">{formatMoney(getProductSellingPrice(item.product) * item.quantity)}</strong></div></div></div>)}</div><div className="border-t border-border bg-surface p-5"><div className="mb-1 flex items-center justify-between"><span className="text-sm text-muted">Total estimado</span><strong className="display text-2xl">{formatMoney(total)}</strong></div><p className="mb-4 text-xs leading-5 text-muted">La disponibilidad se confirmará después de recibir tu solicitud.</p><Link href="/cart" onClick={() => setDrawerOpen(false)} className="button-secondary w-full">Revisar y enviar <ArrowRight className="size-4" /></Link></div></>
        )}
      </aside>
    </div>
  );
}
