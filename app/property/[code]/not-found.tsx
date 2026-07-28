import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-red-500">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
      </svg>
      <h1 className="text-2xl font-bold text-zinc-900">Propiedad no encontrada</h1>
      <p className="text-zinc-500">Es posible que ya no esté disponible o el código sea incorrecto.</p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
