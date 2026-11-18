"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/input";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { submitJson } from "@/lib/admin-client";
import { slugify } from "@/lib/utils";

export type ProjectFormValues = {
  id?: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  imageUrl: string | null;
  gallery: string[];
  results: string[];
  liveUrl: string | null;
  year: number | null;
  order: number;
  featured: boolean;
  published: boolean;
  serviceId: string | null;
};

const empty: ProjectFormValues = {
  title: "",
  slug: "",
  client: "",
  category: PROJECT_CATEGORIES[0],
  summary: "",
  description: "",
  imageUrl: null,
  gallery: [],
  results: [],
  liveUrl: null,
  year: new Date().getFullYear(),
  order: 0,
  featured: false,
  published: true,
  serviceId: null,
};

export function ProjectForm({
  initial,
  services,
}: {
  initial?: ProjectFormValues;
  services: { id: string; title: string }[];
}) {
  const data = initial ?? empty;
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(data.title);
  const [slug, setSlug] = useState(data.slug);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [client, setClient] = useState(data.client);
  const [category, setCategory] = useState(data.category);
  const [summary, setSummary] = useState(data.summary);
  const [description, setDescription] = useState(data.description);
  const [imageUrl, setImageUrl] = useState(data.imageUrl ?? "");
  const [gallery, setGallery] = useState(data.gallery.join("\n"));
  const [results, setResults] = useState(data.results.join("\n"));
  const [liveUrl, setLiveUrl] = useState(data.liveUrl ?? "");
  const [year, setYear] = useState(data.year ? String(data.year) : "");
  const [order, setOrder] = useState(String(data.order));
  const [featured, setFeatured] = useState(data.featured);
  const [published, setPublished] = useState(data.published);
  const [serviceId, setServiceId] = useState(data.serviceId ?? "");

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleTitle = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage(null);

    const result = await submitJson<{ id: string }>(
      isEdit ? `/api/projects/${data.id}` : "/api/projects",
      isEdit ? "PATCH" : "POST",
      {
        title,
        slug,
        client,
        category,
        summary,
        description,
        imageUrl: imageUrl || null,
        gallery,
        results,
        liveUrl: liveUrl || null,
        year: year || null,
        order: Number(order) || 0,
        featured,
        published,
        serviceId: serviceId || null,
      },
    );

    if (!result.ok) {
      setErrors(result.errors);
      setMessage(result.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {message ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
          {message}
        </p>
      ) : null}

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Basics</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Project title" htmlFor="title" required error={errors.title?.[0]}>
            <Input
              id="title"
              value={title}
              onChange={(event) => handleTitle(event.target.value)}
              placeholder="Nocturne — Flagship rebrand"
            />
          </Field>
          <Field
            label="Slug"
            htmlFor="slug"
            required
            hint={`/projects/${slug || "your-slug"}`}
            error={errors.slug?.[0]}
          >
            <Input
              id="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
            />
          </Field>
          <Field label="Client" htmlFor="client" required error={errors.client?.[0]}>
            <Input
              id="client"
              value={client}
              onChange={(event) => setClient(event.target.value)}
              placeholder="Nocturne"
            />
          </Field>
          <Field label="Category" htmlFor="category" required error={errors.category?.[0]}>
            <Select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {PROJECT_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Summary" htmlFor="summary" required error={errors.summary?.[0]}>
          <Textarea
            id="summary"
            rows={3}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="One or two sentences for cards and previews."
          />
        </Field>
        <Field
          label="Full case study"
          htmlFor="description"
          required
          hint="Line breaks are preserved on the project page."
          error={errors.description?.[0]}
        >
          <Textarea
            id="description"
            rows={9}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="The brief, the approach and what changed as a result."
          />
        </Field>
      </div>

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Outcomes & media</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Results"
            htmlFor="results"
            hint="One outcome per line, e.g. +214% organic revenue"
            error={errors.results?.[0]}
          >
            <Textarea
              id="results"
              rows={5}
              value={results}
              onChange={(event) => setResults(event.target.value)}
              placeholder={"+214% organic revenue\n2.3× demo requests"}
            />
          </Field>
          <Field
            label="Gallery URLs"
            htmlFor="gallery"
            hint="One image URL per line"
            error={errors.gallery?.[0]}
          >
            <Textarea
              id="gallery"
              rows={5}
              value={gallery}
              onChange={(event) => setGallery(event.target.value)}
              placeholder={"https://images.unsplash.com/...\nhttps://images.unsplash.com/..."}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cover image URL" htmlFor="imageUrl" error={errors.imageUrl?.[0]}>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </Field>
          <Field label="Live URL" htmlFor="liveUrl" error={errors.liveUrl?.[0]}>
            <Input
              id="liveUrl"
              value={liveUrl}
              onChange={(event) => setLiveUrl(event.target.value)}
              placeholder="https://client-website.com"
            />
          </Field>
        </div>
      </div>

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Organisation</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Year" htmlFor="year" error={errors.year?.[0]}>
            <Input
              id="year"
              type="number"
              min={2000}
              max={2100}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </Field>
          <Field label="Order" htmlFor="order" error={errors.order?.[0]}>
            <Input
              id="order"
              type="number"
              min={0}
              value={order}
              onChange={(event) => setOrder(event.target.value)}
            />
          </Field>
          <Field
            label="Linked service"
            htmlFor="serviceId"
            error={errors.serviceId?.[0]}
          >
            <Select
              id="serviceId"
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
            >
              <option value="">No service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Checkbox
            label="Featured"
            description="Show in homepage highlights"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
          />
          <Checkbox
            label="Published"
            description="Visible on the public site"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isEdit ? "Save changes" : "Create project"}
        </Button>
        <Link
          href="/admin/projects"
          className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
        >
          Cancel
        </Link>
        {isEdit ? (
          <Link
            href={`/projects/${slug}`}
            target="_blank"
            className="ml-auto inline-flex items-center gap-1 text-[12px] text-zinc-500 transition-colors hover:text-white"
          >
            View live <ArrowUpRight className="h-3 w-3" />
          </Link>
        ) : null}
      </div>
    </form>
  );
}
