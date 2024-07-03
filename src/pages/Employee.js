import React from 'react'
import EmployeeList from '../components/EmployeeList'
import EmployeeForm from '../components/EmployeeForm'
import { Button } from '@mui/material';

export const Employee = () => {

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

  return (
    <div>
        <Button onClick={handleModalOpen} 
        variant="contained" 
        color="primary"
        style={{marginTop:15, marginLeft:15}}>
            Add Employee</Button>
        {modalOpen && <EmployeeForm handleModalClose={handleModalClose} open={modalOpen}/>}
        <EmployeeList></EmployeeList>
        <div style={{height:50}}></div>
    </div>
    
  )
}
