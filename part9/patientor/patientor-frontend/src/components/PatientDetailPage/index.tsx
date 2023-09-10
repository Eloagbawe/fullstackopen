import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses'
import { Patient, Diagnosis, EntryFormValues } from '../../types';
import { Typography, Alert, Button } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PatientEntry from '../PatientEntries';
import AddEntry from '../PatientEntries/AddEntry';
import axios from 'axios';

const PatientDetailPage = () => {
  const { id } = useParams();
  const [ patientDetail, setPatientDetail ] = useState<Patient | null>(null);
  const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>([])
  const [error, setError] = useState('');
  const [ entryForm, setEntryForm ] = useState(false)
  const [ formType, setFormType ] = useState('')

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

  const onSubmit = (values: EntryFormValues) => {
    patientService.createEntry(values, id).then((data) => {
      if (patientDetail?.entries) {
        const updatedEntries = patientDetail?.entries?.concat(data);
        setPatientDetail({...patientDetail, entries: updatedEntries})
      }
    }).catch((err) => {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data && typeof err?.response?.data === "string") {
          const message = err.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", err);
        setError("Unknown error");
      }

      setTimeout(() => {
        setError('')
      }, 5000)
    })
  }

  const addHealthEntry = () => {
    setEntryForm(true)
    setFormType('Health Check')
  }

  const closeEntryForm = () => {
    setEntryForm(false)
  }

  const addOccupationalEntry = () => {
    setEntryForm(true)
    setFormType('OccupationalHealthcare')
  }

  const addHospitalEntry = () => {
    setEntryForm(true)
    setFormType('Hospital')
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
        {error && <Alert severity="error" style={{ margin: "2rem 0" }}>{error}</Alert>}
        <Button style={{ marginBottom: "2rem", marginRight: "1rem" }} onClick={addHealthEntry}>Add Health Check Entry</Button>
        <Button style={{ marginBottom: "2rem", marginRight: "1rem" }} onClick={addOccupationalEntry}>Add Occupational Health Entry</Button>
        <Button style={{ marginBottom: "2rem" }} onClick={addHospitalEntry}>Add Hospital Entry</Button>



        {entryForm && <AddEntry onSubmit={onSubmit} cancel={closeEntryForm} type={formType}/>}

        {patientDetail?.entries.map((entry, index) => (
          <div key={index}>
            <PatientEntry entry={entry} getDiagnosisName={getDiagnosisName}/>
          </div>
        ))}
        

    </div>
  )
}

export default PatientDetailPage