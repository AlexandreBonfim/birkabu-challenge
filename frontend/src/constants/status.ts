import type { MutationStatus } from "@tanstack/react-query";

export const QUERY_STATUS = {
  idle: "idle",
  pending: "pending",
  success: "success",
  error: "error",
} as const;

export type QueryStatus = (typeof QUERY_STATUS)[keyof typeof QUERY_STATUS];

export const UPLOAD_STATUS_LABELS: Record<MutationStatus, string> = {
  idle: "Ready to upload",
  pending: "Uploading & processing…",
  success: "Processed",
  error: "Upload failed",
};
