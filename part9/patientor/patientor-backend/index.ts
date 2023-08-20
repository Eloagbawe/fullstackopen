import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnosesRouter';
import patientRouter from './src/routes/patientRouter';

const app = express();
app.use(express.json());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
