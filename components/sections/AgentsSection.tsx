import Image from "next/image";

const AGENTS = [
  {
    photo: "/asesores/asesor-01.jpg",
    name: "Leidy Gil",
    role: "Asesora Comercial",
    properties: 45,
    rating: "4.9",
    description:
      "Especialista en propiedades residenciales del Oriente Antioqueño con 8 años de experiencia.",
    whatsapp: "https://wa.me/573507776633",
  },
  {
    photo: "/asesores/asesor-02.jpg",
    name: "Alejandra Vergara",
    role: "Asesora Comercial",
    properties: 38,
    rating: "4.8",
    description: "Experto en fincas y propiedades rurales. Conocimiento profundo del mercado regional.",
    whatsapp: "https://wa.me/573236536666",
  },
  {
    photo: "/asesores/asesor-03.jpg",
    name: "Mayerly Martínez",
    role: "Asesora Inmobiliaria",
    properties: 52,
    rating: "5.0",
    description: "Líder en ventas de apartamentos y locales comerciales. Atención personalizada garantizada.",
    whatsapp: "https://wa.me/573236536666",
  },
  {
    photo: "/asesores/asesor-04.jpg",
    name: "Diana García",
    role: "Gerente General",
  },
  {
    photo: "/asesores/asesor-05.jpg",
    name: "Juan Felipe Urrea",
    role: "Abogado",
  },
];

export function AgentsSection() {
  return (
    <section id="agentes" className="bg-gradient-to-b from-white to-zinc-50 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-zinc-900">Conoce a Nuestros Asesores</h2>
          <p className="mt-2 text-lg text-zinc-500">
            Profesionales expertos listos para ayudarte a encontrar tu propiedad ideal
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
              </div>

              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-xl font-bold text-zinc-900">{agent.name}</h3>
                <p className="-mt-2 text-sm font-semibold text-brand">{agent.role}</p>

                {(agent.properties != null || agent.rating) && (
                  <div className="flex gap-5 border-y border-zinc-100 py-3 text-sm text-zinc-600">
                    {agent.properties != null && (
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand">
                          <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3Z" />
                        </svg>
                        {agent.properties} propiedades
                      </span>
                    )}
                    {agent.rating && (
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand">
                          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01Z" />
                        </svg>
                        {agent.rating} rating
                      </span>
                    )}
                  </div>
                )}

                {agent.description && <p className="text-sm text-zinc-500">{agent.description}</p>}

                {agent.whatsapp && (
                  <a
                    href={agent.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Contactar Asesor
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
