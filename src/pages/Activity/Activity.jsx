import React from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography, Box } from '@mui/material';

// function creates an array of objects with these fields for the table
function createData(date, exercise, start, finish, total_time, points) {
  return { date, exercise, start, finish, total_time, points };
}

// Sample data
const rows = [
  createData('Sept 01, 2024', 'Running', '08:00', '08:30', '30 min', 5),
  createData('Sept 02, 2024', 'Cycling', '09:00', '09:45', '45 min', 10),
  createData('Sept 03, 2024', 'Swimming', '10:00', '10:30', '30 min', 5),
  createData('Sept 04, 2024', 'Yoga', '07:00', '08:00', '60 min', 15),
  createData('Sept 05, 2024', 'Hiking', '06:30', '08:00', '90 min', 20),
  createData('Sept 06, 2024', 'Weightlifting', '17:00', '18:00', '60 min', 15),
  createData('Sept 07, 2024', 'Pilates', '08:00', '09:00', '60 min', 15),
  createData('Sept 08, 2024', 'Dancing', '18:00', '19:00', '60 min', 15),
  createData('Sept 09, 2024', 'Boxing', '10:00', '11:00', '60 min', 15),
  createData('Sept 10, 2024', 'Skiing', '12:00', '14:00', '120 min', 25),
  createData('Sept 11, 2024', 'Rock Climbing', '14:00', '15:30', '90 min', 20),
  createData('Sept 12, 2024', 'Soccer', '16:00', '18:00', '120 min', 25),
  createData('Sept 13, 2024', 'Baseball', '09:00', '11:00', '120 min', 25),
  createData('Sept 14, 2024', 'Tennis', '15:00', '16:30', '90 min', 20),
  createData('Sept 15, 2024', 'Rowing', '07:00', '08:30', '90 min', 20),
  createData('Sept 16, 2024', 'Kickboxing', '18:00', '19:00', '60 min', 15),
  createData('Sept 17, 2024', 'Golf', '08:00', '10:00', '120 min', 25),
  createData('Sept 18, 2024', 'CrossFit', '19:00', '20:00', '60 min', 15),
  createData('Sept 19, 2024', 'Running', '07:00', '08:00', '60 min', 15),
  createData('Sept 20, 2024', 'Ballet', '20:00', '21:00', '60 min', 15)
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
