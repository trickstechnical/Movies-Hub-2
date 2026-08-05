'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#cast", label: "Cast" },
  { href: "#trailer", label: "Trailer" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#showtimes", label: "Showtimes" },
];

export function Nav({ title }: { title: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-display text-xl tracking-[0.25em] text-foreground uppercase">
          {title}
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#showtimes"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
        >
          Get Tickets
        </a>
      </nav>
    </header>
  );
}
