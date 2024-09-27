import React from 'react';
import LoginFields from './components/LoginFields/LoginFields';
import styles from './Login.module.css';
import { Typography, Paper } from '@mui/material';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
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
          Login
        </Typography>
        <LoginFields />
      </Paper>
    </div>
  );
};

export default Login;
