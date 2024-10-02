import React, { useState } from "react";
import { TextField, Button, Tooltip, IconButton, InputLabel } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import componentStyles from "./LoginFields.module.css";

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
    console.log("Login data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className={componentStyles.loginForm}>
      <div className={componentStyles.formGroup}>
        <div className={componentStyles.labelContainer}>
          <InputLabel htmlFor="email" className={componentStyles.label}>Email</InputLabel>
          <Tooltip title="Enter your registered email address.">
            <IconButton size="small" className={componentStyles.infoIcon}>
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

      <div className={componentStyles.formGroup}>
        <div className={componentStyles.labelContainer}>
          <InputLabel htmlFor="password" className={componentStyles.label}>Password</InputLabel>
          <Tooltip title="Enter your password.">
            <IconButton size="small" className={componentStyles.infoIcon}>
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
        className={componentStyles.submitButton}
        fullWidth
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginComponent;
