import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { addEmployee } from '../helpers/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function EmployeeForm({ handleModalClose, open, handleSnackbarOpen}) {

    const queryClient = useQueryClient();

    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'department', label: 'Department' },
    ];

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        role: 'EMPLOYEE'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const mutationSubmit= useMutation({
        mutationFn: addEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            handleSnackbarOpen('Employee added successfully', 'success');
            handleModalClose();
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to add employee: ${error.response?.data.message}`, 'error');
        }
    });


    return (
        <Dialog open={open} onClose={handleModalClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContentText style={{ marginLeft: 20 }}>
                To create a new opportunity please enter the required fields.
            </DialogContentText>
            <DialogContent>
                <form>
                    {fields.map(field => (
                        <TextField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            onChange={handleChange}
                            required
                            fullWidth
                            style={{ marginBottom: 10 }}
                        />
                    ))}
                    <TextField
                            key='password'
                            name='password'
                            label='Password'
                            onChange={handleChange}
                            type='password'
                            password
                            fullWidth
                            required
                            style={{ marginBottom: 10 }}
                        />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button onClick={() => mutationSubmit.mutate(employee)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeForm;
