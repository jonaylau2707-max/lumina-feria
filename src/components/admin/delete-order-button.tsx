"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DeleteOrderButtonProps = {
  orderId: string;
  orderNumber: string;
  onDeleted?: () => void;
  redirectToList?: boolean;
  variant?: "icon" | "button";
};

export function DeleteOrderButton({
  orderId,
  orderNumber,
  onDeleted,
  redirectToList = false,
  variant = "icon",
}: DeleteOrderButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    const confirmed = window.confirm(
      `¿Eliminar definitivamente el pedido ${orderNumber}? También se eliminará su detalle de productos. Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? "No pudimos eliminar el pedido.");
        return;
      }

      toast.success(`Pedido ${orderNumber} eliminado.`);
      onDeleted?.();

      if (redirectToList) {
        router.replace("/admin/orders");
      } else {
        router.refresh();
      }
    } catch {
      toast.error("No pudimos conectar con el servidor.");
    } finally {
      setDeleting(false);
    }
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={remove}
        disabled={deleting}
        className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-destructive px-4 text-sm font-bold text-destructive transition hover:bg-destructive hover:text-white disabled:cursor-wait disabled:opacity-50"
      >
        <Trash2 className="size-4" />
        {deleting ? "Eliminando…" : "Eliminar pedido"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={deleting}
      className="focus-ring grid size-10 place-items-center rounded-xl text-muted transition hover:bg-red-50 hover:text-destructive disabled:cursor-wait disabled:opacity-50"
      aria-label={`Eliminar pedido ${orderNumber}`}
      title={`Eliminar pedido ${orderNumber}`}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
