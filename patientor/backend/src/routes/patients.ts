import express from 'express';
import patientService from '../services/patientService.ts';
import { NewPatientSchema, NewHealthCheckEntrySchema, NewHospitalEntrySchema, NewOccupationalHealthcareEntrySchema } from '../types.ts';
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

router.get('/:id', (req, res) => {
    const data = patientService.findById(String(req.params.id));
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
    const patientId =req.params.id;
    const patient = patientService.findById(patientId);
    if (patient) {
        const body = req.body as { type: string };
        switch (body.type) {
            case 'Hospital': {
                const newEntry = NewHospitalEntrySchema.parse(body);
                const addedEntry = patientService.addEntry(patientId, newEntry);
                return res.json(addedEntry);
            }
            case 'OccupationalHealthcare': {
                const newEntry = NewOccupationalHealthcareEntrySchema.parse(body);
                const addedEntry = patientService.addEntry(patientId, newEntry);
                return res.json(addedEntry);
            }
            case 'HealthCheck': {
                const NewEntry = NewHealthCheckEntrySchema.parse(req.body);
                const addedEntry = patientService.addEntry(patientId, NewEntry);
                return res.json(addedEntry);
            }
            default:
                return res.sendStatus(400);
        }
    } else {
        return res.sendStatus(404);
    }
});

export default router;