"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/properties";

export function ProjectSection({ project }: { project: Project }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const features = project.information
    ? project.information.split(/[,|]/).map((item) => item.trim()).filter(Boolean)
    : [];
  const images = project.images.length > 0 ? project.images : ["/property-img.jpg"];

  const whatsappHref = project.contact
    ? `https://wa.me/57${String(project.contact).replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hola, me interesa saber más sobre el proyecto "${project.name}". Muchas gracias.`,
      )}`
    : "https://wa.me/";

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section id="proyectos" className="bg-zinc-50 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-zinc-900">Proyectos Sobre Planos</h2>
          <p className="mt-2 text-lg text-zinc-500">
            Proyectos innovadores y diseñados para mejorar tu estilo de vida
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 overflow-hidden rounded-2xl shadow-lg sm:h-96">
            <Image
              src={images[0]}
              alt={project.name}
              fill
              className="cursor-pointer object-cover transition-transform hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
              onClick={() => {
                setIndex(0);
                setGalleryOpen(true);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setGalleryOpen(true);
              }}
              title="Ver galería"
              className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand shadow-lg transition-transform hover:scale-110"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-zinc-900">{project.name}</h3>
            {project.slogan && <p className="mt-2 text-lg font-semibold text-brand">{project.slogan}</p>}
            {project.description && (
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-zinc-600">
                {project.description}
              </p>
            )}

            {features.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Características
                </h4>
                <ul className="flex flex-col gap-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-zinc-700">
                      <span className="mt-0.5 font-bold text-brand">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 font-semibold text-brand"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-transform hover:-translate-y-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.05a8.11 8.11 0 0 1-4.14-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.13 8.13 0 0 1-1.25-4.3c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.51-3.66 8.14-8.17 8.14Zm4.48-6.11c-.25-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z" />
                </svg>
              </span>
              Contactar este Proyecto
            </a>
          </div>
        </div>
      </div>

      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setGalleryOpen(false)}
        >
          <div
            className="relative flex max-h-[85vh] w-full max-w-4xl flex-col gap-4 rounded-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setGalleryOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-md"
            >
              ✕
            </button>

            <div className="relative flex-1 overflow-hidden rounded-xl bg-black" style={{ minHeight: "50vh" }}>
              <Image src={images[index]} alt={project.name} fill className="object-contain" />
              <span className="absolute left-4 top-4 rounded-lg bg-black/60 px-3 py-1 text-sm font-medium text-white">
                {index + 1} / {images.length}
              </span>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-md"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-md"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                      i === index ? "border-brand" : "border-transparent"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
