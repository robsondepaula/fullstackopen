import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});