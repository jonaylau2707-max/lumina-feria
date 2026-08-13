import { z } from "zod";

const optionalUrl = z.union([z.literal(""), z.string().url()]).nullable();

export const loginSchema = z.object({
  email: z.string().email("Escribe un correo válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const brandSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(90).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  logo_url: optionalUrl,
  active: z.boolean(),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(90).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(300).nullable(),
  image_url: optionalUrl,
  active: z.boolean(),
});

export const productSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    slug: z.string().trim().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().trim().min(10).max(2000),
    image_url: optionalUrl,
    brand_id: z.string().uuid(),
    category_id: z.string().uuid(),
    pricing_type: z.enum(["FIXED", "FAIR"]),
    regular_price: z.number().positive().nullable(),
    catalog_price: z.number().positive().nullable(),
    fair_price: z.number().positive().nullable(),
    featured: z.boolean(),
    active: z.boolean(),
  })
  .superRefine((data, context) => {
    if (data.pricing_type === "FIXED" && data.regular_price === null) {
      context.addIssue({
        code: "custom",
        path: ["regular_price"],
        message: "El precio es obligatorio.",
      });
    }

    if (data.pricing_type === "FAIR") {
      if (data.catalog_price === null || data.fair_price === null) {
        context.addIssue({
          code: "custom",
          path: ["fair_price"],
          message: "Completa ambos precios de feria.",
        });
      } else if (data.fair_price >= data.catalog_price) {
        context.addIssue({
          code: "custom",
          path: ["fair_price"],
          message: "El precio feria debe ser menor al precio catálogo.",
        });
      }
    }
  });

export const orderStatusSchema = z.object({
  status: z.enum(["NEW", "CONFIRMED", "CANCELLED"]),
});
