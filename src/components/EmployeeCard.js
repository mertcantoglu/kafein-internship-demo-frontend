import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EmployeeCard = ({ employee }) => {
  return (
    <Card sx={{ maxWidth: { xs: '100%', md: 300 }, margin: { xs: 2, md: 4 } }}>
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

export default EmployeeCard;
