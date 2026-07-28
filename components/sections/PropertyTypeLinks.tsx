import Link from "next/link";
import type { PropertyStats } from "@/lib/properties";

export function PropertyTypeLinks({ stats }: { stats: PropertyStats }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col justify-center gap-6 px-6 py-14 sm:flex-row sm:px-8">
      <Link
        href="/properties?status=arriendo"
        className="flex flex-1 flex-col items-center gap-3 rounded-2xl border-2 border-brand bg-white px-8 py-10 text-center text-brand transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="7" cy="15" r="3" />
          <path strokeLinecap="round" d="M9.5 12.5 18 4M15 6l2 2M18 4l2 2-2 2" />
        </svg>
        <h2 className="text-xl font-bold">Inmuebles Arriendo</h2>
        <p className="text-sm text-zinc-500">{stats.arriendo} propiedades disponibles</p>
      </Link>

      <Link
        href="/properties?status=venta"
        className="flex flex-1 flex-col items-center gap-3 rounded-2xl border-2 border-brand bg-white px-8 py-10 text-center text-brand transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L4 3a1 1 0 0 0-1 1l.24 5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83ZM7 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
        <h2 className="text-xl font-bold">Inmuebles Venta</h2>
        <p className="text-sm text-zinc-500">{stats.venta} propiedades disponibles</p>
      </Link>
    </section>
  );
}
