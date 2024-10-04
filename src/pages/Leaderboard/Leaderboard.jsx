import React, { useState, useEffect } from "react";
import { Tab, Box, Typography } from "@mui/material";
import axios from "axios";
import LeaderboardTable from "./components/LeaderboardTable/LeaderboardTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Podium from "./components/Podium/Podium";
import styles from './Leaderboard.module.css';
import { getHeader, APIPath } from "../../util";


const logos = {
  lion: ('/images/lionlogo.jpeg'),
  demon: ('/images/demonlogo.jpeg'),
  kitsune: ('/images/kitsunelogo.jpeg')
};


const mapTeamData = (data) => {
  return data.map((team, index) =>
    createData(
      index + 1, // occupiedPlace
      team.name, // username
      team.imageURL, // teamEmoji
      "", // officeLocation (not applicable for teams)
      Math.round(team.averagePoints) // points (averagePoints for teams)
    )
  );
};


const mapUserData = (data) => {
  return data.map((user, index) =>
    createData(
      index + 1, // occupiedPlace
      `${user.firstName} ${user.lastName}`, // username
      "", // teamEmoji (not applicable for users)
      user.office, // officeLocation
      Math.round(user.points) // points
    )
  );
};


function mapOfficeData() {

}

function createData(occupiedPlace, username, teamEmoji, officeLocation, points) {
  return { occupiedPlace, username, teamEmoji, officeLocation, points };
}

function Leaderboard() {
  const [leaderboardGroup, setleaderboardGroup] = useState("Teams");
  const [podiumData, setPodiumData] = useState(null);
  const [value, setValue] = useState(1); // Default to 'Teams'
  const [teamData, setTeamdata] = useState([]);
  const [userData, setUserData] = useState([]); // For users
  const [officeData, setOfficeData] = useState([]); // For offices
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Fetch the appropriate data based on selected tab
    if (newValue === 1) {
      setleaderboardGroup("Teams");
      fetchPodiumData("/team/getAllWithAveragePoints", setTeamdata); // Fetch team data
    } else if (newValue === 2) {
      setleaderboardGroup("Users");
      fetchPodiumData("/user/getAll", setUserData); // Fetch user data
    } else if (newValue === 3) {
      setleaderboardGroup("Offices");
      fetchPodiumData("/office/getAll", setOfficeData); // Fetch office data
    }
  };

  const fetchPodiumData = (endpoint, setData) => {
    
    setLoading(true);
    axios
      .get(APIPath + endpoint, {getHeader})
      .then((response) => {
        const data = response.data;
  
        // Sort by points in descending order
        const sortedData = data.sort((a, b) => b.points - a.points || b.averagePoints - a.averagePoints);
  
        // Assign top 3 for the podium, if applicable
        if (sortedData.length >= 3) {
          let getName = (item) => item.name; // Default for teams or offices
          if (endpoint.includes("/user")) {
            getName = (item) => `${item.firstName} ${item.lastName}`;
          }
  
          setPodiumData({
            first: {
              img: sortedData[0].imageURL || logos.lion,
              name: getName(sortedData[0]),
              points: Math.round(sortedData[0].points || sortedData[0].averagePoints),
            },
            second: {
              img: sortedData[1].imageURL || logos.demon,
              name: getName(sortedData[1]),
              points: Math.round(sortedData[1].points || sortedData[1].averagePoints),
            },
            third: {
              img: sortedData[2].imageURL || logos.kitsune,
              name: getName(sortedData[2]),
              points: Math.round(sortedData[2].points || sortedData[2].averagePoints),
            },
          });
        }
  
        // Map the data to the required format for each group
        if (endpoint.includes("/team")) {
          setData(mapTeamData(sortedData));
        } else if (endpoint.includes("/user")) {
          setData(mapUserData(sortedData));
        } else if (endpoint.includes("/office")) {
          // Leave mapping logic here for offices when implemented
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch team data by default when component mounts
    fetchPodiumData("/team/getAllWithAveragePoints", setTeamdata); 
  }, []);

  // LEADERBOARD TABLE

  

  const team = '/images/team.jpg';
  
  const rows = [
    createData('4th', 'Player 1', team, 'Osterley', 200),
    createData('5th', 'Player 2', team, 'Osterley', 180),
    createData('6th', 'Player 3', team, 'Livingstone', 90),
    createData('7th', 'Player 4', team, 'Leeds', 87),
  ];

  const myPlace = [
    createData('7th', 'Player 4', team, 'Leeds', 87)
  ];

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Tabs Header */}
        <TabList onChange={handleChange} aria-label="Leaderboard tabs" centered>
          <Tab label="Teams" value={1} />
          <Tab label="Users" value={2} />
          <Tab label="Offices" value={3} />
        </TabList>
      </Box>


      <Typography
        variant="h2"
        className={styles.captions}
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
        }}
      >
        Top {leaderboardGroup}
      </Typography>

      {/* Podium Component */}
      {podiumData && <Podium podium={podiumData} />}
      {!podiumData && <Typography>Loading podium...</Typography>}

      {/* Leaderboard Table for Teams */}
      {/* CHECK WHERE TEAMDATA IS BEING PULLED FROM, AND ROWS FROM LEADERBOARDTABLE */}
      <TabPanel value={1}>
        <LeaderboardTable data={teamData} loading={loading} rows={teamData} />
      </TabPanel>

      {/* Leaderboard Table for Users */}
      <TabPanel value={2}>
        <LeaderboardTable data={userData} loading={loading} rows={userData}/>
      </TabPanel>

      {/* Leaderboard Table for Offices */}
      <TabPanel value={3}>
        <LeaderboardTable data={officeData} loading={loading} rows={rows}/>
      </TabPanel>
    </TabContext>
  );
}

export default Leaderboard;
