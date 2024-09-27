import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Calendar from './Calendar';
import SportsDropDown from './SportsDropDown';

const ExercisePopupBox = React.forwardRef(({ title, message, onConfirm, isDelete }, ref) => {
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
            <Calendar />
            <SportsDropDown />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{isDelete ? 'Delete' : 'Add Exercise'}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ExercisePopupBox;
