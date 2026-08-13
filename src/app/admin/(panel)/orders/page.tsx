import { OrdersAdminList } from "@/components/admin/orders-admin-list";
import { getAdminOrders } from "@/lib/data/admin";

export default async function AdminOrdersPage() { const orders = await getAdminOrders(); return <OrdersAdminList orders={orders} />; }
