import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  EntryWithoutId,
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
): NonSensitivePatient | undefined => {
  const patient = data.find((patient) => patient.id === id);
  patient?.entries.push({ id: uuidv4().toString(), ...entry });
  return patient;
};
export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};
