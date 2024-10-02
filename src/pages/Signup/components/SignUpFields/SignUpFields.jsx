import React, { useState } from 'react';
import { TextField, Button, Tooltip, IconButton, InputLabel, Autocomplete } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import componentStyles from './SignUpFields.module.css';

const offices = ['Osterley', 'Leeds', 'Livingston'];


const SignupFields = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      office: null,
    });
  
    const [emailError, setEmailError] = useState(false);
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const emailValid = formData.email.endsWith('@sky.uk');
      if (!emailValid) {
        setEmailError(true);
        return;
      }
  
      console.log('Signup data:', formData);
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