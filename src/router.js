import React from 'react'
import {
    Route,
    Navigate,
    BrowserRouter as Router,
    Routes,
    Outlet,
} from "react-router-dom";

import { Employee } from './pages/Employee';
import { TopBar } from './components/TopBar';
import EmployeeDetail from './pages/EmployeeDetail';
import LoginPage from './pages/Login';
import SessionHelper from './helpers/SessionHelper';

import Users from './pages/Users'; 

const protoctedPages = [
    { name: 'Employee', path: 'employee', element: <Employee /> , roles: ['ADMIN', 'USER'] },
    { name: 'Users', path: 'users', element: <Users /> , roles : ['ADMIN']},
];

const ProtectedRoute = ({ element , roles }) => {
    const user = SessionHelper.getUser();
    if (!user) return <Navigate to='/' replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to='/employee' replace />;
    return element;
};


function AppRoutes() {
    const user = SessionHelper.getUser();

    return (
        <Router>
            {user && <TopBar pages = {protoctedPages} user = {user} />}
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to='/' replace />} />
                <Route key='employee' path='employee' element={<ProtectedRoute element={<Employee />} />} />
                <Route path='/employee/:id' element={<ProtectedRoute element={<EmployeeDetail />} />} />
                {protoctedPages.map((page) => (
                    <Route key={page.name} path={page.path} element={<ProtectedRoute element={page.element} roles={page.roles} />} />
                ))
                }
            </Routes>
        </Router>
    );
}

export default AppRoutes;
