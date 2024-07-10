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


const pages = [
    { name: 'Employee', path: 'employee', element: <Employee /> },
];


const ProtectedRoute = ({ element }) => {
    const user = SessionHelper.getUser();
    return user ? element : <Navigate to='/' replace />;
  };




function AppRoutes() {
    const user = SessionHelper.getUser();

    return (
        <Router>
            {user && <TopBar pages = {pages} user = {user} />}
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to='/' replace />} />
                <Route key='employee' path='employee' element={<ProtectedRoute element={<Employee />} />} />
                <Route path='/employee/:id' element={<ProtectedRoute element={<EmployeeDetail />} />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes