import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { getAdminCollections, getAdminProducts } from "@/lib/data/admin";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const [products, { brands, categories }] = await Promise.all([getAdminProducts(), getAdminCollections()]); const product = products.find((item) => item.id === id); if (!product) notFound(); return <ProductForm product={product} brands={brands} categories={categories} />; }
