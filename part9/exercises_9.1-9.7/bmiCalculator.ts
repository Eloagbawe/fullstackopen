import isNotNumber from "./utils"
const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100
    const heightSquare = heightInMeters * heightInMeters

    const bmi = weight / heightSquare

    if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (healthy weight)"
    }
    if (bmi > 24.9) {
        return "Abnormal (Overweight)"
    }
    if (bmi <= 18.4) {
        return "Abnormal (Underweight)"
    }
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])
if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error('Height and Weight must be a number')
}
console.log(calculateBmi(height, weight))
