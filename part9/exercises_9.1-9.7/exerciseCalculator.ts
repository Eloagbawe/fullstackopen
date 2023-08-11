interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (
  values: Array<number>,
  targetHour: number
): ExerciseReport => {
  const periodLength = values.length;
  const trainingDays = values.filter((value) => value !== 0).length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
