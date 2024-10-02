import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';  // Correct import
import styles from '../Activity.module.css';

const SportsDropDown = ({ sportsData }) => {
  const [selectedSport, setSelectedSport] = useState(null);  // State to manage selected sport

  return (
    <div>
      {/* Autocomplete for selecting sport */}
      <Box className={styles.sportsDropDown}>
        <Autocomplete
          options={sportsData}  // Options for the dropdown
          getOptionLabel={(option) => option} 
          onChange={(event, value) => setSelectedSport(value)}  // Handle selection change
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />} 
        />
      </Box>
    </div>
  );
}

export default SportsDropDown;
