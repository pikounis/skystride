import React from 'react';
import RankingCard from './components/Component1/RankingCard';
import lionlogo from './Static/lionlogo.jpeg';
import demonlogo from './Static/demonlogo.jpeg';
import kitsunelogo from './Static/kitsunelogo.jpg';
import { Box } from '@mui/material';

function Leaderboard() {
  return (
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
          <Box
            style={{
              backgroundColor: '#c0c0c0', // Silver color for 2nd place
              width: '200px',
              height: '150px', // shorter for 2nd place
              borderRadius: '10px',
              marginBottom: '-50px', // To lift the card above the podium
              position: 'relative',
              zIndex: 2,
            }}
          />
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
          <Box
            style={{
              backgroundColor: '#ffd700', // Gold color for 1st place or maybe blue?
              width: '200px',
              height: '200px', // taller for 1st place?
              borderRadius: '10px',
              marginBottom: '-50px', // positioning of the  card 
              position: 'bottom',
              zIndex: 3,
            }}
          />
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
          <Box
            style={{
              backgroundColor: '#cd7f32', // Bronze color for 3rd place???
              width: '200px',
              height: '100px', // short for 3rd place
              borderRadius: '10px',
              marginBottom: '-50px', 
              position: 'bottom',
              zIndex: 1,
            }}
          />
          <RankingCard
            rank={3}
            teamName="Pythonic Pavilion"
            points={65}
            profileImage={kitsunelogo}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Leaderboard;
