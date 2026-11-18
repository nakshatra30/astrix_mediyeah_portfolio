"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { BUDGET_OPTIONS } from "@/lib/constants";
import { contact } from "@/data/contact";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ services }: { services: string[] }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string[]> = {};
    if (!form.name.trim()) next.name = ["Please add your name."];
    if (!form.email.trim()) {
      next.email = ["Please add your email address."];
    } else if (!emailPattern.test(form.email.trim())) {
      next.email = ["Please enter a valid email address."];
    }
    if (!form.message.trim()) next.message = ["Tell us a little about the project."];
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const lines = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      form.company.trim() ? `Company: ${form.company.trim()}` : null,
      form.service ? `Service: ${form.service}` : null,
      form.budget ? `Budget: ${form.budget}` : null,
      "",
      "Project details:",
      form.message.trim(),
    ].filter((line): line is string => line !== null);

    const url = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Project enquiry — ${form.name.trim()}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setMailtoUrl(url);
    window.location.href = url;
  };

  if (mailtoUrl) {
    return (
      <div className="glass-card flex flex-col items-center gap-4 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-semibold text-white">Your email draft is ready</h3>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Your email app should have opened with the enquiry filled in. Send it
          and we&apos;ll reply within one working day. Nothing is stored on this
          site.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailtoUrl}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            Open email app
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp instead
          </a>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setMailtoUrl(null);
            setForm(initialState);
          }}
          className="mt-2"
        >
          Write another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card flex flex-col gap-4 p-6 sm:p-8"
      noValidate
    >
      <div className="mb-1">
        <h2 className="text-xl font-semibold text-white">Tell us about the project</h2>
        <p className="mt-1.5 text-sm text-zinc-500">
          This form opens your email app with everything filled in. Fields marked
          * are required.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name?.[0]}>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Alex Morgan"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.[0]}>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="alex@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Company" htmlFor="company" error={errors.company?.[0]}>
          <Input
            id="company"
            name="company"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Company name"
            autoComplete="organization"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.[0]}>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+1 555 000 0000"
            autoComplete="tel"
          />
        </Field>
        <Field label="Service" htmlFor="service" error={errors.service?.[0]}>
          <Select
            id="service"
            name="service"
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Budget" htmlFor="budget" error={errors.budget?.[0]}>
          <Select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
          >
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Project details"
        htmlFor="message"
        required
        error={errors.message?.[0]}
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="What are you building, what's the timeline, and what does success look like?"
        />
      </Field>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-zinc-600">
          By submitting, you agree to be contacted about your enquiry. We never
          share your details.
        </p>
        <Button type="submit" size="lg" className="shrink-0">
          Compose enquiry
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 text-xs text-zinc-500 transition-colors hover:text-white"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        Prefer WhatsApp? Message us directly
      </a>
    </form>
  );
}
