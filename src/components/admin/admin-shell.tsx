"use client";

import Link from "next/link";
import { Boxes, FolderTree, LayoutDashboard, LogOut, Menu, PackageSearch, ShoppingBag, Tags, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";

const nav = [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }, { href: "/admin/orders", label: "Pedidos", icon: ShoppingBag }, { href: "/admin/products", label: "Productos", icon: PackageSearch }, { href: "/admin/categories", label: "Categorías", icon: FolderTree }, { href: "/admin/brands", label: "Marcas", icon: Tags }];

export function AdminShell({ children, name }: { children: React.ReactNode; name: string }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false);
  const signOut = async () => { const supabase = createClient(); await supabase.auth.signOut(); router.replace("/admin/login"); router.refresh(); };
  return <div className="min-h-screen bg-[#f1eee8]"><header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden"><Logo /><button type="button" onClick={() => setOpen(!open)} className="grid size-11 place-items-center" aria-label="Abrir menú">{open ? <X /> : <Menu />}</button></header><aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-secondary p-5 text-white transition lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between"><Logo inverse /><button type="button" onClick={() => setOpen(false)} className="lg:hidden"><X /></button></div><div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/8 p-3"><span className="grid size-10 place-items-center rounded-full bg-primary font-bold">{name.charAt(0).toUpperCase()}</span><div><p className="text-sm font-bold">{name}</p><p className="text-[.65rem] text-white/55">Administración</p></div></div><nav className="mt-8 grid gap-1">{nav.map((item) => { const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-white text-secondary" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><item.icon className="size-4" />{item.label}</Link>; })}</nav><div className="mt-auto"><Link href="/" className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 hover:text-white"><Boxes className="size-4" />Ver tienda</Link><button type="button" onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 hover:bg-white/10 hover:text-white"><LogOut className="size-4" />Cerrar sesión</button></div></aside>{open ? <button type="button" className="fixed inset-0 z-40 bg-black/35 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú" /> : null}<main className="min-h-screen lg:pl-72"><div className="mx-auto max-w-[1400px] p-4 py-7 md:p-8 lg:p-10">{children}</div></main></div>;
}
