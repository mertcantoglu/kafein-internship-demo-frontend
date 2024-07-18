import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { deleteLeaveRecord, leaveApprove, leaveReject } from '../helpers/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';



const LeaveTable = ({ leaves, handleSnackbarOpen }) => {

    const queryClient = useQueryClient();

    const mutationDelete = useMutation({
        mutationFn: deleteLeaveRecord,
        onSuccess: () => {
            queryClient.invalidateQueries(['employee']);
            handleSnackbarOpen('Leave request deleted successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to delete request: ${error.response?.data.message}`, 'error');
        }
    });

    const mutationApprove = useMutation({
        mutationFn: leaveApprove,
        onSuccess: () => {
            queryClient.invalidateQueries(['employee']);
            handleSnackbarOpen('Leave request approved successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to approve request: ${error.response?.data.message}`, 'error');
        }
    });

    const mutationReject = useMutation({
        mutationFn: leaveReject,
        onSuccess: () => {
            queryClient.invalidateQueries(['employee']);
            handleSnackbarOpen('Leave request rejected successfully', 'success');
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to reject request: ${error.response?.data.message}`, 'error');
        }
    });

    const renderActions = (leave) => {
        switch (leave.status) {
            case 'PENDING':
                return (
                    <>
                        <IconButton onClick={() => mutationDelete.mutate(leave.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => mutationReject.mutate(leave.id)}>
                            <BlockIcon />
                        </IconButton>
                        <IconButton onClick={() => mutationApprove.mutate(leave.id)}>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </>
                );
            case 'APPROVE':
                return (
                    <IconButton disabled>
                        <CheckCircleOutlineIcon color="success" />
                    </IconButton>
                );
            case 'REJECT':
                return (
                    <IconButton disabled>
                        <BlockIcon color="error" />
                    </IconButton>
                );
            default:
                return null;
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Leave Day</TableCell>
                        <TableCell>Return Day</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Day</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaves.map((leave) => (
                        <TableRow key={leave.id}>
                            <TableCell>{leave.leaveDay}</TableCell>
                            <TableCell>{leave.returnDay}</TableCell>
                            <TableCell>{leave.reason || 'N/A'}</TableCell>
                            <TableCell>{new Date(leave.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{leave.dayDifference}</TableCell>
                            <TableCell
                            align='center'>{renderActions(leave)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LeaveTable;
