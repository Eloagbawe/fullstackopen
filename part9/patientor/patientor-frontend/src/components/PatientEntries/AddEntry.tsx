import React, { useState, SyntheticEvent } from 'react'
import { TextField, Box, Button } from '@mui/material';
import { EntryFormValues } from '../../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  cancel: () => void;
  type: string
}

const AddEntry= ({onSubmit, cancel, type}: Props) => {
  const [ description, setDescription ] = useState('')
  const [ date, setDate ] = useState('')
  const [ specialist, setSpecialist ] = useState('')
  const [ diagnosisCodes, setDiagnosisCodes ] = useState('')
  const [ healthCheckRating, setHealthCheckRating ] = useState(0)
  const [ employerName, setEmployerName ] = useState('')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ dischargeDate, setDischargeDate ] = useState('')
  const [ criteria, setCriteria ] = useState('')


  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    const commonValues = { description, date, specialist,  diagnosisCodes: diagnosisCodes.split(", ")};

    if (type === 'Health Check') {
      onSubmit({
        ...commonValues,
        healthCheckRating,
        type: 'HealthCheck'
      })
    }
    if (type === 'OccupationalHealthcare') {
      onSubmit({
        ...commonValues,
        type: 'OccupationalHealthcare',
        employerName,
        sickLeave: {
          startDate,
          endDate
        }

      })
    }

    if (type === 'Hospital') {
      onSubmit({
        ...commonValues,
        type: 'Hospital',
        discharge: {
          date: dischargeDate,
          criteria
        }
      })
    }
    // clearForm()
  }

  const clearForm = () => {
    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes('')
    setHealthCheckRating(0)
    setStartDate('')
    setEmployerName('')
    setEndDate('')
    cancel()
  }

  return (
    <div>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "2rem",
        width: "30%"
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      {type === 'Health Check' && <h4>New Health Check Entry</h4>}
      {type === 'OccupationalHealthcare' && <h4>New Occupational Health Entry</h4>}
      {type === 'Hospital' && <h4>New Hospital Entry</h4>}


      <div>
      <TextField
          id="description"
          label="Description"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>

      <div>
        <TextField
            id="date"
            label="Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
      </div>

      <div>
      <TextField
          id="specialist"
          label="specialist"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>

      {type === 'Health Check' && <div>
      <TextField
          id="healthCheckRating"
          label="Health Check Rating"
          variant="standard"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
        />
      </div>}

      {type === 'OccupationalHealthcare' && <div>
      <TextField
          id="employerName"
          label="Employer Name"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <p>Sick Leave</p>
        <TextField
            id="startDate"
            label="Start Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          />
         <TextField
            id="endDate"
            label="End Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          />
        </div>}

        {type === 'Hospital' && <div>
        <TextField
            id="dischargeDate"
            label="Discharge Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
          id="criteria"
          label="Criteria"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />

          </div>}
      <div>
      <TextField
          id="diagnosisCodes"
          label="Diagnosis Codes"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </div>

      <div style={{marginTop: '2rem'}}>
        <Button variant="contained" style={{marginRight: '3rem'}} type='submit'>Add Entry</Button>
        <Button variant="contained" style={{backgroundColor: '#BB2525'}} type='button' onClick={clearForm}>Cancel</Button>
      </div>
     


    </Box>
    </div>
  )
}

export default AddEntry