import type { CartItem, Product } from "@/types";

const moneyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatMoney(value: number): string {
  return moneyFormatter.format(value).replace(/\u00a0/g, " ");
}

export function getProductSellingPrice(
  product: Pick<
    Product,
    "pricing_type" | "regular_price" | "fair_price"
  >,
): number {
  const price =
    product.pricing_type === "FAIR"
      ? product.fair_price
      : product.regular_price;

  if (price === null || price <= 0) {
    throw new Error("El producto no tiene un precio de venta válido.");
  }

  return price;
}

export function getProductSavings(
  product: Pick<Product, "pricing_type" | "catalog_price" | "fair_price">,
): { amount: number; percentage: number } | null {
  if (
    product.pricing_type !== "FAIR" ||
    product.catalog_price === null ||
    product.fair_price === null ||
    product.catalog_price <= product.fair_price
  ) {
    return null;
  }

  const amount = product.catalog_price - product.fair_price;
  return {
    amount,
    percentage: Math.round((amount / product.catalog_price) * 100),
  };
}

export function calculateSubtotal(
  product: Pick<Product, "pricing_type" | "regular_price" | "fair_price">,
  quantity: number,
): number {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("La cantidad debe ser un entero positivo.");
  }

  return getProductSellingPrice(product) * quantity;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + calculateSubtotal(item.product, item.quantity),
    0,
  );
}
