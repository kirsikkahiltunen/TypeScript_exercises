import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button } from '@mui/material';

import { Entry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
}


const EntryForm = ({ onCancel, onSubmit }: Props) => {
    const [newDate, setNewDate] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newSpecialist, setNewSpecialist] = useState('');
    const [newRating, setNewRating] = useState('');
    const [newCodes, setNewCodes] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date: newDate,
      description: newDescription,
      specialist: newSpecialist,
      healthCheckRating: Number(newRating),
      diagnosisCodes: newCodes.split(',').map(code => code.trim()),
      type: "HealthCheck"
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
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
        <TextField
          label="Health Check rating (0-3)"
          fullWidth
          value={newRating}
          onChange={({ target }) => setNewRating(target.value)}
        />
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