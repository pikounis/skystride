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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

// Bootstrap CSS + CSS file import
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './LeaderboardTable.module.css';

const team = '/images/team.jpg';

function createData(occupiedPlace, username, teamEmoji, officeLocation, points) {
  return { occupiedPlace, username, teamEmoji, officeLocation, points };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const rows = [
  createData('4th', 'Player 1', team, 'Osterley', 200),
  createData('5th', 'Player 2', team, 'Osterley', 180),
  createData('6th', 'Player 3', team, 'Livingstone', 90),
  createData('7th', 'Player 4', team, 'Leeds', 87),
];

const offices = [...new Set(rows.map(row => row.officeLocation))];

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
  const [personName, setPersonName] = React.useState([]);

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setPersonName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

  return (
    <Box>
          
      <Box
        display = 'flex'
        justifyContent = 'center'
        alignItems = 'center'
      >
        <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        </Search>

      <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {offices.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
          ))}
        </Select>
          <FormHelperText>Filter users based on office</FormHelperText>
        </FormControl>

      </Box>

    <Box
      display = 'flex'
      justifyContent = 'center'
      alignItems = 'center'
      marginTop = '5%'
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
          display = 'flex'
          justifyContent = 'center'
          alignItems = 'center'
          py = '1%'
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
                  {<img src={row.teamEmoji} class='img-fluid' className = {styles.img} alt="team emoji"></img>}
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
    </Box>
  );
}

export default LeaderboardTable;