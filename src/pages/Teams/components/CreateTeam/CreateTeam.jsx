// Provides a button to open a dialog for creating a new team.

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateTeamDialog from '../CreateTeamDialog/CreateTeamDialog';
import styles from './CreateTeam.module.css'; 
import axios from 'axios';
import { APIPath, getHeader, getUserId } from '../../../../util';

function CreateTeam({ onTeamCreated }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const userId = getUserId();
    const headers = getHeader();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCreateTeam = (teamData) => {
        axios.post(`${APIPath}/team/create/${userId}`, teamData, {headers})
            .then(response => {
                console.log('Team successfully created:', response.data);
                // Close the dialog
                handleCloseDialog();
                // Notify parent component that a team was created
                if (onTeamCreated) {
                    onTeamCreated();
                }
            })
            .catch(error => {
                console.error('Error creating team:', error);
                alert('Failed to create team. Please try again.');
            });
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
