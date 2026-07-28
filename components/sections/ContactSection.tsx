"use client";

import { useState } from "react";

const DETAILS = [
  {
    title: "Ubicación",
    lines: ["Calle 29 N° 29-15", "Marinilla, Antioquia"],
    href: "https://www.google.com/maps/place/Euro+Inmobiliaria/@6.1725905,-75.3330971,17.75z/data=!4m6!3m5!1s0x8e46a100b9912197:0xf93f9e5cb4ac9fb!8m2!3d6.1724591!4d-75.3345397!16s%2Fg%2F11j8rn2pfm",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      </svg>
    ),
  },
  {
    title: "Teléfonos",
    lines: ["+57 350 777 6633", "+57 301 242 1919"],
    href: "https://wa.me/573507776633",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.58a1 1 0 0 1-.25 1Z" />
      </svg>
    ),
  },
  {
    title: "Email",
    lines: ["euroinmobiliaria2012@gmail.com"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm8 9L4.5 6.5v.9L12 14l7.5-6.6v-.9Z" />
      </svg>
    ),
  },
  {
    title: "Horario",
    lines: ["Lunes - Viernes: 9:00 AM - 6:00 PM", "Sábados: 9:00 AM - 3:00 PM"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/euroinmobiliaria.sas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/euro_inmobiliaria",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.09 4.09 0 0 1 1.47.957c.453.454.774.898.957 1.47.163.46.349 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.241 1.97-.404 2.43a4.09 4.09 0 0 1-.957 1.47 4.09 4.09 0 0 1-1.47.957c-.46.163-1.26.349-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.241-2.43-.404a4.09 4.09 0 0 1-1.47-.957 4.09 4.09 0 0 1-.957-1.47c-.163-.46-.349-1.26-.404-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.17.241-1.97.404-2.43a4.09 4.09 0 0 1 .957-1.47A4.09 4.09 0 0 1 5.064 2.3c.46-.163 1.26-.349 2.43-.404C8.76 1.838 9.14 1.826 12 1.826V2.163ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/573507776633",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" />
      </svg>
    ),
  },
];

const INTERESTS = [
  { value: "comprar", label: "Comprar" },
  { value: "arrendar", label: "Arrendar" },
  { value: "vender", label: "Vender mi propiedad" },
  { value: "asesoría", label: "Asesoría general" },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      `Nombre: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Teléfono: ${form.get("phone")}`,
      form.get("interest") ? `Interesado en: ${form.get("interest")}` : null,
      `Mensaje: ${form.get("message")}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/573507776633?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
    );
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contacto" className="bg-gradient-to-br from-zinc-50 to-white px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight text-zinc-900 sm:text-3xl">
              ¿Listo para encontrar tu propiedad ideal?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              Estamos aquí para ayudarte. Completa el formulario y uno de nuestros asesores se
              pondrá en contacto contigo en menos de 24 horas.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {DETAILS.map((detail) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/25 text-brand">
                    {detail.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900">{detail.title}</h4>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {detail.lines.map((line, i) => (
                        <span key={line}>
                          {line}
                          {i < detail.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </>
              );

              return detail.href ? (
                <a
                  key={detail.title}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-m-2 flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-brand/5"
                >
                  {content}
                </a>
              ) : (
                <div key={detail.title} className="flex items-start gap-4">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="border-t-2 border-zinc-100 pt-6">
            <h4 className="mb-3 font-bold text-zinc-900">Síguenos</h4>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-xl sm:p-10">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-700">
              Nombre Completo*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Tu nombre"
              className="rounded-lg border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-700 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="rounded-lg border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-zinc-700">
                Teléfono*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="300 123 4567"
                className="rounded-lg border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="interest" className="text-sm font-semibold text-zinc-700">
              Estoy Interesado En
            </label>
            <select
              id="interest"
              name="interest"
              defaultValue=""
              className="rounded-lg border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-700"
            >
              <option value="">Selecciona una opción</option>
              {INTERESTS.map((interest) => (
                <option key={interest.value} value={interest.value}>
                  {interest.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold text-zinc-700">
              Mensaje*
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Cuéntanos más sobre lo que necesitas..."
              className="resize-y rounded-lg border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-700 placeholder:text-zinc-400"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-zinc-500">
            <input type="checkbox" required className="mt-1 h-4 w-4" />
            Acepto la política de privacidad y el tratamiento de mis datos personales
          </label>

          <button
            type="submit"
            className="rounded-xl bg-brand px-6 py-4 text-base font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Enviar Mensaje por WhatsApp
          </button>

          {sent && (
            <p className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
              Se abrió WhatsApp con tu mensaje. ¡Gracias por escribirnos!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
