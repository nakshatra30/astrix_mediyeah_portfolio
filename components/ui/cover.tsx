import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Cover({
  src,
  alt,
  className,
  children,
  overlay = true,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  children?: ReactNode;
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-elevated", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,rgba(168,85,247,0.45),transparent_55%),radial-gradient(120%_120%_at_85%_90%,rgba(34,211,238,0.28),transparent_55%),linear-gradient(150deg,#12121f,#08080f)]"
        />
      )}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.1),rgba(5,5,9,0.55))]"
        aria-hidden="true"
      />
      {overlay ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_35%,rgba(5,5,9,0.75)_100%)]"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}
