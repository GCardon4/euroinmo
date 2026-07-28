import Link from "next/link";
import type { Metadata } from "next";
import { PropertyCard } from "@/components/PropertyCard";
import { getCategories, getCities, getProperties, getStatuses } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Propiedades | Euro Inmobiliaria",
  description: "Explora todas nuestras propiedades disponibles en el Oriente Antioqueño.",
};

const PAGE_SIZE = 12;

function toQueryString(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const params = await searchParams;

  const status = typeof params.status === "string" ? params.status : undefined;
  const categoryId = typeof params.categoryId === "string" ? params.categoryId : undefined;
  const cityId = typeof params.cityId === "string" ? params.cityId : undefined;
  const code = typeof params.code === "string" ? params.code : undefined;
  const minPrice = typeof params.minPrice === "string" ? params.minPrice : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? params.maxPrice : undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const [statuses, categories, cities] = await Promise.all([
    getStatuses(),
    getCategories(),
    getCities(),
  ]);

  const statusId = status
    ? statuses.find((s) => s.name.toLowerCase() === status.toLowerCase())?.id
    : undefined;

  const { properties, total } = await getProperties(
    {
      statusId,
      categoryId: categoryId ? Number(categoryId) : undefined,
      cityId: cityId ? Number(cityId) : undefined,
      code,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    },
    { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE },
  );

  const baseFilters = { status, categoryId, cityId, code, minPrice, maxPrice };
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const activeChips = [
    status && { key: "status", label: `Tipo: ${status === "venta" ? "Venta" : "Arriendo"}` },
    categoryId && {
      key: "categoryId",
      label: `Categoría: ${categories.find((c) => c.id === Number(categoryId))?.name ?? categoryId}`,
    },
    cityId && {
      key: "cityId",
      label: `Ciudad: ${cities.find((c) => c.id === Number(cityId))?.name ?? cityId}`,
    },
    code && { key: "code", label: `Código: ${code}` },
    minPrice && { key: "minPrice", label: `Desde: $${Number(minPrice).toLocaleString("es-CO")}` },
    maxPrice && { key: "maxPrice", label: `Hasta: $${Number(maxPrice).toLocaleString("es-CO")}` },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <>
      <section className="bg-gradient-to-br from-brand to-brand-dark px-6 py-16 text-center text-white sm:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Propiedades</h1>
        <p className="mt-2 text-lg text-white/85">
          Encuentra tu propiedad ideal en el Oriente Antioqueño
        </p>

        {activeChips.length > 0 && (
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {activeChips.map((chip) => (
              <Link
                key={chip.key}
                href={toQueryString({ ...baseFilters, [chip.key]: undefined, page: undefined })}
                className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm"
              >
                {chip.label}
                <span aria-hidden>✕</span>
              </Link>
            ))}
            <Link href="/properties" className="rounded-full border border-white/40 px-4 py-1.5 text-sm hover:bg-white/10">
              Limpiar todos
            </Link>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link
            href={toQueryString({ ...baseFilters, categoryId: undefined, page: undefined })}
            className={`rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
              !categoryId ? "border-brand bg-brand text-white" : "border-zinc-200 text-zinc-600 hover:border-brand hover:text-brand"
            }`}
          >
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={toQueryString({ ...baseFilters, categoryId: String(category.id), page: undefined })}
              className={`rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                categoryId === String(category.id)
                  ? "border-brand bg-brand text-white"
                  : "border-zinc-200 text-zinc-600 hover:border-brand hover:text-brand"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {properties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-zinc-500">
            <p className="text-lg font-semibold text-zinc-700">No hay propiedades disponibles</p>
            <p className="mt-2 text-sm">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Link
              aria-disabled={page <= 1}
              href={toQueryString({ ...baseFilters, page: page > 2 ? String(page - 1) : undefined })}
              className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold ${
                page <= 1
                  ? "pointer-events-none border-zinc-100 text-zinc-300"
                  : "border-brand text-brand hover:bg-brand hover:text-white"
              }`}
            >
              Anterior
            </Link>
            <span className="text-sm text-zinc-500">
              Página {page} de {totalPages}
            </span>
            <Link
              aria-disabled={page >= totalPages}
              href={toQueryString({ ...baseFilters, page: String(page + 1) })}
              className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold ${
                page >= totalPages
                  ? "pointer-events-none border-zinc-100 text-zinc-300"
                  : "border-brand text-brand hover:bg-brand hover:text-white"
              }`}
            >
              Siguiente
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
