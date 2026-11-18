import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(110deg,#a855f7,#6366f1_52%,#22d3ee)] text-white shadow-[0_10px_40px_-14px_rgba(168,85,247,0.8)] hover:shadow-[0_16px_50px_-12px_rgba(34,211,238,0.55)] hover:brightness-110",
  secondary:
    "glass text-white hover:border-neon/40 hover:bg-white/[0.08]",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/[0.06]",
  outline:
    "border border-white/15 text-white hover:border-electric/50 hover:text-electric-bright",
  danger:
    "border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 rounded-full px-4 text-[13px]",
  md: "h-11 gap-2 rounded-full px-6 text-sm",
  lg: "h-13 gap-2.5 rounded-full px-8 text-[15px]",
  icon: "h-10 w-10 rounded-full p-0",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
