import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee } from '../helpers/API';
import { Box, Paper, Typography} from '@mui/material';
import EmployeeActions from '../components/EmployeeActions';
import EmployeeCard from '../components/EmployeeCard';
import LeaveTable from '../components/LeaveTable';

import EmployeeEditForm from '../components/EmployeeEditForm';
import DeleteConfirmationDialog from '../components/EmployeeDeleteConfirm';
import EmployeeNotFound from '../components/EmployeeNotFound';
import useSnackbar from '../hooks/useSnackbar';
import SnackbarCompenent from '../components/SnackbarCompenent';
import LoadingPage from './LoadingPage';

const EmployeeDetail = () => {
    const { id: employeeId } = useParams();

    const [dialogState, setDialogState] = useState({
        edit: false,
        delete: false,
    });

    const { snackbarState, handleSnackbarOpen, handleSnackbarClose } = useSnackbar();
    

    const handleDialogToggle = (type, state) => {
        setDialogState(prevState => ({ ...prevState, [type]: state }));
    };


    const employeeQuery = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => fetchEmployee(employeeId),
    });


    if (employeeQuery.isLoading) return <LoadingPage/>;
    if (employeeQuery.error) return <EmployeeNotFound />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
                <EmployeeCard employee={employeeQuery.data} />
                <EmployeeActions handleDialogToggle={handleDialogToggle} />
            </Box>
            <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    Leaves
                </Typography>
                <LeaveTable leaves={employeeQuery.data.leaves} employeeId={employeeId} handleSnackbarOpen={handleSnackbarOpen}/>
            </Paper>

            <EmployeeEditForm
                employeeProps={employeeQuery.data}
                handleModalClose={() => handleDialogToggle('edit', false)}
                open={dialogState.edit}
                handleSnackbarOpen={handleSnackbarOpen}
            />
            <DeleteConfirmationDialog
                open={dialogState.delete}
                handleClose={() => handleDialogToggle('delete', false)}
                employeeId={employeeQuery.data.id}
                handleSnackbarOpen={handleSnackbarOpen}
            />
            

            <SnackbarCompenent snackbarState={snackbarState} handleSnackbarClose={handleSnackbarClose} />
        </Box>
    );
};

export default EmployeeDetail;
