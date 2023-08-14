import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.json({
      height,
      weight,
      bmi: result,
    });
  } catch (err) {
    res.json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).json({error: "parameters missing"});
  }
  try {
    const result = calculateExercises(daily_exercises as Array<number>, Number(target));
    res.json(result);
  } catch (err) {
    res.json({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
