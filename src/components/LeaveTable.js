import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteLeaveRecord } from '../helpers/API';

const handleDelete = async (id) => {
  try {
      const response = await deleteLeaveRecord(id);
      alert('Record deleted successfully');
  } catch (error) {
      console.error('Error delete record:', error);
      alert('Failed to delete record');
  }
};

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
                <IconButton onClick={() => (handleDelete(leave.id))}>
                  <DeleteIcon/>
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