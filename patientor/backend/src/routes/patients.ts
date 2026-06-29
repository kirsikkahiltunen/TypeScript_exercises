import express from 'express';
import patientService from '../services/patientService.ts';
import { NewPatientSchema } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.post('/', (req, res) => {
    try{
      const newPatient = NewPatientSchema.parse(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      return res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        } else {
            return res.status(400).json({ error: 'unknown error' });
        }
    }
});

export default router;