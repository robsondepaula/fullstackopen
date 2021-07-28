import { NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation, ssn }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseName(gender),
        occupation: parseName(occupation),
        ssn: parseName(ssn)
    }

    return newEntry;
}

export default toNewPatientEntry;