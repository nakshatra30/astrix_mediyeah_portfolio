"use client";

import { useMemo, useState } from "react";
import { FileText, ImageIcon, Loader2, Plus, Search, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { DeleteButton } from "@/components/admin/delete-button";
import { submitJson } from "@/lib/admin-client";
import { formatDate } from "@/lib/utils";

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string | null;
  type: "image" | "document" | "video";
  createdAt: string;
};

const typeIcon = {
  image: ImageIcon,
  document: FileText,
  video: Video,
};

export function MediaLibrary({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [type, setType] = useState<"image" | "document" | "video">("image");

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.alt?.toLowerCase().includes(q),
    );
  }, [items, query]);

  const resetForm = () => {
    setName("");
    setUrl("");
    setAlt("");
    setType("image");
    setErrors({});
    setMessage(null);
  };

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage(null);

    const result = await submitJson<MediaItem>("/api/media", "POST", {
      name,
      url,
      alt: alt || null,
      type,
    });

    if (!result.ok) {
      setErrors(result.errors);
      setMessage(result.message);
      setSaving(false);
      return;
    }

    setItems((current) => [
      { ...result.data, createdAt: new Date(result.data.createdAt).toISOString() },
      ...current,
    ]);
    setSaving(false);
    setAdding(false);
    resetForm();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search media..."
            className="pl-9"
            aria-label="Search media"
          />
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setAdding((current) => !current);
            setMessage(null);
            setErrors({});
          }}
        >
          {adding ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {adding ? "Close" : "Add media URL"}
        </Button>
      </div>

      {adding ? (
        <form
          onSubmit={handleAdd}
          className="admin-panel space-y-4 p-5"
          noValidate
        >
          <div>
            <h3 className="text-sm font-medium text-white">Register media</h3>
            <p className="mt-1 text-[12px] text-zinc-500">
              Save a hosted image, document or video URL to the library so the
              team can reuse it.
            </p>
          </div>

          {message ? (
            <p className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
              {message}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="media-name" required error={errors.name?.[0]}>
              <Input
                id="media-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Homepage hero"
              />
            </Field>
            <Field label="Type" htmlFor="media-type" error={errors.type?.[0]}>
              <Select
                id="media-type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as "image" | "document" | "video")
                }
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
              </Select>
            </Field>
          </div>
          <Field label="URL" htmlFor="media-url" required error={errors.url?.[0]}>
            <Input
              id="media-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </Field>
          <Field label="Alt text" htmlFor="media-alt" error={errors.alt?.[0]}>
            <Input
              id="media-alt"
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Describe the image for accessibility"
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              Save to library
            </Button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                resetForm();
              }}
              className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <div key={item.id} className="admin-panel overflow-hidden">
                <div className="relative aspect-[4/3] bg-white/[0.02]">
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.alt ?? item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon className="h-8 w-8 text-zinc-700" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] capitalize text-zinc-300 backdrop-blur">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-zinc-200">
                      {item.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-zinc-600">
                      {item.alt || "No alt text"}
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-700">
                      {formatDate(item.createdAt)}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block max-w-full truncate text-[10px] text-electric-bright/70 transition-colors hover:text-electric-bright"
                    >
                      {item.url}
                    </a>
                  </div>
                  <DeleteButton
                    endpoint={`/api/media/${item.id}`}
                    confirmMessage={`Remove "${item.name}" from the media library?`}
                    onDeleted={() =>
                      setItems((current) =>
                        current.filter((row) => row.id !== item.id),
                      )
                    }
                    compact
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="admin-panel p-10 text-center">
          <ImageIcon className="mx-auto h-6 w-6 text-zinc-700" />
          <p className="mt-3 text-sm text-zinc-500">
            {query ? "No media matches your search." : "No media registered yet."}
          </p>
        </div>
      )}
    </div>
  );
}
