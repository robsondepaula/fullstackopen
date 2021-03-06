const calculateBmi = (height: number, weight: number): string => {
    const cmHeight = height / 100;
    const bmi = weight / (cmHeight * cmHeight);

    if (bmi <= 16.0) {
        return 'Underweight (Severe thinness)';
    } else if (bmi <= 16.9) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi <= 18.4) {
        return 'Underweight (Mild thinness)';
    } else if (bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi <= 29.9) {
        return 'Overweight (Pre-obese)';
    } else if (bmi <= 34.9) {
        return 'Obese (Class I)';
    } else if (bmi <= 39.9) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
};

interface InputValues {
    height: number
    weight: number
}

const parseArguments = (args: Array<string>): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error, something bad happened!');
}

export { calculateBmi };