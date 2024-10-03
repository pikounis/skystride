import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import styles from '../Activity.module.css';

const SportsDropDown = ({ sportsData, selectedExercise }) => {
  const [selectedSport, setSelectedSport] = useState(selectedExercise);  // Initialise with selectedExercise

  // Update selectedSport if selectedExercise prop changes
  useEffect(() => {
    // axios.get(APIPath + "/sport/getAll");
    setSelectedSport(selectedExercise);
  }, [selectedExercise]);


  return (
    <div>
      {/* Autocomplete for selecting a sport */}
      <Box className={styles.sportsDropDown}>
        <Autocomplete
          options={sportsData}  // Options for the sports dropdown
          getOptionLabel={(option) => option.name}
          value={selectedSport || null}
          onChange={(event, value) => {
            setSelectedSport(value);
            console.log(value.name); // get the sport name
          }}
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />} 
        />
      </Box>
    </div>
  );
}

export default SportsDropDown;
