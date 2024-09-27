import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ExercisePopupBox = React.forwardRef((_, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  React.useImperativeHandle(ref, () => ({
    handleClickOpen,
  }));

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log('Form submitted:', formJson); // Handle form data
    handleClose(); // Close the dialog after submission
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleFormSubmit, // Handle form submission
      }}
    >
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the details of the exercise you'd like to add.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="exerciseName"
          name="exerciseName"
          label="Exercise Name"
          type="text"
          fullWidth
          variant="standard"
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add Exercise</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ExercisePopupBox;
