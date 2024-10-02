import React from 'react';
import SignupFields from './components/SignUpFields/SignUpFields';
import styles from './Signup.module.css';
import { Typography, Paper } from '@mui/material';

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <Paper elevation={3} className={styles.paper}>
        <img
          src="sky_stride_no_background.png"
          alt="Logo"
          className={styles.logo}
        />
        <Typography
          variant="h4"
          className={styles.title}
        >
          Sign Up
        </Typography>
        <SignupFields />
      </Paper>
    </div>
  );
};

export default Signup;
