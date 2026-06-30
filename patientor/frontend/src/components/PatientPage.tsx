import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient, Entry } from "../types";
import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [entries, setEntries] = useState<Entry[]>([]);
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
                            <div>{entry.date} {entry.description}</div>
                            <ul>
                            {entry.diagnosisCodes?.map(code =>
                                <li key={code}>
                                    <div>{code}</div>
                                </li>
                            )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        );
    } else {
        return null;
    }
};

export default PatientPage;