import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.json({
      height,
      weight,
      bmi: result
    })
  } catch (err) {
    res.json({
      error: 'malformatted parameters'
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
