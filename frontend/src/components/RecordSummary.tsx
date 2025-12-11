import type { MedicalRecord } from "../types/medicalRecord";
import { STATUS_PROCESSED } from "../constants/messages";

type Props = {
  record: MedicalRecord | null;
};

export function RecordSummary({ record }: Props) {
  return (
    <div className="summary">
      <div className="summary-item">
        <label>Status</label>
        <strong>
          {record?.status ? (
            <span
              className={`badge ${record.status === STATUS_PROCESSED ? "badge-success" : "badge-pending"}`}
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
    </div>
  );
}
