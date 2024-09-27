import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../Activity.module.css';

export default function DatePickerComponent() {
  const [value, setValue] = React.useState(null);

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker 
        label="Select Date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        className={styles.calendar}
      />
    </LocalizationProvider>
  );
}
