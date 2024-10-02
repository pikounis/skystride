import React, { useState, useEffect } from "react";
import { Tab, Box, Typography } from "@mui/material";
import axios from "axios";
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
  const [podiumData, setPodiumData] = useState(null); 
  const [value, setValue] = useState(1);
  const [teamData, setTeamdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      fetchPodiumData();
      setleaderboardGroup("Teams");
    }
  };

  const fetchPodiumData = () => {
    setLoading(true);
    axios
      .get(APIPath + "/team/getAll")
      .then((response) => {
        const data = response.data;

        // Sort teams by their own criteria if necessary (e.g., points, created date)
        const sortedTeams = data; // Modify sorting if needed.

        // Assign top 3 teams to podium
        if (sortedTeams.length >= 3) {
          setPodiumData({
            first: {
              img: sortedTeams[0].imageURL || lionlogo, // Use team image or default
              name: sortedTeams[0].name,
              points: 100 // Placeholder for points, replace with actual value if available
            },
            second: {
              img: sortedTeams[1].imageURL || demonlogo,
              name: sortedTeams[1].name,
              points: 90 // Placeholder for points
            },
            third: {
              img: sortedTeams[2].imageURL || kitsunelogo,
              name: sortedTeams[2].name,
              points: 80 // Placeholder for points
            }
          });
        }

        // Set all team data for the leaderboard
        setTeamdata(sortedTeams);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch data for Teams podium on component mount
    fetchPodiumData();
  }, []);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Tabs Header */}
        <TabList onChange={handleChange} aria-label="Leaderboard tabs" centered>
          <Tab label="Teams" value={1} />
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
      {podiumData && <Podium podium={podiumData} />} {/* Show podium if data is available */}
      {!podiumData && <Typography>Loading podium...</Typography>}

      {/* Leaderboard Table Component */}
      <LeaderboardTable data={teamData} loading={loading} />
    </TabContext>
  );
}

export default Leaderboard;
