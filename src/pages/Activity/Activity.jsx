import React, { useEffect, useState } from 'react';
import ActivityTable from './components/ActivityTable';
import { Typography } from '@mui/material';
import { getHeader, getUserId, APIPath } from '../../util';
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
function createData(start, end, sport, points, id) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return {date: formatDate(startDate), exercise: sport, start: formatTime(startDate), finish: formatTime(endDate), total_time: timeDifferenceInMinutes(startDate, endDate), points, activityId: id}
  // return { date, exercise, start, finish, total_time, points };
}

var getRows = (data) => {
  return data.map((activity) => createData(activity.startTime, activity.endTime, activity.sport.name, activity.pointsEarned, activity.id));
}

const Activity = () => {
  const [activityData, setActivitydata] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = getUserId();
  const headers = getHeader();

  useEffect(() => {
    // Axios GET request
    axios.get(APIPath + `/activity/getMyActivities/${userId}`, {headers})  // Replace with your API endpoint
      .then((response) => {
        var data = getRows(response.data);
        setActivitydata(data);  // Set the received data into state
        setLoading(!loading);  // Set loading to false after fetching data
      })
      .catch((error) => {
        setLoading(!loading);
      });
  });

  return (
    <div>
      <Typography variant="h3" component="h1" align="center" m={6}>
        My Activity
      </Typography>

      <ActivityTable rows={activityData} /> {/* Pass rows as props */}
    </div>
  );
};

export default Activity;
