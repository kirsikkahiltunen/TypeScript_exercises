import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const findPatient = async () => {
            if (id) {
                const data = await patientService.findById(id);
                setPatient(data);
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
            </div>
        );
    } else {
        return null;
    }
};

export default PatientPage;