import React, { useState } from "react";
import { Tab, Box, Typography } from "@mui/material";
// import SwipeableViews from 'react-swipeable-views';
import lionlogo from "./Static/lionlogo.jpeg";
import demonlogo from "./Static/demonlogo.jpeg";
import kitsunelogo from "./Static/kitsunelogo.jpg";

import LeaderboardTable from "./components/LeaderboardTable/LeaderboardTable";
import { TabContext, TabList } from "@mui/lab";
import Podium from "./components/Podium/Podium";
import styles from './Leaderboard.module.css';

function Leaderboard() {
  const [leaderboardGroup, setleaderboardGroup] = useState("Teams")
  const [podiumData, setPodiumData] = useState({
    first: {
      img: lionlogo,
      name: "Sky Central Coders",
      points: 85,
    },
    second: {
      img: demonlogo,
      name: "Hub Hackers",
      points: 75,
    },
    third: {
      img: kitsunelogo,
      name: "Pythonic Pavilion",
      points: 65,
    }
  });
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1) {
      // DO API CALL FOR TEAMS DATA
      setPodiumData({
        first: {
          img: lionlogo,
          name: "Sky Central Coders",
          points: 85,
        },
        second: {
          img: demonlogo,
          name: "Hub Hackers",
          points: 75,
        },
        third: {
          img: kitsunelogo,
          name: "Pythonic Pavilion",
          points: 65,
        }
      })
      setleaderboardGroup("Teams")
    } else if (newValue === 2) {
      // DO API CALL FOR USER DATA
      setPodiumData({
        first: {
          img: lionlogo,
          name: "Jiya",
          points: 85,
        },
        second: {
          img: demonlogo,
          name: "Taso",
          points: 75,
        },
        third: {
          img: kitsunelogo,
          name: "Tanya",
          points: 65,
        }
      })
      setleaderboardGroup("Users")
    } else if (newValue === 3) {
      // DO API CALL FOR OFFICE DATA
      setPodiumData({
        first: {
          img: lionlogo,
          name: "Osterley",
          points: 85,
        },
        second: {
          img: demonlogo,
          name: "Leeds",
          points: 75,
        },
        third: {
          img: kitsunelogo,
          name: "Livingston",
          points: 65,
        }
      })
      setleaderboardGroup("Offices")
    }
  };

  // const handleSwipeChange = (index) => {
  //   setValue(index);
  // };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Tabs Header */}
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          centered
        >
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
        }}>Top {leaderboardGroup}</Typography>

      {/* Swipeable Views for Tab Content */}
      
      <Podium podium={podiumData} />
      <LeaderboardTable />
    </TabContext>
    
  );
}

export default Leaderboard;
