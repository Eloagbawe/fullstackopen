import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AddEntry= () => {
  return (
    <div>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        border: "1px solid grey",
        borderRadius: "1rem",
        padding: "2rem",
        width: "40%"
      }}
      noValidate
      autoComplete="off"
    >
      <h4>New Health Check Entry</h4>
      <div>
      <TextField
          id="outlined-required"
          label="Description"
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div>
        <TextField
            id="outlined-required"
            label="Date"
            type='date'
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="specialist"
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="Health Check Rating"
          variant="standard"
          type="number"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="Diagnosis Codes"
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div style={{marginTop: '2rem'}}>
        <Button variant="contained" style={{marginRight: '3rem'}}>Add Entry</Button>
        <Button variant="contained" style={{backgroundColor: '#BB2525'}}>Cancel</Button>
      </div>
     


    </Box>
    </div>
  )
}

export default AddEntry