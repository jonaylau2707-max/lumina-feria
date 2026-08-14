import { z } from "zod";

export const orderItemInputSchema = z.object({
  productId: z.string().uuid("Producto inválido."),
  quantity: z.number().int().min(1).max(99),
});

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(60, "El nombre es demasiado largo."),
  lastName: z
    .string()
    .trim()
    .min(2, "Escribe tu apellido.")
    .max(60, "El apellido es demasiado largo."),
  phone: z
    .string()
    .trim()
    .min(7, "Escribe un número de WhatsApp válido.")
    .max(25, "El número es demasiado largo.")
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Incluye un número de WhatsApp completo.",
    ),
  notes: z
    .string()
    .trim()
    .max(500, "Las observaciones no pueden superar 500 caracteres."),
  items: z
    .array(orderItemInputSchema)
    .min(1, "Tu carrito está vacío.")
    .max(50, "El pedido contiene demasiados productos."),
});

export const checkoutContactSchema = checkoutSchema.omit({ items: true });

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutContactInput = z.infer<typeof checkoutContactSchema>;
