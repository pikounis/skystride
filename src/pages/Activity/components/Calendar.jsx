import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../Activity.module.css';

export default function DatePickerComponent() {

  const [date, setDate] = React.useState(null);

  const handleDateChange = (newValue) => {
    setDate(newValue);
    const updatedValue = newValue.toISOString().slice(0, 10); // YYYY-MM-DD
    console.log(updatedValue)
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker 
        label="Select Date"
        value={date}
        onAccept={handleDateChange}
        className={styles.calendar}
      />
    </LocalizationProvider>
  );
}
