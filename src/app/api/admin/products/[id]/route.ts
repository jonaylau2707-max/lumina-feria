import { revalidateCatalog } from "@/lib/cache/catalog";
import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/admin";

type ProductRouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: ProductRouteContext) {
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ message: "No autorizado." }, { status: 403 });
  }

  try {
    const { id } = await params;
    const input = productSchema.parse(await request.json());
    const supabase = await createClient();
    const { data: previous } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .maybeSingle();
    const { data, error } = await supabase
      .from("products")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error actualizando producto", error);
      return Response.json(
        {
          message:
            error.code === "23505"
              ? "Ya existe un producto con ese slug."
              : "No pudimos guardar los cambios.",
        },
        { status: 400 },
      );
    }

    if (previous?.image_url && previous.image_url !== input.image_url) {
      const marker = "/product-images/";
      const path = previous.image_url.split(marker)[1];
      if (path) {
        await supabase.storage
          .from("product-images")
          .remove([decodeURIComponent(path)]);
      }
    }

    revalidateCatalog();
    return Response.json(data);
  } catch {
    return Response.json(
      { message: "Revisa los campos del producto." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: ProductRouteContext,
) {
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ message: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const supabase = await createClient();
  const { count, error: countError } = await supabase
    .from("order_items")
    .select("id", { count: "exact", head: true })
    .eq("product_id", id);

  if (countError) {
    return Response.json(
      { message: "No pudimos verificar el historial." },
      { status: 400 },
    );
  }

  if ((count ?? 0) > 0) {
    const { error } = await supabase
      .from("products")
      .update({ active: false })
      .eq("id", id);
    if (error) {
      return Response.json(
        { message: "No pudimos desactivar el producto." },
        { status: 400 },
      );
    }

    revalidateCatalog();
    return Response.json({ deactivated: true });
  }

  const { data: product } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return Response.json(
      { message: "No pudimos eliminar el producto." },
      { status: 400 },
    );
  }

  if (product?.image_url) {
    const path = product.image_url.split("/product-images/")[1];
    if (path) {
      await supabase.storage
        .from("product-images")
        .remove([decodeURIComponent(path)]);
    }
  }

  revalidateCatalog();
  return Response.json({ deleted: true });
}
