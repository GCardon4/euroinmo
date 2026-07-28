import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <Image
          src="/logotipo-euro.svg"
          alt="Euro Inmobiliaria"
          width={140}
          height={117}
          priority
        />
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#076081] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#054d68]"
        >
          Contáctanos
        </a>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        <Image
          src="/fachada-euro.jpg"
          alt="Fachada de Euro Inmobiliaria"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

        <div className="relative z-10 mx-6 max-w-2xl py-24 text-white sm:mx-12">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Experiencia, respaldo y resultados en cada negocio
          </h1>
          <p className="mt-6 text-lg italic text-white/90 sm:text-xl">
            Invertir bien no es cuestión de suerte, es cuestión de asesoría
          </p>
          <p className="mt-4 max-w-lg text-base text-white/80 sm:text-lg">
            Empresa inmobiliaria con 14 años de experiencia, acompañando
            familias por sus sueños.
          </p>
        </div>
      </main>

      <footer className="bg-[#076081] px-6 py-6 text-center text-sm text-white/80 sm:px-12">
        © {new Date().getFullYear()} Euro Inmobiliaria. Todos los derechos
        reservados.
      </footer>
    </div>
  );
}
