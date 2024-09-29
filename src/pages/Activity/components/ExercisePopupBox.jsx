import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import Calendar from './Calendar';
import SportsDropDown from './SportsDropDown';
import StartEndTime from './StartEndTime';
import Duration from './Duration';
import styles from '../Activity.module.css';

const ExercisePopupBox = React.forwardRef(({ title, message, onConfirm, isDelete }, ref) => {

  // Sample data for the sports dropdown
  const sports = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Cricket'];

  // State to manage dialog open/close
  const [open, setOpen] = React.useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Make the handleClickOpen method accessible to the parent component via the ref
  React.useImperativeHandle(ref, () => ({
    handleClickOpen
  }));

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isDelete && onConfirm) {
      onConfirm(); // Call the confirm action for delete
    }
    handleClose(); // Close the dialog after submission
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleFormSubmit,
        sx: { padding: 3 }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>

        <DialogContentText>{message}</DialogContentText>

        {isDelete ? null : (
          <>
            <Typography variant="h5" component="h3" className={styles.newExerciseTitle}>
              New Exercise
            </Typography>

            {/* Custom components for the form */}
            <Calendar />
            <SportsDropDown sportsData={sports} />

            {/* Time selection fields */}
            <fieldset className={styles.time}>
              <Box className={styles.timeContainer}>

                {/* Start and End Time Fields */}
                <StartEndTime name="Start Time" />
                <Box className={styles.endTime}>
                  <StartEndTime name="End Time" />
                </Box>

                <Typography className={styles.orText}>OR</Typography>

                {/* Total Duration Field */}
                <Duration />
                <Typography variant="body2" className={styles.durationSubtitle}>
                  Total hours / minutes
                </Typography>

              </Box>
            </fieldset>
          </>
        )}

      </DialogContent>

      {/* Dialog actions (buttons) */}
      <DialogActions>
        
        <Button className={styles.popupButton} onClick={handleClose}>Cancel</Button>
        
        <Button
          className={styles.popupButton}
          sx={{ fontWeight: 'bold' }}
          type="submit">
          {isDelete ? 'Delete' : 'Add Exercise'}
        </Button>

      </DialogActions>

    </Dialog>
  );
});

export default ExercisePopupBox;
