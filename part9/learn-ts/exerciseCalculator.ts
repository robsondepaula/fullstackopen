type Result = {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
};

const calculateExercises = (input: number[], target: number): Result => {
    const res = {} as Result;

    res.periodLength = input.length;

    let trainSum = 0;
    res.trainingDays = 0;
    input.forEach(element => {
        if (element > 0) {
            res.trainingDays++;
            trainSum += element;
        }
    });
    res.average = trainSum / res.periodLength;
    res.target = target;
    if (res.periodLength >= target) {
        res.success = true;
    }
    const rating = target - res.trainingDays;
    if (rating <= 1.0) {
        res.rating = 3;
        res.ratingDescription = 'great job, keep it up!';
    } else if (rating <= 2) {
        res.rating = 2;
        res.ratingDescription = 'not too bad but could be better';
    } else {
        res.rating = 1;
        res.ratingDescription = 'you should prioritize your health';
    }

    return res;
};

interface InputExerciseValues {
    target: number
    days: number[]
}

const parseExerciseArguments = (args: Array<string>): InputExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
    }

    const sliceDays = args.slice(3);
    return {
        target: Number(args[2]),
        days: sliceDays as unknown[] as number[]
    };
};

try {
    const { target, days } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(days, target));
} catch (e) {
    console.log('Error, something bad happened!');
}