import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi,
    });
  } else {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const exercises = req.body.daily_exercises;
  const target = req.body.target;

  if (!exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (
    exercises.some((n: unknown) => isNaN(Number(n))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(exercises, Number(target));
    return res.json(result);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
