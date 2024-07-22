// components/UserAddModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserAddModal = ({ open, onClose, onAddUser, newUser, handleChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    value={newUser.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    value={newUser.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    required
                    value={newUser.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    variant="outlined"
                    value={newUser.password}
                    onChange={handleChange}
                />

                <FormControl fullWidth margin="dense" variant="outlined" required>
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                        label="Role"
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onAddUser} color="primary">
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserAddModal;
