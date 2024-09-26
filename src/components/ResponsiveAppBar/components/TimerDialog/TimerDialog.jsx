import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimerDialog({ open, onClose }) {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      const newIntervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setIntervalId(newIntervalId);
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
          {/* <Button autoFocus color="inherit" onClick={onClose}>
            save
          </Button> */}
        </Toolbar>
      </AppBar>
      
      {/* Timer display and controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h3" component="div" sx={{ mb: 4 }}>
          {new Date(seconds * 1000).toISOString().substr(11, 8)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
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
          <Button variant="outlined" onClick={resetTimer}>
            Reset
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
