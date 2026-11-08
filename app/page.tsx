"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CategoryFilter } from "@/components/home/CategoryFilter";
import { Hero } from "@/components/home/Hero";
import { ToolGrid } from "@/components/home/ToolGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SearchModal } from "@/components/shared/SearchModal";
import { Input } from "@/components/ui/Input";
import { tools, categories } from "@/config/tools";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const featuredTools = useMemo(
    () => tools.filter((tool) => tool.featured),
    [],
  );
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      return activeCategory === "all" || tool.category === activeCategory;
    });
  }, [activeCategory]);

  const activeCategoryLabel = useMemo(() => {
    if (activeCategory === "all") return "All tools";
    return categories.find((c) => c.id === activeCategory)?.label + " tools" || "Tools";
  }, [activeCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full flex-1">
        <Hero />
        <section
          id="tools"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 pt-4 sm:px-6"
        >
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 relative group">
              <Input
                value=""
                readOnly
                onClick={() => setIsSearchOpen(true)}
                placeholder="Search tools..."
                className="h-11 w-full cursor-pointer rounded-xl border border-border bg-surface pr-10 shadow-sm"
                aria-label="Search tools"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary group-hover:text-accent-text transition-colors">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <div className="shrink-0">
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>

          <div className="space-y-14">
            {activeCategory === "all" ? (
              <>
                <section id="featured-tools" className="scroll-mt-24">
                  <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-primary">
                    Featured tools
                  </h2>
                  <ToolGrid tools={featuredTools} />
                </section>

                <section id="all-tools" className="scroll-mt-24">
                  <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-primary">
                    All tools
                  </h2>
                  <ToolGrid tools={filteredTools} />
                </section>
              </>
            ) : (
              <>
                <section id="category-tools" className="scroll-mt-24">
                  <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-primary">
                    {activeCategoryLabel}
                  </h2>
                  <ToolGrid tools={filteredTools} />
                </section>

                <section id="featured-tools" className="scroll-mt-24">
                  <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-primary">
                    Featured tools
                  </h2>
                  <ToolGrid tools={featuredTools} />
                </section>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
