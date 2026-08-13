import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { ProductImage } from "@/components/store/product-image";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/utils/pricing";
import type { Order } from "@/types";

export const metadata: Metadata = { title: "Pedido recibido", robots: { index: false, follow: false } };

async function getConfirmation(token: string): Promise<Order | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase.rpc("get_order_confirmation", { token });
  if (error || !data) { if (error) console.error("No fue posible cargar la confirmación", error); return null; }
  const row = data as unknown as Order;
  return { ...row, total: Number(row.total), order_items: row.order_items.map((item) => ({ ...item, unit_price: Number(item.unit_price), subtotal: Number(item.subtotal) })) };
}

export default async function OrderConfirmationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params; const order = await getConfirmation(token); if (!order) notFound();
  return <div className="container-page py-12 md:py-20"><div className="mx-auto max-w-3xl"><header className="text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-[#dff1e7] text-success"><Check className="size-9" /></span><p className="eyebrow mt-6 text-success">Solicitud enviada</p><h1 className="display mt-2 text-5xl font-bold md:text-7xl">¡Pedido recibido!</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">Tu solicitud fue enviada correctamente. Estamos revisando la disponibilidad de los productos y nos comunicaremos contigo pronto por WhatsApp.</p></header><div className="surface-card mt-10 overflow-hidden rounded-[2rem]"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-[#ebe5da] p-6 md:p-8"><div><p className="text-xs font-bold uppercase tracking-wider text-muted">Número de pedido</p><p className="display text-3xl font-bold">{order.order_number}</p></div><OrderStatusBadge status={order.status} /></div><div className="grid gap-6 p-6 md:grid-cols-2 md:p-8"><div><p className="field-label text-muted">Cliente</p><p className="font-bold">{order.first_name} {order.last_name}</p></div><div><p className="field-label text-muted">WhatsApp</p><p className="font-bold">{order.phone}</p></div></div><div className="border-t border-border p-6 md:p-8"><h2 className="display mb-5 text-2xl font-bold">Productos solicitados</h2><div className="space-y-4">{order.order_items.map((item, index) => <div className="grid grid-cols-[64px_1fr_auto] items-center gap-3" key={item.id}><div className="relative aspect-square overflow-hidden rounded-xl"><ProductImage src={item.product_image_url} alt="" artIndex={index} /></div><div><p className="font-bold">{item.product_name}</p><p className="text-xs text-muted">{item.quantity} × {formatMoney(item.unit_price)}</p></div><strong className="text-sm">{formatMoney(item.subtotal)}</strong></div>)}</div><div className="mt-6 flex items-center justify-between border-t border-border pt-5"><span className="text-sm text-muted">Total estimado</span><strong className="display text-3xl">{formatMoney(order.total)}</strong></div></div></div><div className="mt-5 flex gap-3 rounded-2xl border border-[#ead7a8] bg-[#fff6dc] p-4 text-sm leading-6 text-[#71551e]"><Info className="mt-1 size-5 shrink-0" /><p><strong>Importante:</strong> el pedido está sujeto a confirmación de disponibilidad. Aún no se ha realizado ningún cobro.</p></div><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/products" className="button-primary">Seguir comprando</Link><span className="inline-flex items-center gap-2 px-4 text-sm font-bold text-muted"><MessageCircle className="size-4" />Te contactaremos pronto</span></div></div></div>;
}
