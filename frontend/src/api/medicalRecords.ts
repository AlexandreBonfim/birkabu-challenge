import { apiFetch } from "./client";
import type { MedicalRecord } from "../types/medicalRecord";

export async function uploadMedicalRecord(document: File) {
  const formData = new FormData();
  formData.append("document", document);

  return apiFetch<MedicalRecord>("/medical_records", {
    method: "POST",
    body: formData,
  });
}

export async function getMedicalRecord(id: string | number) {
  return apiFetch<MedicalRecord>(`/medical_records/${id}`);
}
