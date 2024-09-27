import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ExercisePopupBox from './ExercisePopupBox';
import styles from '../Activity.module.css';

export default function AddExerciseButtonWithPopup() {
  const popupRef = React.useRef();

  const handleOpenPopup = () => {
    if (popupRef.current) {
      popupRef.current.handleClickOpen();
    }
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          className={styles.addExerciseButton}
          onClick={handleOpenPopup}
        >
          Add Exercise
        </Button>
      </Stack>
      <ExercisePopupBox ref={popupRef} />
    </>
  );
}
