"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/store/cart-provider";
import { QuantitySelector } from "@/components/store/quantity-selector";
import type { Product } from "@/types";

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, setDrawerOpen } = useCart();
  const add = () => { addItem(product, quantity); setDrawerOpen(true); };
  return <div className="flex flex-col gap-3 sm:flex-row"><QuantitySelector value={quantity} onChange={setQuantity} /><button type="button" onClick={add} className="button-primary flex-1"><ShoppingBag className="size-5" />Agregar {quantity > 1 ? `${quantity} unidades` : "al carrito"}</button></div>;
}
