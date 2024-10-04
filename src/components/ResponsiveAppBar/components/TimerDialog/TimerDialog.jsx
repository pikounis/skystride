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
import axios from 'axios';
import { getHeader, getUserId, APIPath } from '../../../../util';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimerDialog({ open, onClose }) {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const intervalRef = React.useRef(null);  // Use useRef to track interval ID
  const [selectedSport, setSelectedSport] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [sportList, setSportList] = React.useState([]);

  // Function to fetch the current timer status when the component loads
  const fetchTimerStatus = () => {
    axios.get(`${APIPath}/user/${getUserId}/getTimer`, {getHeader})
      .then((response) => {
        const { timerStartTime, currentTimerRunning, startedSport } = response.data;

        if (currentTimerRunning && timerStartTime) {
          const startTime = new Date(timerStartTime).getTime();
          const now = new Date().getTime();
          const diffInSeconds = Math.floor((now - startTime) / 1000);

          setSeconds(diffInSeconds);
          setIsActive(true);
          setSelectedSport(startedSport);  // Set the selected sport from the API
          startInterval();  // Start the timer interval
        }
      })
      .catch((error) => {
        console.error('Error fetching timer status:', error);
      });
  };

  // Function to start the timer interval
  const startInterval = () => {
    if (intervalRef.current === null) {  // Only start if no interval is running
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  // Function to stop the timer interval
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Clear the interval ID
    }
  };

  // Function to start the timer
  const startTimer = () => {
    if (!isActive && selectedSport) {
      setIsActive(true);
      setErrorMessage('');
      startInterval();

      // API call to start the backend timer
      axios.post(`${APIPath}/user/${getUserId}/startTimer/${selectedSport}`, {}, {getHeader})
        .catch((e) => {
          console.error("Error starting timer on server: " + e);
        });
    } else {
      setErrorMessage('Please select a sport before starting the timer.');
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsActive(false);
    stopInterval();  // Ensure the interval is cleared

    // API call to stop the backend timer
    axios.post(`${APIPath}/user/${getUserId}/endTimer`, {}, {getHeader})
      .catch((e) => {
        console.error("Error stopping timer on server: " + e);
      });

    setSeconds(0);  // Reset the seconds
  };

  // Function to reset the timer
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Fetch sports list and timer status on component mount
  React.useEffect(() => {
    axios.get(`${APIPath}/sport/getAll`)
      .then((response) => {
        setSportList(response.data);
      })
      .catch(() => {
        console.error('Error fetching sports data:');
      });

    fetchTimerStatus();  // Fetch the current timer status when the component loads
  }, []);

  // Cleanup interval when the component is unmounted
  React.useEffect(() => {
    return () => stopInterval();  // Clear interval on unmount
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Timer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '16px' }}>
        {/* Autocomplete dropdown for selecting sport */}
        <Autocomplete
          options={sportList}
          getOptionLabel={(option) => option.name || ''}
          value={sportList.find(sport => sport.id === selectedSport) || null}
          onChange={(event, value) => setSelectedSport(value ? value.id : null)}
          renderInput={(params) => <TextField {...params} label="Select Sport" variant="outlined" />}
          disabled={isActive}  // Disable when the timer is active
        />

        {/* Timer display */}
        <Typography variant="h3" component="div" sx={{ marginTop: '16px', textAlign: 'center' }}>
          {new Date(seconds * 1000).toISOString().substr(11, 8)}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          {!isActive && (
            <Button variant="contained" color="primary" onClick={startTimer}>
              Start
            </Button>
          )}
          {isActive && (
            <Button variant="contained" color="secondary" onClick={stopTimer}>
              Stop
            </Button>
          )}
          <Button variant="outlined" onClick={resetTimer} sx={{ marginLeft: '16px' }}>
            Reset
          </Button>
        </Box>

        {/* Error message */}
        {errorMessage && (
          <Typography color="error" sx={{ marginTop: '16px', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Dialog>
  );
}
