import React from 'react';
import './App.css';
import Header from './components/custom/Header';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="relative w-full h-screen">
            {/* Video Background */}
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="/171360-845439617_small.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Lớp phủ mờ (overlay) */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

            {/* Nội dung chính */}
            <div className="relative z-10">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
