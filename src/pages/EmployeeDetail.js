import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addLeaveRecord, fetchEmployee, fetchEmployeeLeaves } from '../helpers/API';
import EmployeeCard from '../components/EmployeeCard';
import LeaveTable from '../components/LeaveTable';
import { Button, Box, Typography, Paper } from '@mui/material';
import AddRecordDialog from '../components/LeaveForm';

export const EmployeeDetail = () => {
    const employeeId = useParams().id;
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleOpenDialog = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const handleAddRecord = (record) => { 
        console.log(record);
        setDialogOpen(false);
    }

    const leavesQuery = useQuery(
        {
            queryKey: ['employeesLeaves', employeeId],
            queryFn: () => fetchEmployeeLeaves(employeeId),
        }
    );

    const employeeQuery = useQuery(
        {
            queryKey: ['employee', employeeId],
            queryFn: () => fetchEmployee(employeeId),
        }
    );



    if (leavesQuery.isLoading || employeeQuery.isLoading) return <div>Loading...</div>;
    if (leavesQuery.error || employeeQuery.error) return <div>Error: {employeeQuery.message}</div>;

    console.log(leavesQuery.data);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: 2 }}>
                <EmployeeCard employee={employeeQuery.data} />
                <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{width:150,height:150,alignSelf:'center'}}>
                    New Record
                </Button>
            </Box>
            <Paper elevation={3} sx={{ width: '80%', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    Leaves
                </Typography>
                <LeaveTable leaves={leavesQuery.data} employeeId={employeeId} />
            </Paper>

            <AddRecordDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleAddRecord={handleAddRecord}
        employeeId={employeeQuery.data.id}
      />
        </Box>

    );
};
