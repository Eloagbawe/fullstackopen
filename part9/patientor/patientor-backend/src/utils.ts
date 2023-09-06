import { NewPatientEntry, EntryWithoutId, Diagnosis } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown, type: string): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing " + type);
  }
  return str;
};

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, "occupation"),
      entries: [],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing discharge data");
  }
  if ("date" in object && "criteria" in object) {
    return {
      date: parseDate(object.date),
      criteria: parseString(object.criteria, "criteria"),
    };
  }
  throw new Error("Incorrect or missing discharge data");
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    return {} as { startDate: string; endDate: string };
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "type" in object &&
    "date" in object &&
    "specialist" in object &&
    "description" in object
  ) {
    const baseData = {
      date: parseDate(object.date),
      specialist: parseString(object.specialist, "specialist"),
      description: parseString(object.description, "description"),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    if (object.type === "Hospital" && "discharge" in object) {
      const hospitalEntry: EntryWithoutId = {
        ...baseData,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
      return hospitalEntry;
    }

    if (object.type === "OccupationalHealthcare" && "employerName" in object) {
      let occupationalHealthcareEntry: EntryWithoutId = {
        ...baseData,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employer name"),
      };

      if ("sickLeave" in object) {
        occupationalHealthcareEntry = {
          ...occupationalHealthcareEntry,
          sickLeave: parseSickLeave(object.sickLeave),
        };
      }
      return occupationalHealthcareEntry;
    }

    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const healthCheckEntry: EntryWithoutId = {
        ...baseData,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return healthCheckEntry;
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
