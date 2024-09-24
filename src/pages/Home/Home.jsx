// pages/Home.js
import React from 'react';
import LeaderboardSection from './Components/LeaderboardSection/LeaderboardSection';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';
import { Box } from '@mui/material';

const mockDataName = "Jack";

const mockDataPoints = [
  {
    name: 'Mon 9th',
    pv: 90,
  },
  {
    name: 'Tue 10th',
    pv: 60,
  },
  {
    name: 'Wed 11th',
    pv: 70,
  },
  {
    name: 'Thu 12th',
    pv: 50,
  },
  {
    name: 'Fri 13th',
    pv: 40,
  }
];

const mockDataHoursWorkedOut = [
  {
    name: 'Mon 9th',
    pv: 10,
  },
  {
    name: 'Tue 10th',
    pv: 40,
  },
  {
    name: 'Wed 11th',
    pv: 70,
  },
  {
    name: 'Thu 12th',
    pv: 35,
  },
  {
    name: 'Fri 13th',
    pv: 40,
  }
];

function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello {mockDataName}!</h1>
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'stretch',
          width: '98%',
          flexWrap: 'wrap',
          padding: '1%'
        }}> 
        <Box className={styles.chartsSection}>
          <h4>Points earned in the last 5 days</h4>
          <LineGraph data={mockDataPoints}/>
          
          <h4>Hours worked out in the last 5 days</h4>
          <Box className={styles.hoursWorkedChart}>
            {/* Add filtering component here */}
            <LineGraph data={mockDataHoursWorkedOut} />
          </Box>
        </Box>

        <Box className={styles.leaderboardSection}>
          <LeaderboardSection />
        </Box>
      </Box>
      
    </div>
  );
}

export default Home;
