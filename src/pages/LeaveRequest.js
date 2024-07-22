import React, { useState } from 'react'
import EmployeeCard from '../components/EmployeeCard';
import { fetchEmployeeLeaves, fetchEmployees } from '../helpers/API';
import { useQuery } from '@tanstack/react-query';
import SessionHelper from '../helpers/SessionHelper';
import LeaveTableEmployee from '../components/LeaveTableEmployee';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import AddRecordDialog from '../components/LeaveForm';
import useSnackbar from '../hooks/useSnackbar';
import SnackbarCompenent from '../components/SnackbarCompenent';
import LoadingPage from './LoadingPage';

const LeaveRequest = () => {
    const { user } = SessionHelper.getUser();

    const { snackbarState, handleSnackbarOpen, handleSnackbarClose } = useSnackbar();
    const [dialogState, setDialogState] = useState(false);

    const handleDialogToggle = (state) => {
        setDialogState(state);
    }



    const employeeQuery = useQuery({
        queryKey: ['employee'],
        queryFn: () => fetchEmployees(),
    });

    if (employeeQuery.isLoading) return <LoadingPage/>;
    if (employeeQuery.error) return <div >fasdfa</div>;



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', flex: '',  width: '100%' }}>
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
            <SnackbarCompenent snackbarState={snackbarState} handleSnackbarClose={handleSnackbarClose} />
        </Box>


    )
}

export default LeaveRequest