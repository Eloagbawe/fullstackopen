import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  EntryWithoutId,
  Entry
} from "../types";
import data from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  const response = data.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
  return response;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4().toString(),
    ...entry,
  };
  data.push({ ...newPatient, entries: [] });
  return newPatient;
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  const patient = data.find((patient) => patient.id === id);
  return patient;
};

const addEntry = (
  id: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patient = data.find((patient) => patient.id === id);
  const newEntry = { id: uuidv4().toString(), ...entry };
  patient?.entries.push(newEntry);
  return newEntry;
};
export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};
