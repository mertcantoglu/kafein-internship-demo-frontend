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
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const DeleteConfirmationDialog = ({ open, handleClose, employeeId, handleSnackbarOpen }) => {
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState('');

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            handleSnackbarOpen('Employee deleted successfully', 'success');
            navigate('/employee');
            handleClose();
        },
        onError: (error) => {
            console.error('Error deleting employee:', error);
            handleSnackbarOpen(error.response?.data?.message || 'Failed to delete employee', 'error');
        }
    });

    const handleSubmit = async () => {
        if (confirmation !== 'DELETE') {
            handleSnackbarOpen('Please type DELETE to confirm.', 'warning');
            return;
        }
        
        deleteMutation.mutate(employeeId);

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
