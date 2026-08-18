import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";

import { CartProvider } from "@/components/store/cart-provider";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["500", "600", "700"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ESENCIAS VIP — Hallazgos que iluminan", template: "%s | ESENCIAS VIP" },
  description: "Tienda multimarca con productos de Yanbal, Esika, L'Bel y Cyzone, Fuller, Samy Cosmetics y Natura a precios especiales.",
  openGraph: { title: "ESENCIAS VIP", description: "Productos de Yanbal, Esika, L'Bel y Cyzone, Fuller, Samy Cosmetics y Natura en una selección cercana y especial.", type: "website", locale: "es_CO", images: [{ url: `${siteUrl}/og.png`, width: 1792, height: 909, alt: "ESENCIAS VIP — Hallazgos que iluminan lo cotidiano" }] },
  twitter: { card: "summary_large_image", title: "ESENCIAS VIP", description: "Marcas como Yanbal, Esika, L'Bel y Cyzone, Fuller, Samy Cosmetics y Natura.", images: [`${siteUrl}/og.png`] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
