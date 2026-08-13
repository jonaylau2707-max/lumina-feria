"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="container-page grid min-h-[65vh] place-items-center py-16 text-center"><div><p className="eyebrow text-destructive">Algo no salió bien</p><h1 className="display mt-3 text-5xl font-bold">No pudimos cargar esta parte</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">Puede ser algo temporal. Intenta nuevamente en un momento.</p><button type="button" onClick={() => retry()} className="button-primary mt-7"><RefreshCw className="size-4" />Intentar de nuevo</button></div></main>;
}
