"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/input";
import { submitJson } from "@/lib/admin-client";

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESPONDED", label: "Responded" },
  { value: "CLOSED", label: "Closed" },
];

export function EnquiryDetailForm({
  id,
  initialStatus,
  initialNotes,
}: {
  id: string;
  initialStatus: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setSaved(false);

    const result = await submitJson<{ id: string }>(
      `/api/contact/${id}`,
      "PATCH",
      { status, notes: notes || null },
    );

    setSaving(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-panel space-y-4 p-5">
      <h3 className="text-sm font-medium text-white">Pipeline</h3>
      <Field label="Status" htmlFor="status">
        <Select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Internal notes"
        htmlFor="notes"
        hint="Only visible to the admin team."
      >
        <Textarea
          id="notes"
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Call scheduled, proposal sent..."
        />
      </Field>
      {message ? (
        <p className="text-[12px] text-red-300">{message}</p>
      ) : null}
      {saved ? (
        <p className="text-[12px] text-emerald-300">Enquiry updated.</p>
      ) : null}
      <Button type="submit" size="sm" disabled={saving}>
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Save className="h-3.5 w-3.5" />
        )}
        Save update
      </Button>
    </form>
  );
}
