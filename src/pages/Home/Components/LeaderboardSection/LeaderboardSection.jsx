import React, { useState } from 'react';
import { Card, Box, Pagination, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LeaderboardSection = () => {
  const [page, setPage] = useState(1);
  const totalPages = 4; // For example, 4 pages

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
          padding: 2,
          height: '70vh',
          overflow: 'scroll'
        }}
      >
        <Typography variant="h6">Another Component</Typography>
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

export default LeaderboardSection;
