interface ExerciseCalculations {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (
  exercises: number[],
  target: number,
): ExerciseCalculations => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((day) => day > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  let success = false;
  let rating = null;
  const trainingScore = average / target;
  let ratingDescription = null;
  if (average >= target) {
    success = true;
  }
  if (trainingScore >= 1) {
    rating = 3;
    ratingDescription = "Great job, you achieved your exercise target!";
  } else if (trainingScore >= 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You have room for improvement";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
interface inputValues2 {
  a: number
  b: number[]
}

const validInput2 = (args: string[]): inputValues2 => {
  if (
    !isNaN(Number(args[2])) &&
    args
      .slice(3)
      .map(Number)
      .every((n) => !isNaN(n))
  ) {
    return {
      a: Number(args[2]),
      b: args.slice(3).map(Number),
    };
  } else {
    throw new Error("Values must be numbers");
  }
};
if (process.argv[1] === import.meta.filename) {
  try {
    const { a, b } = validInput2(process.argv);
    console.log(calculateExercises(b, a));
  } catch (error: unknown) {
    let errorMessage = "Something failed";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
