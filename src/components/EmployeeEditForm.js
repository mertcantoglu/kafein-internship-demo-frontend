import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { updateEmployee } from '../helpers/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function EmployeeEditForm({ handleModalClose, open, employeeProps, handleSnackbarOpen}) {

    const queryClient = useQueryClient();

    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'department', label: 'Department' }
    ]

    const [employee, setEmployee] = useState({...employeeProps , 'role': 'EMPLOYEE'});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const updateMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries(['employee' , employee.id]);
            handleSnackbarOpen('Employee updated successfully', 'success');
            handleModalClose();
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to update employee: ${error.response?.data.message}`, 'error');
        }
    });


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
                <form>
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
        <Button onClick={() => updateMutation.mutate(employee)}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeEditForm;
