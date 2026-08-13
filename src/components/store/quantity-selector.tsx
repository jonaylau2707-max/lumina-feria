"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ value, onChange, label = "Cantidad" }: { value: number; onChange: (quantity: number) => void; label?: string }) {
  return (
    <div className="inline-flex h-11 items-center overflow-hidden rounded-full border border-border bg-surface" aria-label={label}>
      <button type="button" className="focus-ring grid size-11 place-items-center" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Disminuir cantidad"><Minus className="size-4" /></button>
      <span className="w-9 text-center text-sm font-bold" aria-live="polite">{value}</span>
      <button type="button" className="focus-ring grid size-11 place-items-center" onClick={() => onChange(Math.min(99, value + 1))} aria-label="Aumentar cantidad"><Plus className="size-4" /></button>
    </div>
  );
}
