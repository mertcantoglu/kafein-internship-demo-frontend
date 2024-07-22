import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLeaveRecord, leaveApprove, leaveReject } from '../helpers/API';

const useLeaveMutations = (handleSnackbarOpen) => {
    const queryClient = useQueryClient();

    const mutationDelete = useMutation({
        mutationFn: deleteLeaveRecord,
        onSuccess: () => {
            queryClient.invalidateQueries(['leaves']);
            handleSnackbarOpen('Leave request deleted successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to delete request: ${error.response?.data.message}`, 'error');
        }
    });

    const mutationApprove = useMutation({
        mutationFn: leaveApprove,
        onSuccess: () => {
            queryClient.invalidateQueries(['leaves']);
            handleSnackbarOpen('Leave request approved successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to approve request: ${error.response?.data.message}`, 'error');
        }
    });

    const mutationReject = useMutation({
        mutationFn: leaveReject,
        onSuccess: () => {
            queryClient.invalidateQueries(['leaves']);
            handleSnackbarOpen('Leave request rejected successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to reject request: ${error.response?.data.message}`, 'error');
        }
    });

    return {
        mutationDelete,
        mutationApprove,
        mutationReject
    };
};

export default useLeaveMutations;
