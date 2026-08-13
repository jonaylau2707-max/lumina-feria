import { CollectionManager } from "@/components/admin/collection-manager";
import { getAdminCollections } from "@/lib/data/admin";

export default async function AdminCategoriesPage() { const { categories } = await getAdminCollections(); return <CollectionManager type="categories" initialItems={categories} />; }
