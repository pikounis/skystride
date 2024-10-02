import React, { useState, useEffect } from "react";
import { Tab, Box, Typography } from "@mui/material";
import axios from "axios";
import LeaderboardTable from "./components/LeaderboardTable/LeaderboardTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Podium from "./components/Podium/Podium";
import styles from './Leaderboard.module.css';
import { APIPath } from "../../util";


const logos = {
  lion: ('/images/lionlogo.jpeg'),
  demon: ('/images/demonlogo.jpeg'),
  kitsune: ('/images/kitsunelogo.jpeg')
};


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
      fetchPodiumData("/team/getAll", setTeamdata); // Fetch team data
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
      .get(APIPath + endpoint)
      .then((response) => {
        const data = response.data;

        // Sort by points in descending order
        const sortedData = data.sort((a, b) => b.points - a.points);

        // Assign top 3 for the podium, if applicable
        if (sortedData.length >= 3) {
          // Determine how to handle name fields based on the data structure
          let getName = (item) => item.name; // For teams or offices
          if (endpoint.includes("/user")) {
            // For users, concatenate firstName and lastName
            getName = (item) => `${item.firstName} ${item.lastName}`;
          }

          setPodiumData({
            first: {
              img: sortedData[0].imageURL || logos.lion,
              name: getName(sortedData[0]),
              points: sortedData[0].points
            },
            second: {
              img: sortedData[1].imageURL || logos.demon,
              name: getName(sortedData[1]),
              points: sortedData[1].points
            },
            third: {
              img: sortedData[2].imageURL || logos.kitsune,
              name: getName(sortedData[2]),
              points: sortedData[2].points
            }
          });
        }

        // Set the fetched data
        setData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch team data by default when component mounts
    fetchPodiumData("/team/getAll", setTeamdata);
  }, []);



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
      <TabPanel value={1}>
        <LeaderboardTable data={teamData} loading={loading} />
      </TabPanel>

      {/* Leaderboard Table for Users */}
      <TabPanel value={2}>
        <LeaderboardTable data={userData} loading={loading} />
      </TabPanel>

      {/* Leaderboard Table for Offices */}
      <TabPanel value={3}>
        <LeaderboardTable data={officeData} loading={loading} />
      </TabPanel>
    </TabContext>
  );
}

export default Leaderboard;
