"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validations/admin";

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const submit = async (values: LoginInput) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      const response = await fetch("/api/admin/session");
      if (!response.ok) { await supabase.auth.signOut(); throw new Error("Esta cuenta no tiene acceso administrativo."); }
      router.replace("/admin"); router.refresh();
    } catch (error) { toast.error(error instanceof Error && error.message.includes("administrativo") ? error.message : "Correo o contraseña incorrectos."); }
  };
  return <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-4"><label><span className="field-label">Correo electrónico</span><span className="relative block"><Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /><input type="email" autoComplete="email" className="field pl-11" {...register("email")} /></span>{errors.email ? <p className="field-error">{errors.email.message}</p> : null}</label><label><span className="field-label">Contraseña</span><span className="relative block"><LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /><input type="password" autoComplete="current-password" className="field pl-11" {...register("password")} /></span>{errors.password ? <p className="field-error">{errors.password.message}</p> : null}</label>{!configured ? <div className="rounded-xl bg-[#fff3d5] p-3 text-xs leading-5 text-[#74551c]">Supabase aún no está configurado. Completa las variables de entorno para iniciar sesión.</div> : null}<button type="submit" disabled={!configured || isSubmitting} className="button-secondary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Iniciando sesión…" : "Entrar al panel"}</button></form>;
}
