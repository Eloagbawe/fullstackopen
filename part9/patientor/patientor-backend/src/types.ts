export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
