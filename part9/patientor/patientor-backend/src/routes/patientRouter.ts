import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const response = patientService.getPatients();
  res.json(response);
});

export default router;
