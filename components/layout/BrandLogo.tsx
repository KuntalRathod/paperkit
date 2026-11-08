import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Paperkit Logo"
      width={64}
      height={64}
      unoptimized
      className={cn("shrink-0 rounded-xl object-contain shadow-sm", className)}
      priority={priority}
    />
  );
}
