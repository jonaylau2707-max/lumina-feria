import { revalidatePath } from "next/cache";

export function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
