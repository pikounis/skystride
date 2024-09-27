import React from 'react';
import LoginComponent from './LoginComponent';
import styles from './Login.module.css';
import { Typography, Paper } from '@mui/material';
// import logo from '../../../public/sky_stride_no_background.png';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <Paper elevation={3} className={styles.paper}>
        {/* Add logo here */}
        <img
          src="sky_stride_no_background.png"
          alt="Logo"
          className={styles.logo}
        />
        <Typography
          variant="h4"
          className={styles.title}
        >
          Login
        </Typography>
        <LoginComponent />
      </Paper>
    </div>
  );
};

export default Login;
