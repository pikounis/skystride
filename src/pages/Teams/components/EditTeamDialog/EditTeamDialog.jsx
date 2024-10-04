import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, Stack
} from '@mui/material';
import styles from './EditTeamDialog.module.css';

function EditTeamDialog({ open, onClose, teamData, onSave }) {
  const [name, setName] = useState(teamData.name || '');
  const [imageURL, setImageURL] = useState(teamData.imageURL || '');
  const [description, setDescription] = useState(teamData.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    if (open) {
      setName(teamData.name || '');
      setImageURL(teamData.imageURL || '');
      setDescription(teamData.description || '');
      setIsSubmitting(false);
    }
  }, [open, teamData]);

  const handleSave = () => {
    // Validation logic similar to CreateTeamDialog
    if (name.trim().length < 2 || name.trim().length > 20) {
      alert('Team name must be between 2 and 20 characters.');
      return;
    }

    if (!imageURL.trim()) {
      alert('Image URL is required.');
      return;
    }

    if (!isValidURL(imageURL)) {
      alert('Please enter a valid URL.');
      return;
    }

    if (description.trim().length < 2 || description.trim().length > 110) {
      alert('Description must be between 2 and 110 characters.');
      return;
    }

    setIsSubmitting(true);
    onSave({ name, imageURL, description });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Team</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Team Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            disabled={isSubmitting}
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
          {imageURL && (
            <div className={styles.imagePreview}>
              <img src={imageURL} alt="Team" className={styles.previewImage} />
            </div>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTeamDialog;
