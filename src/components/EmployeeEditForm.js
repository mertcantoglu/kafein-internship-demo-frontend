import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { updateEmployee } from '../helpers/API';

function EmployeeEditForm({ handleModalClose, open, employeeProps, handleSnackbarOpen, refetchData }) {

    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'department', label: 'Department' }
    ]

    const [employee, setEmployee] = useState(employeeProps);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(employee);
            handleSnackbarOpen('Employee updated successfully', 'success');
            refetchData();
            handleModalClose();
        } catch (error) {
            console.error('Error updating employee:', error);
            handleSnackbarOpen(error.response?.data?.message || 'Failed to update employee', 'error');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleModalClose}
        >
            <DialogTitle>Edit Employee</DialogTitle>

            <DialogContentText style={{ marginLeft: 20 }}>
                To edit an employee please enter the required fields.
            </DialogContentText>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <TextField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            defaultValue={employee[field.name]}
                            onChange={handleChange}
                            required
                            fullWidth
                            style={{ marginBottom: 10 }}
                        />
                    ))}
                    <TextField
                        type='number'
                        name='numDaysBreak'
                        label='Remaining Days'
                        defaultValue={employee['numDaysBreak']}
                        onChange={handleChange}
                        required
                        fullWidth
                        style={{ marginBottom: 10 }}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeEditForm;
