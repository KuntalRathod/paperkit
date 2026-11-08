import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/config/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md sm:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent-text transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-text-primary">
          {tool.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
