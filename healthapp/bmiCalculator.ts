export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "underweight";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return "overweight";
  }
  if (bmi >= 30) {
    return "obese";
  }
  return "Normal range";
};
interface inputValues {
  height: number
  weight: number
}

const validInput = (args: string[]): inputValues => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Values must be numbers");
  }
};
if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = validInput(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something failed";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
