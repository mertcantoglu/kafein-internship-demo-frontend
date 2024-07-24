import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const LeaveTableEmployee = ({ leaves, handleSnackbarOpen , refetchData}) => {

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
                        <TableCell>Status</TableCell>
                       
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
                            <TableCell>{leave.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LeaveTableEmployee;
