import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import styles from '../Activity.module.css';

export default function FormPropsTimePickers({name}) {

  const [time, setTime] = React.useState(null);

  const handleTimeChange = (newValue) => {
    setTime(newValue);
    console.log(newValue.format('YYYY-MM-DDTHH:mm:ss')); // YYYY-MM-DDTHH:MM:SS
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
