import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';  // Correct import
import styles from '../Activity.module.css';

const sportsData = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Cricket'];  // Sample data

const SportsDropDown = () => {
  const [selectedSport, setSelectedSport] = useState(null);  // State to manage selected sport

  return (
    <div>
      {/* Autocomplete for selecting sport */}
      <Box className={styles.dialogContainer} m={4}>
        <Autocomplete
          options={sportsData}  // Options for the dropdown
          getOptionLabel={(option) => option} 
          onChange={(event, value) => setSelectedSport(value)}  // Handle selection change
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />}
          sx={{ width: 300}} 
        />
      </Box>
    </div>
  );
}

export default SportsDropDown;
