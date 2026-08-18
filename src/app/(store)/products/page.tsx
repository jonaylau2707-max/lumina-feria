import type { Metadata } from "next";
import { Suspense } from "react";

import { Catalog } from "@/components/store/catalog";
import { getStoreData } from "@/lib/data/store";

export const metadata: Metadata = { title: "Productos", description: "Explora productos de Yanbal, Esika, L'Bel y Cyzone, Fuller, Samy Cosmetics y Natura en ESENCIAS VIP." };

export default async function ProductsPage() {
  const { products, brands, categories } = await getStoreData();
  return <div className="container-page py-12 md:py-16"><header className="mb-10 max-w-3xl"><p className="eyebrow text-primary">Toda la selección</p><h1 className="display mt-2 text-5xl font-bold md:text-7xl">Encuentra algo especial</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted">Busca por nombre, explora categorías o filtra productos de Yanbal, Esika, L'Bel y Cyzone, Fuller, Samy Cosmetics y Natura.</p></header><Suspense fallback={<div className="h-96 animate-pulse rounded-[2rem] bg-[#e8e2d8]" />}><Catalog products={products} brands={brands} categories={categories} /></Suspense></div>;
}
