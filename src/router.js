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
    // { name: 'Leaves', path: 'leaves', element: <Leaves /> }
];


function AppRoutes() {
    return (
        <Router>
            <TopBar pages = {pages}/>
            <Routes>
                <Route index path="/" element={<Outlet />} />
                <Route path="*" element={<Navigate to='/' replace />} />

                {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={page.element} />
                ))
                }
                <Route path='/employee/:id' element = {<EmployeeDetail/>} />

                
            </Routes>
        </Router>
    )
}

export default AppRoutes