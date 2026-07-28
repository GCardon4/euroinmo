import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { PropertyCard as PropertyCardData } from "@/lib/properties";

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <Link
      href={`/properties?code=${property.code}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
        <Image
          src={property.image ?? "/property-img.jpg"}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {property.status && (
          <span
            className={`absolute right-4 top-4 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase text-white backdrop-blur ${
              property.status === "Venta" ? "bg-emerald-500/90" : "bg-blue-600/90"
            }`}
          >
            {property.status}
          </span>
        )}
        {property.category && (
          <span className="absolute left-4 top-4 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            {property.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-zinc-900">
          {property.name}
        </h3>

        {property.city && (
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-brand-light">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {property.city}
          </p>
        )}

        {(property.rooms != null || property.bathrooms != null || property.area != null) && (
          <div className="flex flex-wrap items-center gap-4 border-y border-zinc-100 py-3 text-sm text-zinc-600">
            {property.rooms != null && (
              <span className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="text-brand">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M5 10V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
                </svg>
                {property.rooms} hab.
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="text-brand">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M6 12V5a1 1 0 0 1 1-1h1M6 12v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7" />
                </svg>
                {property.bathrooms} baños
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="text-brand">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path strokeLinecap="round" d="M3 9h4M9 3v4" />
                </svg>
                {property.area} m²
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-brand">{formatPrice(property.price)}</span>
          {property.status === "Arriendo" && <span className="text-sm text-zinc-500">/mes</span>}
        </div>
      </div>
    </Link>
  );
}
