"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { submitJson } from "@/lib/admin-client";

export type SettingField = {
  key: string;
  label: string;
  type: string;
  defaultValue: string;
  hint?: string;
};

export type SettingsSection = {
  title: string;
  description?: string;
  fields: SettingField[];
};

export function SettingsForm({
  sections,
  initial,
}: {
  sections: SettingsSection[];
  initial: Record<string, string>;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setSaved(false);

    const result = await submitJson<Record<string, string>>(
      "/api/settings",
      "PUT",
      { settings: values },
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {sections.map((section) => (
        <section key={section.title} className="admin-panel p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-sm font-medium text-white">{section.title}</h3>
            {section.description ? (
              <p className="mt-1 text-[12px] text-zinc-500">
                {section.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4">
            {section.fields.map((field) => {
              const id = field.key.replace(/\./g, "-");
              const value = values[field.key] ?? field.defaultValue;
              return (
                <Field
                  key={field.key}
                  label={field.label}
                  htmlFor={id}
                  hint={field.hint ?? field.key}
                >
                  {field.type === "textarea" ? (
                    <Textarea
                      id={id}
                      rows={field.key.includes("description") || field.key.includes("story") ? 5 : 3}
                      value={value}
                      onChange={(event) =>
                        setValue(field.key, event.target.value)
                      }
                    />
                  ) : (
                    <Input
                      id={id}
                      type={
                        field.type === "email"
                          ? "email"
                          : field.type === "tel"
                            ? "tel"
                            : field.type === "url"
                              ? "url"
                              : "text"
                      }
                      value={value}
                      onChange={(event) =>
                        setValue(field.key, event.target.value)
                      }
                    />
                  )}
                </Field>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/85 p-3.5 backdrop-blur-xl">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save changes
        </Button>
        {message ? (
          <span className="text-[12px] text-red-300">{message}</span>
        ) : null}
        {saved ? (
          <span className="text-[12px] text-emerald-300">
            Changes saved and live.
          </span>
        ) : null}
      </div>
    </form>
  );
}
