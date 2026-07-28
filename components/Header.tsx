"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/properties", label: "Propiedades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/logotipo-euro.svg" alt="Euro Inmobiliaria" width={40} height={33} />
          <span className="text-xl font-bold tracking-tight text-brand">Euro Inmobiliaria</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-zinc-100 bg-zinc-50 px-6 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
