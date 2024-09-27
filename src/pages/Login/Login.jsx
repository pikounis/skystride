import React from 'react';
import LoginComponent from './LoginComponent';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <LoginComponent />
    </div>
  );
};

export default Login;
