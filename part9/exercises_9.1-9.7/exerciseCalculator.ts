import isNotNumber from "./utils";
interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercises = (
  values: Array<number>,
  targetHour: number
): ExerciseReport => {
  const periodLength = values.length;

  if (isNotNumber(targetHour)) {
    throw new Error("Target must be a number");
  }
  const trainingDays = values.filter((value) => {
    if (isNotNumber(Number(value))) {
      throw new Error("All values must be numbers");
    }
    return value !== 0;
  }).length;
  const average = values.reduce((total, num) => total + num, 0) / values.length;
  const success = average >= targetHour ? true : false;
  let rating;
  let ratingDescription;

  if (average >= targetHour) {
    rating = 3;
    ratingDescription = "very good";
  } else if (targetHour - average <= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad, more effort is needed";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHour,
    average,
  };
};

const argv = process.argv;
if (argv.length > 3) {

  const target = Number(argv[2]);

  if (isNotNumber(target)) {
    throw new Error("Target must be a number");
  }

  argv.splice(0, 3);
  const values = argv.map((value) => {
    return Number(value);
  });

  console.log(calculateExercises(values, target));
}
