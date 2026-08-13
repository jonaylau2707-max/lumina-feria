import type { Metadata } from "next";

import { CheckoutCart } from "@/components/store/checkout-cart";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Carrito", description: "Revisa tu selección y envía tu solicitud de pedido." };
export default function CartPage() { return <div className="container-page py-10 md:py-14"><CheckoutCart isDemo={!hasSupabaseEnv()} /></div>; }
