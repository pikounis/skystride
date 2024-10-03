import React, { useState } from "react";
import { TextField, Button, Tooltip, IconButton, InputLabel } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import axios from 'axios';
import { APIPath } from '../../../../util';
import { useNavigate } from 'react-router-dom';
import componentStyles from "./LoginFields.module.css";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    userPassword: "", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);

    try {
      const response = await axios.post(`${APIPath}/login`, formData);
      const jwtTokenData = response.data;

      if (jwtTokenData) {
        localStorage.setItem('jwt', jwtTokenData);

        console.log("JWT Token **************");
        console.log(jwtTokenData);

        navigate("/"); 
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
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
          name="userPassword" 
          value={formData.userPassword}
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
