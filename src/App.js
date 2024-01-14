import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** Layout Imports ***/
import MainLayout from 'layouts/MainLayout';

/*** CSS Imports ***/
import './App.css';

/*** Page Imports ***/
import LandingPage from 'pages/LandingPage';

function App() {
    return (
        <Router>
            <Routes>

                <Route element={<MainLayout />}>
                    <Route path='/' element={<LandingPage />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;