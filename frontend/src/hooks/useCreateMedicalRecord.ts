import { useEffect, useMemo, useState } from "react";
import { useMutation, type MutationStatus } from "@tanstack/react-query";
import { uploadMedicalRecord } from "../api/medicalRecords";
import { ERROR_CHOOSE_FILE } from "../constants/messages";
import { UPLOAD_STATUS_LABELS } from "../constants/status";
import type { MedicalRecord } from "../types/medicalRecord";

export type UploadStatus = MutationStatus;

const EMPTY_STRUCTURED_JSON = "{}";

function useObjectUrl(file: File | null) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return preview;
}

export function useCreateMedicalRecord() {
  const [file, setFile] = useState<File | null>(null);
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [editedRawText, setEditedRawText] = useState("");
  const [structuredDraft, setStructuredDraft] =
    useState(EMPTY_STRUCTURED_JSON);
  const [error, setError] = useState<string | null>(null);

  const filePreview = useObjectUrl(file);

  const parsedStructured = useMemo(() => {
    try {
      return JSON.parse(structuredDraft) as Record<string, unknown>;
    } catch {
      return null;
    }
  }, [structuredDraft]);

  const uploadMutation = useMutation({
    mutationFn: uploadMedicalRecord,
    onSuccess: (data) => {
      setRecord(data);
      setEditedRawText(data.raw_text ?? "");
      setStructuredDraft(
        JSON.stringify(data.structured_data ?? {}, null, 2) ||
          EMPTY_STRUCTURED_JSON
      );
      setError(null);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleUpload = () => {
    if (!file) {
      setError(ERROR_CHOOSE_FILE);
      return;
    }

    setError(null);
    uploadMutation.mutate(file);
  };

  const reset = () => {
    setFile(null);
    setRecord(null);
    setEditedRawText("");
    setStructuredDraft(EMPTY_STRUCTURED_JSON);
    setError(null);
    uploadMutation.reset();
  };

  const status: UploadStatus = uploadMutation.status;
  const statusLabel = UPLOAD_STATUS_LABELS[status];

  return {
    editedRawText,
    error,
    file,
    filePreview,
    handleUpload,
    parsedStructured,
    record,
    reset,
    setEditedRawText,
    setFile,
    setStructuredDraft,
    status,
    statusLabel,
    structuredDraft,
  };
}
