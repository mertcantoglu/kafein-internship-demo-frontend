import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from '@mui/icons-material';
import { fetchEmployees } from '../helpers/API';
import { useNavigate } from 'react-router-dom';


function EmployeeList() {
    const navigate = useNavigate();
  const { data , error, isLoading } = useQuery(
   { queryKey: ['employees'],
    queryFn: fetchEmployees}
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

    <Box sx={{width:'80%' , margin: 2 }}>
    <List>
          {data.map((employee) => (
            <Paper elevation={3} sx={{ marginBottom: 2 }} key={employee.id}>
              <ListItem>
                <ListItemText
                  primary={`${employee.firstName}  ${employee.lastName}`}
                  secondary={`Depertmant : ${employee.department} - Remaning Days: ${employee.numDaysBreak}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="details" onClick={() => navigate(`/employee/${employee.id}`)} >
                    <ChevronRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
    </Box>
   
  );
}

export default EmployeeList;
