import React from 'react';
import LoginComponent from './LoginComponent';
import styles from './Login.module.css';
import { Typography } from '@mui/material';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.headerBox}>
      <div className={styles.signupContainer}>
      <div className={styles.headerBox}>
        <Typography
          variant="h2"
          className={styles.skycolouring}
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
          }}
        >
          Sign Up
        </Typography>
      </div>
      <LoginComponent />
    </div>
    </div>
    </div>
  );
};

export default Login;
