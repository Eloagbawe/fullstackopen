import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { Patient } from '../../types';
import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientDetailPage = () => {
  const { id } = useParams();
  const [ patientDetail, setPatientDetail ] = useState<Patient | null>(null);

  useEffect(() => {
    patientService.getPatient(id as string).then((data) => {
      setPatientDetail(data);
    })
  },[id])

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
    </div>
  )
}

export default PatientDetailPage