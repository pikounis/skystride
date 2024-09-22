import React from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography } from '@mui/material';

function createData(date, exercise, start, finish, totalTime, points) {
  return { date, exercise, start, finish, totalTime, points };
}

const rows = [
  createData('2024-09-01', 'Running', '08:00', '08:30', '30 min', 10),
  createData('2024-09-02', 'Cycling', '09:00', '09:45', '45 min', 15),
  createData('2024-09-03', 'Swimming', '10:00', '10:30', '30 min', 12),
  createData('2024-09-04', 'Yoga', '07:00', '08:00', '60 min', 8),
  createData('2024-09-05', 'Hiking', '06:30', '08:00', '90 min', 20),
  createData('2024-09-06', 'Weightlifting', '17:00', '18:00', '60 min', 15),
];

const Activity = () => {
  return (
    <div>
      <Typography variant="h3" component="h1" align="center" m={6}>
        My Activity
      </Typography>
      <ActivityTable rows={rows} />
    </div>
  );
};

export default Activity;
