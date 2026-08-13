import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return <main className="container-page grid min-h-[70vh] place-items-center py-16 text-center"><div><span className="display text-8xl font-bold text-primary/25">404</span><Search className="mx-auto -mt-8 size-12 text-primary" /><h1 className="display mt-6 text-5xl font-bold">Esta página salió de feria</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">No encontramos lo que buscabas. Puede que el enlace haya cambiado o el producto ya no esté visible.</p><Link href="/" className="button-primary mt-7"><ArrowLeft className="size-4" />Volver al inicio</Link></div></main>;
}
