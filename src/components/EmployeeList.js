import React from 'react';
import { Box, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from '@mui/icons-material';
import { fetchEmployees } from '../helpers/API';
import { useNavigate } from 'react-router-dom';

function EmployeeList({ searchQuery }) {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(
    {
      queryKey: ['employees'],
      queryFn: fetchEmployees
    }
  );

  const filteredEmployees = data?.filter(employee =>
    (`${employee.firstName} ${employee.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto'}}>
      {filteredEmployees?.length === 0 ? (
        <Typography variant="h6" sx={{ margin: 2 }}>
          No employees found.
        </Typography>
      ) : (
        <List>
          {filteredEmployees.map((employee) => (
            <Paper elevation={1} sx={{ marginBottom: 2 }} key={employee.id}>
              <ListItem>
                <ListItemText
                  primary={`${employee.firstName} ${employee.lastName}`}
                  secondary={`Department: ${employee.department} - Remaining Days: ${employee.numDaysBreak}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="details" onClick={() => navigate(`/employee/${employee.id}` , {replace:true})}>
                    <ChevronRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}

export default EmployeeList;
