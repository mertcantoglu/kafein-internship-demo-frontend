import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee, fetchEmployeeLeaves } from '../helpers/API';
import { Box, Paper, Typography, Snackbar, Alert } from '@mui/material';
import EmployeeActions from '../components/EmployeeActions';
import EmployeeCard from '../components/EmployeeCard';
import LeaveTable from '../components/LeaveTable';
import AddRecordDialog from '../components/LeaveForm';
import EmployeeEditForm from '../components/EmployeeEditForm';
import DeleteConfirmationDialog from '../components/EmployeeDeleteConfirm';
import EmployeeNotFound from '../components/EmployeeNotFound';

const EmployeeDetail = () => {
    const { id: employeeId } = useParams();
    const [dialogState, setDialogState] = useState({
        record: false,
        edit: false,
        delete: false,
    });
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleDialogToggle = (type, state) => {
        setDialogState(prevState => ({ ...prevState, [type]: state }));
    };

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarState({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const leavesQuery = useQuery({
        queryKey: ['employeesLeaves', employeeId],
        queryFn: () => fetchEmployeeLeaves(employeeId),
    });

    const employeeQuery = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => fetchEmployee(employeeId),
    });

    const refetchData = () => {
        leavesQuery.refetch();
        employeeQuery.refetch();
    };

    if (leavesQuery.isLoading || employeeQuery.isLoading) return <div>Loading...</div>;
    if (leavesQuery.error || employeeQuery.error) return <EmployeeNotFound />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: 2 }}>
                <EmployeeCard employee={employeeQuery.data} />
                <EmployeeActions handleDialogToggle={handleDialogToggle} />
            </Box>
            <Paper elevation={3} sx={{ width: '80%', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    Leaves
                </Typography>
                <LeaveTable leaves={leavesQuery.data} employeeId={employeeId} handleSnackbarOpen={handleSnackbarOpen} refetchData={refetchData} />
            </Paper>
            <AddRecordDialog
                open={dialogState.record}
                handleClose={() => handleDialogToggle('record', false)}
                employeeId={employeeQuery.data.id}
                handleSnackbarOpen={handleSnackbarOpen}
                refetchData={refetchData}
            />
            <EmployeeEditForm
                employeeProps={employeeQuery.data}
                handleModalClose={() => handleDialogToggle('edit', false)}
                open={dialogState.edit}
                handleSnackbarOpen={handleSnackbarOpen}
                refetchData={refetchData}
            />
            <DeleteConfirmationDialog
                open={dialogState.delete}
                handleClose={() => handleDialogToggle('delete', false)}
                employeeId={employeeQuery.data.id}
                handleSnackbarOpen={handleSnackbarOpen}
                refetchData={refetchData}
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
    );
};

export default EmployeeDetail;
