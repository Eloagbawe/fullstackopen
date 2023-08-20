import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const response = diagnosesService.getDiagnoses();
  res.json(response);
});

export default router;
