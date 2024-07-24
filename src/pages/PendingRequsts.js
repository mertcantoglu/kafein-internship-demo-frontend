import React from 'react'
import { fetchPendingRequests } from '../helpers/API';
import { useQuery } from '@tanstack/react-query';
import EmployeeCardLeave from '../components/EmployeeCardLeave';
import { Box} from '@mui/material';
import useSnackbar from '../hooks/useSnackbar';
import SnackbarCompenent from '../components/SnackbarCompenent';
import useLeaveMutations from '../hooks/useLeaveMutations';
import LoadingPage from './LoadingPage';

export const PendingRequsts = () => {

    const { snackbarState, handleSnackbarOpen, handleSnackbarClose } = useSnackbar(); 
    const { mutationDelete, mutationApprove, mutationReject } = useLeaveMutations(handleSnackbarOpen);


    const pendingRequests = useQuery({
        queryKey: ['leaves'],
        queryFn: () => fetchPendingRequests(),
    });



    if (pendingRequests.isLoading) return <LoadingPage/>;
    if (pendingRequests.error) return <div >Error</div>;

    
    console.log(pendingRequests.data);
    return (

        <Box>

            {pendingRequests.data.map((employee) => (
                <EmployeeCardLeave
                    employee={employee}
                    onDelete={mutationDelete}
                    onApprove={mutationApprove}
                    onReject={mutationReject}
                    showActions = {true}
                />
            ))}

            <SnackbarCompenent snackbarState={snackbarState} handleSnackbarClose={handleSnackbarClose} />
        </Box>
    )
}
