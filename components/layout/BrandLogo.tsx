import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/paperkit.png"
      alt="Paperkit Logo"
      width={64}
      height={64}
      className={cn("object-contain drop-shadow-sm", className)}
      priority={priority}
    />
  );
}
