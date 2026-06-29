import express from 'express';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedPatient);
})

export default router;