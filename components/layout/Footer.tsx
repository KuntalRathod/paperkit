"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { defaultFeatures, toolFeaturesMap } from "@/lib/data/toolFeatures";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const features = toolFeaturesMap[pathname.slice(1)] || defaultFeatures;

  return (
    <footer className="mt-auto text-sm text-text-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {isHome ? (
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 text-center text-accent-foreground shadow-lg sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="hero-display relative mx-auto max-w-2xl text-3xl leading-tight sm:text-5xl">
              Ready to simplify your PDF workflow?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-sm opacity-85 sm:text-base">
              Everything runs in your browser. No compromises on privacy or speed.
            </p>
            <Link
              href="/merge-pdf"
              className="relative mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-neutral-900 shadow-md transition-transform hover:scale-[1.03] active:scale-95"
            >
              Get started
            </Link>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent-text">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-5">{feature.desc}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2" aria-label="Paperkit home">
            <BrandLogo className="h-7 w-7" />
            <span className="font-semibold text-text-primary">Paperkit</span>
          </Link>
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Paperkit. Built by Kuntal.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/kuntalrathod/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a
              href="https://x.com/kuntalrathod77"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
