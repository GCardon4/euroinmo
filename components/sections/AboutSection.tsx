import Image from "next/image";

const FEATURES = [
  {
    title: "Amplio Portafolio",
    description: "Más de 500 propiedades disponibles en toda la región",
  },
  {
    title: "Asesoría Personalizada",
    description: "Acompañamiento profesional en cada paso del proceso",
  },
  {
    title: "Procesos Seguros",
    description: "Garantizamos transparencia y legalidad en todas nuestras transacciones",
  },
  {
    title: "Cobertura Regional",
    description: "Presencia en Rionegro, La Ceja, El Retiro, Marinilla y más",
  },
];

const STATS = [
  { value: "200+", label: "Propiedades" },
  { value: "1,000+", label: "Clientes Satisfechos" },
  { value: "15+", label: "Municipios" },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-white px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl sm:h-[500px]">
            <Image src="/fachada-euro.jpg" alt="Oficina Euro Inmobiliaria" fill className="object-cover" />
          </div>
          <Image
            src="/label-euro.png"
            alt="Euro Inmobiliaria - 14 años acompañando familias"
            width={120}
            height={117}
            className="absolute -bottom-2 left-4 drop-shadow-xl sm:bottom-8 sm:left-8"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
            Tu aliado en bienes raíces del Oriente Antioqueño
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            En <strong className="text-zinc-800">Euro Inmobiliaria</strong> somos expertos en el
            mercado inmobiliario del Oriente Antioqueño. Con más de una década de experiencia,
            hemos ayudado a cientos de familias a encontrar su hogar ideal y a inversionistas a
            hacer realidad sus proyectos.
          </p>

          <div className="flex flex-col gap-5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light/25 text-brand">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.2 14.6-4.4-4.4 1.4-1.4 3 3 6-6 1.4 1.4Z" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900">{feature.title}</h4>
                  <p className="text-sm text-zinc-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 border-y-2 border-zinc-100 py-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-brand">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
