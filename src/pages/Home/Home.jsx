// pages/Home.js
import React, { useEffect, useState } from 'react';
import LeaderboardSection from './Components/LeaderboardSection/LeaderboardSection';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';
import { Box, Typography } from '@mui/material';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import BadgeBar from './Components/BadgeBar/BadgeBar';
import axios from 'axios';
import { APIPath } from '../../util';


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
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
      },
      {
        position: 1,
        name: "Taso",
        office: "Osterley",
        points: 300,
        imgPath: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-7.jpg"
      },
      {
        position: 1,
        name: "Tanya",
        office: "Osterley",
        points: 300,
        imgPath: "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg"
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
  const skyUserId = 1;
  const [pointsHistory, setPointsHistory] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [nextAchievements, setNextAchievements] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Fetch both points and workout data concurrently
        const [pointsResponse, workoutResponse] = await Promise.all([
          axios.get(`${APIPath}/activity/getPointsHistoryForLast5Days/${skyUserId}`),
          axios.get(`${APIPath}/activity/getWorkoutHoursHistoryForLast5Days/${skyUserId}`)
        ]);

        // Transform the points history data
        const transformedPointsHistory = pointsResponse.data.map((entry) => {
          const date = new Date(entry.date);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = date.getDate();

          // Format date into 'Mon 9th' format
          const formattedDate = `${day} ${dayOfMonth}${getDaySuffix(dayOfMonth)}`;

          return {
            name: formattedDate,
            pv: entry.points, // Points value
          };
        }).reverse();

        // Transform the workout hours history data
        const transformedWorkoutHistory = workoutResponse.data.map((entry) => {
          const date = new Date(entry.date);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = date.getDate();

          // Format date into 'Mon 9th' format
          const formattedDate = `${day} ${dayOfMonth}${getDaySuffix(dayOfMonth)}`;

          return {
            name: formattedDate,
            pv: entry.hours, // Hours value
          };
        }).reverse();

        const fetchNextAchievements = async () => {
          try {
            const response = await axios.get(`${APIPath}/achievement/getTopThree/${skyUserId}`);

            // Assuming the response is an array of achievements with their respective pointsDiff and pointsNeeded
            const transformedAchievements = response.data.map((achievement) => {
              const totalPointsNeeded = achievement.achievement.pointsNeeded;
              const pointsLeft = achievement.pointsDifference;
              const progressPercentage = ((totalPointsNeeded - pointsLeft) / totalPointsNeeded) * 100;

              return {
                achievementTitle: achievement.achievement.name,
                achievementProgress: Math.round(progressPercentage),
                progressLeft: pointsLeft,
                badgeIcon: achievement.achievement.img // Assuming img contains the badge icon URL
              };
            });

            setNextAchievements(transformedAchievements);
          } catch (error) {
            console.error('Error fetching top 3 closest achievements:', error);
          }
        };
        fetchNextAchievements()

        // Set the transformed data in state
        setPointsHistory(transformedPointsHistory);
        setWorkoutHistory(transformedWorkoutHistory);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistoryData();
  }, [skyUserId]); // skyUserId as dependency

  // Helper function to get the day suffix (st, nd, rd, th)
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Covers 11th-20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  console.log(pointsHistory, workoutHistory);

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
            <LineGraph data={pointsHistory} />

            <h4>Hours worked out in the last 5 days</h4>
            <Box className={styles.hoursWorkedChart}>
              {/* Add filtering component here */}
              <LineGraph data={workoutHistory} />
            </Box>
          </Box>

          {/* Achievement Section */}
          {/* <Box className={styles.achievementsSection}>
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
          </Box> */}
          <Box className={styles.achievementsSection}>
            <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>Achievements In Progress</Typography>
            {nextAchievements.map((achievement, index) => (
              <ProgressBar
                key={index}
                achievementTitle={achievement.achievementTitle}
                achievementProgress={achievement.achievementProgress}
                progressLeft={achievement.progressLeft}
                badgeIcon={achievement.badgeIcon}
              />
            ))}
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
