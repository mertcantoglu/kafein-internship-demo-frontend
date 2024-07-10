import React from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export const Employee = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const queryClient = useQueryClient();

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarState({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const refetchData = () => {
        queryClient.invalidateQueries(['employees']);
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
                        refetchData={refetchData}
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
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
