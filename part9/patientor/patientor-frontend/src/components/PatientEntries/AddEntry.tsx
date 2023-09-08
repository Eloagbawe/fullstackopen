import React, { useState, SyntheticEvent } from 'react'
import { TextField, Box, Button } from '@mui/material';


const AddEntry= () => {
  const [ description, setDescription ] = useState('')
  const [ date, setDate ] = useState('')
  const [ specialist, setSpecialist ] = useState('')
  const [ diagnosisCodes, setDiagnosisCodes ] = useState('')
  const [ healthCheckRating, setHealthCheckRating ] = useState('')

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  const cancel = () => {
    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes('')
    setHealthCheckRating('')
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
      <h4>New Health Check Entry</h4>
      <div>
      <TextField
          id="outlined-required"
          label="Description"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>

      <div>
        <TextField
            id="outlined-required"
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
          id="outlined-required"
          label="specialist"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="Health Check Rating"
          variant="standard"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="Diagnosis Codes"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </div>

      <div style={{marginTop: '2rem'}}>
        <Button variant="contained" style={{marginRight: '3rem'}} type='submit'>Add Entry</Button>
        <Button variant="contained" style={{backgroundColor: '#BB2525'}} type='button' onClick={cancel}>Cancel</Button>
      </div>
     


    </Box>
    </div>
  )
}

export default AddEntry