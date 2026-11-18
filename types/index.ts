import type { EnquiryStatus } from "@prisma/client";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export type ApiFailure = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type AdminSession = {
  adminId: string;
  email: string;
  name: string;
  role: string;
};

export type EnquiryStatusValue = EnquiryStatus;

export type SettingDefinition = {
  key: string;
  label: string;
  group: string;
  type: "text" | "textarea" | "url" | "email" | "tel";
  defaultValue: string;
  hint?: string;
};

export type ServiceFeatureIcon =
  | "megaphone"
  | "share"
  | "code"
  | "palette"
  | "search"
  | "pen";
