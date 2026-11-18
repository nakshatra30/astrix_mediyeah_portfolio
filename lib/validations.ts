import { z } from "zod";

const emptyToNull = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? null : value;

const optionalUrl = z.preprocess(
  emptyToNull,
  z.string().trim().url("Enter a valid URL.").max(2048).nullable().optional(),
);

const optionalText = (max = 500) =>
  z.preprocess(
    emptyToNull,
    z.string().trim().max(max).nullable().optional(),
  );

const lines = z.preprocess(
  (value) => {
    if (typeof value === "string") {
      return value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }
    if (Array.isArray(value)) {
      return value.map((line) => String(line).trim()).filter(Boolean);
    }
    return value;
  },
  z.array(z.string().min(1).max(300)).max(24).default([]),
);

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(90)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers and hyphens only.",
  );

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(6, "Password is too short.").max(200),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(160),
  slug: slugSchema,
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description should be at least 10 characters.")
    .max(300),
  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters.")
    .max(8000),
  icon: z.string().trim().min(1).max(40).default("sparkles"),
  features: lines,
  imageUrl: optionalUrl,
  price: optionalText(120),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(160),
  slug: slugSchema,
  client: z.string().trim().min(2, "Client is required.").max(160),
  category: z.string().trim().min(2, "Category is required.").max(80),
  summary: z
    .string()
    .trim()
    .min(10, "Summary should be at least 10 characters.")
    .max(400),
  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters.")
    .max(8000),
  imageUrl: optionalUrl,
  gallery: lines,
  results: lines,
  liveUrl: optionalUrl,
  year: z
    .preprocess(
      (value) => (value === "" || value === null || value === undefined ? null : value),
      z.coerce.number().int().min(2000).max(2100).nullable().optional(),
    ),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  serviceId: z.preprocess(
    emptyToNull,
    z.string().trim().max(40).nullable().optional(),
  ),
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(2, "Client name is required.").max(120),
  clientRole: z.string().trim().min(2, "Client role is required.").max(120),
  company: optionalText(160),
  content: z
    .string()
    .trim()
    .min(20, "Testimonial should be at least 20 characters.")
    .max(2000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  avatarUrl: optionalUrl,
  projectId: z.preprocess(
    emptyToNull,
    z.string().trim().max(40).nullable().optional(),
  ),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  phone: optionalText(40),
  company: optionalText(160),
  service: optionalText(120),
  budget: optionalText(80),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more.")
    .max(5000, "Message is too long."),
  website: z.string().max(0, "Spam detected.").optional(),
});

export const enquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "RESPONDED", "CLOSED"]).optional(),
  notes: optionalText(3000),
});

export const settingsSchema = z.object({
  settings: z.record(z.string().min(1).max(120), z.string().max(5000)),
});

export const mediaSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(160),
  url: z.string().trim().url("Enter a valid URL.").max(2048),
  alt: optionalText(300),
  type: z.enum(["image", "document", "video"]).default("image"),
});
