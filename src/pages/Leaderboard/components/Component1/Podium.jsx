import React from 'react';
import { Box } from '@mui/material';

const CardComponent = ({ rank }) => (
  <div>
    {/* Dynamic content can be added here */}
    {/* Example: You could render the team name and points passed as props */}
  </div>
);

const PodiumStep = ({ rank }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28%' }}>
    <CardComponent rank={rank} />
    <Box 
      className={`podium_step_${rank}`} 
      sx={{
        width: '100%', 
        height: rank === 1 ? '150px' : rank === 2 ? '125px' : '100px', 
        backgroundColor: rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze', 
        borderRadius: '10px', 
        marginTop: '10px'
      }} 
    />
  </Box>
);

const Podium = ({ topTeams }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', margin: '0 auto' }}>
    {topTeams.map((team, index) => (
      <PodiumStep 
        key={team.id} 
        rank={index + 1}
      />
    ))}
  </Box>
);

export default Podium;
