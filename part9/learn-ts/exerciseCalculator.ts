type Result = {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (input: number[], target: number): Result => {
    let res = {} as Result

    res.periodLength = input.length

    let trainSum = 0
    res.trainingDays = 0
    input.forEach(element => {
        if (element > 0) {
            res.trainingDays++
            trainSum += element
        }
    });
    res.average = trainSum / res.periodLength
    res.target = target
    if (res.periodLength >= target) {
        res.success = true
    }
    let rating = target - res.trainingDays
    if (rating <= 1.0) {
        res.rating = 3
        res.ratingDescription = 'great job, keep it up!'
    } else if (rating <= 2) {
        res.rating = 2
        res.ratingDescription = 'not too bad but could be better'
    } else {
        res.rating = 1
        res.ratingDescription = 'you should prioritize your health'
    }

    return res
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))