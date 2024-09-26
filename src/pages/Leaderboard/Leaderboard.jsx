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
          <h1 style={{ textAlign: 'center', color: '#6a11cb' }}>Top Teams</h1>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            gap="20px"
            style={{ marginTop: '50px', height: '300px' }}
          >
            {/* Second Place */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <RankingCard
                rank={2}
                teamName="Hub Hackers"
                points={75}
                profileImage={demonlogo}
              />
            </Box>

            {/* First Place */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <RankingCard
                rank={1}
                teamName="Sky Central Coders"
                points={85}
                profileImage={lionlogo}
              />
            </Box>

            {/* Third Place */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <RankingCard
                rank={3}
                teamName="Pythonic Pavilion"
                points={65}
                profileImage={kitsunelogo}
              />
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
      <LeaderboardTable/>
    </div>
  );
}

export default Leaderboard;
