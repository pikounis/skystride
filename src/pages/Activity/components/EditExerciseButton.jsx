import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExercisePopupBox from './ExercisePopupBox';
import styles from '../Activity.module.css';

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

const EditExerciseButton = ({ selectedExercise }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const open = Boolean(anchorEl);
  const popupRef = React.useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open popup to confirm deleting an exercise session with exercise data
  const handleDeleteClick = (exercise, date, totalTime) => {
    setIsDelete(true);
    handleClose(); 
    popupRef.current.handleClickOpen();
  };

  const handleConfirmDelete = () => {
    // API call to delete here
    console.log("Exercise session deleted!", selectedExercise);
  };

  // Open the popup to edit an exercise session
  const handleEditClick = () => {
    setIsEdit(true); 
    setIsDelete(false);
    handleClose();
    popupRef.current.handleClickOpen();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className={styles.editExerciseButton} />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{ 'aria-labelledby': 'long-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem 
            key={option} 
            onClick={option === 'Delete' ? handleDeleteClick : handleEditClick}
            sx={{
              '&:hover': {
                color: '#3348d1'
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Confirmation dialog for deletion or editing an exercise session */}
      <ExercisePopupBox 
      ref={popupRef}
      activityId={selectedExercise?.id} // Ensure to pass the activity ID
      date={selectedExercise?.date}
      exercise={selectedExercise?.exercise}
      startTime={selectedExercise?.start}
      endTime={selectedExercise?.finish}
      totalTime={selectedExercise?.total_time}
      onConfirm={handleConfirmDelete}
      isEdit={isEdit}
      isDelete={isDelete}
      />
    </div>
  );
};

export default EditExerciseButton;