import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import Calendar from './Calendar';
import SportsDropDown from '../../../components/SportsDropDown/SportsDropDown';
import StartEndTime from './StartEndTime';
import styles from '../Activity.module.css';
import { APIPath } from '../../../util';
import axios from 'axios';

const ExercisePopupBox = React.forwardRef(({onConfirm, isDelete, isEdit, date, exercise, startTime, endTime, totalTime }, ref) => {

  // axios GET request to populate sports dropdown from backend

  const [sportList, setSportList] = React.useState([]); // Holds sports options
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Axios GET request
    axios.get(APIPath + "/sport/getAll")  // Replace with your API endpoint
      .then((response) => {
        setSportList(response.data);
        setLoading(false);
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

    if (isDelete && onConfirm) {
      onConfirm(); // Call the confirm action for delete 
    } else {

      const dataToPost = {
        skyUserId: 1,
        sportId: formData.sport,
        startTime: formData.date + "T" + formData.startTime + ":00",
        endTime: formData.date + "T" + formData.endTime + ":00",
        pontsEarned: 20
      }

      console.log(dataToPost)

    }
    handleClose(); // Close the dialog after submission
  };

  const [formData, setFormData] = React.useState({
    date: null,
    sport: null,
    startTime: null,
    endTime: null,
  });

  const handleDateSubmit = (selectedDate) => {
    setFormData((prevData) => ({ ...prevData, date: selectedDate }));
  };

  const handleSportChange = (sport) => {
    setFormData((prevData) => ({ ...prevData, sport }));
  };

  const handleStartTimeSubmit = (selectedTime) => {
    setFormData((prevData) => ({ ...prevData, startTime: selectedTime }));
  };

  const handleEndTimeSubmit = (selectedTime) => {
    setFormData((prevData) => ({ ...prevData, endTime: selectedTime }));
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

              <SportsDropDown sportsData={sportList}/>

              {/* Time selection fields */}
              <fieldset className={styles.editTime}>
                <Box className={styles.timeContainer}>

                  {/* Start and End Time Fields */}
                  <StartEndTime name="Start Time" />
                  <Typography variant="body2" className={styles.timeSubtitle}>
                    Current Start: {startTime}
                  </Typography>

                  <Box className={styles.endTime}>
                    <StartEndTime name="End Time" />
                  </Box>
                  <Typography variant="body2" className={styles.timeSubtitle}>
                    Current End: {endTime}
                  </Typography>

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
              <Calendar onDateChange={handleDateSubmit}/>
              {/* <SportsDropDown sportsData={sports} /> */}
              <SportsDropDown sportsData={sportList} onSportChange={handleSportChange}/>

              {/* Time selection fields */}
              <fieldset className={styles.time}>
                <Box className={styles.timeContainer}>
        
                  <StartEndTime name="Start Time" onTimingChange={handleStartTimeSubmit}/>

                  <Box className={styles.endTime}>
                    <StartEndTime name="End Time" onTimingChange={handleEndTimeSubmit}/>
                  </Box>

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
