import { useParams } from "react-router-dom";
import axios from 'axios';
import patientService from "../services/patients";
import { Patient, Entry, NewEntry, Diagnosis } from "../types";
import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import diagnosisService from "../services/diagnoses";
import { Button } from '@mui/material';
import AddEntryModal from "./AddEntryModal";


const PatientPage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const findPatient = async () => {
            if (id) {
                const data = await patientService.findById(id);
                setPatient(data);
                setEntries(data.entries);
            }
        };
        void findPatient();
    }, [id]);

    useEffect(() => {
        const findDiagnoses = async () => {
            const data = await diagnosisService.getAll();
            setDiagnoses(data);
        };
        void findDiagnoses();
    }, []);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

  const createEntry = async (id: string, values: NewEntry) => {
      try {
        const entry = await patientService.addEntry(id, values);
        setEntries(entries.concat(entry));
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    if (patient){
        return(
            <div>
                <h1>{patient.name} {patient.gender === 'male' ? (<MaleIcon/>) : patient.gender === 'female' ? (<FemaleIcon/>) : (null)}</h1>
                <p> ssn: {patient.ssn} </p>
                <p> occupation: {patient.occupation} </p>
                <p> date of birth: {patient.dateOfBirth} </p>
                <h2>entries</h2>
                <ul>
                    {entries.map(entry =>
                        <li key={entry.id}>
                            <div>{entry.date} {entry.description}
                            {entry.type == 'HealthCheck' && 
                            (<p><b>health check rating: </b>{entry.healthCheckRating}</p>)} 
                            {entry.type === 'Hospital' && 
                            (<p><b>discharge day:</b> {entry.discharge.date} <b>discharge criteria:</b> {entry.discharge.criteria}</p>)}
                            {entry.type === 'OccupationalHealthcare' && 
                            (<p> <b>Sick leave:</b> {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate} </p>)}
                            </div>
                            <ul>
                            {entry.diagnosisCodes?.map(code => {
                                const diagnosis = diagnoses.find(d => d.code === code);
                                return (
                                <li key={code}>
                                    <div>{code} {diagnosis?.name}</div>
                                </li>
                                );
                            })}
                            </ul>
                        </li>
                    )}
                </ul>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={(values) => createEntry (patient.id, values)}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>              
            </div>
        );
    } else {
        return null;
    }
};

export default PatientPage;