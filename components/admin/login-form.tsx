"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import type { ApiResponse } from "@/types";

export function LoginForm({ next = "/admin" }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        setError(
          payload.success ? "Unable to sign in." : payload.error.message,
        );
        setLoading(false);
        return;
      }

      const destination = next.startsWith("/admin") ? next : "/admin";
      router.push(destination);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm" noValidate>
      <div className="mb-8">
        <p className="eyebrow">Admin access</p>
        <h1 className="mt-4 text-3xl font-semibold">Welcome back.</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to manage the Astrix Mediyeah website.
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Email" htmlFor="email" required>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@astrixmediyeah.com"
              autoComplete="email"
              className="pl-10"
              required
            />
          </div>
        </Field>

        <Field label="Password" htmlFor="password" required>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              className="pl-10"
              required
            />
          </div>
        </Field>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="group mt-6 w-full"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-6 text-center text-[11px] text-zinc-600">
        Sessions expire after 7 days. Credentials are set during seeding.
      </p>
    </form>
  );
}
