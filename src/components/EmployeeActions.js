import React from 'react';
import { Box, Button } from '@mui/material';

const EmployeeActions = ({ handleDialogToggle }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Button
                variant="contained"
                color="error"
                onClick={() => handleDialogToggle('delete', true)}
                style={{ width: 150, height: 100, alignSelf: 'center', marginRight: 30 }}
            >
                Delete Employee
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDialogToggle('edit', true)}
                style={{ width: 150, height: 100, alignSelf: 'center', marginRight: 30 }}
            >
                Edit Employee
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleDialogToggle('record', true)}
                style={{ width: 150, height: 100, alignSelf: 'center' }}
            >
                New Record
            </Button>
        </Box>
    );
};

export default EmployeeActions;
