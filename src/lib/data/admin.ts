import { demoOrders, demoProducts } from "@/lib/data/demo";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Brand, Category, Order, Product } from "@/types";

type OrderRow = Omit<Order, "total" | "order_items"> & {
  total: number | string;
  order_items: Array<
    Omit<Order["order_items"][number], "unit_price" | "subtotal"> & {
      unit_price: number | string;
      subtotal: number | string;
    }
  >;
};

function normalizeOrder(order: OrderRow): Order {
  return {
    ...order,
    total: Number(order.total),
    order_items: order.order_items.map((item) => ({
      ...item,
      unit_price: Number(item.unit_price),
      subtotal: Number(item.subtotal),
    })),
  };
}

export async function getAdminOrders(): Promise<Order[]> {
  if (!hasSupabaseEnv()) return demoOrders;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("No fue posible cargar pedidos", error);
    throw new Error("No pudimos cargar los pedidos.");
  }

  return (data as OrderRow[]).map(normalizeOrder);
}

export async function getAdminOrder(id: string): Promise<Order | null> {
  const orders = await getAdminOrders();
  return orders.find((order) => order.id === id) ?? null;
}

export async function getAdminProducts(): Promise<Product[]> {
  if (!hasSupabaseEnv()) return demoProducts;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, brand:brands(*), category:categories(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("No fue posible cargar productos", error);
    throw new Error("No pudimos cargar los productos.");
  }

  return (data as Product[]).map((product) => ({
    ...product,
    regular_price:
      product.regular_price === null ? null : Number(product.regular_price),
    catalog_price:
      product.catalog_price === null ? null : Number(product.catalog_price),
    fair_price:
      product.fair_price === null ? null : Number(product.fair_price),
  }));
}

export async function getAdminCollections(): Promise<{ brands: Brand[]; categories: Category[] }> {
  if (!hasSupabaseEnv()) {
    const { demoBrands, demoCategories } = await import("@/lib/data/demo");
    return { brands: demoBrands, categories: demoCategories };
  }
  const supabase = await createClient();
  const [brandsResult, categoriesResult] = await Promise.all([
    supabase.from("brands").select("*").order("name"),
    supabase.from("categories").select("*").order("name"),
  ]);
  if (brandsResult.error || categoriesResult.error) throw new Error("No pudimos cargar marcas y categorías.");
  return { brands: brandsResult.data as Brand[], categories: categoriesResult.data as Category[] };
}
