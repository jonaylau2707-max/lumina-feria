import { CollectionManager } from "@/components/admin/collection-manager";
import { getAdminCollections } from "@/lib/data/admin";

export default async function AdminBrandsPage() { const { brands } = await getAdminCollections(); return <CollectionManager type="brands" initialItems={brands} />; }
