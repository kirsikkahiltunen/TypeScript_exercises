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
console.log(calculateBmi(180, 74))
