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
import styles from './LeaderboardTable.module.css';

function createData(occupiedPlace, username, teamEmoji, officeLocation, points) {
  return { occupiedPlace, username, teamEmoji, officeLocation, points };
}

const rows = [
  createData('4th', 'Player 1', team, 'Osterley', 200),
  createData('5th', 'Player 2', team, 'Osterley', 180),
  createData('6th', 'Player 3', team, 'Livingstone', 90),
  createData('7th', 'Player 4', team, 'Leeds', 87),
];

const myPlace = [
  createData('7th', 'Player 4', team, 'Leeds', 87)
];

const tableCellStyle = {
  fontWeight: 'bold',
  fontFamily: 'Trebuchet MS'
};

const textInTable = {
  fontFamily: 'Trebuchet MS',
  fontStyle: 'italic'
};

const positionAndPointsStyle = {
  fontFamily: 'Trebuchet MS',
  fontWeight: 'bold',
};

function LeaderboardTable() {
  return (
    <Box
      display = 'flex'
      justifyContent = 'center'
      alignItems = 'center'
      minH
      marginTop = '7.5%'
    >

      <TableContainer 
        sx = {{
          width: '90%',
          my: '2.5%',
          border: 2,
          borderRadius: '5%',
        }}
        className = {styles.tableSizing}
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
          py = '1%'
          fontSize = '4.5vw' 
          className ={styles.caption}     
        >
          Leaderboard
        </Typography>

        <Table sx={{ 
          backgroundColor: 'rgba(161, 129, 235, 0.15)',
          }} 
          aria-label="simple table"
        >
          
          <TableHead
            sx = {{
              borderTop: 3,
              borderBottom: 3,
            }}>
            <TableRow>
              <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
                Position
              </TableCell>
              <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
                Username
              </TableCell>
              <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
                Team
              </TableCell>
              <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
                Office
              </TableCell>
              <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
                Points
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.occupiedPlace}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: 2
                }}
              >
                <TableCell  style = {positionAndPointsStyle} align="center" component="th" scope="row" className = {styles.textSizingText}>
                  {row.occupiedPlace}
                </TableCell>
                <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
                  {row.username}
                </TableCell>
                <TableCell align="center">
                  {<img src={row.teamEmoji} class='img-fluid' className={styles.img}alt="team emoji"></img>}
                </TableCell>
                <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
                  {row.officeLocation}
                </TableCell>
                <TableCell style = {positionAndPointsStyle} align="center" className = {styles.textSizingText}>
                  {row.points}
                </TableCell>
              </TableRow>
            ))}

            <TableRow >
              <TableCell colSpan={5} className = {styles.dots} align='center'>
              </TableCell>
            </TableRow>

            {myPlace.map((row) => (
              <TableRow
                key={row.occupiedPlace}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderTop: 2,
                }}
                className = {styles.userRow}
              >
                <TableCell  style = {positionAndPointsStyle} align="center" component="th" scope="row" className = {styles.textSizingText}>
                  {row.occupiedPlace}
                </TableCell>
                <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
                  {row.username}
                </TableCell>
                <TableCell align="center">
                  {<img src={row.teamEmoji} class='img-fluid' className={styles.img} alt="team emoji"></img>}
                </TableCell>
                <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
                  {row.officeLocation}
                </TableCell>
                <TableCell style = {positionAndPointsStyle} align="center" className = {styles.textSizingText}>
                  {row.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default LeaderboardTable;