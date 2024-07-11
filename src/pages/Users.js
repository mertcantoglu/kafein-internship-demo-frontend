import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add, Delete } from '@mui/icons-material';
import { fetchUsers, addUser, deleteUser } from '../helpers/API';
import UserAddModal from '../components/UserAddModal';

const Users = () => {
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [open, setOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const queryClient = useQueryClient();

    const { data: users, error, isLoading } = useQuery({
        queryFn: fetchUsers,
        queryKey: ['users'],
    });

    const mutationAdd = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            handleSnackbarOpen('User added successfully', 'success');
            handleClose();
        },
        onError: (error) => {
            handleSnackbarOpen(`Failed to add user: ${error.response?.data.message}`, 'error');
        }
    });

    const mutationDelete = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            handleSnackbarOpen('User deleted successfully', 'success');
        },
        onError: (error) => {
            queryClient.invalidateQueries(['users']);
            handleSnackbarOpen(`Failed to delete user: ${error.response?.data.message}`, 'error');
        }
    });

    const handleAddUser = () => {
        mutationAdd.mutate(newUser);
    };

    const handleDeleteUser = (id) => {
        mutationDelete.mutate(id);
    };

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarState({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewUser({ firstName: '', lastName: '', email: '', password: '' });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: 800, margin: 2 }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add User
                </Button>
            </Box>
            <List sx={{ width: '100%', maxWidth: 800 }}>
                {users.map((user) => (
                    <Paper elevation={1} sx={{ marginBottom: 2 }} key={user.id}>
                        <ListItem>
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={`Email: ${user.email} - Role: ${user.role}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))}
            </List>
            <UserAddModal
                open={open}
                onClose={handleClose}
                onAddUser={handleAddUser}
                newUser={newUser}
                handleChange={handleChange}
            />
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Users;
