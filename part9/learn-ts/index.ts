import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    let weight: number;
    let height: number;

    try {
        weight = Number(req.query.weight);
        height = Number(req.query.height);

        if (isNaN(weight) && isNaN(height)) {
            throw new Error('Provided values were not numbers!');
        }
    } catch (e) {
        res.send({ error: "malformatted parameters" });
        return;
    }

    const response = {
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    };

    res.send(response);
});

app.post('/exercises', (req, res) => {
    let target: number;
    let days: number[];

    try {
        target = Number(req.body.target);
        if (isNaN(target)) {
            throw new Error('Provided values were not numbers!');
        }

        days = req.body.daily_exercises as unknown[] as number[];
        days.forEach(element => {
            if (isNaN(element)) {
                throw new Error('Provided values were not numbers!');
            }
        });
    } catch (e) {
        res.send({ error: "malformatted parameters" });
        return;
    }

    res.json(calculateExercises(days, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});