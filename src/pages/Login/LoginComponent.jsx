import React, { useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
  IconButton,
  InputLabel,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Login.module.css";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (eample -  send data to backend)
    console.log("Login data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <div className={styles.labelContainer}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Tooltip title="Enter your registered email address.">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <TextField
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelContainer}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Tooltip title="Enter your password.">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <TextField
          variant="outlined"
          fullWidth
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={styles.submitButton}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginComponent;
