import React, { useState } from 'react';
import { TextField, Button, Container , Modal, Dialog, DialogContent, DialogTitle, DialogContentText} from '@mui/material';
import axios from 'axios';

function EmployeeForm({ handleModalClose, open }) {


  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',

  };

  const fields = [
    {name: 'firstName', label: 'First Name'},
    {name: 'lastName', label: 'Last Name'},
    {name: 'email', label: 'Email'},
    {name: 'department', label: 'Department'},
  ]
    
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/employees', {...employee});
      alert('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <Dialog 
    open={open} 
    onClose={handleModalClose}
    style={modalStyle}
    hideBackdrop
    >
        <DialogTitle>Add Employee</DialogTitle>

        <DialogContentText
        style={{
            marginLeft: 20,
        }}>
            To create a new opportunity please enter the required fields.
        </DialogContentText>


    <DialogContent
    style={{
    }
    }>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <TextField name={field.name} label={field.label} onChange={handleChange} required fullWidth style={{marginBottom:10}}/>
        ))
        }
        <Button type="submit" variant="contained" color="primary">Add Employee</Button>
      </form>
      
    </DialogContent>
    </Dialog>
  );
}

export default EmployeeForm;
