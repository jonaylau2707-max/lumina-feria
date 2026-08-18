"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProductImage } from "@/components/store/product-image";
import { createClient } from "@/lib/supabase/client";
import { toSlug } from "@/lib/utils/slug";
import { productSchema } from "@/lib/validations/admin";
import type { Brand, Category, Product } from "@/types";

type ProductInput = z.infer<typeof productSchema>;

const priceFormatter = new Intl.NumberFormat("es-CO");

function formatPriceInput(value: number | null | undefined) {
  return value ? priceFormatter.format(value) : "";
}

function parsePriceInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

export function ProductForm({ product, brands, categories }: { product?: Product; brands: Brand[]; categories: Category[] }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.image_url ?? null);
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<ProductInput>({ resolver: zodResolver(productSchema), defaultValues: { name: product?.name ?? "", slug: product?.slug ?? "", description: product?.description ?? "", image_url: product?.image_url ?? "", brand_id: product?.brand_id ?? brands.find((item) => item.active)?.id ?? "", category_id: product?.category_id ?? categories.find((item) => item.active)?.id ?? "", pricing_type: product?.pricing_type ?? "FIXED", regular_price: product?.regular_price ?? null, catalog_price: product?.catalog_price ?? null, fair_price: product?.fair_price ?? null, featured: product?.featured ?? false, active: product?.active ?? true } });
  const pricingType = useWatch({ control, name: "pricing_type" });
  const name = useWatch({ control, name: "name" });

  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const chooseFile = (selected?: File) => {
    if (!selected) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(selected.type)) return toast.error("Usa una imagen JPG, PNG, WebP o AVIF.");
    if (selected.size > 5 * 1024 * 1024) return toast.error("La imagen no puede superar 5 MB.");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const submit = async (values: ProductInput) => {
    let imageUrl = values.image_url || null;

    try {
      if (file) {
        const supabase = createClient();
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw error;
        imageUrl = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
      }

      const payload = {
        ...values,
        image_url: imageUrl,
        regular_price: pricingType === "FIXED" ? values.regular_price : null,
        catalog_price: pricingType === "FAIR" ? values.catalog_price : null,
        fair_price: pricingType === "FAIR" ? values.fair_price : null,
      };

      const response = await fetch(product ? `/api/admin/products/${product.id}` : "/api/admin/products", {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No pudimos guardar los cambios.");
      toast.success(product ? "Producto actualizado correctamente." : "Producto creado correctamente.");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos guardar los cambios.");
    }
  };

  const priceField = (name: "regular_price" | "catalog_price" | "fair_price", label: string, message?: string) => (
    <label>
      <span className="field-label">{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type="text"
            inputMode="numeric"
            placeholder="13.000"
            className="field"
            value={formatPriceInput(field.value)}
            onChange={(event) => field.onChange(parsePriceInput(event.target.value))}
            onBlur={field.onBlur}
            ref={field.ref}
          />
        )}
      />
      {message ? <p className="field-error">{message}</p> : null}
    </label>
  );

  return <form onSubmit={handleSubmit(submit)}><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><Link href="/admin/products" className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-muted"><ArrowLeft className="size-4" />Volver a productos</Link><h1 className="display text-4xl font-bold md:text-5xl">{product ? "Editar producto" : "Nuevo producto"}</h1></div><button type="submit" disabled={isSubmitting} className="button-primary disabled:opacity-50"><Save className="size-4" />{isSubmitting ? "Guardando…" : "Guardar producto"}</button></div><div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><section className="space-y-6 rounded-2xl border border-border bg-surface p-5 md:p-7"><div className="grid gap-4 md:grid-cols-2"><label><span className="field-label">Nombre *</span><input className="field" {...register("name")} />{errors.name ? <p className="field-error">{errors.name.message}</p> : null}</label><label><span className="field-label">Slug *</span><div className="flex gap-2"><input className="field" {...register("slug")} /><button type="button" onClick={() => setValue("slug", toSlug(name), { shouldValidate: true })} className="button-ghost min-h-0! shrink-0 px-3! text-xs">Generar</button></div>{errors.slug ? <p className="field-error">Usa minúsculas y guiones.</p> : null}</label></div><label><span className="field-label">Descripción *</span><textarea className="textarea-field" {...register("description")} />{errors.description ? <p className="field-error">{errors.description.message}</p> : null}</label><div className="grid gap-4 md:grid-cols-2"><label><span className="field-label">Marca *</span><select className="select-field" {...register("brand_id")}>{brands.map((item) => <option value={item.id} key={item.id}>{item.name}{item.active ? "" : " (inactiva)"}</option>)}</select></label><label><span className="field-label">Categoría *</span><select className="select-field" {...register("category_id")}>{categories.map((item) => <option value={item.id} key={item.id}>{item.name}{item.active ? "" : " (inactiva)"}</option>)}</select></label></div><div className="rounded-2xl bg-[#f1ede5] p-5"><label><span className="field-label">Tipo de precio</span><select className="select-field" {...register("pricing_type")}><option value="FIXED">Precio fijo</option><option value="FAIR">Precio catálogo + feria</option></select></label><div className={`mt-4 grid gap-4 ${pricingType === "FAIR" ? "md:grid-cols-2" : ""}`}>{pricingType === "FIXED" ? priceField("regular_price", "Precio *", errors.regular_price?.message) : <><div>{priceField("catalog_price", "Precio catálogo *", errors.catalog_price?.message)}</div><div>{priceField("fair_price", "Precio feria *", errors.fair_price?.message)}</div></>}</div></div><div className="flex flex-wrap gap-6"><label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" className="size-5 accent-primary" {...register("featured")} />Producto destacado</label><label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" className="size-5 accent-primary" {...register("active")} />Producto activo</label></div></section><aside className="rounded-2xl border border-border bg-surface p-5 md:p-7"><p className="field-label">Imagen del producto</p><div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl border border-dashed border-border bg-[#eee8de]">{preview ? <ProductImage src={preview} alt="Vista previa" /> : <div className="grid h-full place-items-center text-center"><div><ImagePlus className="mx-auto size-9 text-muted" /><p className="mt-3 text-xs text-muted">JPG, PNG, WebP o AVIF<br />Máximo 5 MB</p></div></div>}</div><label className="button-ghost mt-4 w-full cursor-pointer"><ImagePlus className="size-4" />Seleccionar imagen<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} /></label>{preview ? <button type="button" onClick={() => { setFile(null); setPreview(null); setValue("image_url", null); }} className="mt-3 flex w-full items-center justify-center gap-2 text-xs font-bold text-destructive"><X className="size-4" />Quitar imagen</button> : null}</aside></div></form>;
}