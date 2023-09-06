import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const response = patientService.getPatients();
  res.json(response);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const response = patientService.addPatient(newPatientEntry);
    res.json(response);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const response = patientService.addEntry(req.params.id, newEntry);
    res.json(response);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
