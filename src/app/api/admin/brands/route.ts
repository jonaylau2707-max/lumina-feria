import { revalidateCatalog } from "@/lib/cache/catalog";
import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { brandSchema } from "@/lib/validations/admin";

export async function POST(request: Request) { if (!await getAdminUser()) return Response.json({ message: "No autorizado." }, { status: 403 }); try { const input = brandSchema.parse(await request.json()); const supabase = await createClient(); const { data, error } = await supabase.from("brands").insert(input).select().single(); if (error) return Response.json({ message: error.code === "23505" ? "Ya existe una marca con ese slug." : "No pudimos guardar la marca." }, { status: 400 }); revalidateCatalog(); return Response.json(data, { status: 201 }); } catch { return Response.json({ message: "Revisa los datos de la marca." }, { status: 400 }); } }
