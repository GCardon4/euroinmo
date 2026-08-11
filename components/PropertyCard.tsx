import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { PropertyCard as PropertyCardData } from "@/lib/properties";

const WHATSAPP_ARRIENDOS = "573236536666";
const WHATSAPP_VENTAS = "573507776633";

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const whatsappNumber = property.status === "Arriendo" ? WHATSAPP_ARRIENDOS : WHATSAPP_VENTAS;
  const whatsappMessage = `Quiero saber acerca de ${property.category ?? "Propiedad"}, en ${property.city ?? ""}, con el código ${property.code}. Muchas gracias`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/property/${property.code}`} className="flex flex-col flex-1">
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 sm:h-56">
          <Image
            src={property.image ?? "/property-img.jpg"}
            alt={property.name}
            fill
            unoptimized={property.image != null}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {property.status && (
            <span
              className={`absolute right-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold uppercase text-white backdrop-blur sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 ${
                property.status === "Venta" ? "bg-emerald-500/90" : "bg-blue-600/90"
              }`}
            >
              {property.status}
            </span>
          )}
          {property.category && (
            <span className="absolute left-3 top-3 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
              {property.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4 sm:gap-3 sm:p-6">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-base font-bold leading-tight text-zinc-900 sm:text-lg sm:min-h-[3.5rem]">
            {property.name}
          </h3>

          {property.city && (
            <p className="flex items-center gap-1.5 text-xs text-zinc-500 sm:text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-brand-light">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              <span className="truncate">{property.city}</span>
            </p>
          )}

          {(property.rooms != null || property.bathrooms != null || property.area != null) && (
            <div className="flex flex-wrap items-center gap-3 border-y border-zinc-100 py-2.5 text-xs text-zinc-600 sm:gap-4 sm:py-3 sm:text-sm">
              {property.rooms != null && (
                <span className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-brand sm:w-[18px] sm:h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M5 10V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
                  </svg>
                  <span className="whitespace-nowrap">{property.rooms} hab.</span>
                </span>
              )}
              {property.bathrooms != null && (
                <span className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-brand sm:w-[18px] sm:h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M6 12V5a1 1 0 0 1 1-1h1M6 12v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7" />
                  </svg>
                  <span className="whitespace-nowrap">{property.bathrooms} baños</span>
                </span>
              )}
              {property.area != null && (
                <span className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-brand sm:w-[18px] sm:h-[18px]">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <path strokeLinecap="round" d="M3 9h4M9 3v4" />
                  </svg>
                  <span className="whitespace-nowrap">{property.area} m²</span>
                </span>
              )}
            </div>
          )}

          {property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="truncate rounded-full bg-brand/10 px-2 py-1 text-xs font-medium text-brand"
                  title={amenity}
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-baseline gap-1.5 pt-2 sm:pt-3">
            <span className="text-lg font-extrabold text-brand sm:text-xl">{formatPrice(property.price)}</span>
            {property.status === "Arriendo" && <span className="text-xs text-zinc-500 sm:text-sm">/mes</span>}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-2 border-t border-zinc-100 p-4 sm:flex-row sm:gap-2 sm:p-4">
        <Link
          href={`/property/${property.code}`}
          className="flex-1 rounded-lg bg-brand px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-brand-dark sm:text-sm"
        >
          Ver detalles
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-green-500 px-3 py-2 text-xs font-semibold text-green-600 transition-colors hover:bg-green-50 sm:text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.909 1.251c-1.428.797-2.674 1.9-3.56 3.247a9.9 9.9 0 00-1.746 4.773 9.865 9.865 0 001.494 5.525 9.823 9.823 0 003.099 3.465 9.866 9.866 0 005.516 1.803 9.9 9.9 0 001.922-.19 10.01 10.01 0 004.708-2.162 9.9 9.9 0 002.518-3.313 9.865 9.865 0 00.666-5.395 9.877 9.877 0 00-1.519-4.951 9.9 9.9 0 00-3.416-3.528 9.864 9.864 0 00-5.765-1.683zm10.625 13.09l-3.021-1.533c-.44.294-.915.535-1.404.71.233-.072.465-.177.686-.314.528-.341 1.005-.81 1.404-1.41.24-.36.441-.76.596-1.18l1.739 1.727z"/>
          </svg>
          Compartir
        </a>
      </div>
    </div>
  );
}
