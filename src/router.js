import React from 'react'
import {
    Route,
    Navigate,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";

import { Employee } from './pages/Employee';
import { TopBar } from './components/TopBar';
import EmployeeDetail from './pages/EmployeeDetail';
import LoginPage from './pages/Login';
import SessionHelper from './helpers/SessionHelper';

import Users from './pages/Users'; 
import LeaveRequest from './pages/LeaveRequest';
import AccessDenied from './pages/AccessDenied';
import PageNotFound from './pages/PageNotFound';
import { PendingRequsts } from './pages/PendingRequsts';
import { TodayLeaves } from './pages/TodayLeaves';

const protoctedPages = [
    { name: 'Employee', path: 'employee', element: <Employee /> , roles: ['ADMIN', 'USER'] },
    { name: 'Pending Requests', path: 'pending', element: <PendingRequsts /> , roles: ['ADMIN', 'USER'] },
    { name: 'Users', path: 'users', element: <Users /> , roles : ['ADMIN']},
    { name : 'Leave Request' , path: 'request' , element: <LeaveRequest /> , roles : ['EMPLOYEE'] },
    { name: 'Today Leaves', path: 'today', element: <TodayLeaves />, roles: ['ADMIN', 'USER']},
];

const ProtectedRoute = ({ element , roles }) => {
    const user = SessionHelper.getUser();
    if (!user) return <Navigate to='/' replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to='/access-denied' replace />;

    <Navigate goback/>;
    return element;
};


function AppRoutes() {
    const user = SessionHelper.getUser();

    return (
        <Router>
            {user && <TopBar pages = {protoctedPages} user = {user} />}
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to='/not-found' replace />} />
                <Route path='/employee/:id' element={<ProtectedRoute element={<EmployeeDetail />} />} />
                {protoctedPages.map((page) => (
                    <Route key={page.name} path={page.path} element={<ProtectedRoute element={page.element} roles={page.roles} />} />
                ))
                }
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="/not-found" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
