import { getAdminUser } from "@/lib/supabase/auth";

export async function GET() {
  const admin = await getAdminUser();
  return admin ? Response.json({ ok: true }) : Response.json({ message: "No autorizado." }, { status: 403 });
}
