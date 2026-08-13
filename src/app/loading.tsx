export default function Loading() {
  return <div className="container-page py-16" aria-label="Cargando contenido"><div className="mb-5 h-4 w-28 animate-[pulse-soft_1.4s_ease-in-out_infinite] rounded bg-[#ddd6ca]" /><div className="h-16 max-w-xl animate-[pulse-soft_1.4s_ease-in-out_infinite] rounded-2xl bg-[#e5dfd4]" /><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[4/6] animate-[pulse-soft_1.4s_ease-in-out_infinite] rounded-3xl bg-[#e5dfd4]" />)}</div></div>;
}
