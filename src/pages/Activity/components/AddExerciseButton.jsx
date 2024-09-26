import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../Activity.module.css';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" className={styles.addExerciseButton}>Add Exercise</Button>
    </Stack>
  );
}
