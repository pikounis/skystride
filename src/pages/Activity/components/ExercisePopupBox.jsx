import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Calendar from './Calendar';
import SportsDropDown from './SportsDropDown';
import { Typography, Box } from '@mui/material';
import StartEndTime from './StartEndTime';
import Duration from './Duration';
import styles from '../Activity.module.css';

const ExercisePopupBox = React.forwardRef(({ title, message, onConfirm, isDelete }, ref) => {

  const sports = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Cricket'];  // Sample data

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // the handleClickOpen method for the parent component to control
  React.useImperativeHandle(ref, () => ({
    handleClickOpen
  }));

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

            <Calendar />
            <SportsDropDown sportsData={sports}/>

            <fieldset className={styles.time}>

              {/* Start and End Time Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                <StartEndTime name="Start Time" />

                <Box className={styles.endTime}>
                  <StartEndTime name="End Time"/>
                </Box>

                <Typography className={styles.orText}>
                  OR
                </Typography>

                {/* Total Duration Field */}
                <Duration />

                <Typography variant="body2" sx={{ marginTop: '5px', textAlign: 'center' }}>
                  Total hours / minutes
                </Typography>

              </Box>

            </fieldset>
          </>
        )}

      </DialogContent>

      <DialogActions>
        <Button className={styles.popupButton} onClick={handleClose}>Cancel</Button>
        <Button className={styles.popupButton} sx={{fontWeight: 'bold' }} type="submit">{isDelete ? 'Delete' : 'Add Exercise'}</Button>
      </DialogActions>

    </Dialog>
  );
});

export default ExercisePopupBox;
