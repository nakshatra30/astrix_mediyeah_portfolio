"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/input";
import { submitJson } from "@/lib/admin-client";

export type TestimonialFormValues = {
  id?: string;
  clientName: string;
  clientRole: string;
  company: string | null;
  content: string;
  rating: number;
  avatarUrl: string | null;
  projectId: string | null;
  order: number;
  featured: boolean;
  published: boolean;
};

const empty: TestimonialFormValues = {
  clientName: "",
  clientRole: "",
  company: null,
  content: "",
  rating: 5,
  avatarUrl: null,
  projectId: null,
  order: 0,
  featured: false,
  published: true,
};

export function TestimonialForm({
  initial,
  projects,
}: {
  initial?: TestimonialFormValues;
  projects: { id: string; title: string }[];
}) {
  const data = initial ?? empty;
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [clientName, setClientName] = useState(data.clientName);
  const [clientRole, setClientRole] = useState(data.clientRole);
  const [company, setCompany] = useState(data.company ?? "");
  const [content, setContent] = useState(data.content);
  const [rating, setRating] = useState(String(data.rating));
  const [avatarUrl, setAvatarUrl] = useState(data.avatarUrl ?? "");
  const [projectId, setProjectId] = useState(data.projectId ?? "");
  const [order, setOrder] = useState(String(data.order));
  const [featured, setFeatured] = useState(data.featured);
  const [published, setPublished] = useState(data.published);

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage(null);

    const result = await submitJson<{ id: string }>(
      isEdit ? `/api/testimonials/${data.id}` : "/api/testimonials",
      isEdit ? "PATCH" : "POST",
      {
        clientName,
        clientRole,
        company: company || null,
        content,
        rating: Number(rating) || 5,
        avatarUrl: avatarUrl || null,
        projectId: projectId || null,
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

    router.push("/admin/testimonials");
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
        <h3 className="text-sm font-medium text-white">Client</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Client name"
            htmlFor="clientName"
            required
            error={errors.clientName?.[0]}
          >
            <Input
              id="clientName"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="Maya Chen"
            />
          </Field>
          <Field
            label="Role"
            htmlFor="clientRole"
            required
            error={errors.clientRole?.[0]}
          >
            <Input
              id="clientRole"
              value={clientRole}
              onChange={(event) => setClientRole(event.target.value)}
              placeholder="Founder & CEO"
            />
          </Field>
          <Field label="Company" htmlFor="company" error={errors.company?.[0]}>
            <Input
              id="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Nocturne"
            />
          </Field>
          <Field label="Avatar URL" htmlFor="avatarUrl" error={errors.avatarUrl?.[0]}>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </Field>
        </div>
        <Field
          label="Testimonial"
          htmlFor="content"
          required
          hint="Quote exactly as the client said it."
          error={errors.content?.[0]}
        >
          <Textarea
            id="content"
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="They translated a fuzzy ambition into a brand and site we're genuinely proud of."
          />
        </Field>
      </div>

      <div className="admin-panel space-y-4 p-5 sm:p-6">
        <h3 className="text-sm font-medium text-white">Details</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Rating" htmlFor="rating" error={errors.rating?.[0]}>
            <Select
              id="rating"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} star{value === 1 ? "" : "s"}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Linked project"
            htmlFor="projectId"
            error={errors.projectId?.[0]}
          >
            <Select
              id="projectId"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
            >
              <option value="">No project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </Select>
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
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Checkbox
            label="Featured"
            description="Prioritise in testimonial sections"
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
          {isEdit ? "Save changes" : "Create testimonial"}
        </Button>
        <Link
          href="/admin/testimonials"
          className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
