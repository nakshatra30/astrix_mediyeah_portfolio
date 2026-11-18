import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Cover({
  src,
  alt,
  className,
  children,
  overlay = true,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  children?: ReactNode;
  overlay?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative overflow-hidden bg-ink-elevated", className)}
      style={
        src
          ? {
              backgroundImage: `url("${src.replace(/"/g, "%22")}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              backgroundImage:
                "radial-gradient(120% 120% at 15% 10%, rgba(168,85,247,0.45), transparent 55%), radial-gradient(120% 120% at 85% 90%, rgba(34,211,238,0.28), transparent 55%), linear-gradient(150deg, #12121f, #08080f)",
            }
      }
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.1),rgba(5,5,9,0.55))]" />
      {overlay ? (
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_35%,rgba(5,5,9,0.75)_100%)]" />
      ) : null}
      {children}
    </div>
  );
}
