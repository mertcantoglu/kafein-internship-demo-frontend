import React from 'react'
import EmployeeList from '../components/EmployeeList'
import EmployeeForm from '../components/EmployeeForm'
import { Box, Button, TextField } from '@mui/material';

export const Employee = () => {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex'}}>
                <Button onClick={handleModalOpen}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 15, marginLeft: 15 }}>
                    Add Employee</Button>
                {modalOpen && <EmployeeForm handleModalClose={handleModalClose} open={modalOpen} />}
                <TextField
                    label="Search Employees"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginTop: 15, marginLeft: 15 }}
                />
            </Box>
            <EmployeeList searchQuery={searchQuery} />
        </Box>
    )
}
