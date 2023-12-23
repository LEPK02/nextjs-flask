export type Record = {
  id?: string;
  name?: string;
  patient_id?: string;
  date?: string|number;
  indicator?: number;
  disease?: string;
}

export type Patient = {
  id?: string;
  name?: string;
  disease?: string;
  // records: Record;
};

export const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API ?
  process.env.NEXT_PUBLIC_API :
  "http://localhost:8080";
export const NEXT_PUBLIC_PATIENTS = process.env.NEXT_PUBLIC_PATIENTS ?
  process.env.NEXT_PUBLIC_PATIENTS :
  "/patients";
export const NEXT_PUBLIC_RECORDS = process.env.NEXT_PUBLIC_RECORDS ?
  process.env.NEXT_PUBLIC_RECORDS :
  "/records";
export const NEXT_PUBLIC_GRAPH = process.env.NEXT_PUBLIC_GRAPH ?
  process.env.NEXT_PUBLIC_GRAPH :
  "/graph";