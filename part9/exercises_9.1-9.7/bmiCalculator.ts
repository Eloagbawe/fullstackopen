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

console.log(calculateBmi(180, 74))
