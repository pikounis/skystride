import React from 'react';
import SignupComponent from './SignupComponent';
import styles from './Signup.module.css';
import { Typography } from '@mui/material';

const Signup = () => {
  return (
    <div>
    <Typography
    variant="h2"
    className={styles.skycolouring}
    style={{
      textAlign: "center",
      marginTop: "1.5rem",
    }}>Sign Up</Typography>
      <SignupComponent />
    </div>
  );
};

export default Signup;
