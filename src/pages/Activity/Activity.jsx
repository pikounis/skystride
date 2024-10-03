import React, { useEffect, useState } from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography, Box } from '@mui/material';
import { APIPath } from '../../util';
import axios from 'axios';


function formatDate(d) {
  // Extract month, day, and year
  const month = (d.getMonth() + 1).toString().padStart(2, '0');  // Months are 0-indexed, so we add 1
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  // Format the date as "DD/MM/YYYY"
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

function formatTime(d) {
  // Extract hours and minutes
  const hours = d.getHours().toString().padStart(2, '0');   // Ensure two digits for hour
  const minutes = d.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes

  // Format as "Hour:Minute"
  return `${hours}:${minutes}`;
}

function timeDifferenceInMinutes(start, end) {
  // Calculate the difference in milliseconds
  const diffInMs = end - start;

  // Convert milliseconds to minutes
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

  // Return the total minutes difference
  return diffInMinutes;
}

// function creates an array of objects with these fields for the table
function createData(start, end, sport, points) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return {date: formatDate(startDate), exercise: sport, start: formatTime(startDate), finish: formatTime(endDate), total_time: timeDifferenceInMinutes(startDate, endDate), points}
  // return { date, exercise, start, finish, total_time, points };
}

// // Sample data
// const rows = [
//   createData('Sept 01, 2024', 'Running', '08:00', '08:30', '30 min', 5),
//   createData('Sept 02, 2024', 'Cycling', '09:00', '09:45', '45 min', 10),
//   createData('Sept 03, 2024', 'Swimming', '10:00', '10:30', '30 min', 5),
//   createData('Sept 04, 2024', 'Yoga', '07:00', '08:00', '60 min', 15),
//   createData('Sept 05, 2024', 'Hiking', '06:30', '08:00', '90 min', 20),
//   createData('Sept 06, 2024', 'Weightlifting', '17:00', '18:00', '60 min', 15),
//   createData('Sept 07, 2024', 'Pilates', '08:00', '09:00', '60 min', 15),
//   createData('Sept 08, 2024', 'Dancing', '18:00', '19:00', '60 min', 15),
//   createData('Sept 09, 2024', 'Boxing', '10:00', '11:00', '60 min', 15),
//   createData('Sept 10, 2024', 'Skiing', '12:00', '14:00', '120 min', 25),
//   createData('Sept 11, 2024', 'Rock Climbing', '14:00', '15:30', '90 min', 20),
//   createData('Sept 12, 2024', 'Soccer', '16:00', '18:00', '120 min', 25),
//   createData('Sept 13, 2024', 'Baseball', '09:00', '11:00', '120 min', 25),
//   createData('Sept 14, 2024', 'Tennis', '15:00', '16:30', '90 min', 20),
//   createData('Sept 15, 2024', 'Rowing', '07:00', '08:30', '90 min', 20),
//   createData('Sept 16, 2024', 'Kickboxing', '18:00', '19:00', '60 min', 15),
//   createData('Sept 17, 2024', 'Golf', '08:00', '10:00', '120 min', 25),
//   createData('Sept 18, 2024', 'CrossFit', '19:00', '20:00', '60 min', 15),
//   createData('Sept 19, 2024', 'Running', '07:00', '08:00', '60 min', 15),
//   createData('Sept 20, 2024', 'Ballet', '20:00', '21:00', '60 min', 15)
// ];

var getRows = (data) => {
  console.log(typeof data)
  return data.map((activity) => createData(activity.startTime, activity.endTime, activity.sport.name, activity.pointsEarned))
}


const Activity = () => {
  const [activityData, setActivitydata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Axios GET request
    axios.get(APIPath + "/activity/getMyActivities/1")  // Replace with your API endpoint
      .then((response) => {
        var data = getRows(response.data);
        console.log(data[0])
        setActivitydata(data);  // Set the received data into state
        setLoading(false);  // Set loading to false after fetching data
        console.log(response.data)
      })
      .catch((error) => {
        setLoading(false);
      });



  }, []);


  // console.log(activityData);

  return (
    <div>
      {console.log(activityData)}
      <Typography variant="h3" component="h1" align="center" m={6}>
        My Activity
      </Typography>

      <ActivityTable rows={activityData} /> {/* Pass rows as props */}

    </div>
  );

};

export default Activity;
