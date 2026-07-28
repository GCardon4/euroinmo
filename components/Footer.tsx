import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/properties", label: "Propiedades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/euroinmobiliaria.sas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/euro_inmobiliaria",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.09 4.09 0 0 1 1.47.957c.453.454.774.898.957 1.47.163.46.349 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.241 1.97-.404 2.43a4.09 4.09 0 0 1-.957 1.47 4.09 4.09 0 0 1-1.47.957c-.46.163-1.26.349-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.241-2.43-.404a4.09 4.09 0 0 1-1.47-.957 4.09 4.09 0 0 1-.957-1.47c-.163-.46-.349-1.26-.404-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.17.241-1.97.404-2.43a4.09 4.09 0 0 1 .957-1.47A4.09 4.09 0 0 1 5.064 2.3c.46-.163 1.26-.349 2.43-.404C8.76 1.838 9.14 1.826 12 1.826V2.163ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/573507776633",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand to-zinc-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-euro-white.png" alt="" width={44} height={33} />
            <h3 className="text-xl font-bold">Euro Inmobiliaria</h3>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/85">
            Líder en bienes raíces del Oriente Antioqueño. Más de 14 años conectando personas con
            sus hogares ideales.
          </p>
          <Image src="/label-euro.png" alt="" width={90} height={88} className="drop-shadow-lg" />
          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
          <ul className="space-y-3 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/85 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
          <ul className="space-y-4 text-sm text-white/85">
            <li>
              <a
                href="https://www.google.com/maps/place/Euro+Inmobiliaria/@6.1725905,-75.3330971,17.75z/data=!4m6!3m5!1s0x8e46a100b9912197:0xf93f9e5cb4ac9fb!8m2!3d6.1724591!4d-75.3345397!16s%2Fg%2F11j8rn2pfm"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Calle 29 N° 29-15
                <br />
                Marinilla, Antioquia
              </a>
            </li>
            <li>
              <a href="https://wa.me/573507776633" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                +57 350 777 6633
              </a>
            </li>
            <li>
              <a href="mailto:euroinmobiliaria2012@gmail.com" className="transition-colors hover:text-white">
                euroinmobiliaria2012@gmail.com
              </a>
            </li>
            <li>
              Lun - Vie: 9:00 AM - 6:00 PM
              <br />
              Sábados: 9:00 AM - 3:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/70 sm:px-8">
        © {new Date().getFullYear()} Euro Inmo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
