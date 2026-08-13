"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { CartDrawer } from "@/components/store/cart-drawer";
import { useCart } from "@/components/store/cart-provider";

const links = [{ href: "/", label: "Inicio" }, { href: "/products", label: "Productos" }, { href: "/#categories", label: "Categorías" }];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setDrawerOpen, hydrated } = useCart();
  return (
    <><div className="bg-secondary px-4 py-2 text-center text-[.68rem] font-bold tracking-wide text-white">FERIA ACTIVA · Solicita hoy y confirmamos disponibilidad por WhatsApp</div><header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl"><div className="container-page flex h-[76px] items-center justify-between gap-5"><Logo /><nav aria-label="Navegación principal" className="hidden items-center gap-7 text-sm font-bold md:flex">{links.map((link) => <Link className="focus-ring rounded transition hover:text-primary" href={link.href} key={link.href}>{link.label}</Link>)}</nav><div className="flex items-center gap-1"><Link href="/products" className="focus-ring grid size-11 place-items-center rounded-full transition hover:bg-[#ebe6dc]" aria-label="Buscar productos"><Search className="size-5" /></Link><button type="button" className="focus-ring relative grid size-11 place-items-center rounded-full transition hover:bg-[#ebe6dc]" onClick={() => setDrawerOpen(true)} aria-label={`Abrir carrito, ${hydrated ? count : 0} artículos`}><ShoppingBag className="size-5" />{hydrated && count > 0 ? <span className="absolute right-0 top-0 grid min-h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[.62rem] font-bold text-white">{count}</span> : null}</button><button type="button" onClick={() => setMenuOpen((open) => !open)} className="focus-ring grid size-11 place-items-center rounded-full md:hidden" aria-expanded={menuOpen} aria-label="Abrir menú">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button></div></div>{menuOpen ? <nav className="container-page grid gap-1 border-t border-border py-3 md:hidden" aria-label="Navegación móvil">{links.map((link) => <Link href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 font-bold hover:bg-[#ebe6dc]" key={link.href}>{link.label}</Link>)}</nav> : null}</header><CartDrawer /></>
  );
}
