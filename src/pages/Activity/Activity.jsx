import React from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography } from '@mui/material';

const rows = [
  { date: '2024-09-01', exercise: 'Running', start: '08:00', finish: '08:30', totalTime: '30 min', points: 10 },
  { date: '2024-09-02', exercise: 'Cycling', start: '09:00', finish: '09:45', totalTime: '45 min', points: 15 },
];

function Activity() {
  return (
    <div>
      <Typography variant="h3" component="h1" align="center" m={6}>
        My Activity
      </Typography>
      <ActivityTable rows={rows} />
    </div>
  );
}

export default Activity;
