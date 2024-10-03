import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import styles from '../Activity.module.css';

export default function FormPropsTimePickers({name, onTimingChange}) {

  const handleTimeChange = (newValue) => {
    if (newValue) {
      const updatedValue = newValue.format('HH:mm');

    // Call the parent callback with the updated value
    if (onTimingChange) {
      onTimingChange(updatedValue); // Send the date to the parent
    }}
  };

  return (
    <Box className={styles.timeInput}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker 
              label={name}
              name="time"
              onAccept={handleTimeChange} />
        </LocalizationProvider>
    </Box>
  );
}
