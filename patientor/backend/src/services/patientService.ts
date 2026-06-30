import patientsData from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient, Entry } from '../types.ts';
import { v1 as uuid } from 'uuid';


const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...patient
  };
  patientsData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientsData.find(p => p.id === id);
  return patient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient = patientsData.find(p => p.id === patientId);

  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
  findById,
  addEntry
};