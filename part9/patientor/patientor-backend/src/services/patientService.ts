import { Patient } from "../types";
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

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4().toString(),
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  };
  data.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    addPatient
};
