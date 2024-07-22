import React from 'react'
import { fetchPendingRequests } from '../helpers/API';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Employee } from './Employee';
import EmployeeCardLeave from '../components/EmployeeCardLeave';
import { Alert, Box, Snackbar } from '@mui/material';
import useSnackbar from '../hooks/useSnackbar';
import SnackbarCompenent from '../components/SnackbarCompenent';
import useLeaveMutations from '../hooks/useLeaveMutations';

export const PendingRequsts = () => {

    const { snackbarState, handleSnackbarOpen, handleSnackbarClose } = useSnackbar(); 
    const { mutationDelete, mutationApprove, mutationReject } = useLeaveMutations(handleSnackbarOpen);


    const pendingRequests = useQuery({
        queryKey: ['leaves'],
        queryFn: () => fetchPendingRequests(),
    });



    if (pendingRequests.isLoading) return <div>Loading...</div>;
    if (pendingRequests.error) return <div >Error</div>;

    

    return (

        <Box>

            {pendingRequests.data.map((employee) => (
                <EmployeeCardLeave
                    employee={employee}
                    onDelete={mutationDelete}
                    onApprove={mutationApprove}
                    onReject={mutationReject}
                    handleSnackbarOpen={handleSnackbarOpen}

                />
            ))}

            <SnackbarCompenent snackbarState={snackbarState} handleSnackbarClose={handleSnackbarClose} />
        </Box>
    )
}
