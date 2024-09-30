import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './CreateTeamDialog.module.css';

function CreateTeamDialog({ open, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleCreate = () => {
        // Validation for Name
        if (name.trim().length < 2 || name.trim().length > 20) {
            alert('Team name must be between 2 and 20 characters.');
            return;
        }

        // Validation for ImageURL
        if (!imageURL.trim()) {
            alert('Image URL is required.');
            return;
        }

        if (!isValidURL(imageURL)) {
            alert('Please enter a valid URL.');
            return;
        }

        // Validation for Description
        if (description.trim().length < 2 || description.trim().length > 110) {
            alert('Description must be between 2 and 110 characters.');
            return;
        }

        // If all validation passes, proceed with creating the team
        onCreate({ name, imageURL, description });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className={styles.title} >Create Team</DialogTitle>
            <DialogContent>
                <TextField
                    className={styles.input}
                    label="Team Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className={styles.input}
                    label="Image URL"
                    fullWidth
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                />
                <TextField
                    className={styles.input}
                    label="Description"
                    multiline
                    rows={2}
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {imageURL && (
                    <div className={styles.imagePreview}>
                        <img src={imageURL} alt="Team" className={styles.previewImage} />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} variant="contained" color="primary">
                    Create Team
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateTeamDialog;
