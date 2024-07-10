import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import SessionHelper from '../helpers/SessionHelper';

export const TopBar = ({ pages, user }) => {
    const navigate = useNavigate();

    const logOut = () => {
        SessionHelper.deleteUser();
        navigate('/', { replace: true });
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={() => navigate(page.path)}>
                                <Typography textAlign="center" variant="h6">
                                    {page.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h7" sx={{ marginRight: 2 }}>
                            {user.fullName}
                        </Typography>
                        <MenuItem onClick={logOut}>
                            <Typography textAlign="center" variant="h7">
                                Logout
                            </Typography>
                        </MenuItem>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
