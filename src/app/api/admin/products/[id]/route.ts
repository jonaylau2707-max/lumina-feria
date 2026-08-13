import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(); if (!admin) return Response.json({ message: "No autorizado." }, { status: 403 });
  try { const { id } = await params; const input = productSchema.parse(await request.json()); const supabase = await createClient(); const { data, error } = await supabase.from("products").update(input).eq("id", id).select().single(); if (error) { console.error("Error actualizando producto", error); return Response.json({ message: error.code === "23505" ? "Ya existe un producto con ese slug." : "No pudimos guardar los cambios." }, { status: 400 }); } return Response.json(data); } catch { return Response.json({ message: "Revisa los campos del producto." }, { status: 400 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(); if (!admin) return Response.json({ message: "No autorizado." }, { status: 403 });
  const { id } = await params; const supabase = await createClient(); const { count, error: countError } = await supabase.from("order_items").select("id", { count: "exact", head: true }).eq("product_id", id); if (countError) return Response.json({ message: "No pudimos verificar el historial." }, { status: 400 });
  if ((count ?? 0) > 0) { const { error } = await supabase.from("products").update({ active: false }).eq("id", id); return error ? Response.json({ message: "No pudimos desactivar el producto." }, { status: 400 }) : Response.json({ deactivated: true }); }
  const { error } = await supabase.from("products").delete().eq("id", id); return error ? Response.json({ message: "No pudimos eliminar el producto." }, { status: 400 }) : Response.json({ deleted: true });
}
