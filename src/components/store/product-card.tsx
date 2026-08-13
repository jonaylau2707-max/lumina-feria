import Link from "next/link";

import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { PriceDisplay } from "@/components/store/price-display";
import { ProductImage } from "@/components/store/product-image";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
      <Link href={`/products/${product.slug}`} className="focus-ring relative aspect-[4/4.7] overflow-hidden" aria-label={`Ver ${product.name}`}>
        <ProductImage src={product.image_url} alt={product.name} artIndex={index} />
        <span className="absolute left-3 top-3 z-20 rounded-full bg-surface/90 px-2.5 py-1 text-[.62rem] font-extrabold uppercase tracking-wider backdrop-blur">{product.category.name}</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[.67rem] font-extrabold uppercase tracking-[.13em] text-muted">{product.brand.name}</p>
        <Link href={`/products/${product.slug}`} className="focus-ring rounded"><h3 className="display min-h-12 text-[1.35rem] font-bold leading-[1.05] transition group-hover:text-primary">{product.name}</h3></Link>
        <div className="mt-auto pt-3"><PriceDisplay product={product} compact /></div>
        <div className="mt-4"><AddToCartButton product={product} compact /></div>
      </div>
    </article>
  );
}
