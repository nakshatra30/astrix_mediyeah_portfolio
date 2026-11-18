"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/constants";
import type { ApiResponse } from "@/types";

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

export function ContactForm({ services = SERVICE_OPTIONS }: { services?: string[] }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as ApiResponse<{ id: string }>;

      if (!response.ok || !payload.success) {
        if (!payload.success) {
          const details = payload.error.details as
            | Record<string, string[]>
            | undefined;
          if (details) setErrors(details);
          setMessage(payload.error.message);
        }
        setStatus("idle");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center gap-4 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-semibold text-white">Enquiry received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Thanks for reaching out. We review every enquiry personally and will
          reply within one working day.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setStatus("idle")}
          className="mt-2"
        >
          Send another enquiry
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
          A few details is all we need to start. Fields marked * are required.
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

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {message ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
          {message}
        </p>
      ) : null}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-zinc-600">
          By submitting, you agree to be contacted about your enquiry. We never
          share your details.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
