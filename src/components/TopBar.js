import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";


export const TopBar = ({pages}) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {pages.map((page) => (
                        <MenuItem onClick={()=> navigate(page.path)}>
                            <Typography textAlign="center" variant='h6'>{page.name} </Typography>
                        </MenuItem>
                    ))}
                </Toolbar>
            </AppBar>
        </Box>

    )
}
