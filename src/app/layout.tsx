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
  title: { default: "Lúmina Feria — Hallazgos que iluminan", template: "%s | Lúmina Feria" },
  description: "Perfumería, bienestar, hogar y accesorios seleccionados a precios especiales de feria.",
  openGraph: { title: "Lúmina Feria", description: "Una selección bonita, cercana y cambiante para disfrutar y regalar.", type: "website", locale: "es_CO" },
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
