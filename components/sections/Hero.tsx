"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { LookupOption } from "@/lib/properties";

const SLIDES = ["/fachada-euro.jpg", "/property-img.jpg"];

function formatCOP(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
}

export function Hero({
  categories,
  cities,
  extraSlide,
}: {
  categories: LookupOption[];
  cities: LookupOption[];
  extraSlide?: string | null;
}) {
  const router = useRouter();
  const slides = extraSlide ? [...SLIDES, extraSlide] : SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState<"" | "arriendo" | "venta">("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetInterval();
  };

  const goToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    const categoryId = form.get("categoryId")?.toString();
    if (categoryId) params.set("categoryId", categoryId);
    const cityId = form.get("cityId")?.toString();
    if (cityId) params.set("cityId", cityId);
    const code = form.get("code")?.toString().trim();
    if (code) params.set("code", code);
    const min = minPrice.replace(/\./g, "");
    if (min) params.set("minPrice", min);
    const max = maxPrice.replace(/\./g, "");
    if (max) params.set("maxPrice", max);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {slides.map((src, index) => (
        <div
          key={src + index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: currentSlide === index ? 1 : 0 }}
        >
          <Image src={src} alt="" fill priority={index === 0} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/85 to-brand-light/75" />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-20 text-center text-white sm:px-8 sm:pt-24">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <h1 className="text-3xl font-extrabold leading-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] sm:text-5xl">
            Experiencia, respaldo y resultados en cada negocio
          </h1>
          <Image
            src="/label-euro.png"
            alt="Euro Inmobiliaria - 14 años acompañando familias"
            width={130}
            height={127}
            className="shrink-0 drop-shadow-lg"
          />
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-2xl">
          Invertir bien no es cuestión de suerte, es cuestión de asesoría
        </p>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-5 text-left shadow-2xl sm:p-8">
          <div className="mb-5 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setStatus((s) => (s === "arriendo" ? "" : "arriendo"))}
              className={`flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-bold transition-all ${
                status === "arriendo" ? "bg-brand text-white" : "text-brand"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full border-2 border-current ${status === "arriendo" ? "bg-white" : ""}`}
              />
              Arriendos
            </button>
            <button
              type="button"
              onClick={() => setStatus((s) => (s === "venta" ? "" : "venta"))}
              className={`flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-bold transition-all ${
                status === "venta" ? "bg-brand text-white" : "text-brand"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full border-2 border-current ${status === "venta" ? "bg-white" : ""}`}
              />
              Ventas
            </button>
            <button
              type="button"
              onClick={goToProjects}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-brand bg-brand px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Proyectos
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3v10M8 13l4-4M8 13L4 9"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Tipo de Propiedad</label>
              <select name="categoryId" defaultValue="" className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-700">
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Ubicación</label>
              <select name="cityId" defaultValue="" className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-700">
                <option value="">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Código</label>
              <input
                type="text"
                name="code"
                placeholder="Ej: 289"
                className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Precio Mínimo</label>
              <input
                type="text"
                inputMode="numeric"
                value={minPrice}
                onChange={(e) => setMinPrice(formatCOP(e.target.value))}
                placeholder="Ej: 100.000.000"
                className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Precio Máximo</label>
              <input
                type="text"
                inputMode="numeric"
                value={maxPrice}
                onChange={(e) => setMaxPrice(formatCOP(e.target.value))}
                placeholder="Ej: 500.000.000"
                className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>

            <button
              type="submit"
              className="col-span-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:col-span-2 lg:col-span-5"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((src, index) => (
          <button
            key={src + index}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index ? "scale-125 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
