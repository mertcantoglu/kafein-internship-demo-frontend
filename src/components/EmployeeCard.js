import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EmployeeCard = ({ employee }) => {
  return (
    <Card style={{ maxWidth: 300,margin:50}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Department: {employee.department}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {employee.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            Off Days: {employee.numDaysBreak}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard