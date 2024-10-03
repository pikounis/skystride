import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import styles from '../Activity.module.css';

export default function FormPropsTimePickers({name, onTimingChange}) {

  const [time, setTime] = React.useState(null);

  const handleTimeChange = (newValue) => {
    setTime(newValue);
    const updatedValue = newValue.format('HH:mm'); // YYYY-MM-DDTHH:MM:SS

    // Call the parent callback with the updated value
    if (onTimingChange) {
      onTimingChange(updatedValue); // Send the date to the parent
    }
  };

  return (
    <Box className={styles.timeInput}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker 
              label={name}
              name="time"
              onChange={handleTimeChange} />
        </LocalizationProvider>
    </Box>
  );
}
