"use client";

export function ShareWhatsAppButton({
  name,
  code,
  description,
}: {
  name: string;
  code: string;
  description: string | null;
}) {
  const handleClick = () => {
    const url = `${window.location.origin}/property-${code}`;
    const desc = description ? `\n${description}` : "";
    const text = `${name}\nCódigo: ${code}${desc}\n\nVer inmueble: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" />
      </svg>
      Compartir inmueble
    </button>
  );
}
