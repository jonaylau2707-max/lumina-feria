import { ProductForm } from "@/components/admin/product-form";
import { getAdminCollections } from "@/lib/data/admin";

export default async function NewProductPage() { const { brands, categories } = await getAdminCollections(); return <ProductForm brands={brands} categories={categories} />; }
