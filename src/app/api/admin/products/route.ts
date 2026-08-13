import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  const admin = await getAdminUser(); if (!admin) return Response.json({ message: "No autorizado." }, { status: 403 });
  try { const input = productSchema.parse(await request.json()); const supabase = await createClient(); const { data, error } = await supabase.from("products").insert(input).select().single(); if (error) { console.error("Error creando producto", error); return Response.json({ message: error.code === "23505" ? "Ya existe un producto con ese slug." : "No pudimos guardar el producto." }, { status: 400 }); } return Response.json(data, { status: 201 }); } catch { return Response.json({ message: "Revisa los campos del producto." }, { status: 400 }); }
}
