import { Patient } from "../types";
import data from "../../data/patients";

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

export default {
    getPatients
};
