import { string, z } from 'zod';

export interface Diagnosis{
    code: string;
    name: string;
    latin?: string;
}


export type Entry =  | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Patient{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string()
});

const Discharge = {
    date: string,
    criteria: string
};

type Discharge = typeof Discharge[keyof typeof Discharge];

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    description: string;
    discharge: Discharge;
}

const SickLeave = {
    startDate: string,
    endDate: string
};

type SickLeave = typeof SickLeave[keyof typeof SickLeave];

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    description: string;
    sickLeave: SickLeave;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}