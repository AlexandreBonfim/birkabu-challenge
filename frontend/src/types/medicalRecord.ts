export interface Visit {
    date?: string;
    time?: string;
    type?: string;
    weight_kg?: number;
    temperature_c?: number;
    anamnesis?: string;
    diagnosis?: string;
    treatment?: string | string[];
    notes?: string;
  }
  
  export interface StructuredData {
    pet?: {
      name?: string;
      species?: string;
      breed?: string;
      birth_date?: string;
      chip?: string;
      sex?: string;
    };
    owner?: {
      name?: string;
      address?: string;
    };
    clinic?: {
      name?: string;
      address?: string;
      source_system?: string;
    };
    visits?: Visit[];
    [key: string]: unknown;
  }
  
  export interface MedicalRecord {
    id: number;
    external_id: string;
    status: string;
    raw_text: string | null;
    structured_data: StructuredData;
    language?: string;
    document_url?: string;
    created_at: string;
    updated_at: string;
  }
  