"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PropertyGallery({ images, name }: { images: string[]; name: string }) {
  const gallery = images.length > 0 ? images : ["/property-img.jpg"];
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const next = () => setIndex((i) => (i + 1) % gallery.length);
  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, gallery.length]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={gallery[index]}
          alt={name}
          fill
          priority
          unoptimized
          className="cursor-pointer object-cover transition-transform hover:scale-[1.02]"
          sizes="(min-width: 1024px) 55vw, 100vw"
          onClick={() => setModalOpen(true)}
        />
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white transition-colors hover:bg-black/70"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente imagen"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white transition-colors hover:bg-black/70"
            >
              ›
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? "border-brand" : "border-zinc-200 hover:border-brand-light"
              }`}
            >
              <Image src={src} alt="" fill unoptimized className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            aria-label="Cerrar"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition-colors hover:bg-white/30"
          >
            ✕
          </button>

          <div className="relative h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={gallery[index]} alt={name} fill unoptimized className="object-contain" />
          </div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 font-semibold text-white">
            {index + 1} / {gallery.length}
          </span>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Imagen anterior"
                className="absolute left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition-colors hover:bg-white/30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Siguiente imagen"
                className="absolute right-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition-colors hover:bg-white/30"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
