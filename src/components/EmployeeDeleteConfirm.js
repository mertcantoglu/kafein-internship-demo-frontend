import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { deleteEmployee } from '../helpers/API';

const DeleteConfirmationDialog = ({ open, handleClose , employeeId }) => {
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async () => {
    if (confirmation !== 'DELETE') {
      alert('Please type DELETE to confirm.');
      return;
    }

    try {
      await deleteEmployee(employeeId);
      handleClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this employee? This action cannot be undone. 
          Please type DELETE to confirm.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="confirmation"
          label="Type DELETE to confirm"
          type="text"
          fullWidth
          variant="standard"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
