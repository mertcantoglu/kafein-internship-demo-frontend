import React from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import useSnackbar from '../hooks/useSnackbar';
import SnackbarCompenent from '../components/SnackbarCompenent';

export const Employee = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const { snackbarState, handleSnackbarOpen, handleSnackbarClose } = useSnackbar();


    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: 800 }}>
                <Button
                    onClick={handleModalOpen}
                    variant="contained"
                    color="primary"
                    sx={{ margin: 1 }}
                >
                    Add Employee
                </Button>
                {modalOpen && (
                    <EmployeeForm
                        handleModalClose={handleModalClose}
                        open={modalOpen}
                        handleSnackbarOpen={handleSnackbarOpen}
                    />
                )}
                <TextField
                    label="Search Employees"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ margin: 1, flexGrow: 1 }}
                />
            </Box>

            <EmployeeList searchQuery={searchQuery} />

            <SnackbarCompenent snackbarState={snackbarState} handleSnackbarClose={handleSnackbarClose} />
        </Box>
    );
};
