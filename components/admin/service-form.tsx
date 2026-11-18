"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/input";
import { submitJson } from "@/lib/admin-client";
import { slugify } from "@/lib/utils";

const ICON_OPTIONS = [
  { value: "megaphone", label: "Megaphone — Digital marketing" },
  { value: "share", label: "Share — Social media" },
  { value: "code", label: "Code — Web development" },
  { value: "palette", label: "Palette — Branding & design" },
  { value: "search", label: "Search — SEO" },
  { value: "pen", label: "Pen — Content creation" },
  { value: "sparkles", label: "Sparkles — General" },
];

export type ServiceFormValues = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl: string | null;
  price: string | null;
  order: number;
  featured: boolean;
  published: boolean;
};

const empty: ServiceFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  icon: "sparkles",
  features: [],
  imageUrl: null,
  price: null,
  order: 0,
  featured: false,
  published: true,
};

export function ServiceForm({ initial }: { initial?: ServiceFormValues }) {
  const data = initial ?? empty;
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(data.title);
  const [slug, setSlug] = useState(data.slug);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [shortDescription, setShortDescription] = useState(data.shortDescription);
  const [description, setDescription] = useState(data.description);
  const [icon, setIcon] = useState(data.icon);
  const [features, setFeatures] = useState(data.features.join("\n"));
  const [imageUrl, setImageUrl] = useState(data.imageUrl ?? "");
  const [price, setPrice] = useState(data.price ?? "");
  const [order, setOrder] = useState(String(data.order));
  const [featured, setFeatured] = useState(data.featured);
  const [published, setPublished] = useState(data.published);

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
      isEdit ? `/api/services/${data.id}` : "/api/services",
      isEdit ? "PATCH" : "POST",
      {
        title,
        slug,
        shortDescription,
        description,
        icon,
        features,
        imageUrl: imageUrl || null,
        price: price || null,
        order: Number(order) || 0,
        featured,
        published,
      },
    );

    if (!result.ok) {
      setErrors(result.errors);
      setMessage(result.message);
      setSaving(false);
      return;
    }

    router.push("/admin/services");
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
          <Field label="Title" htmlFor="title" required error={errors.title?.[0]}>
            <Input
              id="title"
              value={title}
              onChange={(event) => handleTitle(event.target.value)}
              placeholder="Website Development"
            />
          </Field>
          <Field
            label="Slug"
            htmlFor="slug"
            required
            hint={`/services/${slug || "your-slug"}`}
            error={errors.slug?.[0]}
          >
            <Input
              id="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="website-development"
            />
          </Field>
        </div>
        <Field
          label="Short description"
          htmlFor="shortDescription"
          required
          error={errors.shortDescription?.[0]}
        >
          <Textarea
            id="shortDescription"
            rows={3}
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="One punchy sentence for cards and listings."
          />
        </Field>
        <Field
          label="Full description"
          htmlFor="description"
          required
          hint="Used on the service detail page. Line breaks are preserved."
          error={errors.description?.[0]}
        >
          <Textarea
            id="description"
            rows={8}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Explain the engagement, the outcome and how you deliver it."
          />
        </Field>
      </div>

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Icon" htmlFor="icon" error={errors.icon?.[0]}>
            <Select
              id="icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
            >
              {ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Price / starting at" htmlFor="price" error={errors.price?.[0]}>
            <Input
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="From $4,000"
            />
          </Field>
        </div>
        <Field
          label="Features"
          htmlFor="features"
          hint="One per line. Shown on cards and the detail page."
          error={errors.features?.[0]}
        >
          <Textarea
            id="features"
            rows={6}
            value={features}
            onChange={(event) => setFeatures(event.target.value)}
            placeholder={"Custom design system\nCMS integration\nPerformance tuning"}
          />
        </Field>
        <Field label="Cover image URL" htmlFor="imageUrl" error={errors.imageUrl?.[0]}>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
        </Field>
      </div>

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Publishing</h3>
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <Field label="Order" htmlFor="order" error={errors.order?.[0]}>
            <Input
              id="order"
              type="number"
              min={0}
              value={order}
              onChange={(event) => setOrder(event.target.value)}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Checkbox
              label="Featured"
              description="Highlight on the homepage"
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
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isEdit ? "Save changes" : "Create service"}
        </Button>
        <Link
          href="/admin/services"
          className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
        >
          Cancel
        </Link>
        {isEdit ? (
          <Link
            href={`/services/${slug}`}
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
