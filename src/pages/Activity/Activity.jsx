import React from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography } from '@mui/material';

// Sample data creation function
function createData(date, exercise, start, finish, total_time) {
  return { date, exercise, start, finish, total_time };
}

// Sample data
const rows = [
  createData('2024-09-01', 'Running', '08:00', '08:30', '30 min'),
  createData('2024-09-02', 'Cycling', '09:00', '09:45', '45 min'),
  createData('2024-09-03', 'Swimming', '10:00', '10:30', '30 min'),
  createData('2024-09-04', 'Yoga', '07:00', '08:00', '60 min'),
  createData('2024-09-05', 'Hiking', '06:30', '08:00', '90 min'),
  createData('2024-09-06', 'Weightlifting', '17:00', '18:00', '60 min'),
  createData('2024-09-07', 'Pilates', '08:00', '09:00', '60 min'),
  createData('2024-09-08', 'Dancing', '18:00', '19:00', '60 min'),
  createData('2024-09-09', 'Boxing', '10:00', '11:00', '60 min'),
  createData('2024-09-10', 'Skiing', '12:00', '14:00', '120 min'),
  createData('2024-09-11', 'Rock Climbing', '14:00', '15:30', '90 min'),
  createData('2024-09-12', 'Soccer', '16:00', '18:00', '120 min'),
  createData('2024-09-13', 'Baseball', '09:00', '11:00', '120 min'),
  createData('2024-09-14', 'Tennis', '15:00', '16:30', '90 min'),
  createData('2024-09-15', 'Rowing', '07:00', '08:30', '90 min'),
  createData('2024-09-16', 'Kickboxing', '18:00', '19:00', '60 min'),
  createData('2024-09-17', 'Golf', '08:00', '10:00', '120 min'),
  createData('2024-09-18', 'CrossFit', '19:00', '20:00', '60 min'),
  createData('2024-09-19', 'Running', '07:00', '08:00', '60 min'),
  createData('2024-09-20', 'Ballet', '20:00', '21:00', '60 min')
];

const Activity = () => {
  return (
    <div>
      <Typography variant="h3" component="h1" align="center" m={6}>
        My Activity
      </Typography>
      <ActivityTable rows={rows} /> {/* Pass rows as props */}
    </div>
  );
};

export default Activity;
