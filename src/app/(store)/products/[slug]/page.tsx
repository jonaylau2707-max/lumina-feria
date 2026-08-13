import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/store/product-card";
import { PriceDisplay } from "@/components/store/price-display";
import { ProductImage } from "@/components/store/product-image";
import { ProductPurchase } from "@/components/store/product-purchase";
import { getProductBySlug, getStoreData } from "@/lib/data/store";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params; const product = await getProductBySlug(slug);
  return product ? { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: product.image_url ? [product.image_url] : undefined } } : { title: "Producto no encontrado" };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params; const product = await getProductBySlug(slug); if (!product) notFound();
  const { products } = await getStoreData(); const related = products.filter((item) => item.id !== product.id && (item.category_id === product.category_id || item.brand_id === product.brand_id)).slice(0, 4);
  return <div className="container-page py-8 md:py-14"><Link href="/products" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary"><ArrowLeft className="size-4" />Volver a productos</Link><div className="grid gap-9 lg:grid-cols-2 lg:gap-16"><div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] border border-border"><ProductImage src={product.image_url} alt={product.name} priority artIndex={2} /></div><div className="self-center"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#e8e2d8] px-3 py-1 text-xs font-bold">{product.category.name}</span><span className="rounded-full bg-[#e8e2d8] px-3 py-1 text-xs font-bold">{product.brand.name}</span></div><h1 className="display mt-5 text-balance text-5xl font-bold leading-[.92] md:text-7xl">{product.name}</h1><div className="my-6"><PriceDisplay product={product} /></div><p className="text-base leading-7 text-muted">{product.description}</p><div className="my-8 border-y border-border py-6"><ProductPurchase product={product} /></div><div className="grid gap-3 text-sm"><div className="flex items-center gap-3"><ShieldCheck className="size-5 text-success" /><span>Sin pagos en línea ni cargos al enviar</span></div><div className="flex items-center gap-3"><Check className="size-5 text-success" /><span>Precio recalculado y protegido en el servidor</span></div><div className="flex items-center gap-3"><MessageCircle className="size-5 text-success" /><span>Confirmación personal de disponibilidad por WhatsApp</span></div></div></div></div>{related.length ? <section className="mt-20"><div className="mb-8"><p className="eyebrow text-primary">Sigue explorando</p><h2 className="display mt-2 text-4xl font-bold">También te puede gustar</h2></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index + 1} />)}</div></section> : null}</div>;
}
