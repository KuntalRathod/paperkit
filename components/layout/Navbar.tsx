import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavbarActions } from "@/components/layout/NavbarActions";

const links = [
  { href: "/", label: "Home" },
  { href: "/#featured-tools", label: "Featured" },
  { href: "/#all-tools", label: "Tools" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="glass-panel mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 !rounded-full px-3 pl-4 sm:px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-text-primary"
          aria-label="Paperkit home"
        >
          <BrandLogo priority className="h-8 w-8" />
          <span className="truncate text-base font-semibold tracking-tight">
            Paperkit
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 text-sm text-text-secondary md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 transition-colors hover:bg-bg-subtle hover:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <NavbarActions />
      </div>
    </header>
  );
}
