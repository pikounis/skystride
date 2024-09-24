// All imports required for React and Material UI
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Typography from '@mui/joy/Typography';

// Import the images of the team
import team from './teamsImages/team.jpg';

// Bootstrap CSS + CSS file import
import "bootstrap/dist/css/bootstrap.min.css";
import "./LeaderboardTable.module.css";

function createData(occupiedPlace, username, teamEmoji, officeLocation, points) {
  return { occupiedPlace, username, teamEmoji, officeLocation, points };
}

const rows = [
  createData('4th', 'Player 1', team, 'Osterley', 200),
  createData('5th', 'Player 2', team, 'Osterley', 180),
  createData('6th', 'Player 3', team, 'Livingstone', 90),
  createData('7th', 'Player 4', team, 'Leeds', 87),
];

function LeaderboardTable() {
  return (
    <Box
      display = 'flex'
      justifyContent = 'center'
      alignItems = 'center'
      minH
    >

      <TableContainer 
        sx = {{
          width: '90%',
          my: '2.5%'
        }}
        component={Paper}
      >

        <Typography
          level = 'h2'
          sx = {{ flex: '1 1 100%' }}
          id = 'tableTitle'
          component = 'div'
          display = 'flex'
          justifyContent = 'center'
          alignItems = 'center'
        >
          Leaderboard
        </Typography>

        <Table sx={{ 
          minWidth: 100,
          }} aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.occupiedPlace}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <TableCell  align="center" component="th" scope="row">
                  {row.occupiedPlace}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{<img src={row.teamEmoji} class='img-fluid' alt="team emoji"></img>}</TableCell>
                <TableCell align="center">{row.officeLocation}</TableCell>
                <TableCell align="center">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default LeaderboardTable;