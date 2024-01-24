import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** Layout Imports ***/
import MainLayout from 'layouts/MainLayout/MainLayout';
import CenteredLayout from 'layouts/FormLayout/FormLayout';
import UserLayout from 'layouts/UserLayout/UserLayout';

/*** CSS Imports ***/
import './App.css';

/*** Page Imports ***/
import LandingPage from 'pages/LandingPage/LandingPage';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword';
import ResetPassword from 'pages/ResetPassword/ResetPassword';
import Profile from 'pages/User/Account/Profile/Profile';

function App() {
    return (
        <main className='app'>
            <Router>
                <Routes>

                    <Route element={<MainLayout />}>
                        <Route path='/' element={<LandingPage />} />
                    </Route>

                    <Route element={<CenteredLayout />}>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/password/forgot' element={<ForgotPassword />} />
                        <Route path='/password/reset' element={<ResetPassword />} />
                    </Route>

                    <Route path='/user' element={<UserLayout />}>
                        <Route path='account'>
                            <Route path='profile' element={<Profile />} />
                        </Route>
                    </Route>

                </Routes>
            </Router>
        </main>
    );
}

export default App;