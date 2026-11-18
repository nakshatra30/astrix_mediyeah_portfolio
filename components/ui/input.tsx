import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition focus:border-neon/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-neon/15 disabled:cursor-not-allowed disabled:opacity-60";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-medium text-zinc-400", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(base, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(base, "appearance-none bg-ink-soft pr-10", className)}
      {...props}
    />
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="ml-1 text-neon">*</span> : null}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-zinc-600">{hint}</p>
      ) : null}
    </div>
  );
}

export function Checkbox({
  label,
  description,
  className,
  ...props
}: ComponentProps<"input"> & { label: string; description?: string }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20",
        className,
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-neon"
        {...props}
      />
      <span>
        <span className="block text-sm font-medium text-zinc-200">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-zinc-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
