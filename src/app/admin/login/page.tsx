import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/shared/logo";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getAdminUser } from "@/lib/supabase/auth";

export const metadata: Metadata = { title: "Acceso administrativo", robots: { index: false, follow: false } };
export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return <main className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]"><section className="flex flex-col bg-surface p-6 md:p-12"><Logo /><div className="mx-auto my-auto w-full max-w-md py-12"><p className="eyebrow text-primary">Acceso privado</p><h1 className="display mt-3 text-5xl font-bold">Bienvenida de nuevo</h1><p className="mt-3 text-sm leading-6 text-muted">Gestiona productos, marcas y solicitudes desde un solo lugar.</p><LoginForm configured={hasSupabaseEnv()} /><Link href="/" className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-muted"><ArrowLeft className="size-4" />Volver a la tienda</Link></div></section><section className="product-art product-art-1 relative hidden overflow-hidden lg:block"><div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-secondary/90 via-transparent to-transparent p-14 text-white"><div className="max-w-lg"><ShieldCheck className="mb-5 size-10 text-accent" /><h2 className="display text-5xl font-bold leading-none">Tu feria, organizada y siempre a la mano.</h2><p className="mt-4 text-sm leading-6 text-white/70">El acceso y cada acción sensible se validan también en el servidor.</p></div></div></section></main>;
}
