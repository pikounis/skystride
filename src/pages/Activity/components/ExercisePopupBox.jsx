import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import Calendar from './Calendar';
import SportsDropDown from './SportsDropDown';
import StartEndTime from './StartEndTime';
import Duration from './Duration';
import styles from '../Activity.module.css';
import { APIPath } from '../../../util';
import axios from 'axios';

const ExercisePopupBox = React.forwardRef(({onConfirm, isDelete, isEdit, date, exercise, startTime, endTime, totalTime, activityId }, ref) => {

  // axios GET request to populate sports dropdown from backend

  const [sportList, setSportList] = React.useState([]); // Holds sports options
  const [loading, setLoading] = React.useState(startTime);
  const [error, setError] = React.useState(endTime);

  // axios PUT request to hold form data
  const [selectedSport, setSelectedSport] = React.useState(exercise);
  const [selectedStartTime, setSelectedStartTime] = React.useState(startTime);
  const [selectedEndTime, setSelectedEndTime] = React.useState(endTime);

  React.useEffect(() => {
    // Axios GET request
    axios.get(APIPath + "/sport/getAll")  // Replace with your API endpoint
      .then((response) => {
        setSportList(response.data);
        setLoading(!loading);
        setError(null);
      })
      .catch(() => {
        console.error('Error fetching sports data:', error);
        setLoading(false);
        setError('Failed to load sports data');
      });
    }, [error, loading]);

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

  // Makes the handleClickOpen method accessible to the parent component via the ref
  React.useImperativeHandle(ref, () => ({
    handleClickOpen
  }));

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Sets up Edit Data format for API 
    const updatedData = {
      id: activityId,
      sport: selectedSport,
      startTime: selectedStartTime,
      endTime: selectedEndTime
    };

    console.log("Updated Data:", updatedData);

    if (isDelete && onConfirm) {
      onConfirm(); // Call the confirm action for delete 
    } else if (isEdit) {
      // PUT request
      axios.put(APIPath + "/activity/update", updatedData)
      .then((response) => {
        console.log("Activity updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating activity: ", error);
      });
      // console.log('Exercise details submitted:', { exercise, date, totalTime });
    }
    handleClose(); // Close the dialog after submission
  };


  let buttonText;

  // Popup Button changes text depending on popup type
  if (isDelete) {
    buttonText = 'Delete Exercise';
  } else if (isEdit) {
    buttonText = 'Edit Exercise';
  } else {
    buttonText = 'Add Exercise';
  }

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

    <DialogContent>
      {(() => {
        if (isDelete) {
          return (
            // DELETE EXERCISE POPUP
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">

              <Typography variant="h6" className={styles.deleteTitle} gutterBottom>
                Delete Exercise
              </Typography>
              
              <Typography variant="body1" className={styles.deleteQuestion} pb={1}>
                Are you sure you want to delete this exercise session?
              </Typography>

              <Box mt={2} textAlign="left">
                <Typography variant="body1" className={styles.deleteData}>Exercise: {exercise}</Typography>
                <Typography variant="body1" className={styles.deleteData}>Date: {date}</Typography>
                <Typography variant="body1" className={styles.deleteData}>Total Time: {totalTime}</Typography>
              </Box>

            </Box>

          );
        } else if (!isDelete && isEdit){
          return (
            // EDIT EXERCISE POPUP 
            <>
              <Typography variant="h5" component="h3" className={styles.editExerciseTitle}>
                Edit Exercise
              </Typography>

              <Calendar />
              <Typography variant="body2" className={styles.dateSubtitle}>
                    Current Date: {date}
              </Typography>


{/* UPDATED FOR EDIT ACTIVITY */}
              <SportsDropDown sportsData={sportList} 
              selectedExercise={selectedSport} 
              onChange={(sport) => setSelectedSport(sport)}/>

              <Typography variant="body2" className={styles.timeSubtitle}>
                    Current Sport: {exercise}
                  </Typography>


              {/* Time selection fields */}
              <fieldset className={styles.editTime}>
                <Box className={styles.timeContainer}>

                  {/* Start and End Time Fields */}
                  <StartEndTime name="Start Time" 
                  onChange={(time) => setSelectedStartTime(time)}/>
                  <Typography variant="body2" className={styles.timeSubtitle}>
                    Current Start: {startTime}
                  </Typography>

                  <Box className={styles.endTime}>
                    <StartEndTime name="End Time" 
                    onChange={(time) => setSelectedEndTime(time)} />
                  </Box>
                  <Typography variant="body2" className={styles.timeSubtitle}>
                    Current End: {endTime}
                  </Typography>


{/* UPDATED EDIT PUT ENDS HERE */}


                  {/* <Typography className={styles.orTextEdit}>OR</Typography> */}

                  {/* Total Duration Field */}
                  {/* <Duration />

                  <Typography variant="body2" className={styles.durationEditSubtitle}>
                    Current Total Time: {totalTime}
                  </Typography> */}

                </Box>
              </fieldset>
            </>
          );
        } else {
          return (
            // ADD EXERCISE POPUP
            <>
              <Typography variant="h5" component="h3" className={styles.newExerciseTitle}>
                New Exercise
              </Typography>

              {/* Custom components for the form */}
              <Calendar />
              {/* <SportsDropDown sportsData={sports} /> */}
              <SportsDropDown sportsData={sportList} />

              {/* Time selection fields */}
              <fieldset className={styles.time}>
                <Box className={styles.timeContainer}>
        
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
          );
        }
      })()}
    </DialogContent>
    

      {/* Dialog actions (buttons) */}
      <DialogActions>
        
        <Button className={styles.popupButton} onClick={handleClose}>Cancel</Button>

        <Button
          className={styles.popupButton}
          sx={{ fontWeight: 'bold', color: isDelete ? 'red' : !isDelete && isEdit ? '#3d6bfa' : '#7c08f5' }}
          type="submit"
        >
          {/* Button changes text depending on popup: Add, Edit */}
          {buttonText} 
        </Button>

      </DialogActions>

    </Dialog>
  );
});

export default ExercisePopupBox;
