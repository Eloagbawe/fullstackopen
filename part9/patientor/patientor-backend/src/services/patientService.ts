import { Patient, NewPatientEntry } from "../types";
import data from "../../data/patients";
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
   const response =  data.map(({id, name, dateOfBirth, gender, occupation}) => 
    ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
    return response;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4().toString(),
    ...entry
  };
  data.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    addPatient
};
