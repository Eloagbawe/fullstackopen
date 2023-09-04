import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses'
import { Patient, Diagnosis } from '../../types';
import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientDetailPage = () => {
  const { id } = useParams();
  const [ patientDetail, setPatientDetail ] = useState<Patient | null>(null);
  const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>([])

  useEffect(() => {
    patientService.getPatient(id as string).then((data) => {
      setPatientDetail(data);
    })

    diagnosisService.getAllDiagnoses().then((data) => {
      setDiagnoses(data)
    })
  },[id])


  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code)
    return diagnosis?.name
  }

  return (
    <div style={{ margin: "3rem 0"}}>
        <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
          {patientDetail?.name}

          {patientDetail?.gender === 'male' && <MaleIcon/>}
          {patientDetail?.gender === 'female' && <FemaleIcon/>}

        </Typography>

        <Typography style={{ marginBottom: "0.5em" }}>
          ssn: {patientDetail?.ssn}
        </Typography>

        <Typography style={{ marginBottom: "0.5em" }}>
          ssn: {patientDetail?.occupation}
        </Typography>

        <Typography variant="h6" style={{ margin: "2rem 0" }}>
          Entries
        </Typography>

        {patientDetail?.entries.map((entry, index) => (
          <div key={index}>
            <Typography style={{ marginBottom: "0.5em" }}>
              {entry?.date} <span style={{ fontStyle: "italic" }}>{entry?.description}</span>
            </Typography>
            <ul>
              {entry?.diagnosisCodes?.map((code, index) => (
                <li key={index}>{code} <span>{getDiagnosisName(code)}</span></li>
              ))}
            </ul>
          </div>
        ))}
        

    </div>
  )
}

export default PatientDetailPage