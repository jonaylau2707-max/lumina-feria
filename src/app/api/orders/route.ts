import { checkoutSchema } from "@/lib/validations/order";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/server";

const requests = new Map<string, number[]>();
const limitWindow = 10 * 60 * 1000;
const maxRequests = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((time) => now - time < limitWindow);
  if (recent.length >= maxRequests) return true;
  requests.set(ip, [...recent, now]);
  return false;
}

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return Response.json({ message: "La tienda aún no está conectada para recibir pedidos." }, { status: 503 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 25_000) {
    return Response.json({ message: "La solicitud es demasiado grande." }, { status: 413 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return Response.json({ message: "Has enviado varias solicitudes. Espera unos minutos e intenta de nuevo." }, { status: 429 });

  try {
    const input = checkoutSchema.parse(await request.json());
    const supabase = createPublicClient();
    const { data, error } = await supabase.rpc("create_order", {
      customer_first_name: input.firstName,
      customer_last_name: input.lastName,
      customer_phone: input.phone,
      customer_notes: input.notes,
      cart_items: input.items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
    });
    if (error) {
      console.error("No fue posible crear el pedido", error);
      return Response.json({ message: "No fue posible enviar tu pedido. Revisa los productos e intenta nuevamente." }, { status: 400 });
    }
    const result = (data as Array<{ order_id: string; order_token: string; created_order_number: string }> | null)?.[0];
    if (!result) throw new Error("La operación no devolvió un pedido.");
    return Response.json({ token: result.order_token, orderNumber: result.created_order_number }, { status: 201 });
  } catch (error) {
    console.error("Solicitud de pedido inválida", error);
    return Response.json({ message: "Revisa tus datos y vuelve a intentarlo." }, { status: 400 });
  }
}
