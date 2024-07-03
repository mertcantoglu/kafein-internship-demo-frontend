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

const LeaveTable = ({ leaves }) => {
  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Leave Day</TableCell>
            <TableCell>Return Day</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Day</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveTable;