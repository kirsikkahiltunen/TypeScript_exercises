import patientsData from '../../data/patients.ts';
import type { NonSensitivePatient, Patient } from '../../types.ts';

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients
};