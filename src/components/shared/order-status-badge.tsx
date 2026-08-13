import type { OrderStatus } from "@/types";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  NEW: { label: "Pedido nuevo", className: "bg-[#fff0ca] text-[#855a0e]" },
  CONFIRMED: { label: "Pedido confirmado", className: "bg-[#dff1e7] text-success" },
  CANCELLED: { label: "Pedido cancelado", className: "bg-[#fae1df] text-destructive" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return <span className={`inline-flex rounded-full px-3 py-1 text-[.68rem] font-extrabold ${config.className}`}>{config.label}</span>;
}
