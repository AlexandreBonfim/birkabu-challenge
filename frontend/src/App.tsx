import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "./App.css";

type MedicalRecord = {
  id: number;
  external_id: string;
  status: string;
  raw_text?: string;
  structured_data?: Record<string, unknown>;
  language?: string;
  document_url?: string;
  created_at?: string;
  updated_at?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:3000";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [editedRawText, setEditedRawText] = useState("");
  const [structuredDraft, setStructuredDraft] = useState("{}");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const parsedStructured = useMemo(() => {
    try {
      return JSON.parse(structuredDraft) as Record<string, unknown>;
    } catch {
      return null;
    }
  }, [structuredDraft]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0];
    setFile(nextFile ?? null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a document to upload.");
      return;
    }
    setStatus("uploading");
    setError(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(`${API_BASE}/api/v1/medical_records`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const problem = await response.text();
        throw new Error(problem || "Upload failed");
      }

      const data: MedicalRecord = await response.json();
      setRecord(data);
      setEditedRawText(data.raw_text ?? "");
      setStructuredDraft(JSON.stringify(data.structured_data ?? {}, null, 2));
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const statusPill =
    status === "uploading"
      ? "Uploading & processing…"
      : status === "success"
        ? "Processed"
        : status === "error"
          ? "Upload failed"
          : "Ready to upload";

  return (
    <div className="page">
      <div className="hero">
        <h1>Medical record intake</h1>
        <p>
          Upload a PDF/image/text medical record, extract text, and review the
          structured payload.
        </p>
      </div>

      <div className="layout">
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
                  : "PDF, Word, image, or text file"}
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
              <span className="pill">{statusPill}</span>
            </div>
          </div>
          <div className="inputs">
            <button
              className="primary"
              onClick={handleUpload}
              disabled={!file || status === "uploading"}
            >
              {status === "uploading" ? "Uploading…" : "Upload & process"}
            </button>
            {file && (
              <button
                className="secondary"
                onClick={() => {
                  setFile(null);
                  setRecord(null);
                  setEditedRawText("");
                  setStructuredDraft("{}");
                  setError(null);
                  setStatus("idle");
                }}
              >
                Reset
              </button>
            )}
          </div>
          {error ? <div className="error">{error}</div> : null}

          <div className="summary">
            <div className="summary-item">
              <label>Status</label>
              <strong>
                {record?.status ? (
                  <span
                    className={`badge ${record.status === "processed" ? "badge-success" : "badge-pending"}`}
                  >
                    {record.status}
                  </span>
                ) : (
                  "—"
                )}
              </strong>
            </div>
            <div className="summary-item">
              <label>Language</label>
              <strong>{record?.language || "—"}</strong>
            </div>
            <div className="summary-item">
              <label>Record ID</label>
              <strong>{record?.external_id || "—"}</strong>
            </div>
            <div className="summary-item">
              <label>Attachment</label>
              <strong>{record?.document_url ? "Attached" : "—"}</strong>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>File preview</h3>
            <div className="preview-frame">
              {filePreview ? (
                <a href={filePreview} target="_blank" rel="noreferrer">
                  Open selected file
                </a>
              ) : (
                "Drop in a file to preview"
              )}
            </div>
          </div>
        </div>

        <div className="panel grid">
          <div>
            <h2>2) Extracted text</h2>
            <textarea
              className="text-area"
              placeholder="Extracted raw text will appear here after processing."
              value={editedRawText}
              onChange={(e) => setEditedRawText(e.target.value)}
            />
          </div>
          <div>
            <h2>3) Structured data (editable)</h2>
            <textarea
              className="json-box"
              value={structuredDraft}
              onChange={(e) => setStructuredDraft(e.target.value)}
              spellCheck={false}
            />
            {!parsedStructured && (
              <div className="error">
                JSON is invalid — fix formatting to keep editing.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
