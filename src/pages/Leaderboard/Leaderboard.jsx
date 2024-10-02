import React, { useState, useEffect } from "react";
import { Tab, Box, Typography } from "@mui/material";
import axios from "axios"; // Import axios
import lionlogo from "./Static/lionlogo.jpeg";
import demonlogo from "./Static/demonlogo.jpeg";
import kitsunelogo from "./Static/kitsunelogo.jpg";
import LeaderboardTable from "./components/LeaderboardTable/LeaderboardTable";
import { TabContext, TabList } from "@mui/lab";
import Podium from "./components/Podium/Podium";
import styles from './Leaderboard.module.css';
import { APIPath } from "../../util";

function Leaderboard() {
  const [leaderboardGroup, setleaderboardGroup] = useState("Teams");
  const [podiumData, setPodiumData] = useState(null); // Initialize podiumData as null to handle API call
  const [value, setValue] = useState(1);
  const [teamData, setTeamdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      // Fetch teams data and podium for teams
      fetchPodiumData("/team/getPodium"); // Replace with actual endpoint for teams podium data
      setleaderboardGroup("Teams");
    } else if (newValue === 2) {
      // Fetch users data and podium for users
      fetchPodiumData("/users/getPodium"); // Replace with actual endpoint for users podium data
      setleaderboardGroup("Users");
    } else if (newValue === 3) {
      // Fetch offices data and podium for offices
      fetchPodiumData("/offices/getPodium"); // Replace with actual endpoint for offices podium data
      setleaderboardGroup("Offices");
    }
  };

  const fetchPodiumData = (apiEndpoint) => {
    setLoading(true);
    axios
      .get(apiEndpoint) // API call for podium data
      .then((response) => {
        const data = response.data;
        if (data.length >= 3) {
          setPodiumData({
            first: {
              img: data[0].img || lionlogo, // Set default image if none is provided
              name: data[0].name,
              points: data[0].points,
            },
            second: {
              img: data[1].img || demonlogo,
              name: data[1].name,
              points: data[1].points,
            },
            third: {
              img: data[2].img || kitsunelogo,
              name: data[2].name,
              points: data[2].points,
            },
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podium data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Default fetch for Teams podium on component mount
    fetchPodiumData(APIPath + "/team/getAll");
    axios
      .get(APIPath + "/team/getAll") // Replace with your API endpoint to fetch the full team data
      .then((response) => {
        const data = response.data; // Set the received data into state
        setTeamdata(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setLoading(false);
      });
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
        style={{ textAlign: "center", marginTop: "1.5rem" }}
      >
        Top {leaderboardGroup}
      </Typography>

      {/* Podium Component */}
      {podiumData && <Podium podium={podiumData} />} {/* Only show podium if data is available */}
      {!podiumData && <Typography>Loading podium...</Typography>}

      {/* Leaderboard Table Component */}
      <LeaderboardTable data={teamData} loading={loading} />
    </TabContext>
  );
}

export default Leaderboard;
