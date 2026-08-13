import type { MetadataRoute } from "next";

import { getStoreData } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; const { products } = await getStoreData();
  return [{ url: base, changeFrequency: "weekly", priority: 1 }, { url: `${base}/products`, changeFrequency: "daily", priority: .9 }, ...products.map((product) => ({ url: `${base}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: .7 }))];
}
