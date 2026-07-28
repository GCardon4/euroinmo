import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import type { PropertyCard as PropertyCardData } from "@/lib/properties";

export function FeaturedProperties({ properties }: { properties: PropertyCardData[] }) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-zinc-50 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-extrabold text-zinc-900">Propiedades Destacadas</h2>
          <p className="max-w-xl text-lg text-zinc-500">
            Descubre las mejores opciones disponibles en el Oriente Antioqueño
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/properties"
            className="rounded-full border border-brand px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
}
