import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Divider,
} from '@mui/material';
import { ExpandMore, Delete, CheckCircleOutline, Block } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ExpandMoreIcon = styled((props) => {
  const { expand, ...other } = props;
  return <ExpandMore {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EmployeeCardLeave = ({ employee , onDelete , onApprove, onReject}) => {


  const [expanded, setExpanded] = useState(false);

  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" sx={{ m :5 }}>
      <CardContent >
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h6">{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography variant="body2" color="textSecondary">
              Department: {employee.department} - Remaining Days: {employee.numDaysBreak}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleExpandClick}>
              <ExpandMoreIcon expand={expanded} />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {employee.leaves.map((leave) => (
            <div key={leave.id} style={{ marginBottom: '16px' }}>
              <Divider />
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Leave Day:</strong> {leave.leaveDay}
              </Typography>
              <Typography variant="body2">
                <strong>Return Day:</strong> {leave.returnDay}
              </Typography>
              <Typography variant="body2">
                <strong>Reason:</strong> {leave.reason}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {leave.status}
              </Typography>
              <Typography variant="body2">
                <strong>Day Difference:</strong> {leave.dayDifference}
              </Typography>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item>
                  <IconButton onClick={()=> onDelete.mutate(leave.id)} color="error">
                    <Delete />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={()=>onApprove.mutate(leave.id)} color="success">
                    <CheckCircleOutline />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={()=>onReject.mutate(leave.id)} color="warning">
                    <Block />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default EmployeeCardLeave;
