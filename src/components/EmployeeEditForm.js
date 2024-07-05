import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { updateEmployee } from '../helpers/API';



function EmployeeEditForm({ handleModalClose, open, employeeProps }) {


    const modalStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',

    };

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
    console.log(employee);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateEmployee(employee);
            handleModalClose();
            alert('Employee updated successfully');
        } catch (error) {
            console.error('Error update employee:', error);
            alert('Failed to update employee');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleModalClose}
            style={modalStyle}
            hideBackdrop
        >
            <DialogTitle>Edit Employee</DialogTitle>

            <DialogContentText
                style={{
                    marginLeft: 20,
                }}>
                To edit a employee please enter the required fields.
            </DialogContentText>


            <DialogContent
                style={{
                }
                }>
                <form onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <TextField name={field.name} label={field.label} defaultValue={employee[field.name]} onChange={handleChange} required fullWidth style={{ marginBottom: 10 }} />
                    ))
                    }
                    <TextField 
                    type='number'
                    name='numDaysBreak' 
                    label='Remaning Days: ' 
                    defaultValue={employee['numDaysBreak']} 
                    onChange={handleChange} 
                    required 
                    fullWidth
                    style={{ marginBottom: 10 }}
                    InputProps={{ inputProps : {min:0}}} />
                    
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
