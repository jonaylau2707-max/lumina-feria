"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCart } from "@/components/store/cart-provider";
import { ProductImage } from "@/components/store/product-image";
import { QuantitySelector } from "@/components/store/quantity-selector";
import { formatMoney, getProductSellingPrice } from "@/lib/utils/pricing";
import {
  checkoutContactSchema,
  checkoutSchema,
  type CheckoutContactInput,
} from "@/lib/validations/order";

export function CheckoutCart({ isDemo }: { isDemo: boolean }) {
  const router = useRouter(); const { items, total, hydrated, updateQuantity, removeItem, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutContactInput>({ resolver: zodResolver(checkoutContactSchema), defaultValues: { firstName: "", lastName: "", phone: "", notes: "" } });
  const submit = async (data: CheckoutContactInput) => {
    try {
      const payload = checkoutSchema.parse({ ...data, items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })) });
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { token?: string; message?: string };
      if (!response.ok || !result.token) throw new Error(result.message ?? "No fue posible enviar tu pedido.");
      clearCart(); router.push(`/order-confirmation/${result.token}`);
    } catch (error) { toast.error(error instanceof Error ? error.message : "No fue posible enviar tu pedido. Intenta nuevamente."); }
  };
  if (!hydrated) return <div className="h-96 animate-pulse rounded-[2rem] bg-[#e7e1d6]" />;
  if (!items.length) return <div className="surface-card rounded-[2rem] px-6 py-20 text-center"><ShoppingBag className="mx-auto size-12 text-muted" /><h1 className="display mt-5 text-4xl font-bold">Tu carrito está vacío</h1><p className="mt-2 text-sm text-muted">Explora la feria y agrega tus favoritos para comenzar.</p><Link href="/products" className="button-primary mt-6">Explorar productos</Link></div>;
  return <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><section><Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary"><ArrowLeft className="size-4" />Seguir explorando</Link><h1 className="display text-5xl font-bold">Revisa tu selección</h1><p className="mt-2 text-sm text-muted">Puedes ajustar cantidades antes de enviar la solicitud.</p><div className="mt-8 space-y-4">{items.map((item, index) => <article key={item.product.id} className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-border bg-surface p-3 md:grid-cols-[112px_1fr]"><div className="relative aspect-square overflow-hidden rounded-xl"><ProductImage src={item.product.image_url} alt="" artIndex={index} /></div><div className="flex min-w-0 flex-col"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-muted">{item.product.brand.name}</p><h2 className="display text-xl font-bold md:text-2xl">{item.product.name}</h2></div><button type="button" onClick={() => removeItem(item.product.id)} className="focus-ring rounded-lg p-2 text-muted hover:text-destructive" aria-label={`Eliminar ${item.product.name}`}><Trash2 className="size-4" /></button></div><div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4"><QuantitySelector value={item.quantity} onChange={(quantity) => updateQuantity(item.product.id, quantity)} /><strong>{formatMoney(getProductSellingPrice(item.product) * item.quantity)}</strong></div></div></article>)}</div></section><aside className="lg:sticky lg:top-28 lg:self-start"><div className="surface-card rounded-[2rem] p-6 md:p-8"><p className="eyebrow text-primary">Datos de contacto</p><h2 className="display mt-2 text-3xl font-bold">¿Con quién hablamos?</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><label><span className="field-label">Nombre *</span><input className="field" autoComplete="given-name" {...register("firstName")} />{errors.firstName ? <p className="field-error">{errors.firstName.message}</p> : null}</label><label><span className="field-label">Apellido *</span><input className="field" autoComplete="family-name" {...register("lastName")} />{errors.lastName ? <p className="field-error">{errors.lastName.message}</p> : null}</label><label className="sm:col-span-2"><span className="field-label">WhatsApp / teléfono *</span><input className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ej. 300 123 4567" {...register("phone")} />{errors.phone ? <p className="field-error">{errors.phone.message}</p> : null}</label><label className="sm:col-span-2"><span className="field-label">Observaciones <span className="font-normal text-muted">(opcional)</span></span><textarea className="textarea-field" placeholder="Color, horario preferido de contacto…" {...register("notes")} />{errors.notes ? <p className="field-error">{errors.notes.message}</p> : null}</label></div><div className="my-6 border-y border-border py-5"><div className="flex items-center justify-between"><span className="text-sm text-muted">Total estimado</span><strong className="display text-3xl">{formatMoney(total)}</strong></div></div><div className="mb-5 flex gap-3 rounded-xl bg-[#fff5da] p-3 text-xs leading-5 text-[#71551e]"><Info className="mt-0.5 size-4 shrink-0" /><p>El pedido está sujeto a confirmación de disponibilidad. No realizas ningún pago ahora.</p></div>{isDemo ? <div className="mb-4 rounded-xl bg-[#f3e7e2] p-3 text-xs leading-5 text-primary-dark"><strong>Modo demostración.</strong> Configura Supabase para habilitar el envío real.</div> : null}<button type="submit" disabled={isSubmitting || isDemo} className="button-secondary w-full disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Enviando pedido…" : "Enviar pedido"}<ArrowRight className="size-4" /></button></div></aside></form>;
}
