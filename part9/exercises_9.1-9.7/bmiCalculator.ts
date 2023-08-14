import isNotNumber from "./utils";
const calculateBmi = (height: number, weight: number): string => {
  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error("Height and Weight must be a number");
  }

  const heightInMeters = height / 100;
  const heightSquare = heightInMeters * heightInMeters;
  const bmi = weight / heightSquare;

  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi <= 18.4) {
    return "Abnormal (Underweight)";
  } else {
    return "Abnormal (Overweight)";
  }
};

if (process.argv.length > 2) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
}

export { calculateBmi };
