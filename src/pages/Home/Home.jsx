// pages/Home.js
import React from 'react';
import LeaderboardSection from './Components/LeaderboardSection/LeaderboardSection';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';
import { Box } from '@mui/material';
import ProgressBar from './Components/AchievementsSection/ProgressBar';

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

const mockdataTeams = [
  {
    name: "Team 1",
    imgPath: "", 
    leaderboard: [
      {
        position: 1,
        name: "Nicu",
        office: "Osterley",
        points: 500,
        imgPath: ""
      },
      {
        position: 2,
        name: "Pallav",
        office: "Osterley",
        points: 300,
        imgPath: ""
      }
    ]
  }, 
  {
    name: "Team 2",
    imgPath: "", 
    leaderboard: [
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: ""
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: ""
      }
    ]
  }
]

// {
//   // list of teams
//   teams: Proptype.arrayOf(Proptype.shape({
//     name: Proptype.string,
//     imgPath: Proptype.string,
//     // list of people
//     leaderboard: Proptype.arrayOf(Proptype.shape({
//       position: Proptype.number,
//       name: Proptype.string, 
//       office: Proptype.string,
//       points: Proptype.number,
//       imgPath: Proptype.string
//     }))
//   }))
// }

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
          <LeaderboardSection teams={mockdataTeams}/>
        </Box>
      </Box>

      <Box className={styles.achievementsSection}>
        <h1 className={styles.achievementsTitle}>Achievements In Progress</h1>
      
      <ProgressBar 
        achievementTitle="Novice Runner"
        achievementProgress={60} 
        progressLeft={40}
        />

    <ProgressBar 
        achievementTitle="Master Novice Runner"
        achievementProgress={90} 
        progressLeft={10}
        />


      </Box>
        
      
      
    </div>
  );
}

export default Home;
