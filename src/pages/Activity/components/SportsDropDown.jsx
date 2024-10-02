import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import styles from '../Activity.module.css';
import axios from 'axios';
import { APIPath } from '../../../util';

const SportsDropDown = ({ sportsData, selectedExercise }) => {
  const [selectedSport, setSelectedSport] = useState(selectedExercise);  // Initialise with selectedExercise

  // Update selectedSport if selectedExercise prop changes
  useEffect(() => {
    setSelectedSport(selectedExercise);
  }, [selectedExercise]);


  return (
    <div>
      {/* Autocomplete for selecting a sport */}
      <Box className={styles.sportsDropDown}>
        <Autocomplete
          options={sportsData}  // Options for the sports dropdown
          getOptionLabel={(option) => option.name}
          value={selectedSport}
          onChange={(event, value) => setSelectedSport(value)}
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />} 
        />
      </Box>
    </div>
  );
}

export default SportsDropDown;
