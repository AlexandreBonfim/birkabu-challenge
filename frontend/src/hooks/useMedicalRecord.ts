import { useQuery } from "@tanstack/react-query";
import { getMedicalRecord } from "../api/medicalRecords";
import type { MedicalRecord } from "../types/medicalRecord";
import { ERROR_NO_RECORD_ID } from "../constants/messages";
import { QUERY_STATUS, type QueryStatus } from "../constants/status";

export function useMedicalRecord(id?: string | number | null) {
  const { data, isLoading, isError, error, refetch, status } = useQuery({
    queryKey: ["medical-record", id],
    queryFn: () => {
      if (!id) throw new Error(ERROR_NO_RECORD_ID);
      return getMedicalRecord(id);
    },
    enabled: Boolean(id),
  });

  const normalizedStatus: QueryStatus = id
    ? (status as QueryStatus)
    : QUERY_STATUS.idle;

  return {
    record: data ?? null,
    isLoading,
    isError,
    error: (error as Error) || null,
    refetch,
    status: normalizedStatus,
  } as {
    record: MedicalRecord | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
    status: QueryStatus;
  };
}
