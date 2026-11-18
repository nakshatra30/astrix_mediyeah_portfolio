"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiResponse } from "@/types";

export function DeleteButton({
  endpoint,
  label = "Delete",
  confirmMessage = "Delete this record? This cannot be undone.",
  redirectTo,
  variant = "danger",
  compact = false,
  onDeleted,
}: {
  endpoint: string;
  label?: string;
  confirmMessage?: string;
  redirectTo?: string;
  variant?: "danger" | "ghost";
  compact?: boolean;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(confirmMessage)) return;
    setLoading(true);

    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        window.alert(
          payload.success ? "Delete failed." : payload.error.message,
        );
        setLoading(false);
        return;
      }

      onDeleted?.();

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      window.alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleDelete}
      disabled={loading}
      aria-label={label}
      className={compact ? "px-2.5" : undefined}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      {!compact ? label : null}
    </Button>
  );
}
