import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const EmployeeNotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('employees');  // Go back to the previous page
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Employee Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The employee you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoBack}>
                Go Back
            </Button>
        </Box>
    );
};

export default EmployeeNotFound;
