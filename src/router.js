import React from 'react'
import {
    Route,
    Navigate,
    BrowserRouter as Router,
    Routes,
    Outlet,
} from "react-router-dom";

import Leaves from './pages/Leaves';
import { Employee } from './pages/Employee';
import { TopBar } from './components/TopBar';
import { EmployeeDetail } from './pages/EmployeeDetail';

const pages = [
    { name: 'Employee', path: 'employee', element: <Employee /> },
];


function AppRoutes() {
    return (
        <Router>
            <TopBar pages = {pages}/>
            <Routes>
                <Route index path="/" element={<Employee />} />
                <Route path="*" element={<Navigate to='/' replace />} />

               
                <Route index key='employee' path='employee' element={<Employee />} />
                <Route path='/employee/:id' element = {<EmployeeDetail/>} />
                
            </Routes>
        </Router>
    )
}

export default AppRoutes