import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { orderStatusSchema } from "@/lib/validations/admin";

type OrderRouteContext = { params: Promise<{ id: string }> };

export async function PATCH(
  request: Request,
  { params }: OrderRouteContext,
) {
  if (!(await getAdminUser())) {
    return Response.json({ message: "No autorizado." }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { status } = orderStatusSchema.parse(await request.json());
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error actualizando pedido", error);
      return Response.json(
        { message: "No pudimos cambiar el estado." },
        { status: 400 },
      );
    }

    return Response.json(data);
  } catch {
    return Response.json({ message: "Estado inválido." }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: OrderRouteContext,
) {
  if (!(await getAdminUser())) {
    return Response.json({ message: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Error eliminando pedido", error);
    return Response.json(
      { message: "No pudimos eliminar el pedido." },
      { status: 400 },
    );
  }

  if (!data) {
    return Response.json(
      { message: "El pedido no existe o ya fue eliminado." },
      { status: 404 },
    );
  }

  return Response.json({ deleted: true });
}
