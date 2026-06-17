interface ExerciseCalculations {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  exercises: number[],
  target: number,
): ExerciseCalculations => {
  const periodLength = exercises.length
  const trainingDays = exercises.filter((day) => day > 0).length
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength
  let success = false
  let rating = null
  const trainingScore = average / target
  let ratingDescription = null
  if (average >= target) {
    success = true
  }
  if (trainingScore >= 1) {
    rating = 3
    ratingDescription = "Great job, you achieved your exercise target!"
  } else if (trainingScore >= 0.75) {
    rating = 2
    ratingDescription = "not too bad but could be better"
  } else {
    rating = 1
    ratingDescription = "You have room for improvement"
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}
console.log(calculateExercises([0, 1, 3, 2, 1, 0, 4], 3))
