import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addLeaveRecord, deleteLeaveRecord, fetchEmployee, fetchEmployeeLeaves } from '../helpers/API';
import EmployeeCard from '../components/EmployeeCard';
import LeaveTable from '../components/LeaveTable';
import { Button, Box, Typography, Paper } from '@mui/material';
import AddRecordDialog from '../components/LeaveForm';
import EmployeeEditForm from '../components/EmployeeEditForm';

export const EmployeeDetail = () => {
    const employeeId = useParams().id;
    const [dialogRecordOpen, setRecordDialogOpen] = useState(false);
    
    const handleOpenRecordDialog = () => {
        setRecordDialogOpen(true);
    };
  
    const handleCloseRecordDialog = () => {
        setRecordDialogOpen(false);
    };

    const handleAddRecord = () => {   
        window.location.reload();
        setRecordDialogOpen(false);
    }

    const [dialogEditOpen, setEditDialogOpen] = useState(false);
    
    const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
    };
  
    const handleCloseEditDialog = () => {
        window.location.reload();
        setEditDialogOpen(false);
    };

    const handleDelete = async (id) => {
        try{
          await deleteLeaveRecord(id);
          alert('Leave record deleted successfully');
          window.location.reload();
        }
        catch(error){
          console.error('Error deleting leave record:', error);
          alert('Failed to delete leave record');
        }
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

                

               <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
               <Button variant="contained" color="secondary" onClick={handleOpenEditDialog} style={{width:150,height:100,alignSelf:'center', marginRight:30}}>
                    Edit Employee
                </Button>

                <Button variant="contained" color="primary" onClick={handleOpenRecordDialog} style={{width:150,height:100,alignSelf:'center'}}>
                    New Record
                </Button>
                </Box>
                
            </Box>
            <Paper elevation={3} sx={{ width: '80%', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    Leaves
                </Typography>
                <LeaveTable leaves={leavesQuery.data} employeeId={employeeId}  onDelete={handleDelete}/>
            </Paper>

            <AddRecordDialog
        open={dialogRecordOpen}
        handleClose={handleCloseRecordDialog}
        handleAddRecord={handleAddRecord}
        employeeId={employeeQuery.data.id}
      />
            <EmployeeEditForm 
            employeeProps={employeeQuery.data}
            handleModalClose={handleCloseEditDialog}
            open={dialogEditOpen} />
        </Box>

    );
};
