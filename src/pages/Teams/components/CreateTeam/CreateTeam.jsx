import React from 'react';
import Button from '@mui/material/Button';
import styles from './CreateTeam.module.css'; 

function CreateTeam({ onClick }) {
    return (
        <Button
            className={styles.triggerButton}
            variant="contained"
            color="primary"
            onClick={onClick}
        >
            Create Team
        </Button>
    );
}

export default CreateTeam;
