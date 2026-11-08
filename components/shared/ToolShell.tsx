import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ToolShellProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ToolShell({
  title,
  description,
  icon,
  children,
}: ToolShellProps) {
  return (
    <section className="relative">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="section-label px-3 py-1.5 text-xs font-medium transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All tools
        </Link>
        <header className="mt-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-md [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-current">
            {icon}
          </div>
          <div className="min-w-0">
            <h1 className="hero-display text-3xl leading-tight text-text-primary sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
              {description}
            </p>
          </div>
        </header>
        <div className="glass-card mt-8 !rounded-3xl p-4 shadow-md sm:p-6">{children}</div>
      </div>
    </section>
  );
}
