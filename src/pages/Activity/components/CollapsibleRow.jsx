import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Collapse, IconButton, Box, Table, TableBody } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditExercise from './EditExercise';
import styles from '../Activity.module.css';
import { useMediaQuery } from '@mui/material';

const CollapsibleRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <TableRow className={styles.tableBodyRow}>

        <TableCell>

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

        </TableCell>

        <TableCell className={styles.tableMobileCell}>{row.date}</TableCell>
        <TableCell className={styles.tableMobileCell}>{row.exercise}</TableCell>
        <TableCell className={styles.tableMobileCell}>
            <EditExercise />
        </TableCell>
        
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="details">

                <TableBody>

                    <TableRow>
                        <TableCell className={styles.tableMobileCell}>Start: {row.start}</TableCell>
                        <TableCell className={styles.tableMobileCell}>Finish: {row.finish}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className={styles.tableMobileCell}>Total Time:</TableCell>
                        <TableCell className={styles.tableMobileCell}>{row.total_time}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className={styles.tableMobileCell}>Points</TableCell>
                        <TableCell className={styles.tableMobileCell}>{row.points}</TableCell>
                    </TableRow>

                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

CollapsibleRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default CollapsibleRow;
