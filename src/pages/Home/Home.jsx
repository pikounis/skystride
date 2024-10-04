// pages/Home.js
import React, { useEffect, useState } from 'react';
import LeaderboardSection from './Components/LeaderboardSection/LeaderboardSection';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';
import { Box, Typography } from '@mui/material';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import BadgeBar from './Components/BadgeBar/BadgeBar';
import axios from 'axios';
import { getUserId, getHeader, APIPath } from '../../util';
import { shadows } from '@mui/system';


const mockDataName = "Jack";

function Home() {
  const [pointsHistory, setPointsHistory] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [nextAchievements, setNextAchievements] = useState([]);
  const [myTeams, setMyTeams] = useState([]);

  const userId = getUserId();
  const headers = getHeader();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Fetch both points, workout, and leaderboard data concurrently
        const [pointsResponse, workoutResponse, teamResponse] = await Promise.all([
          axios.get(`${APIPath}/activity/getPointsHistoryForLast5Days/${userId}`, {headers}),
          axios.get(`${APIPath}/activity/getWorkoutHoursHistoryForLast5Days/${userId}`, {headers}),
          axios.get(`${APIPath}/team/getMyTeams/${userId}`, {headers})
        ]);
        setMyTeams(teamResponse.data);

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
            const response = await axios.get(`${APIPath}/achievement/getTopThree/${userId}`, {headers});

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
  }, [getUserId]); // skyUserId as dependency

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
            <Box className={styles.chartsHeader} sx={{ boxShadow: 3, borderRadius: '4px' }}>
              <h4 className={styles.chartsTitle}>Points Earned in the Last 5 Days</h4>
              {/* data=pointsHistory */}
            </Box>

            <LineGraph data={pointsHistory} /> 

            <Box className={styles.chartsHeader} sx={{ boxShadow: 3, borderRadius: '4px', marginTop: '40px'}}>
              <h4 className={styles.chartsTitle}>Daily Workout Hours in the Last 5 Days</h4>
            </Box>

            <Box className={styles.hoursWorkedChart}>
              {/* Add filtering component here */}
              {/* data=workoutHistory */}
              <LineGraph data={workoutHistory} fillColor="#B8B8FF" strokeColor="#9999FF"/>
            </Box>

          </Box>

          {/* Achievement Section */}
          <Box className={styles.achievementsSection}>
            <Typography variant='h5' sx={{fontWeight: 'bolder'}} className={styles.achievementsTitle}>Achievements In Progress</Typography>
            
            <Box className={styles.achievementsInnerContainer}>
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

          {/* <Box className={styles.achievementsSection}>
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
          </Box> */}

        </Box>



        {/* Leaderboards Section */}
        <Box className={styles.leaderboardSection}>
          <LeaderboardSection teams={myTeams} skyUserId={getUserId}/>
        </Box>
      </Box>





    </div>
  );
}

export default Home;
