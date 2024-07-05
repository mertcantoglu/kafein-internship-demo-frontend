import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { addLeaveRecord } from '../helpers/API';
import dayjs from 'dayjs';

const AddRecordDialog = ({ open, handleClose, employeeId, handleSnackbarOpen, refetchData }) => {
    const [leaveRecord, setLeaveRecord] = useState({
        leaveDay: '',
        returnDay: '',
        reason: '',
        leaveHalfDay: false,
        returnHalfDay: false
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setLeaveRecord({
            ...leaveRecord,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async () => {
        const formattedLeaveDay = dayjs(leaveRecord.leaveDay).format('DD-MM-YYYY');
        const formattedReturnDay = dayjs(leaveRecord.returnDay).format('DD-MM-YYYY');
        const newRecord = {
            ...leaveRecord,
            leaveDay: formattedLeaveDay,
            returnDay: formattedReturnDay,
            id: employeeId
        };
        try {
            await addLeaveRecord(newRecord);
            handleSnackbarOpen('Leave record added successfully', 'success');
            refetchData();
            handleClose();
        } catch (error) {
            console.error('Error adding new record:', error);
            handleSnackbarOpen(error.response?.data?.message || 'Failed to add leave record', 'error');
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
                    name="leaveDay"
                    label="Leave Day"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={leaveRecord.leaveDay}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={leaveRecord.leaveHalfDay}
                            onChange={handleChange}
                            name="leaveHalfDay"
                            color="primary"
                        />
                    }
                    label="Half Day Leave Start"
                />
                <TextField
                    margin="dense"
                    id="returnDay"
                    name="returnDay"
                    label="Return Day"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={leaveRecord.returnDay}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={leaveRecord.returnHalfDay}
                            onChange={handleChange}
                            name="returnHalfDay"
                            color="primary"
                        />
                    }
                    label="Half Day Leave End"
                />
                <TextField
                    margin="dense"
                    id="reason"
                    name="reason"
                    label="Reason"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={leaveRecord.reason}
                    onChange={handleChange}
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
