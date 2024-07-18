import React, { useState } from 'react'
import EmployeeCard from '../components/EmployeeCard';
import { fetchEmployeeLeaves, fetchEmployees } from '../helpers/API';
import { useQuery } from '@tanstack/react-query';
import SessionHelper from '../helpers/SessionHelper';
import LeaveTableEmployee from '../components/LeaveTableEmployee';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import AddRecordDialog from '../components/LeaveForm';

const LeaveRequest = () => {
    const { user } = SessionHelper.getUser();
    const [dialogState, setDialogState] = useState(false);

    const handleDialogToggle = (state) => {
        setDialogState(state);
    }

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const handleSnackbarOpen = (message, severity) => {
        setSnackbarState({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const employeeQuery = useQuery({
        queryKey: ['employee'],
        queryFn: () => fetchEmployees(),
    });

    if (employeeQuery.isLoading) return <div>Loading...</div>;
    if (employeeQuery.error) return <div >fasdfa</div>;



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', flex: '', backgroundColor: 'red', width: '100%' }}>
                <EmployeeCard employee={employeeQuery.data[0]} />
                <Button variant="contained" color="primary" sx={{ margin: 1 }} onClick={() => handleDialogToggle(true)}>
                    Request Leave
                </Button>
            </Box>
            <LeaveTableEmployee leaves={employeeQuery.data[0].leaves} />

            <AddRecordDialog
                open={dialogState}
                handleClose={() => handleDialogToggle(false)}
                employeeId={employeeQuery.data.id}
                handleSnackbarOpen={handleSnackbarOpen}
            />
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


    )
}

export default LeaveRequest