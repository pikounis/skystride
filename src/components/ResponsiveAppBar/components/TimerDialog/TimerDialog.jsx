import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import sportsData from './sports.json'; 
import styles from './TimerDialog.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimerDialog({ open, onClose }) {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);
  const [selectedSport, setSelectedSport] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const startTimer = () => {
    if (!isActive) {
      if (selectedSport) {
        setIsActive(true);
        setErrorMessage(''); // Clear error message if a sport is selected
        const newIntervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
        setIntervalId(newIntervalId);
      } else {
        setErrorMessage('Please select a sport before starting the timer.');
      }
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Cleanup interval when component is unmounted or when sport is deselected
  React.useEffect(() => {
    if (!selectedSport && isActive) {
      // If the sport is cleared, stop the timer
      stopTimer();
      setErrorMessage('Sport was removed. Timer stopped.');
    }
  }, [selectedSport, isActive]);

  React.useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup when the component is unmounted
  }, [intervalId]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Timer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Autocomplete for selecting sport */}
      <Box className={styles.dialogContainer}>
        <Autocomplete
          options={sportsData} 
          getOptionLabel={(option) => option}
          onChange={(event, value) => setSelectedSport(value)}
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />}
          sx={{ width: 300, mb: 4 }}
        />

        {/* Timer display and controls */}
        <Typography variant="h3" component="div" className={styles.timerDisplay}>
          {new Date(seconds * 1000).toISOString().substr(11, 8)}
        </Typography>

        <Box className={styles.controls}>
          {!isActive && (
            <Button
              variant="contained"
              color="primary"
              onClick={startTimer}
            >
              Start
            </Button>
          )}
          {isActive && (
            <Button variant="contained" color="secondary" onClick={stopTimer}>
              Stop
            </Button>
          )}
          <Button variant="outlined" onClick={resetTimer}>
            Reset
          </Button>
        </Box>

        {/* Display error message if sport not selected */}
        {errorMessage && (
          <Typography className={styles.errorMessage}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Dialog>
  );
}
