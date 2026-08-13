import { ProductAdminList } from "@/components/admin/product-admin-list";
import { getAdminCollections, getAdminProducts } from "@/lib/data/admin";

export default async function AdminProductsPage() { const [products, { brands, categories }] = await Promise.all([getAdminProducts(), getAdminCollections()]); return <ProductAdminList initialProducts={products} brands={brands} categories={categories} />; }
