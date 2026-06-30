import { z } from 'zod';

export interface Diagnosis{
    code: string;
    name: string;
    latin?: string;
}


export type Entry =  HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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
    gender: Gender;
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

const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
});

type Discharge = z.infer<typeof DischargeSchema>;

const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
});

type SickLeave = z.infer<typeof SickLeaveSchema>;

export const NewHospitalEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    type: z.literal("Hospital"),
    discharge: DischargeSchema,
});

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export const NewOccupationalHealthcareEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional()
});

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

const HealthCheckRatingSchema = z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
]);

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export const NewHealthCheckEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    type: z.literal("HealthCheck"),
    healthCheckRating: HealthCheckRatingSchema
});

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}