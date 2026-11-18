import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AdminPageHeading({
  title,
  description,
  backHref,
  backLabel = "Back",
  actions,
}: {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7">
      {backHref ? (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-[11px] text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-3 w-3" />
          {backLabel}
        </Link>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-[13px] text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
