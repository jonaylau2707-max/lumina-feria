import { formatMoney, getProductSavings, getProductSellingPrice } from "@/lib/utils/pricing";
import type { Product } from "@/types";

export function PriceDisplay({ product, compact = false }: { product: Product; compact?: boolean }) {
  const price = getProductSellingPrice(product);
  const savings = getProductSavings(product);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {product.pricing_type === "FAIR" && product.catalog_price ? <span className="text-xs text-muted line-through">{formatMoney(product.catalog_price)}</span> : null}
      <span className={`${compact ? "text-base" : "text-xl"} font-extrabold text-foreground`}>{formatMoney(price)}</span>
      {savings ? <span className="rounded-full bg-[#e7f2e8] px-2 py-1 text-[.66rem] font-extrabold text-success">Ahorras {savings.percentage}%</span> : null}
    </div>
  );
}
