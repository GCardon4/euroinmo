import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/PropertyGallery";
import { ShareWhatsAppButton } from "@/components/ShareWhatsAppButton";
import { formatPrice } from "@/lib/format";
import { getPropertyByCode } from "@/lib/properties";

export const dynamic = "force-dynamic";

const WHATSAPP_ARRIENDOS = "573236536666";
const WHATSAPP_VENTAS = "573507776633";

export async function generateMetadata({
  params,
}: PageProps<"/property/[code]">): Promise<Metadata> {
  const { code } = await params;
  const property = await getPropertyByCode(code);

  if (!property) return { title: "Propiedad no encontrada | Euro Inmobiliaria" };

  return {
    title: `${property.name} - Euro Inmobiliaria`,
    description: property.description ?? "Propiedad disponible en Euro Inmobiliaria",
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps<"/property/[code]">) {
  const { code } = await params;
  const property = await getPropertyByCode(code);

  if (!property) notFound();

  const details = [
    { label: "Habitaciones", value: property.rooms },
    { label: "Baños", value: property.bathrooms },
    { label: "Área", value: property.area != null ? `${property.area} m²` : null },
    { label: "Tipo", value: property.category },
    { label: "Cocina", value: property.kitchen },
    { label: "Sala", value: property.hall },
    { label: "Comedor", value: property.dining },
    { label: "Closet", value: property.closet },
    { label: "Zona de Ropas", value: property.clothing },
    { label: "Red de Gas", value: property.gas },
    { label: "Vestier", value: property.dressing },
  ].filter((item) => item.value != null && item.value !== "");

  const whatsappNumber = property.status === "Arriendo" ? WHATSAPP_ARRIENDOS : WHATSAPP_VENTAS;
  const whatsappMessage = `Quiero saber acerca de ${property.category ?? "Propiedad"}, en ${
    property.zone ?? ""
  }, con el código ${property.code}, Muchas gracias`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <PropertyGallery images={property.images} name={property.name} />

        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-zinc-900 sm:text-3xl">
                {property.name}
              </h1>
              <p className="mt-1 text-lg font-bold text-zinc-400">Código: {property.code}</p>
            </div>
            {property.status && (
              <span
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase ${
                  property.status === "Venta"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {property.status}
              </span>
            )}
          </div>

          <div className="rounded-xl bg-zinc-50 p-6">
            <span className="text-sm text-zinc-500">Precio</span>
            <p className="mt-1 text-2xl font-extrabold text-brand sm:text-3xl">
              {formatPrice(property.price)}
              {property.status === "Arriendo" && (
                <span className="ml-1 text-base font-normal text-zinc-500">/mes</span>
              )}
            </p>
          </div>

          {(property.zone || property.city) && (
            <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-brand">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              <div className="text-sm text-zinc-700">
                {property.zone && <p className="font-semibold">{property.zone}</p>}
                {property.city && <p>{property.city}</p>}
              </div>
            </div>
          )}

          {details.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {details.map((item) => (
                <div key={item.label} className="rounded-lg border border-zinc-200 p-4 transition-colors hover:border-brand hover:bg-zinc-50">
                  <span className="block text-xs text-zinc-500">{item.label}</span>
                  <p className="mt-1 font-semibold text-zinc-900">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {property.description && (
            <div className="rounded-xl bg-zinc-50 p-6">
              <h3 className="mb-3 font-bold text-zinc-900">Descripción</h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">
                {property.description}
              </p>
            </div>
          )}

          {property.amenities.length > 0 && (
            <div className="rounded-xl bg-zinc-50 p-6">
              <h3 className="mb-3 font-bold text-zinc-900">Atributos</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl bg-zinc-50 p-6">
            <h3 className="mb-3 font-bold text-zinc-900">Compartir inmueble</h3>
            <ShareWhatsAppButton name={property.name} code={property.code} description={property.description} />
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
