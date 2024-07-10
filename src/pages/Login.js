import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { redirect, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { login } from '../helpers/API';
import SessionHelper from '../helpers/SessionHelper';



export default function LoginPage() {
  const navigate = useNavigate();
    
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    message: '',
    severity: 'success',
});

const handleSnackbarOpen = (message, severity) => {
  setSnackbarState({ open: true, message, severity });
};

const handleSnackbarClose = () => {
  setSnackbarState({ ...snackbarState, open: false });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const credentials = {
      email: data.get('email'),
      password: data.get('password'),
  };
  try{
    const response = await login(credentials);
    SessionHelper.setUser(response);
    handleSnackbarOpen('Login succesful', 'success');
    navigate('/employee', { replace: true });
    window.location.reload();
  }
  catch(error){
    console.error('Error logging in:', error);
    handleSnackbarOpen(error.response?.data?.message || 'Failed to login', 'error');
  }
}




  return (
    <Container component="main" maxWidth="xs"  >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>


        </Box>
      </Box>
      <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
    </Container>

  );
}