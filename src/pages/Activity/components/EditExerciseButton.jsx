import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExercisePopupBox from './ExercisePopupBox'; // Ensure you import the dialog component
import styles from '../Activity.module.css';

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const popupRef = React.useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleClose(); // Close the menu
    popupRef.current.handleClickOpen(); // Open the confirmation dialog
  };

  const handleConfirmDelete = () => {
    // API call to delete here
    console.log("Exercise session deleted!");

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
            onClick={option === 'Delete' ? handleDeleteClick : handleClose}
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

      {/* Confirmation dialog for deletion */}
      <ExercisePopupBox 
        ref={popupRef} 
        title="Delete Exercise" 
        message="Are you sure you want to delete this exercise session?"
        onConfirm={handleConfirmDelete} 
        isDelete={true} 
      />
    
    </div>
  );
}
