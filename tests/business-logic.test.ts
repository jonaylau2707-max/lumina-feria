import { describe, expect, it } from "vitest";

import { demoProducts } from "@/lib/data/demo";
import { normalizeColombianPhone } from "@/lib/utils/phone";
import { calculateCartTotal, calculateSubtotal, formatMoney, getProductSavings, getProductSellingPrice } from "@/lib/utils/pricing";
import { toSlug } from "@/lib/utils/slug";
import { orderStatusSchema, productSchema } from "@/lib/validations/admin";
import { checkoutSchema } from "@/lib/validations/order";

describe("lógica de precios", () => {
  it("elige el precio fijo correcto", () => expect(getProductSellingPrice(demoProducts[1])).toBe(42900));
  it("elige el precio feria y calcula el ahorro", () => { expect(getProductSellingPrice(demoProducts[0])).toBe(89900); expect(getProductSavings(demoProducts[0])).toEqual({ amount: 40000, percentage: 31 }); });
  it("calcula subtotales y el total del carrito", () => { expect(calculateSubtotal(demoProducts[0], 2)).toBe(179800); expect(calculateCartTotal([{ product: demoProducts[0], quantity: 2 }, { product: demoProducts[1], quantity: 1 }])).toBe(222700); });
  it("rechaza cantidades inválidas", () => expect(() => calculateSubtotal(demoProducts[0], 0)).toThrow());
  it("formatea COP centralmente", () => expect(formatMoney(65000)).toMatch(/\$\s?65\.000/));
});

describe("validaciones", () => {
  it("acepta una solicitud válida y rechaza un carrito vacío", () => { const base = { firstName: "Ana", lastName: "Ríos", phone: "3001234567", notes: "", items: [{ productId: demoProducts[0].id, quantity: 1 }] }; expect(checkoutSchema.safeParse(base).success).toBe(true); expect(checkoutSchema.safeParse({ ...base, items: [] }).success).toBe(false); });
  it("solo acepta los tres estados definidos", () => { expect(orderStatusSchema.safeParse({ status: "NEW" }).success).toBe(true); expect(orderStatusSchema.safeParse({ status: "SHIPPED" }).success).toBe(false); });
  it("exige que el precio feria sea menor al de catálogo", () => { const product = { name: "Producto válido", slug: "producto-valido", description: "Una descripción suficientemente larga.", image_url: null, brand_id: demoProducts[0].brand_id, category_id: demoProducts[0].category_id, pricing_type: "FAIR", regular_price: null, catalog_price: 50000, fair_price: 60000, featured: false, active: true }; expect(productSchema.safeParse(product).success).toBe(false); });
});

describe("utilidades principales", () => {
  it("normaliza teléfonos colombianos", () => { expect(normalizeColombianPhone("300 123 4567")).toBe("573001234567"); expect(normalizeColombianPhone("+57 300 123 4567")).toBe("573001234567"); });
  it("crea slugs sin acentos", () => expect(toSlug("Perfumería & Cuidado")).toBe("perfumeria-cuidado"));
});
