// pages/Home.js
import React from 'react';
import LeaderboardSection from './Components/LeaderboardSection/LeaderboardSection';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';
import { Box, Typography } from '@mui/material';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import BadgeBar from './Components/BadgeBar/BadgeBar';


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
    imgPath: "https://sachin-rekhi.s3-us-west-1.amazonaws.com/blog/minimum-viable-team.jpg", 
    leaderboard: [
      {
        position: 1,
        name: "Nicu",
        office: "Osterley",
        points: 500,
        imgPath: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727136000&semt=ais_hybrid"
      },
      {
        position: 2,
        name: "Pallav",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1727136000&semt=ais_hybrid"
      }
    ]
  },
  {
    name: "Team 2",
    imgPath: "https://thumbs.dreamstime.com/b/teamwork-business-team-meeting-unity-jigsaw-puzzle-concept-47350521.jpg", 
    leaderboard: [
      {
        position: 1,
        name: "Jiya",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 2,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 3,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 4,
        name: "Pallav",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 5,
        name: "Jen",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 6,
        name: "Nicu",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 7,
        name: "Victoria",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
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
      {/* <h1>Hello {mockDataName}!</h1> */}

      <Box sx={{}}>
        <BadgeBar />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'stretch',
        width: '98%',
        flexWrap: 'wrap',
        padding: '1%'
      }}>

        {/* Left Side Section */}
        <Box className={styles.leftSection}>
          {/* Charts Section */}
          <Box className={styles.chartsSection}>
            <h4>Points earned in the last 5 days</h4>
            <LineGraph data={mockDataPoints} />

            <h4>Hours worked out in the last 5 days</h4>
            <Box className={styles.hoursWorkedChart}>
              {/* Add filtering component here */}
              <LineGraph data={mockDataHoursWorkedOut} />
            </Box>
          </Box>

          {/* Achievement Section */}
          <Box className={styles.achievementsSection}>
            <Typography variant='h5' sx={{fontWeight: 'bolder'}}>Achievements In Progress</Typography>
            <ProgressBar
              achievementTitle="Novice Runner"
              achievementProgress={90}
              progressLeft={50}
              badgeIcon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6kco1vTUHJToNzQBlwRoI1stXwneicJ1_g&s"}
            />
            <ProgressBar
              achievementTitle="Master Novice Runner"
              achievementProgress={40}
              progressLeft={30}
              badgeIcon={"https://png.pngtree.com/png-vector/20240723/ourlarge/pngtree-athletic-runner-vintage-badge-design-png-image_12965334.png"}
            />
            <ProgressBar
              achievementTitle="Walking Wonder"
              achievementProgress={60}
              progressLeft={35}
              badgeIcon={"https://img.freepik.com/premium-vector/young-girl-hiking-backpack-with-walking-stick-badge_18591-5527.jpg"}
            />
          </Box>
        </Box>



        {/* Leaderboards Section */}
        <Box className={styles.leaderboardSection}>
          <LeaderboardSection teams={mockdataTeams} />
        </Box>
      </Box>





    </div>
  );
}

export default Home;
