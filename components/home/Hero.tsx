"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock, Star, Zap } from "lucide-react";
import Link from "next/link";

const badges = [
  { label: "No watermark", icon: CheckCircle2 },
  { label: "Files stay on your device", icon: Lock },
  { label: "Instant, no sign-up", icon: Zap },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const [stars, setStars] = useState<number | string>(2);

  useEffect(() => {
    fetch("https://api.github.com/repos/KuntalRathod/paperkit")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="linework pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-20 text-center sm:pb-24 sm:pt-28"
      >
        <motion.a
          variants={fade}
          href="https://github.com/KuntalRathod/paperkit"
          target="_blank"
          rel="noopener noreferrer"
          className="section-label px-3 py-1.5 text-xs font-medium transition-colors hover:text-text-primary"
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {stars} on GitHub · Open source
        </motion.a>

        <motion.h1
          variants={fade}
          className="hero-display mt-6 text-5xl leading-[1.05] text-text-primary sm:text-7xl"
        >
          Every PDF tool you need,
          <br />
          <span className="gradient-text">free and private.</span>
        </motion.h1>

        <motion.p
          variants={fade}
          className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg"
        >
          Merge, split, compress, convert and sign PDFs right in your browser.
          Nothing is uploaded.
        </motion.p>

        <motion.div variants={fade} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#tools"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl active:scale-95"
          >
            Browse tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/merge-pdf"
            className="inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary shadow-sm transition-colors hover:border-border-hover hover:bg-bg-subtle active:scale-95"
          >
            Merge PDFs
          </Link>
        </motion.div>

        <motion.ul
          variants={fade}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary"
        >
          {badges.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-accent-text" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
