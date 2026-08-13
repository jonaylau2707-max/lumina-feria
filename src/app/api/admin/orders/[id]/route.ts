import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { orderStatusSchema } from "@/lib/validations/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!await getAdminUser()) return Response.json({ message: "No autorizado." }, { status: 403 }); try { const { id } = await params; const { status } = orderStatusSchema.parse(await request.json()); const supabase = await createClient(); const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select().single(); if (error) { console.error("Error actualizando pedido", error); return Response.json({ message: "No pudimos cambiar el estado." }, { status: 400 }); } return Response.json(data); } catch { return Response.json({ message: "Estado inválido." }, { status: 400 }); } }
