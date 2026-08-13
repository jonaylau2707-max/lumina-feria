import { cache } from "react";

import { demoBrands, demoCategories, demoProducts } from "@/lib/data/demo";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Brand, Category, Product, StoreData } from "@/types";

type ProductRow = Omit<Product, "brand" | "category"> & {
  brand: Brand | Brand[];
  category: Category | Category[];
};

function normalizeProduct(row: ProductRow): Product {
  return {
    ...row,
    regular_price:
      row.regular_price === null ? null : Number(row.regular_price),
    catalog_price:
      row.catalog_price === null ? null : Number(row.catalog_price),
    fair_price: row.fair_price === null ? null : Number(row.fair_price),
    brand: Array.isArray(row.brand) ? row.brand[0] : row.brand,
    category: Array.isArray(row.category) ? row.category[0] : row.category,
  };
}

export const getStoreData = cache(async (): Promise<StoreData> => {
  if (!hasSupabaseEnv()) {
    return {
      products: demoProducts,
      brands: demoBrands,
      categories: demoCategories,
      isDemo: true,
    };
  }

  const supabase = await createClient();
  const [productsResult, brandsResult, categoriesResult] = await Promise.all([
    supabase
      .from("products")
      .select("*, brand:brands(*), category:categories(*)")
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase.from("brands").select("*").eq("active", true).order("name"),
    supabase.from("categories").select("*").eq("active", true).order("name"),
  ]);

  if (productsResult.error || brandsResult.error || categoriesResult.error) {
    console.error("No fue posible cargar la tienda", {
      products: productsResult.error,
      brands: brandsResult.error,
      categories: categoriesResult.error,
    });
    throw new Error("No pudimos cargar los productos.");
  }

  return {
    products: (productsResult.data as ProductRow[]).map(normalizeProduct),
    brands: brandsResult.data as Brand[],
    categories: categoriesResult.data as Category[],
    isDemo: false,
  };
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { products } = await getStoreData();
  return products.find((product) => product.slug === slug) ?? null;
}
