"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/store/cart-provider";
import type { Product } from "@/types";

export function AddToCartButton({ product, quantity = 1, compact = false }: { product: Product; quantity?: number; compact?: boolean }) {
  const { addItem } = useCart();
  return <button type="button" onClick={() => addItem(product, quantity)} className={`button-primary focus-ring ${compact ? "min-h-10! px-3! text-xs" : "w-full"}`}><ShoppingBag className="size-4" />Agregar</button>;
}
