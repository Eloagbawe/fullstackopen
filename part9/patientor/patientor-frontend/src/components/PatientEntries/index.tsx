import React from 'react'
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Typography } from '@mui/material';
import { Entry } from '../../types'

interface EntryProps {
  entry: Entry,
  getDiagnosisName: (code: string) => string | undefined
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientEntry = ({entry, getDiagnosisName}: EntryProps) => {

  switch(entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} getDiagnosisName={getDiagnosisName}/>
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} getDiagnosisName={getDiagnosisName}/>
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} getDiagnosisName={getDiagnosisName}/>
    default:
      return assertNever(entry)
  }

}


const HospitalEntry = ({ entry, getDiagnosisName }: EntryProps) => {
  return (
    <div style={{margin: '1rem 0', width: '50%'}}>
      <Box sx={{ border: '1px solid grey', padding: '1rem', borderRadius: '1rem' }}>
        <span style={{marginRight: '0.5rem'}}>{entry?.date}</span>
        <span style={{marginTop: '0.5rem'}}><MedicalServicesIcon/></span>
        <p style={{ fontStyle: "italic" }}>{entry?.description}</p>
        <ul>
          {entry?.diagnosisCodes?.map((code, index) => (
            <li key={index}>{code} <span>{getDiagnosisName(code)}</span></li>
          ))}
        </ul>

        <Typography style={{ marginBottom: "0.5em" }}>
            Discharge Details
        </Typography>
        {entry?.type === 'Hospital' && (
          <div>
          <p><span>Date: {entry?.discharge?.date}</span> <span>Crtiteria: {entry?.discharge?.criteria}</span></p>
        </div>
        )}
        <p>Diagnosed by {entry?.specialist}</p>
      </Box>
    </div>
  )
}

const OccupationalEntry = ({ entry, getDiagnosisName }: EntryProps) => {
  return (
    <div style={{margin: '1rem 0', width: '50%'}}>
      <Box sx={{ border: '1px solid grey', padding: '1rem', borderRadius: '1rem' }}>
        <span style={{marginRight: '0.5rem'}}>{entry?.date}</span>
        <span><WorkIcon/></span>
        <p style={{ fontStyle: "italic" }}>{entry?.description}</p>
        <ul>
          {entry?.diagnosisCodes?.map((code, index) => (
            <li key={index}>{code} <span>{getDiagnosisName(code)}</span></li>
          ))}
        </ul>

        <Typography style={{ marginBottom: "0.5em" }}>
            Employment Details
        </Typography>
        {entry?.type === 'OccupationalHealthcare' && (
          <div>
          <p><span>Employer Name: {entry?.employerName}</span></p>

          {entry?.sickLeave  && 
          <div>
            <p>Sick Leave</p>
            <p>
              <span>Start Date:{entry?.sickLeave?.startDate}</span>
              <span>End Date:{entry?.sickLeave?.endDate}</span>
            </p>
          </div>}
    
        </div>
        )}
        <p>Diagnosed by {entry?.specialist}</p>
      </Box>
    </div>
  )
}

const HealthCheckEntry = ({ entry, getDiagnosisName }: EntryProps) => {

  const getColor = (health: number): string => {
    switch(health) {
      case 1:
        return "#BC7AF9"

      case 2:
        return "#E25E3E"

      case 3:
        return "#BB2525"

      default:
        return "#5FBA7C"
    }
  }

  return (
    <div style={{margin: '1rem 0', width: '50%'}}>
      <Box sx={{ border: '1px solid grey', padding: '1rem', borderRadius: '1rem' }}>
        <span style={{marginRight: '0.5rem'}}>{entry?.date}</span>
        <span><LocalHospitalIcon/></span>
        <p style={{ fontStyle: "italic" }}>{entry?.description}</p>
        <ul>
          {entry?.diagnosisCodes?.map((code, index) => (
            <li key={index}>{code} <span>{getDiagnosisName(code)}</span></li>
          ))}
        </ul>

        {entry?.type === 'HealthCheck' && (
          <div>
            <FavoriteIcon style={{ color: getColor(entry?.healthCheckRating)}}/>
          </div>
        )}
        <p>Diagnosed by {entry?.specialist}</p>
      </Box>
    </div>
  )
}

export default PatientEntry