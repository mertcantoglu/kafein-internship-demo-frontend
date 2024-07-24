import React from 'react'
import { fetchTodayLeaves } from '../helpers/API';
import { useQuery } from '@tanstack/react-query';
import EmployeeCardLeave from '../components/EmployeeCardLeave';
import { Box} from '@mui/material';
import LoadingPage from './LoadingPage';

export const TodayLeaves = () => {



    const TodayLeaves = useQuery({
        queryKey: ['leaves'],
        queryFn: () => fetchTodayLeaves(),
    });



    if (TodayLeaves.isLoading) return <LoadingPage/>;
    if (TodayLeaves.error) return <div >Error</div>;

    
    return (
        <Box>

            {TodayLeaves.data.map((employee) => (
                <EmployeeCardLeave
                    employee={employee}
                    showActions = {false}
                />
            ))}
        </Box>
    )
}
