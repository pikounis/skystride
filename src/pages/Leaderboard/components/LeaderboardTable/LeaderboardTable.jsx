import * as React from 'react';
import PropTypes from 'prop-types';
import { 
  useTheme, 
  useMediaQuery, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TablePagination, 
  TableRow, 
  Paper, 
  TableHead, 
  IconButton, 
  OutlinedInput, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  ListItemText, 
  Select, 
  Checkbox, 
  FormHelperText, 
  InputBase 
} from '@mui/material';
import { 
  FirstPage as FirstPageIcon, 
  KeyboardArrowLeft, 
  KeyboardArrowRight, 
  LastPage as LastPageIcon, 
  Search as SearchIcon 
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/joy/Typography';

// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './LeaderboardTable.module.css';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

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

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));


// const tableCellStyle = {
//   fontWeight: 'bold',
//   fontFamily: 'Trebuchet MS'
// };

// const textInTable = {
//   fontFamily: 'Trebuchet MS',
//   fontStyle: 'italic'
// };

// const positionAndPointsStyle = {
//   fontFamily: 'Trebuchet MS',
//   fontWeight: 'bold',
// };

// function LeaderboardTable() {
//   const [personName, setPersonName] = React.useState([]);

// const handleChange = (event) => {
//   const {
//     target: { value },
//   } = event;
//   setPersonName(
//     // On autofill we get a stringified value.
//     typeof value === 'string' ? value.split(',') : value,
//   );
// };

// Component for pagination actions (First, Previous, Next, Last buttons)
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, onPageChange } = props;


  // Function to handle clicking the first page button
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0); // Go to the first page
  };


  // Function to handle clicking the previous page button
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1); // Go to the previous page
  };

  // Function to handle clicking the next page button
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1); // Go to the next page
  };

  // Function to handle clicking the last page button
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / 10) - 1)); // Go to the last page
  };

//   return (
//     <Box>
          
//       <Box
//         display = 'flex'
//         justifyContent = 'center'
//         alignItems = 'center'
//       >
//         <Search>
//         <SearchIconWrapper>
//           <SearchIcon />
//         </SearchIconWrapper>
//         <StyledInputBase
//           placeholder="Search…"
//           inputProps={{ 'aria-label': 'search' }}
//         />
//         </Search>

//       <FormControl sx={{ m: 1, width: 300 }}>
//       <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {offices.map((name) => (
//           <MenuItem key={name} value={name}>
//             <Checkbox checked={personName.includes(name)} />
//             <ListItemText primary={name} />
//           </MenuItem>
//           ))}
//         </Select>
//           <FormHelperText>Filter users based on office</FormHelperText>
//         </FormControl>

//       </Box>

//     <Box
//       display = 'flex'
//       justifyContent = 'center'
//       alignItems = 'center'
//       marginTop = '5%'
//     >  

//       <TableContainer 
//         sx = {{
//           width: '90%',
//           my: '2.5%',
//           border: 2,
//           borderRadius: '5%',
//         }}
//         className = {styles.tableSizing}
//         component={Paper}
//       >

//         <Typography
//           display = 'flex'
//           justifyContent = 'center'
//           alignItems = 'center'
//           py = '1%'
//           className ={styles.caption}     
//         >
//           Leaderboard
//         </Typography>

//         <Table sx={{ 
//           backgroundColor: 'rgba(161, 129, 235, 0.15)',
//           }} 
//           aria-label="simple table"
//         >
          
//           <TableHead
//             sx = {{
//               borderTop: 3,
//               borderBottom: 3,
//             }}>
//             <TableRow>
//               <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
//                 Position
//               </TableCell>
//               <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
//                 Username
//               </TableCell>
//               <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
//                 Team
//               </TableCell>
//               <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
//                 Office
//               </TableCell>
//               <TableCell align = 'center' style = {tableCellStyle} className={styles.textSizingHeader}>
//                 Points
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.occupiedPlace}
//                 sx={{ 
//                   '&:last-child td, &:last-child th': { border: 0 },
//                   borderBottom: 2
//                 }}
//               >
//                 <TableCell  style = {positionAndPointsStyle} align="center" component="th" scope="row" className = {styles.textSizingText}>
//                   {row.occupiedPlace}
//                 </TableCell>
//                 <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
//                   {row.username}
//                 </TableCell>
//                 <TableCell align="center">
//                   {<img src={row.teamEmoji} class='img-fluid' className = {styles.img} alt="team emoji"></img>}
//                 </TableCell>
//                 <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
//                   {row.officeLocation}
//                 </TableCell>
//                 <TableCell style = {positionAndPointsStyle} align="center" className = {styles.textSizingText}>
//                   {row.points}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow >
//               <TableCell colSpan={5} className = {styles.dots} align='center'>
//               </TableCell>
//             </TableRow>

//             {myPlace.map((row) => (
//               <TableRow
//                 key={row.occupiedPlace}
//                 sx={{ 
//                   '&:last-child td, &:last-child th': { border: 0 },
//                   borderTop: 2,
//                 }}
//                 className = {styles.userRow}
//               >
//                 <TableCell  style = {positionAndPointsStyle} align="center" component="th" scope="row" className = {styles.textSizingText}>
//                   {row.occupiedPlace}
//                 </TableCell>
//                 <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
//                   {row.username}
//                 </TableCell>
//                 <TableCell align="center">
//                   {<img src={row.teamEmoji} class='img-fluid' className={styles.img} alt="team emoji"></img>}
//                 </TableCell>
//                 <TableCell style = {textInTable} align="center" className = {styles.textSizingText}>
//                   {row.officeLocation}
//                 </TableCell>
//                 <TableCell style = {positionAndPointsStyle} align="center" className = {styles.textSizingText}>
//                   {row.points}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// Render pagination action buttons
return (
  <Box sx={{ flexShrink: 0, ml: 2.5 }}>
    <IconButton
      onClick={handleFirstPageButtonClick}
      disabled={page === 0}
      aria-label="first page"
    >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton
      onClick={handleBackButtonClick}
      disabled={page === 0}
      aria-label="previous page"
    >
      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
    <IconButton
      onClick={handleNextButtonClick}
      disabled={page >= Math.ceil(count / 10) - 1}
      aria-label="next page"
    >
      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
    <IconButton
      onClick={handleLastPageButtonClick}
      disabled={page >= Math.ceil(count / 10) - 1}
      aria-label="last page"
    >
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </Box>
);
}

// Defines the expected prop types for TablePaginationActions component
TablePaginationActions.propTypes = {
count: PropTypes.number.isRequired, // Total number of items
onPageChange: PropTypes.func.isRequired, // Function to handle page changes
};


const LeaderboardTable = ({rows}) => {
const [page, setPage] = React.useState(0); // State to track the current page
const rowsPerPage = 10; // Number of rows to display per page
const offices = [...new Set(rows.map(row => row.officeLocation))];

// Check if the viewport is mobile size
const isMobile = useMediaQuery('(max-width:700px)');


// Calculate the number of empty rows to fill the table
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


// Function to change the current page
const handleChangePage = (event, newPage) => {
  setPage(newPage); // Update the current page
};


return (
  <TableContainer component={Paper} className={styles.tableContainer}>

    <Table sx={{ width: '100%'}} aria-label="collapsible table">

      <TableHead>
        <TableRow className={styles.tableHeader}>

            <>
              {/* Desktop Headers */}
              {[

                "Position",
                "Name",
                "Team",
                "Office",
                "Points",

                ].map((header, index) => (
                  <TableCell key={index} className={styles.tableHeaderCell}>
                    {header}
                  </TableCell>
                ))}
            </>

        </TableRow>
      </TableHead>

      <TableBody>
        
        {/* Render rows for the current page */}
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (

            // Render a regular table row in desktop view
            // ADD COLUMN NAME AFTER ROW, Example: row.firstname
            <TableRow className={styles.tableBodyRow}>

              <TableCell className={styles.tableBodyCell} component="th" scope="row">{row.occupiedPlace}</TableCell>
              <TableCell className={`${styles.tableBodyCell} ${styles.player}`}>{row.firstName}</TableCell>
              <TableCell className={styles.tableBodyCell}>
                  {<img src={row.teamEmoji} class='img-fluid' className = {styles.img} alt="team emoji"></img>}
              </TableCell>
              <TableCell className={styles.tableBodyCell}>{row.officeLocation}</TableCell>
              <TableCell className={styles.tableBodyCell}>{row.points}</TableCell>


            </TableRow>
            
        ))}

        {/* Render empty rows if needed for spacing */}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={5} />
          </TableRow>
        )}

      </TableBody>

      <TableFooter>
        <TableRow >
          <TablePagination
            rowsPerPageOptions={[]}
            colSpan={5}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>

    </Table>
  </TableContainer>
);
};


LeaderboardTable.propTypes = {
  rows: PropTypes.array.isRequired
};

export default LeaderboardTable;
