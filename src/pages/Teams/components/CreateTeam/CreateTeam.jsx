import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateTeamDialog from '../CreateTeamDialog/CreateTeamDialog';
import styles from './CreateTeam.module.css'; 

function CreateTeam() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCreateTeam = (teamData) => {
        console.log('Team Created:', teamData);
        // add logic to save the created team
    };

    return (
        <div>
            <Button
                className={styles.triggerButton}
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
            >
                Create Team
            </Button>
            <CreateTeamDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onCreate={handleCreateTeam}
            />
        </div>
    );
}

export default CreateTeam;
