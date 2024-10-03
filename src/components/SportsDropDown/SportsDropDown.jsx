import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import styles from './SportsDropDown.module.css';

const SportsDropDown = ({ sportsData, selectedExercise, onSportChange, disabled }) => {
  const [selectedSport, setSelectedSport] = useState(selectedExercise);  // Initialise with selectedExercise

  // Update selectedSport if selectedExercise prop changes
  useEffect(() => {
    setSelectedSport(selectedExercise);
  }, [selectedExercise]);

  return (
    <div>
      <Box className={styles.sportsDropDown}>
        <Autocomplete
          options={sportsData}  // Options for the sports dropdown
          getOptionLabel={(option) => option.name}
          value={selectedSport || null}
          onChange={(event, value) => {
            setSelectedSport(value);
            if (value) {
              onSportChange(value.id); // Pass the selected sport back to the parent
            } else {
              onSportChange(null); // Handle case when selection is cleared
            }
          }}
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />}
          disabled={disabled} // Disable the dropdown if `disabled` is true
        />
      </Box>
    </div>
  );
}

export default SportsDropDown;

