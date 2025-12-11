import type { ChangeEvent } from "react";
import { RecordSummary } from "./RecordSummary";
import type { UploadStatus } from "../hooks/useCreateMedicalRecord";
import type { MedicalRecord } from "../types/medicalRecord";
import { QUERY_STATUS } from "../constants/status";
import {
  CTA_UPLOAD,
  CTA_UPLOADING,
  FILE_HINT,
  PREVIEW_PLACEHOLDER,
} from "../constants/messages";
import { formatBytes } from "../utils/format";

type Props = {
  error: string | null;
  file: File | null;
  filePreview: string | null;
  onFileChange: (file: File | null) => void;
  onReset: () => void;
  onUpload: () => void;
  record: MedicalRecord | null;
  status: UploadStatus;
  statusLabel: string;
};

export function UploadPanel({
  error,
  file,
  filePreview,
  onFileChange,
  onReset,
  onUpload,
  record,
  status,
  statusLabel,
}: Props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0];
    onFileChange(nextFile ?? null);
  };

  return (
    <div className="panel">
      <h2>1) Upload document</h2>
      <div className="upload-box">
        <div className="file-info">
          <span className="file-name">
            {file ? file.name : "No file selected"}
          </span>
          <span className="muted">
            {file
              ? `${file.type || "unknown type"} • ${formatBytes(file.size)}`
              : FILE_HINT}
          </span>
        </div>
        <div className="upload-actions">
          <label className="secondary" htmlFor="document-input">
            Choose file
          </label>
          <input
            id="document-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <span className="pill">{statusLabel}</span>
        </div>
      </div>

      <div className="inputs">
        <button
          className="primary"
          onClick={onUpload}
          disabled={!file || status === QUERY_STATUS.pending}
        >
          {status === QUERY_STATUS.pending ? CTA_UPLOADING : CTA_UPLOAD}
        </button>
        {file && (
          <button className="secondary" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
      {error ? <div className="error">{error}</div> : null}

      <RecordSummary record={record} />

      <div style={{ marginTop: 16 }}>
        <h3 style={{ margin: "0 0 8px" }}>File preview</h3>
        <div className="preview-frame">
          {filePreview ? (
            <a href={filePreview} target="_blank" rel="noreferrer">
              Open selected file
            </a>
          ) : (
            PREVIEW_PLACEHOLDER
          )}
        </div>
      </div>
    </div>
  );
}
