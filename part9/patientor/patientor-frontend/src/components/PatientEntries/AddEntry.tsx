import React, { useState, SyntheticEvent, useEffect } from 'react'
import { TextField, Box, Button, Select, MenuItem, SelectChangeEvent, OutlinedInput, InputLabel } from '@mui/material';
import { EntryFormValues, Diagnosis } from '../../types';
import diagnosisService from '../../services/diagnoses'


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  cancel: () => void;
  type: string
}

const AddEntry= ({onSubmit, cancel, type }: Props) => {
  const [ description, setDescription ] = useState('')
  const [ date, setDate ] = useState('')
  const [ specialist, setSpecialist ] = useState('')
  const [ diagnosisCodes, setDiagnosisCodes ] = useState<string[]>([])
  const [ healthCheckRating, setHealthCheckRating ] = useState(0)
  const [ employerName, setEmployerName ] = useState('')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ dischargeDate, setDischargeDate ] = useState('')
  const [ criteria, setCriteria ] = useState('')
  const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>([])

  useEffect(() => {
    diagnosisService.getAllDiagnoses().then((data) => {
      setDiagnoses(data)
    })
  },[])

  const handleDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleRatingChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    setHealthCheckRating(typeof value === 'number' ? value : 0)
  }

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    const commonValues = { description, date, specialist,  diagnosisCodes};

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
    clearForm()
  }

  const clearForm = () => {
    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes([])
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
        border: "1px dotted grey",
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
            style={{ marginTop: '1rem', marginBottom: '1rem'}}
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
      <InputLabel id="healthCheckRating" style={{margin: '0.5rem 0'}}>Health Check Rating</InputLabel>

      <Select
          id="healthCheckRating"
          label="Health Check Rating"
          variant="standard"
          type="number"
          value={healthCheckRating}
          onChange={handleRatingChange}
          sx={{ width: '12rem'}}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>

        </Select>
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
        <TextField
            id="startDate"
            label="Sick Leave Start Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
            style={{ marginTop: '1rem', marginBottom: '1rem'}}
          />
         <TextField
            id="endDate"
            label="Sick Leave End Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
            style={{ marginTop: '1rem', marginBottom: '1rem'}}
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
            style={{ marginTop: '1rem', marginBottom: '1rem'}}
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
      <div style={{ marginTop: '1rem', marginBottom: '1rem'}}>
        <InputLabel id="diagnosisCodes" style={{margin: '0.5rem 0'}}>Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          id="diagnosesCodes"
          label="Diagnosis Codes"
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          sx={{ width: '12rem'}}
        >
          {diagnoses.map((diagnosis, index) => (
            <MenuItem
              key={index}
              value={diagnosis.code}
            >
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
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