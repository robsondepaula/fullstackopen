import patientData from '../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
import toNewPatientEntry from '../utils';

const patients: PatientEntry[] = patientData.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
});

const getPatients = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatient = (id: string): PatientEntry => {
    const resultPatient = patients.find(p => p.id === id) as PatientEntry;

    return resultPatient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    getPatient
};