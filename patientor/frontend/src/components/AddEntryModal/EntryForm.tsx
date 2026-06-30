import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, SelectChangeEvent, InputLabel, Select, MenuItem  } from '@mui/material';

import { NewEntry, Entry, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];

const EntryForm = ({ onCancel, onSubmit }: Props) => {
    const [newDate, setNewDate] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newSpecialist, setNewSpecialist] = useState('');
    const [newRating, setNewRating] = useState('');
    const [newCodes, setNewCodes] = useState('');
    const [newType, setNewType] = useState<Entry["type"] | "">('HealthCheck');
    const [discharge, setDischarge] = useState('');
    const [criteria, setCriteria] = useState('');
    const [employer, setEmployer] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


  const onTypeChange = (event: SelectChangeEvent) => {
      setNewType(event.target.value as Entry["type"]);
    };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entryValues = {
      date: newDate,
      description: newDescription,
      specialist: newSpecialist,
      diagnosisCodes: newCodes.split(',').map(code => code.trim())
    };
    if (newType === "HealthCheck"){
    onSubmit({
      ...entryValues,
      healthCheckRating: Number(newRating) as HealthCheckRating,
      type: "HealthCheck"
    });
  } else if (newType === "Hospital") {
      onSubmit({
        ...entryValues,
        type: "Hospital",
        discharge: {
          date: discharge,
          criteria: criteria
        }
      });
  }else if (newType === "OccupationalHealthcare") {
      onSubmit({
      ...entryValues,
      employerName: employer,
      sickLeave:{
        startDate: start,
        endDate: end
      },
      type: "OccupationalHealthcare"
    });
  };
 };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel sx={{ marginTop: 2.5 }}>Entry type</InputLabel>
        <Select
          label="entryType"
          fullWidth
          value={newType}
          onChange={onTypeChange}
        >
        {entryTypes.map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option}</MenuItem>
        )}
        </Select>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth 
          value={newDate}
          onChange={({ target }) => setNewDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={newDescription}
          onChange={({ target }) => setNewDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={newSpecialist}
          onChange={({ target }) => setNewSpecialist(target.value)}
        />
        {newType === "HealthCheck" && (
        <TextField
          label="Health Check rating (0-3)"
          fullWidth
          value={newRating}
          onChange={({ target }) => setNewRating(target.value)}
        />
        )}
        {newType === "Hospital" && (
        <>
        <TextField
          label="Discharge date"
          fullWidth
          value={discharge}
          onChange={({ target }) => setDischarge(target.value)}
        />
         <TextField
          label="Discharge criteria"
          fullWidth
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />
        </>
        )}
        {newType === "OccupationalHealthcare" && (
        <>
        <TextField
          label="Employer name"
          fullWidth
          value={employer}
          onChange={({ target }) => setEmployer(target.value)}
        />
         <TextField
          label="Sick leave start"
          fullWidth
          value={start}
          onChange={({ target }) => setStart(target.value)}
        />
        <TextField
          label="Sick leave end"
          fullWidth
          value={end}
          onChange={({ target }) => setEnd(target.value)}
        />
        </>
        )}
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={newCodes}
          onChange={({ target }) => setNewCodes(target.value)}
        />


        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default EntryForm;