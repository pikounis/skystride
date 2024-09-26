import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import RankingCard from './components/Component1/RankingCard';
import lionlogo from './Static/lionlogo.jpeg';
import demonlogo from './Static/demonlogo.jpeg';
import kitsunelogo from './Static/kitsunelogo.jpg';
import LeaderboardTable from './components/Component1/LeaderboardTable';

function Leaderboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSwipeChange = (index) => {
    setValue(index);
  };

  return (
    <div>
      {/* Tabs Header */}
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Teams" />
        <Tab label="Users" />
        <Tab label="Offices" />
      </Tabs>

      {/* Swipeable Views for Tab Content */}
      <SwipeableViews index={value} onChangeIndex={handleSwipeChange}>

        {/* Tab 1: Leaderboard with Ranking Cards */}
        <div>
          <h1 style={{ textAlign: 'center', color: '#6a11cb', marginTop: '1.5rem' }}>Top Teams</h1>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            gap="20px"
            sx={{ 
              marginTop: '50px', 
              width: "100%", 
              height: "40vh",
              '@media (max-width:1200px)': {
                height: "40vw"
              }
            }}
          >
            {/* Second Place */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: '15%',
                height: '100%',
                justifyContent: "flex-end",
                '@media (max-width:1200px)': { 
                  width: '28%'
                }
              }}
            >
              <RankingCard
                rank={2}
                teamName="Hub Hackers"
                points={75}
                profileImage={demonlogo}
              />
              <Box sx={{ height: '15%', width: '90%', backgroundColor: 'silver', borderRadius: '10px' }} />
            </Box>

            {/* First Place */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: '15%',
                height: '100%',
                justifyContent: "flex-end",
                '@media (max-width:1200px)': { 
                  width: '28%'
                }
              }}
            >
              <RankingCard
                rank={1}
                teamName="Sky Central Coders"
                points={85}
                profileImage={lionlogo}
              />

              <Box sx={{ height: '23%', width: '90%', backgroundColor: 'gold', borderRadius: '10px' }} />
            </Box>

            {/* Third Place */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: '15%',
                height: '100%',
                justifyContent: "flex-end",
                '@media (max-width:1200px)': { 
                  width: '28%'
                }
              }}
            >
              <RankingCard
                rank={3}
                teamName="Pythonic Pavilion"
                points={65}
                profileImage={kitsunelogo}
              />
              <Box sx={{ height: '7%', width: '90%', backgroundColor: 'brown', borderRadius: '10px' }} />
            </Box>
          </Box>
        </div>

        {/* Tab 2: Placeholder Content for "USER" */}
        <div>
          <Box p={3}>
            <Typography variant="h4" align="center">
              User
            </Typography>
            <Typography align="center">
              This is where the users leaderboard will be.
            </Typography>
          </Box>
        </div>

        {/* Tab 3: Placeholder Content for "ORGANISATION" */}
        <div>
          <Box p={3}>
            <Typography variant="h4" align="center">
              Offices
            </Typography>
            <Typography align="center">
              This is where the offices leaderboard will be.
            </Typography>
          </Box>
        </div>
      </SwipeableViews>
      <LeaderboardTable />
    </div>
  );
}

export default Leaderboard;
