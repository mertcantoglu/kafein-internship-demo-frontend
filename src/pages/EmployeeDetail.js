import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee, fetchEmployeeLeaves } from '../helpers/API';
import { Box, Paper, Typography } from '@mui/material';
import EmployeeActions from '../components/EmployeeActions';
import EmployeeCard from '../components/EmployeeCard';
import LeaveTable from '../components/LeaveTable';
import AddRecordDialog from '../components/LeaveForm';
import EmployeeEditForm from '../components/EmployeeEditForm';
import DeleteConfirmationDialog from '../components/EmployeeDeleteConfirm';

const EmployeeDetail = () => {
    const { id: employeeId } = useParams();
    const [dialogState, setDialogState] = useState({
        record: false,
        edit: false,
        delete: false,
    });

    const handleDialogToggle = (type, state) => {
        setDialogState(prevState => ({ ...prevState, [type]: state }));
    };

    const leavesQuery = useQuery({
        queryKey: ['employeesLeaves', employeeId],
        queryFn: () => fetchEmployeeLeaves(employeeId),
    });

    const employeeQuery = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => fetchEmployee(employeeId),
    });

    if (leavesQuery.isLoading || employeeQuery.isLoading) return <div>Loading...</div>;
    if (leavesQuery.error || employeeQuery.error) return <div>Error: {employeeQuery.message}</div>;

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
                <LeaveTable leaves={leavesQuery.data} employeeId={employeeId} onDelete={handleDialogToggle} />
            </Paper>
            <AddRecordDialog
                open={dialogState.record}
                handleClose={() => handleDialogToggle('record', false)}
                handleAddRecord={() => window.location.reload()}
                employeeId={employeeQuery.data.id}
            />
            <EmployeeEditForm
                employeeProps={employeeQuery.data}
                handleModalClose={() => handleDialogToggle('edit', false)}
                open={dialogState.edit}
            />
            <DeleteConfirmationDialog
                open={dialogState.delete}
                handleClose={() => handleDialogToggle('delete', false)}
                employeeId={employeeQuery.data.id}
            />
        </Box>
    );
};

export default EmployeeDetail;
