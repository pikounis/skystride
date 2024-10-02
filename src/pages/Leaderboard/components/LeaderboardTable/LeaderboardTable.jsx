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

// Styles for the table
const tableCellStyle = {
  fontWeight: 'bold',
  fontFamily: 'Trebuchet MS',
};

const textInTable = {
  fontFamily: 'Trebuchet MS',
  fontStyle: 'italic',
};

const positionAndPointsStyle = {
  fontFamily: 'Trebuchet MS',
  fontWeight: 'bold',
};

// LeaderboardTable now accepts data and loading as props
function LeaderboardTable({ data, loading }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // Render loading state if data is still loading
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Check if no data is available
  if (!data || data.length === 0) {
    return <Typography>No data available</Typography>;
  }

  // Create a list of unique office locations from the dynamic data
  const offices = [...new Set(data.map(row => row.officeLocation))];

  return (
    <Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
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
        display='flex'
        justifyContent='center'
        alignItems='center'
        marginTop='5%'
      >
        <TableContainer
          sx={{
            width: '90%',
            my: '2.5%',
            border: 2,
            borderRadius: '5%',
          }}
          className={styles.tableSizing}
          component={Paper}
        >
          <Typography
            display='flex'
            justifyContent='center'
            alignItems='center'
            py='1%'
            className={styles.caption}
          >
            Leaderboard
          </Typography>

          <Table sx={{ backgroundColor: 'rgba(161, 129, 235, 0.15)' }} aria-label="simple table">
            <TableHead
              sx={{
                borderTop: 3,
                borderBottom: 3,
              }}
            >
              <TableRow>
                <TableCell align='center' style={tableCellStyle} className={styles.textSizingHeader}>
                  Position
                </TableCell>
                <TableCell align='center' style={tableCellStyle} className={styles.textSizingHeader}>
                  Username
                </TableCell>
                <TableCell align='center' style={tableCellStyle} className={styles.textSizingHeader}>
                  Team
                </TableCell>
                <TableCell align='center' style={tableCellStyle} className={styles.textSizingHeader}>
                  Office
                </TableCell>
                <TableCell align='center' style={tableCellStyle} className={styles.textSizingHeader}>
                  Points
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Render rows dynamically based on fetched data */}
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    borderBottom: 2,
                  }}
                >
                  <TableCell
                    style={positionAndPointsStyle}
                    align="center"
                    component="th"
                    scope="row"
                    className={styles.textSizingText}
                  >
                    {index + 1} {/* Position in the leaderboard */}
                  </TableCell>
                  <TableCell style={textInTable} align="center" className={styles.textSizingText}>
                    {row.username || `${row.firstName} ${row.lastName}`} {/* Username or full name */}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={row.teamEmoji || '/images/default-team.jpg'} // Use default image if teamEmoji is not available
                      className={styles.img}
                      alt="team emoji"
                    />
                  </TableCell>
                  <TableCell style={textInTable} align="center" className={styles.textSizingText}>
                    {row.officeLocation}
                  </TableCell>
                  <TableCell
                    style={positionAndPointsStyle}
                    align="center"
                    className={styles.textSizingText}
                  >
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
