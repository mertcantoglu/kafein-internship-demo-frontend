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
import { deleteLeaveRecord } from '../helpers/API';

const LeaveTable = ({ leaves, onDelete, handleSnackbarOpen }) => {
    const handleDelete = async (id) => {
        try {
            await deleteLeaveRecord(id);
            handleSnackbarOpen('Record deleted successfully', 'success');
            onDelete('delete', true);
        } catch (error) {
            console.error('Error deleting record:', error);
            handleSnackbarOpen(error.response?.data?.message || 'Failed to delete record', 'error');
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
                            <TableCell>
                                <IconButton onClick={() => handleDelete(leave.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LeaveTable;
