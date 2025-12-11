import { RecordViewer } from "../components/RecordViewer";
import { UploadPanel } from "../components/UploadPanel";
import { useCreateMedicalRecord } from "../hooks/useCreateMedicalRecord";
import "../App.css";

export function MedicalRecordPage() {
  const {
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
  } = useCreateMedicalRecord();

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
        <UploadPanel
          error={error}
          file={file}
          filePreview={filePreview}
          onFileChange={setFile}
          onReset={reset}
          onUpload={handleUpload}
          record={record}
          status={status}
          statusLabel={statusLabel}
        />

        <RecordViewer
          editedRawText={editedRawText}
          onRawTextChange={setEditedRawText}
          onStructuredChange={setStructuredDraft}
          parsedStructured={parsedStructured}
          structuredDraft={structuredDraft}
        />
      </div>
    </div>
  );
}
