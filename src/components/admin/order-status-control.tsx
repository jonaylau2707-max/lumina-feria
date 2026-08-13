"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import type { OrderStatus } from "@/types";

export function OrderStatusControl({ orderId, initialStatus }: { orderId: string; initialStatus: OrderStatus }) {
  const router = useRouter(); const [status, setStatus] = useState(initialStatus); const [saving, setSaving] = useState(false);
  const save = async () => { if (status === "CANCELLED" && initialStatus !== "CANCELLED" && !window.confirm("¿Confirmas que deseas cancelar este pedido?")) { setStatus(initialStatus); return; } setSaving(true); const response = await fetch(`/api/admin/orders/${orderId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); setSaving(false); if (!response.ok) return toast.error("No pudimos cambiar el estado."); toast.success("Estado actualizado."); router.refresh(); };
  return <div className="flex flex-col gap-3 sm:flex-row"><select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)} className="select-field"><option value="NEW">Pedido nuevo</option><option value="CONFIRMED">Pedido confirmado</option><option value="CANCELLED">Pedido cancelado</option></select><button type="button" disabled={saving || status === initialStatus} onClick={save} className="button-primary shrink-0 disabled:opacity-45"><Save className="size-4" />{saving ? "Guardando…" : "Guardar estado"}</button></div>;
}
