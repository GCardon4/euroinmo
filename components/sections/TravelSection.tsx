import Image from "next/image";

const FEATURES = [
  {
    title: "Destinos Nacionales e Internacionales",
    description: "Viaja por Colombia o al exterior con los mejores planes",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Promociones Actualizadas",
    description: "Ofertas exclusivas y tarifas especiales todo el año",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L4 3a1 1 0 0 0-1 1l.24 5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83ZM7 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      </svg>
    ),
  },
  {
    title: "Asesoría Personalizada",
    description: "Te acompañamos en cada paso para armar tu viaje ideal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v-3a8 8 0 1 1 16 0v3M4 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2v1Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Zm-4 4a2 2 0 0 1-2 2h-1" />
      </svg>
    ),
  },
  {
    title: "Planes Todo Incluido",
    description: "Paquetes completos con vuelos, hospedaje y actividades",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20M4 20V10l8-6 8 6v10M9 20v-6h6v6" />
      </svg>
    ),
  },
];

const WHATSAPP_HREF =
  "https://wa.me/573028577777?text=" +
  encodeURIComponent("Hola, me interesa conocer más sobre los paquetes de Euro Viajes.");

export function TravelSection() {
  return (
    <section className="bg-gradient-to-br from-[#f0f8fc] to-[#e6f2f8] px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">Euro Viajes</h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            Descubre el mundo con <strong className="text-zinc-800">Euro Viajes</strong>, nuestra
            agencia de viajes con las mejores promociones y destinos para que vivas experiencias
            inolvidables. Te ayudamos a planificar tus vacaciones de principio a fin con atención
            personalizada y los mejores precios.
          </p>

          <div className="flex flex-col gap-5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light/25 text-brand">
                  {feature.icon}
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900">{feature.title}</h4>
                  <p className="text-sm text-zinc-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-3 font-semibold text-brand">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-transform hover:-translate-y-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.05a8.11 8.11 0 0 1-4.14-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.13 8.13 0 0 1-1.25-4.3c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.51-3.66 8.14-8.17 8.14Zm4.48-6.11c-.25-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z" />
              </svg>
            </span>
            Contáctanos por WhatsApp
          </a>
        </div>

        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl sm:h-[500px]">
            <Image src="/euro-viajes-post.jpg" alt="Euro Viajes" fill className="object-cover" />
          </div>
          <Image
            src="/euro-viajes-logo.png"
            alt="Euro Viajes"
            width={120}
            height={109}
            className="absolute -bottom-2 left-4 rounded-full bg-white p-2 shadow-xl sm:bottom-8 sm:left-8"
          />
        </div>
      </div>
    </section>
  );
}
