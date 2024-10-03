import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Box } from '@mui/material';
import styles from '../Activity.module.css';

export default function CustomTimeFormat() {
  return (
    <Box className={styles.timeInput}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
            label="Total Duration"
            defaultValue={dayjs('1970-01-01T00:00')}
            ampm={false}
            format="HH:mm"
            onChange={(newValue) => {
              if (newValue) {
                const hours = newValue.hour();
                const minutes = newValue.minute();
                console.log(`Selected Time: ${hours}:${minutes}`);
              }
            }}
            />
        </LocalizationProvider>
    </Box>
  );
}