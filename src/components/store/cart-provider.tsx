"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { calculateCartTotal } from "@/lib/utils/pricing";
import type { CartItem, Product } from "@/types";

interface CartContextValue {
  items: CartItem[]; count: number; total: number; hydrated: boolean; drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void; addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void; removeItem: (productId: string) => void; clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "lumina-feria-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { const stored = localStorage.getItem(storageKey); if (stored) setItems(JSON.parse(stored) as CartItem[]); } catch { localStorage.removeItem(storageKey); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(storageKey, JSON.stringify(items)); }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing ? current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item) : [...current, { product, quantity }];
    });
    toast.success(`${product.name} se agregó al carrito.`);
  }, []);
  const updateQuantity = useCallback((productId: string, quantity: number) => setItems((current) => quantity < 1 ? current.filter((item) => item.product.id !== productId) : current.map((item) => item.product.id === productId ? { ...item, quantity: Math.min(99, quantity) } : item)), []);
  const removeItem = useCallback((productId: string) => setItems((current) => current.filter((item) => item.product.id !== productId)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, count: items.reduce((sum, item) => sum + item.quantity, 0), total: calculateCartTotal(items), hydrated, drawerOpen, setDrawerOpen, addItem, updateQuantity, removeItem, clearCart }), [items, hydrated, drawerOpen, addItem, updateQuantity, removeItem, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe utilizarse dentro de CartProvider.");
  return context;
}
