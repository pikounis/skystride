import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, useMediaQuery } from '@mui/material';
import {
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
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from '@mui/icons-material';
import EditExercise from './EditExercise';
import CollapsibleRow from './CollapsibleRow';
import styles from '../Activity.module.css';


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

// Main component for the activity table
const ActivityTable = ({ rows }) => {
  const [page, setPage] = React.useState(0); // State to track the current page
  const rowsPerPage = 10; // Number of rows to display per page


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

            {isMobile ? (
              <>
                {/* Mobile Headers */}
                {[

                  "", // Empty cell for mobile
                  "Date",
                  "Exercise",
                  ""  // Empty cell for mobile

                  ].map((header, index) => (
                    <TableCell key={index} className={styles.tableHeaderCell}>
                      {header}
                    </TableCell>
                ))}
              </>
            ) : (
              <>
                {/* Desktop Headers */}
                {[

                  "Date",
                  "Exercise",
                  "Start",
                  "Finish",
                  "Total Time",
                  "Points",
                  ""  // Empty cell for desktop

                  ].map((header, index) => (
                    <TableCell key={index} className={styles.tableHeaderCell}>
                      {header}
                    </TableCell>
                  ))}
              </>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          
          {/* Render rows for the current page */}
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            isMobile ? ( 

              // Render a collapsible row in mobile view
              <CollapsibleRow key={row.date} row={row} /> 
            ) : (

              // Render a regular table row in desktop view
              <TableRow className={styles.tableBodyRow} key={row.date}>

                <TableCell className={`${styles.tableBodyCell} ${styles.datesColour}`} component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{row.exercise}</TableCell>
                <TableCell className={`${styles.tableBodyCell} ${styles.highlightColumn}`}>{row.start}</TableCell>
                <TableCell className={`${styles.tableBodyCell} ${styles.highlightColumn}`}>{row.finish}</TableCell>
                <TableCell className={styles.tableBodyCell}>{row.total_time}</TableCell>
                <TableCell className={`${styles.tableBodyCell} ${styles.pointsCell}`}>{row.points}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  <EditExercise />
                </TableCell>

              </TableRow>
            )
          ))}

          {/* Render empty rows if needed for spacing */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}

        </TableBody>

        <TableFooter>
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={7}
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

// Define expected prop types for ActivityTable component
ActivityTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ActivityTable;
