import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styles from './TeamsSearch.module.css'; 

function TeamsSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); 
    };

    return (
        <TextField
            className={styles.searchContainer} 
            label="Search Teams"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
        />
    );
}

export default TeamsSearch;
