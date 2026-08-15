"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { DeleteOrderButton } from "@/components/admin/delete-order-button";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { formatMoney } from "@/lib/utils/pricing";
import type { Order, OrderStatus } from "@/types";

const filters: Array<{ value: "ALL" | OrderStatus; label: string }> = [
  { value: "ALL", label: "Todos" },
  { value: "NEW", label: "Nuevos" },
  { value: "CONFIRMED", label: "Confirmados" },
  { value: "CANCELLED", label: "Cancelados" },
];

export function OrdersAdminList({ orders }: { orders: Order[] }) {
  const [items, setItems] = useState(orders);
  const [status, setStatus] = useState<"ALL" | OrderStatus>("ALL");
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      items.filter(
        (order) =>
          (status === "ALL" || order.status === status) &&
          (!search ||
            `${order.order_number} ${order.first_name} ${order.last_name} ${order.phone}`
              .toLowerCase()
              .includes(search.toLowerCase())),
      ),
    [items, status, search],
  );

  return (
    <>
      <header className="mb-7">
        <p className="eyebrow text-primary">Solicitudes</p>
        <h1 className="display mt-2 text-4xl font-bold md:text-5xl">
          Pedidos
        </h1>
        <p className="mt-2 text-sm text-muted">
          Revisa disponibilidad, contacta al cliente o elimina solicitudes que
          ya no necesites.
        </p>
      </header>

      <div className="mb-5 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.value}
                onClick={() => setStatus(filter.value)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold ${status === filter.value ? "bg-secondary text-white" : "border border-border"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="relative block md:w-80">
            <span className="sr-only">Buscar pedido</span>
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              className="field pl-11"
              placeholder="Número, cliente o teléfono…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="hidden grid-cols-[1fr_1.3fr_1fr_.9fr_.8fr_3rem] gap-3 border-b border-border bg-[#ebe6dc] px-5 py-3 text-[.64rem] font-extrabold uppercase tracking-wider text-muted md:grid">
          <span>Pedido</span>
          <span>Cliente</span>
          <span>WhatsApp</span>
          <span>Total</span>
          <span>Estado</span>
          <span className="sr-only">Acciones</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((order) => (
            <article
              key={order.id}
              className={`relative transition hover:bg-[#f7f3ed] ${order.status === "NEW" ? "border-l-4 border-l-warning" : ""}`}
            >
              <Link
                href={`/admin/orders/${order.id}`}
                className="grid gap-2 p-5 pr-16 md:grid-cols-[1fr_1.3fr_1fr_.9fr_.8fr_3rem] md:items-center"
              >
                <div>
                  <strong className="text-sm">{order.order_number}</strong>
                  <p className="text-[.65rem] text-muted">
                    {new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(order.created_at))}
                  </p>
                </div>
                <span className="text-sm">
                  {order.first_name} {order.last_name}
                </span>
                <span className="text-xs text-muted">{order.phone}</span>
                <strong className="text-sm">{formatMoney(order.total)}</strong>
                <OrderStatusBadge status={order.status} />
                <span className="hidden md:block" aria-hidden="true" />
              </Link>
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <DeleteOrderButton
                  orderId={order.id}
                  orderNumber={order.order_number}
                  onDeleted={() =>
                    setItems((current) =>
                      current.filter((item) => item.id !== order.id),
                    )
                  }
                />
              </div>
            </article>
          ))}
          {!filtered.length ? (
            <div className="p-16 text-center text-sm text-muted">
              No hay pedidos que coincidan con esta búsqueda.
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
