const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2
  if (bmi < 18.5) {
    return "underweight"
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return "overweight"
  }
  if (bmi >= 30) {
    return "obese"
  }
  return "Normal range"
}
const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
console.log(calculateBmi(height, weight))
