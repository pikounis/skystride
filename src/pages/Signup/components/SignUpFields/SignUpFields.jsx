import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import componentStyles from './SignUpFields.module.css';
import { APIPath } from '../../../../util';

const offices = ['Osterley', 'Leeds', 'Livingston'];

const SignupFields = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    office: null,
    userPassword: '', // Adding password to formData
  });

  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate(); // Use navigate hook from react-router-dom for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    if (e.target.name === 'email') {
      const emailValid = formData.email.endsWith('@sky.uk');
      setEmailError(!emailValid);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register data:", formData);

    const emailValid = formData.email.endsWith('@sky.uk');
    if (!emailValid) {
      setEmailError(true);
      return;
    }

    try {
      // Make the API POST request with the correct format
      const response = await axios.post(`${APIPath}/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        office: formData.office.toUpperCase(), // Convert office to uppercase as required by the API
        userPassword: formData.userPassword,
      });

      console.log("Registration successful:", response.data);

      // Redirect to the login page after successful registration
      navigate("/login");

    } catch (error) {
      console.error('Register error:', error);
      alert('Error: Could not register you.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={componentStyles.signupForm}>
      <div className={componentStyles.formGroup}>
        <TextField
          variant="outlined"
          fullWidth
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={componentStyles.formGroup}>
        <TextField
          variant="outlined"
          fullWidth
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={componentStyles.formGroup}>
        <TextField
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={emailError}
          helperText={emailError ? 'Email must contain @sky.uk' : ''}
        />
      </div>

      <div className={componentStyles.formGroup}>
        <Autocomplete
          options={offices}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Office"
              variant="outlined"
              required
            />
          )}
          value={formData.office}
          onChange={(event, newValue) => setFormData({ ...formData, office: newValue })}
        />
      </div>

      <div className={componentStyles.formGroup}>
        <TextField
          variant="outlined"
          fullWidth
          id="userPassword"
          name="userPassword"
          placeholder="Password"
          type="password"
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
        Sign Up
      </Button>
    </form>
  );
};

export default SignupFields;
