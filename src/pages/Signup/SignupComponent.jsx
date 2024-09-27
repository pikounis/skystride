import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import styles from './Signup.module.css';

const SignupComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    office: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // the formdata is to send to the backend or API
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <div className={styles.formGroup}>
        <div className={styles.labelContainer}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Tooltip title="Enter your desired username.">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <TextField
          variant="outlined"
          fullWidth
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelContainer}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Tooltip title="Enter your email address.">
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
          <InputLabel htmlFor="office">Office</InputLabel>
          <Tooltip title="Select your office location.">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <FormControl fullWidth variant="outlined">
          <Select
            labelId="office-label"
            id="office"
            name="office"
            value={formData.office}
            onChange={handleChange}
            label="Office"
            required
          >
            {/* Menu Item was the only MUI i could find to do the drop-down */}
            <MenuItem value="Livingston">Livingston</MenuItem>
            <MenuItem value="Osterley">Osterley</MenuItem>
            <MenuItem value="Leeds">Leeds</MenuItem>
  
          </Select>
        </FormControl>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelContainer}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Tooltip title="Choose a strong password.">
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
        Sign Up
      </Button>
    </form>
  );
};

export default SignupComponent;
