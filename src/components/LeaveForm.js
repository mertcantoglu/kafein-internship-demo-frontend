import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { addLeaveRecord } from '../helpers/API';
import dayjs from 'dayjs';

const AddRecordDialog = ({ open, handleClose, handleAddRecord,employeeId }) => {
  const [leaveDay, setLeaveDay] = useState('');
  const [returnDay, setReturnDay] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    const formattedLeaveDay = dayjs(leaveDay).format('DD-MM-YYYY');
    const formattedReturnDay = dayjs(returnDay).format('DD-MM-YYYY');
    const newRecord = { id : employeeId, leaveDay: formattedLeaveDay, returnDay : formattedReturnDay, reason };
    try {
      const response = await addLeaveRecord(newRecord);
      handleAddRecord(response); // Update the parent component with the new record
      handleClose();
    } catch (error) {
      console.error('Error adding new record:', error);
      alert(error.response.data.message);
    }
  };


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Record</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the form below to add a new leave record.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="leaveDay"
          label="Leave Day"
          type="date"
          fullWidth
          variant="standard"
          value={leaveDay}
          onChange={(e) => setLeaveDay(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="returnDay"
          label="Return Day"
          type="date"
          fullWidth
          variant="standard"
          value={returnDay}
          onChange={(e) => setReturnDay(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="reason"
          label="Reason"
          type="text"
          fullWidth
          variant="standard"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordDialog;
