import React from 'react';
import { Box, Button } from '@mui/material';

const EmployeeActions = ({ handleDialogToggle }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
            <Button
                variant="contained"
                color="error"
                onClick={() => handleDialogToggle('delete', true)}
                sx={{ width: { xs: '100%', md: 150 }, height: { xs: 50, md: 100 }, marginBottom: { xs: 2, md: 0 }, marginRight: { md: 2 } }}
            >
                Delete Employee
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDialogToggle('edit', true)}
                sx={{ width: { xs: '100%', md: 150 }, height: { xs: 50, md: 100 }, marginBottom: { xs: 2, md: 0 }, marginRight: { md: 2 } }}
            >
                Edit Employee
            </Button>
        </Box>
    );
};

export default EmployeeActions;
