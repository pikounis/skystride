import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import styles from './RadioButtons.module.css'; 

function RadioButtons({ value, onChange }) {
    return (
        <FormControl>
            <RadioGroup
                className={styles.radioGroup} 
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={onChange}
                row
            >
                <FormControlLabel value="showAll" control={<Radio />} label="Show All" />
                <FormControlLabel value="myTeams" control={<Radio />} label="My Teams" />
            </RadioGroup>
        </FormControl>
    );
}

export default RadioButtons;
