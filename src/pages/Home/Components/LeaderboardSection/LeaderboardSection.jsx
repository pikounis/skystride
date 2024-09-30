import React, { useState } from 'react';
import { Card, Box, Pagination, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Proptype from 'prop-types';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';

const LeaderboardSection = ({ teams }) => {
  const [page, setPage] = useState(1);
  const totalPages = teams.length >= 1 ? teams.length : 1; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Card
      sx={{
        // width: 300,
        // height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Box to hold the inner table component */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          height: '70vh',
          overflow: 'scroll'
        }}
      >
        {teams.length == 0 ? 
          <Typography variant="h6">Please join teams to see your teams here!</Typography>
          :
          <LeaderboardTable team={teams[page - 1]}/>
        }
        
      </Box>

      {/* Pagination bar at the bottom */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          borderTop: '1px solid lightgray',
        }}
      >
        <IconButton
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="body1" sx={{ margin: '0 16px' }}>
          {page}/{totalPages}
        </Typography>

        <IconButton
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

LeaderboardSection.propType = {
  // list of teams
  teams: Proptype.arrayOf(Proptype.shape({
    name: Proptype.string,
    imgPath: Proptype.string,
    // list of people
    leaderboard: Proptype.arrayOf(Proptype.shape({
      position: Proptype.number,
      name: Proptype.string, 
      office: Proptype.string,
      points: Proptype.number,
      imgPath: Proptype.string
    }))
  }))
}

export default LeaderboardSection;
