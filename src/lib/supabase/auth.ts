import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("admin_profiles").select("id, full_name").eq("id", user.id).maybeSingle();
  return profile ? { user, profile: profile as { id: string; full_name: string } } : null;
}

export async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  return admin;
}
